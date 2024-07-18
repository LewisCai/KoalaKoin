import React, { useState, useEffect } from "react";
import SliderComponent from "../Slider";
import SaverImage from "../../assets/images/Saver.jpg";
import AdHocImage from "../../assets/images/AdHoc.jpg";
import "./index.scss";

const SavingHabitPage = ({ resultCategories, currentPage, setCurrentPage, detailedDescriptions }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isSaver = resultCategories.saverAdHoc > 50;

  useEffect(() => {
    setImageLoaded(false);
  }, [isSaver]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="saving-result-category">
      <p className="saving-title">Saving</p>
      <div className="saving-content">
        <div className={`saving-image-container ${imageLoaded ? 'loaded' : ''}`}>
          <img
            src={isSaver ? SaverImage : AdHocImage}
            alt={isSaver ? "Saver personality illustration" : "Ad-Hoc personality illustration"}
            onLoad={handleImageLoad}
          />
        </div>
        <div className="saving-text-container">
          <SliderComponent
            label={isSaver ? "Saver" : "Ad-Hoc"}
            score={isSaver ? resultCategories.saverAdHoc : 100 - resultCategories.saverAdHoc}
            leftLabel="Saver"
            rightLabel="Ad-Hoc"
            fromLeft={isSaver}
            color={"#eb3131"}
          />
          <p className="description">{isSaver ? detailedDescriptions.saverAdHoc.Saver : detailedDescriptions.saverAdHoc.AdHoc}</p>
        </div>
      </div>
      <div className="saving-pagination-container">
        <button className="saving-pagination-button" onClick={() => setCurrentPage(currentPage - 1)}>Go Back</button>
        <div className="saving-page-indicators">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className={`saving-page-indicator ${index === currentPage ? 'active' : ''}`} />
          ))}
        </div>
        <button className="saving-pagination-button" onClick={() => setCurrentPage(0)}>Finish</button>
      </div>
    </div>
  );
};

export default SavingHabitPage;
