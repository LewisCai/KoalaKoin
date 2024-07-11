import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTestResult } from '../../TestResultContext'; // Correct relative path
import personalityImage1 from "../../assets/images/personality1.png";
import "./index.scss";

const TestResult = () => {
  const location = useLocation();
  const { score } = location.state || { score: 0 }; // Default score to 0 if not provided
  const { setTestResult } = useTestResult();

  useEffect(() => {
    setTestResult(score);
  }, [score, setTestResult]);

  return (
    <div className="testresult-page">
      <div className="test-result">
        <h1>Your score is:</h1>
        <h2 className="test-score">{Math.round(score)}%</h2> {/* Display score as whole number */}
        <h1>Your personality type is:</h1>
        <h2 className="type">Sheep</h2>
        <div className="image-container">
          <img src={personalityImage1} alt="Personality type illustration" />
        </div>
        <div className="result-section">
          <h3>Description</h3>
          <p>This trait determines how we interact with our environment.</p>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
