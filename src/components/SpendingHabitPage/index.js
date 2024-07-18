import React, { useState, useEffect } from "react";
import SliderComponent from "../Slider";
import FrugalImage from "../../assets/images/Frugal.jpg";
import ImpulsiveImage from "../../assets/images/Impulsive.jpg";
import "./index.scss";

const SpendingHabitPage = ({ resultCategories, currentPage, setCurrentPage, detailedDescriptions }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isFrugal = resultCategories.frugalImpulsive > 50;

  useEffect(() => {
    setImageLoaded(false);
  }, [isFrugal]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="spending-result-category">
      <p className="spending-title">Spending</p>
      <div className="spending-content">
        <div className={`spending-image-container ${imageLoaded ? 'loaded' : ''}`}>
          <img
            src={isFrugal ? FrugalImage : ImpulsiveImage}
            alt={isFrugal ? "Frugal personality illustration" : "Impulsive personality illustration"}
            onLoad={handleImageLoad}
          />
        </div>
        <div className="spending-text-container">
          <SliderComponent
            label={isFrugal ? "Frugal" : "Impulsive"}
            score={isFrugal ? resultCategories.frugalImpulsive : 100 - resultCategories.frugalImpulsive}
            leftLabel="Frugal"
            rightLabel="Impulsive"
            fromLeft={isFrugal}
            color={"#ffa41c"}
          />
          <p className="description">{isFrugal ? detailedDescriptions.frugalImpulsive.Frugal : detailedDescriptions.frugalImpulsive.Impulsive}</p>
        </div>
      </div>
      <div className="spending-pagination-container">
        <button className="spending-pagination-button" onClick={() => setCurrentPage(currentPage - 1)}>Go Back</button>
        <div className="spending-page-indicators">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className={`spending-page-indicator ${index === currentPage ? 'active' : ''}`} />
          ))}
        </div>
        <button className="spending-pagination-button" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default SpendingHabitPage;
