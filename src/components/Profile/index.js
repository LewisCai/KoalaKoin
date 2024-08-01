import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useTestResult } from '../../TestResultContext'; // Ensure the correct path is used
import './index.scss';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { testResult } = useTestResult();

  if (isLoading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    isAuthenticated && (
      <div className="profile-container">
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        {testResult !== null && (
          <div className="test-result">
            <h3>Your Test Result</h3>
            <p>Your score is: {testResult.toFixed(2)}%</p>
          </div>
        )}
      </div>
    )
  );
};

export default Profile;
