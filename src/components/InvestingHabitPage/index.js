import React, { useState, useEffect } from "react";
import SliderComponent from "../Slider";
import ConservativeImage from "../../assets/images/Conservative.jpg";
import AggressiveImage from "../../assets/images/Aggressive.jpg";
import "./index.scss";

const InvestingHabitPage = ({ resultCategories, currentPage, setCurrentPage, detailedDescriptions }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isConservative = resultCategories.conservativeAggressive > 50;

  useEffect(() => {
    setImageLoaded(false);
  }, [isConservative]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="investing-result-category">
      <p className="investing-title">Investing</p>
      <div className="investing-content">
        <div className={`investing-image-container ${imageLoaded ? 'loaded' : ''}`}>
          <img
            src={isConservative ? ConservativeImage : AggressiveImage}
            alt={isConservative ? "Conservative personality illustration" : "Aggressive personality illustration"}
            onLoad={handleImageLoad}
          />
        </div>
        <div className="investing-text-container">
          <SliderComponent
            label={isConservative ? "Conservative" : "Aggressive"}
            score={isConservative ? resultCategories.conservativeAggressive : 100 - resultCategories.conservativeAggressive}
            leftLabel="Conservative"
            rightLabel="Aggressive"
            fromLeft={isConservative}
            color={"#3dd151"}
          />
          <p className="description">{isConservative ? detailedDescriptions.conservativeAggressive.Conservative : detailedDescriptions.conservativeAggressive.Aggressive}</p>
        </div>
      </div>
      <div className="investing-pagination-container">
        <button className="investing-pagination-button" onClick={() => setCurrentPage(currentPage - 1)}>Go Back</button>
        <div className="investing-page-indicators">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className={`investing-page-indicator ${index === currentPage ? 'active' : ''}`} />
          ))}
        </div>
        <button className="investing-pagination-button" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default InvestingHabitPage;
