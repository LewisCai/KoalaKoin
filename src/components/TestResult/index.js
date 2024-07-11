import React from "react";
import { useLocation } from "react-router-dom";
import "./index.scss";

const TestResult = () => {
  const location = useLocation();
  const { score } = location.state || { score: 0 }; // Default score to 0 if not provided

  return (
    <div className="test-result">
      <h1>Test Result</h1>
      <p>Here is your test result</p>
      <p>Your score is: {score.toFixed(2)}%</p>
    </div>
  );
};

export default TestResult;