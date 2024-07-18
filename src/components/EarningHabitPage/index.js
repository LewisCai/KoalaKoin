import React, { useState, useEffect } from "react";
import SliderComponent from "../Slider";
import TraditionalImage from "../../assets/images/Traditional.jpg";
import EntrepreneurialImage from "../../assets/images/Entrepreneurial.jpg";
import "./index.scss";

const EarningHabitPage = ({ resultCategories, currentPage, setCurrentPage, detailedDescriptions }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isTraditional = resultCategories.traditionalEntrepreneurial > 50;

  useEffect(() => {
    setImageLoaded(false);
  }, [isTraditional]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="earning-result-category">
      <p className="earning-title">Earning</p>
      <div className="earning-content">
        <div className={`earning-image-container ${imageLoaded ? 'loaded' : ''}`}>
          <img
            src={isTraditional ? TraditionalImage : EntrepreneurialImage}
            alt={isTraditional ? "Traditional personality illustration" : "Entrepreneurial personality illustration"}
            onLoad={handleImageLoad}
          />
        </div>
        <div className="earning-text-container">
          <SliderComponent
            label={isTraditional ? "Traditional" : "Entrepreneurial"}
            score={isTraditional ? resultCategories.traditionalEntrepreneurial : 100 - resultCategories.traditionalEntrepreneurial}
            leftLabel="Traditional"
            rightLabel="Entrepreneurial"
            fromLeft={isTraditional}
            color={"#c937d6"}
          />
          <p className="description">{isTraditional ? detailedDescriptions.traditionalEntrepreneurial.Traditional : detailedDescriptions.traditionalEntrepreneurial.Entrepreneurial}</p>
        </div>
      </div>
      <div className="earning-pagination-container">
        <button className="earning-pagination-button" onClick={() => setCurrentPage(currentPage - 1)}>Go Back</button>
        <div className="earning-page-indicators">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className={`earning-page-indicator ${index === currentPage ? 'active' : ''}`} />
          ))}
        </div>
        <button className="earning-pagination-button" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default EarningHabitPage;
