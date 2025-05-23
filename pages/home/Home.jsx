import React, { useEffect, useState } from "react";
import "./Home.css";

import Z_header from "../../components/Z_header/Z_header";
import Z_pagesection from "../../components/Z_pagesection/Z_pagesection";
import Z_footer from "../../components/Z_footer/Z_footer";

import WeightForm from "../../components/weightform/WeightForm";

import HeroImage from "../../assets/images/placeholder_hero.jpg";

import { ReactComponent as Logo } from "../../assets/icons/logo.svg";

function Home() {
  return (
    <div className="home">
      <Z_header
        links={[
          <a href="/about" rel="noopener noreferrer">About</a>,
        ]}
        name={"WeightMaker"}
        logo={<Logo />}
      />
      <main className="main">
        <Z_pagesection>
          <div className="form-and-response">
            <WeightForm />
          </div>
        </Z_pagesection>
      </main>
    </div>
  );
}

export default Home;