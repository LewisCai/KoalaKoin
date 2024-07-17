import React from "react";
import SliderComponent from "../Slider";
import ConservativeImage from "../../assets/images/Conservative.jpg";
import AggressiveImage from "../../assets/images/Aggressive.jpg";
import "./index.scss";

const InvestingHabitPage = ({ resultCategories, currentPage, setCurrentPage, detailedDescriptions }) => {
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
            score={isConservative ? resultCategories.conservativeAggressive : 100 - resultCategories.conservativeAggressive}
            leftLabel="Conservative"
            rightLabel="Aggressive"
            fromLeft={isConservative}
          />
          <p className="description">{isConservative ? detailedDescriptions.conservativeAggressive.Conservative : detailedDescriptions.conservativeAggressive.Aggressive}</p>
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

export default InvestingHabitPage;
