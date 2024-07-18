import React from 'react';
import './index.scss';

const SliderComponent = ({ label, score, leftLabel, rightLabel, fromLeft }) => {
    const roundedScore = Math.round(score);  // Rounding the score to the nearest integer
    const thumbPosition = fromLeft ? `${100 - roundedScore}%` : `${roundedScore}%`;
    const fillWidth = fromLeft ? `${roundedScore}%` : `${roundedScore}%`;

    return (
        <div className="slider-container">
            <div className="slider-labels">
                <span className="slider-label-left">{leftLabel}</span>
                <span className="slider-label-right">{rightLabel}</span>
            </div>
            <div className="slider">
                <div className="slider-track"></div>
                <div className="slider-fill" style={{ width: fillWidth, left: fromLeft ? 'auto' : '0', right: fromLeft ? '0' : 'auto' }}></div>
                <div className="slider-thumb" style={{ left: thumbPosition }}>
                    <div className="slider-score">
                        <span>{roundedScore}% {label}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SliderComponent;
