import React from 'react';
import './index.scss';

const SliderComponent = ({ label, score, leftLabel, rightLabel, fromLeft, color }) => {
    const roundedScore = Math.round(score);  // Rounding the score to the nearest integer
    const thumbPosition = fromLeft ? `${roundedScore}%` : `${100-roundedScore}%`;
    const fillWidth = fromLeft ? `${roundedScore}%` : `${roundedScore}%`;

    return (
        <div className="slider-container">
            <div className="slider-labels">
                <span className="slider-label-left">{leftLabel}</span>
                <span className="slider-label-right">{rightLabel}</span>
            </div>
            <div className="slider">
                <div className="slider-track"></div>
                <div className="slider-fill" style={{ width: fillWidth, left: fromLeft ? '0' : 'auto', right: fromLeft ? 'auto' : '0', backgroundColor: color }}></div>
                <div className="slider-thumb" style={{ left: thumbPosition, borderColor: color }}>
                    <div className="slider-score">
                        <span>{roundedScore}% {label}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SliderComponent;
