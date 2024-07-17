import React from "react";
import SliderComponent from "../Slider";
import ConservativeImage from "../../assets/images/Conservative.jpg";
import AggressiveImage from "../../assets/images/Aggressive.jpg";
import "./index.scss";

const InvestingHabitPage = ({ resultCategories, setCurrentPage, detailedDescriptions }) => {
  const isConservative = resultCategories.conservativeAggressive > 50;

  return (
    <div className="investing-result-category">
      <p className="investing-title">Investing</p>
      <div className="investing-content">
        <div className="investing-image-container">
          <img
            src={isConservative ? ConservativeImage : AggressiveImage}
            alt={isConservative ? "Conservative personality illustration" : "Aggressive personality illustration"}
          />
        </div>
        <div className="investing-text-container">
          <SliderComponent
            label={isConservative ? "Conservative" : "Aggressive"}
            score={isConservative ? resultCategories.conservativeAggressive: 100-resultCategories.conservativeAggressive}
            leftLabel="Conservative"
            rightLabel="Aggressive"
          />
          <p className="description">{isConservative ? detailedDescriptions.conservativeAggressive.Conservative : detailedDescriptions.conservativeAggressive.Aggressive}</p>
          <button className="resultButton" onClick={() => setCurrentPage(3)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default InvestingHabitPage;
