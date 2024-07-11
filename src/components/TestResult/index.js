import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTestResult } from '../../TestResultContext'; // Correct relative path
import "./index.scss";

const TestResult = () => {
  const location = useLocation();
  const { score } = location.state || { score: 0 }; // Default score to 0 if not provided
  const { setTestResult } = useTestResult();

  useEffect(() => {
    setTestResult(score);
  }, [score, setTestResult]);

  return (
    <div className="test-result">
      <h1>Your personality type is:</h1>
      <h2 className="type">Advocate</h2>
      <div className="image-container">
        <img src="/path-to-your-image.png" alt="Personality type illustration" />
      </div>
      <div className="result-section">
        <h3>Mind</h3>
        <p>This trait determines how we interact with our environment.</p>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: '56%' }}></div>
        </div>
      </div>
        <div className="trait-scores">
          <span>56% INTUITIVE</span>
        </div>
      </div>
  );
};

export default TestResult;
