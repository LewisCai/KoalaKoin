import React from "react";
import personalityImage1 from "../../assets/images/personality1.png";
import "./index.scss";

const PersonalityPage = ({ personality, currentPage, setCurrentPage }) => {
  return (
    <div className="personality-result-category">
      <p className="personality-title">Your personality type is:</p>
      <div className="personality-image-container">
        <img src={personalityImage1} alt="Personality type illustration" />
      </div>
      <div className="personality-text-container">
        <p className="title">{personality.key}</p>
        <p className="description">{personality.name}</p>
        <div className="result-section">
          <p className="description">{personality.description}</p>
        </div>
      </div>
      <div className="pagination-container">
        <button className="pagination-button" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>Go Back</button>
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

export default PersonalityPage;
