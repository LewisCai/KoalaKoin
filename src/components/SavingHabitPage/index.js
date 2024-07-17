import React from "react";
import SliderComponent from "../Slider";
import SaverImage from "../../assets/images/Saver.jpg";
import AdHocImage from "../../assets/images/AdHoc.jpg";
import "./index.scss";

const SavingHabitPage = ({ resultCategories, currentPage, setCurrentPage, detailedDescriptions }) => {
  const isSaver = resultCategories.saverAdHoc > 50;

  return (
    <div className="saving-result-category">
      <p className="saving-title">Saving</p>
      <div className="saving-content">
        <div className="saving-image-container">
          <img
            src={isSaver ? SaverImage : AdHocImage}
            alt={isSaver ? "Saver personality illustration" : "Ad-Hoc personality illustration"}
          />
        </div>
        <div className="saving-text-container">
          <SliderComponent
            label={isSaver ? "Saver" : "Ad-Hoc"}
            score={isSaver ? resultCategories.saverAdHoc : 100 - resultCategories.saverAdHoc}
            leftLabel="Ad-Hoc"
            rightLabel="Saver"
          />
          <p className="description">{isSaver ? detailedDescriptions.saverAdHoc.Saver : detailedDescriptions.saverAdHoc.AdHoc}</p>
        </div>
      </div>
      <div className="pagination-container">
        <button className="pagination-button" onClick={() => setCurrentPage(currentPage - 1)}>Go Back</button>
        <div className="page-indicators">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className={`page-indicator ${index === currentPage ? 'active' : ''}`} />
          ))}
        </div>
        <button className="pagination-button" onClick={() => setCurrentPage(0)}>Finish</button>
      </div>
    </div>
  );
};

export default SavingHabitPage;
