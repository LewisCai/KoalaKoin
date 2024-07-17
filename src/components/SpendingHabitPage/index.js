import React from "react";
import SliderComponent from "../Slider";
import FrugalImage from "../../assets/images/Frugal.jpg";
import ImpulsiveImage from "../../assets/images/Impulsive.jpg";
import "./index.scss";

const SpendingHabitPage = ({ resultCategories, setCurrentPage, detailedDescriptions }) => {
  const isFrugal = resultCategories.frugalImpulsive > 50;

  return (
    <div className="spending-result-category">
      <p className="spending-title">Spending</p>
      <div className="spending-content">
        <div className="spending-image-container">
          <img
            src={isFrugal ? FrugalImage : ImpulsiveImage}
            alt={isFrugal ? "Frugal personality illustration" : "Impulsive personality illustration"}
          />
        </div>
        <div className="spending-text-container">
          <SliderComponent
            label={isFrugal ? "Frugal" : "Impulsive"}
            score={resultCategories.frugalImpulsive}
            leftLabel="Frugal"
            rightLabel="Impulsive"
          />
          <p className="description">{isFrugal ? detailedDescriptions.frugalImpulsive.Frugal : detailedDescriptions.frugalImpulsive.Impulsive}</p>
          <button className="resultButton" onClick={() => setCurrentPage(2)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default SpendingHabitPage;
