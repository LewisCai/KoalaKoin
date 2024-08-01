import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './index.scss';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [testResultData, setTestResultData] = useState(null);

  useEffect(() => {
    const fetchTestResult = async () => {
      if (!user || !user.email) {
        console.error('User or email is undefined.');
        return;
      }
      
      console.log('Fetching test result for:', user.email);
      try {
        const response = await fetch(`/api/get-test-result?email=${user.email}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Received data:', data);
          setTestResultData(data);
        } else {
          console.error('Failed to fetch test result:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching test result:', error);
      }
    };

    if (isAuthenticated) {
      fetchTestResult();
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return <div className="loading-container">Loading...</div>;
  }

  console.log('Is authenticated:', isAuthenticated);
  console.log('User:', user);
  console.log('Test Result Data:', testResultData);

  return (
    isAuthenticated && (
      <div className="profile-container">
        <div className="profile-header">
          <img src={user.picture} alt={user.name} className="profile-picture" />
          <div className="profile-details">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>
        {testResultData ? (
          <div className="test-result-container">
            <h3>Your Test Result</h3>
            <div className="test-result-summary">
              <p><strong>Personality Type:</strong> {testResultData.resultCategories.personalityName}</p>
              <p>{testResultData.resultCategories.personalityDescription}</p>
            </div>
            <div className="test-result-details">
              <h4>Detailed Results:</h4>
              <ul>
                <li><strong>Spending Type:</strong> {testResultData.resultCategories.spendingType} ({testResultData.resultCategories.frugalImpulsive.toFixed(2)}%)</li>
                <li><strong>Investing Type:</strong> {testResultData.resultCategories.investingType} ({testResultData.resultCategories.conservativeAggressive.toFixed(2)}%)</li>
                <li><strong>Earning Type:</strong> {testResultData.resultCategories.earningType} ({testResultData.resultCategories.traditionalEntrepreneurial.toFixed(2)}%)</li>
                <li><strong>Saving Type:</strong> {testResultData.resultCategories.savingType} ({testResultData.resultCategories.saverAdHoc.toFixed(2)}%)</li>
              </ul>
            </div>
          </div>
        ) : (
          <p>No test result available. Please take the test to see your results.</p>
        )}
      </div>
    )
  );
};

export default Profile;
