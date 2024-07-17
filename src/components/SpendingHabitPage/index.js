import React from "react";
import SliderComponent from "../Slider";
import FrugalImage from "../../assets/images/Frugal.jpg";
import ImpulsiveImage from "../../assets/images/Impulsive.jpg";
import "./index.scss";

const SpendingHabitPage = ({ resultCategories, currentPage, setCurrentPage, detailedDescriptions }) => {
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
            score={isFrugal ? resultCategories.frugalImpulsive : 100 - resultCategories.frugalImpulsive}
            leftLabel="Frugal"
            rightLabel="Impulsive"
          />
          <p className="description">{isFrugal ? detailedDescriptions.frugalImpulsive.Frugal : detailedDescriptions.frugalImpulsive.Impulsive}</p>
        </div>
      </div>
      <div className="pagination-container">
        <button className="pagination-button" onClick={() => setCurrentPage(currentPage - 1)}>Go Back</button>
        <div className="page-indicators">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className={`page-indicator ${index === currentPage ? 'active' : ''}`} />
          ))}
        </div>
        <button className="pagination-button" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default SpendingHabitPage;
