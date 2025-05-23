import React, { useEffect, useState } from "react";
import "./About.css";

import Z_header from "../../components/Z_header/Z_header";
import Z_pagesection from "../../components/Z_pagesection/Z_pagesection";
import Z_footer from "../../components/Z_footer/Z_footer";

import WeightForm from "../../components/weightform/WeightForm";

import HeroImage from "../../assets/images/placeholder_hero.jpg";

import { ReactComponent as Logo } from "../../assets/icons/logo.svg";

function About() {
  return (
    <div className="about">
      <Z_header
        links={[
          <a href="/about" rel="noopener noreferrer">About</a>,
        ]}
        name={"WeightMaker"}
        logo={<Logo />}
      />
      <main className="main">
        <Z_pagesection>
            <div className="about-content">
                <h1>What is WeightMaker?</h1>
                <p>WeightMaker is a simple calculator tool for lifters, trainers, and gym-goers.</p>
                <p>Enter your goal weight, and WeightMaker will tell you exactly how many and which weight plates you need to load on each side of the bar.</p>
                <p>Quick. Accurate. No more guesswork at the rack.</p>
            </div>
        </Z_pagesection>
      </main>
    </div>
  );
}

export default About;