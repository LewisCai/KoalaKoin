import React from 'react';
import './index.scss';

const SliderComponent = ({ label, score, leftLabel, rightLabel }) => {
    const roundedScore = Math.round(score);  // Rounding the score to the nearest integer

  return (
    <div className="slider-container">
      <div className="slider-labels">
        <span className="slider-label-left">{leftLabel}</span>
        <span className="slider-label-right">{rightLabel}</span>
      </div>
      <div className="slider">
        <div className="slider-track"></div>
        <div className="slider-thumb" style={{ left: `${100-roundedScore}%` }}></div>
      </div>
      <div className="slider-score">
        <span>{roundedScore}% {label}</span>
      </div>
    </div>
  );
};

export default SliderComponent;
