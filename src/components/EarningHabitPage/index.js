import React from "react";
import SliderComponent from "../Slider";
import TraditionalImage from "../../assets/images/Traditional.jpg";
import EntrepreneurialImage from "../../assets/images/Entrepreneurial.jpg";
import "./index.scss";

const EarningHabitPage = ({ resultCategories, setCurrentPage, detailedDescriptions }) => {
  const isTraditional = resultCategories.traditionalEntrepreneurial > 50;

  return (
    <div className="earning-result-category">
      <p className="earning-title">Earning</p>
      <div className="earning-content">
        <div className="earning-image-container">
          <img
            src={isTraditional ? TraditionalImage : EntrepreneurialImage}
            alt={isTraditional ? "Traditional personality illustration" : "Entrepreneurial personality illustration"}
          />
        </div>
        <div className="earning-text-container">
          <SliderComponent
            label={isTraditional ? "Traditional" : "Entrepreneurial"}
            score={resultCategories.traditionalEntrepreneurial}
            leftLabel="Traditional"
            rightLabel="Entrepreneurial"
          />
          <p className="description">{isTraditional ? detailedDescriptions.traditionalEntrepreneurial.Traditional : detailedDescriptions.traditionalEntrepreneurial.Entrepreneurial}</p>
        </div>
      </div>
      <button className="earning-button" onClick={() => setCurrentPage(4)}>Next</button>
    </div>
  );
};

export default EarningHabitPage;
