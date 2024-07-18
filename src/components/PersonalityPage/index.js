import React from "react";
import FAEAImage from "../../assets/personalities/FAEA.jpg";
import FAESImage from "../../assets/personalities/FAES.jpg";
import FATAImage from "../../assets/personalities/FATA.jpg";
import FATSImage from "../../assets/personalities/FATS.jpg";
import FCEAImage from "../../assets/personalities/FCEA.jpg";
import FCESImage from "../../assets/personalities/FCES.jpg";
import FCTSImage from "../../assets/personalities/FCTS.jpg";
import FCTAImage from "../../assets/personalities/FCTA.jpg";
import IAEAImage from "../../assets/personalities/IAEA.jpg";
import IAESImage from "../../assets/personalities/IAES.jpg";
import IATAImage from "../../assets/personalities/IATA.jpg";
import IATSImage from "../../assets/personalities/IATS.jpg";
import ICEAImage from "../../assets/personalities/ICEA.jpg";
import ICESImage from "../../assets/personalities/ICES.jpg";
import ICTAImage from "../../assets/personalities/ICTA.jpg";
import ICTSImage from "../../assets/personalities/ICTS.jpg";
import "./index.scss";

// Map personality keys to images
const personalityImages = {
  FAEA: FAEAImage,
  FAES: FAESImage,
  FATA: FATAImage,
  FATS: FATSImage,
  FCEA: FCEAImage,
  FCES: FCESImage,
  FCTS: FCTSImage,
  FCTA: FCTAImage,
  IAEA: IAEAImage,
  IAES: IAESImage,
  IATA: IATAImage,
  IATS: IATSImage,
  ICEA: ICEAImage,
  ICES: ICESImage,
  ICTA: ICTAImage,
  ICTS: ICTSImage,
};

const PersonalityPage = ({ personality, currentPage, setCurrentPage }) => {
  // Determine the image source based on the personality key
  const personalityImage = personalityImages[personality.key] || personalityImages['default'];

  return (
    <div className="personality-result-category">
      <p className="personality-title">Your personality type is:</p>
      <div className="personality-image-container">
        <img src={personalityImage} alt="Personality type illustration" />
      </div>
      <div className="personality-text-container">
        <p className="title">{personality.key}</p>
        <p className="personality-description">{personality.name}</p>
        <div className="result-section">
          <p className="personality-description">{personality.description}</p>
        </div>
      </div>
      <div className="personality-pagination-container">
        <button className="personality-pagination-button" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>Go Back</button>
        <div className="personality-page-indicators">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className={`personality-page-indicator ${index === currentPage ? 'active' : ''}`} />
          ))}
        </div>
        <button className="personality-pagination-button" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default PersonalityPage;
