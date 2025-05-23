import React, { useState } from "react";
import "./WeightForm.css";
import { ReactComponent as Check } from "../../assets/icons/check.svg";

const WeightForm = () => {
  const [goalWeight, setGoalWeight] = useState("");
  const [barWeight, setBarWeight] = useState(45);
  const [includeBarWeight, setIncludeBarWeight] = useState(true);
  const [plateResult, setPlateResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const availablePlates = [45, 35, 25, 10, 5, 2.5];

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalWeight = Number(goalWeight);
    if (totalWeight <= 0) {
      setErrorMessage("Please enter a goal weight greater than 0.");
      setPlateResult(null); // Clear any previous results
      return;
    }

    const bar = includeBarWeight ? barWeight : 0;
    const weightToMake = totalWeight - bar;

    if (weightToMake < 0) {
      setPlateResult("Error: Bar weight exceeds goal weight.");
      setErrorMessage(""); // Clear previous error
      return;
    }

    setErrorMessage(""); // Clear any previous errors

    let remaining = weightToMake / 2;
    const platePairs = {};

    for (let plate of availablePlates) {
      const count = Math.floor(remaining / plate);
      if (count > 0) {
        platePairs[plate] = count * 2; // total plates (both sides)
        remaining -= count * plate;
      }
    }

    if (remaining > 0) {
      setPlateResult(
        `Remaining weight (${remaining} lbs) cannot be matched with available plates.`
      );
    } else {
      setPlateResult(platePairs);
    }
  };

  const renderResult = () => {
    if (!plateResult) return null;
    if (typeof plateResult === "string") return <p id="form-response">{plateResult}</p>;

    return (
      <div id="form-response">
        <h4>Total Plates Required:</h4>
        {plateResult._meta && (
          <p>Plate-loaded weight: {plateResult._meta.weightToMake} lbs</p>
        )}
        <ul>
          {Object.entries(plateResult)
            .sort((a, b) => b[0] - a[0]) // Sort by plate weight descending
            .map(([plate, count]) => (
              <li key={plate}>
                {count}× {plate} lbs
              </li>
            ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit} aria-labelledby="weight-form">
        <div id="goal-weight">
          <label htmlFor="goalWeight">Goal Weight:</label>
          <input
            type="number"
            id="goalWeight"
            value={goalWeight}
            onChange={(e) => setGoalWeight(Number(e.target.value))}
            required
            aria-required="true"
            aria-describedby="goal-weight-description"
          />
          <small id="goal-weight-description">Enter your target weight in pounds.</small>
        </div>

        <div id="bar-weight">
          <label htmlFor="barWeight">Bar Weight:</label>
          <input
            type="number"
            id="barWeight"
            value={barWeight}
            onChange={(e) => setBarWeight(Number(e.target.value))}
            aria-labelledby="bar-weight-description"
          />
          <small id="bar-weight-description">Enter the weight of the barbell (default: 45 lbs).</small>
        </div>

        <div id="include-bar">
          <label htmlFor="includeBarWeight">
            Include Bar Weight:
            <div id="fancy-checkbox">
              <input
                type="checkbox"
                id="includeBarWeight"
                checked={includeBarWeight}
                onChange={(e) => setIncludeBarWeight(e.target.checked)}
                aria-labelledby="include-bar-description"
              />
              <Check />
            </div>
          </label>
          <small id="include-bar-description">Check if the bar weight should be included in the total weight calculation.</small>
        </div>

        <button id="submit-button" type="submit" aria-label="Calculate Plates">Calculate Plates</button>
      </form>

      {errorMessage && <p id="form-response">{errorMessage}</p>}
      {renderResult()}
    </>
  );
};

export default WeightForm;
