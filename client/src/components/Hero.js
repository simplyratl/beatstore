import React from "react";
import "../style/dist/hero.min.css";

const Hero = () => {
    return (
        <div className="hero-container">
            <div className="hero-inner">
                <div className="text"></div>
            </div>

            <div className="hero-image-wrapper">
                <img src={require("../assets/images/hero.jpg")} alt="" className="big" />
                <img src={require("../assets/images/hero_small.jpg")} alt="" className="small" />
            </div>
        </div>
    );
};

export default Hero;
