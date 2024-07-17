import React from "react";
import SliderComponent from "../Slider";
import SaverImage from "../../assets/images/Saver.jpg";
import AdHocImage from "../../assets/images/AdHoc.jpg";
import "./index.scss";

const SavingHabitPage = ({ resultCategories, setCurrentPage, detailedDescriptions }) => {
  const isSaver = resultCategories.saverAdHoc > 50;

  return (
    <div className="saving-result-category">
      <p className="saving-title">Saving</p>
      <div className="saving-content">
        <div className="saving-image-container">
          <img
            src={isSaver ? SaverImage : AdHocImage}
            alt={isSaver ? "Saver personality illustration" : "Ad-hoc personality illustration"}
          />
        </div>
        <div className="saving-text-container">
          <SliderComponent
            label={isSaver ? "Saver" : "Ad-hoc"}
            score={resultCategories.saverAdHoc}
            leftLabel="Saver"
            rightLabel="Ad-hoc"
          />
          <p className="description">{isSaver ? detailedDescriptions.saverAdHoc.Saver : detailedDescriptions.saverAdHoc.AdHoc}</p>
          <button className="resultButton" onClick={() => setCurrentPage(0)}>Back to Summary</button>
        </div>
      </div>
    </div>
  );
};

export default SavingHabitPage;
