import React, { createContext, useState, useContext } from 'react';

const TestResultContext = createContext();

export const useTestResult = () => {
  return useContext(TestResultContext);
};

export const TestResultProvider = ({ children }) => {
  const [testResult, setTestResult] = useState(null);

  return (
    <TestResultContext.Provider value={{ testResult, setTestResult }}>
      {children}
    </TestResultContext.Provider>
  );
};
