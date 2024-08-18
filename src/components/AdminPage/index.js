import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './index.scss';

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminPage = () => {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const [allUsersData, setAllUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // eslint-disable-next-line
  const adminEmails = ['lewisc@koalakoin.org', 'harrybui912@gmail.com', 'xanderalex521@gmail.com'];

  useEffect(() => {
    if (isAuthenticated && adminEmails.includes(user.email)) {
      fetch('http://localhost:3001/api/get-all-users')
        .then(response => response.json())
        .then(data => {
          setAllUsersData(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [isAuthenticated, user, adminEmails]);

  if (!isAuthenticated) {
    return (
      <div className="admin-page">
        <h2>You need to log in to view this page</h2>
        <button onClick={() => loginWithRedirect()}>Log In</button>
      </div>
    );
  }

  if (isAuthenticated && !adminEmails.includes(user.email)) {
    return (
      <div className="admin-page">
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
        <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const totalUsers = allUsersData.length;
  const personalityCount = {};
  const answerDistribution = [];
  const resultCategoryDistribution = {
    saverAdHoc: { Saver: 0, "Ad-hoc": 0 },
    frugalImpulsive: { Frugal: 0, Impulsive: 0 },
    conservativeAggressive: { Conservative: 0, Aggressive: 0 },
    traditionalEntrepreneurial: { Traditional: 0, Entrepreneurial: 0 },
  };
  let usersWithResults = 0;

  const questions = [
    { 0: 4 }, { 1: 4 }, { 2: 4 }, { 3: 4 }, { 4: 4 }, { 5: 3 }, { 6: 4 }, { 7: 4 }, { 8: 4 }, { 9: 4 }, 
    { 10: 4 }, { 11: 4 }, { 12: 4 }, { 13: 4 }, { 14: 4 }, { 15: 4 }, { 16: 4 }, { 17: 4 }, { 18: 4 }, { 19: 4 }, 
    { 20: 4 }, { 21: 3 }, { 22: 4 }, { 23: 3 }, { 24: 2 }, { 25: 4 }, { 26: 3 }, { 27: 4 }, { 28: 4 }, { 29: 4 }, 
    { 30: 4 }, { 31: 4 }, { 32: 4 }, { 33: 4 }, { 34: 4 }, { 35: 3 }, { 36: 2 }, { 37: 3 }
  ];

  // Initialize answer distribution arrays
  questions.forEach((question, index) => {
    const numberOfOptions = Object.values(question)[0]; // Get the number of options for each question
    answerDistribution[index] = Array(numberOfOptions).fill(0);
  });

  allUsersData.forEach(user => {
    if (user.personalityName) {
      personalityCount[user.personalityName] = (personalityCount[user.personalityName] || 0) + 1;
    }

    if (user.savingType) {
      resultCategoryDistribution.saverAdHoc[user.savingType] += 1;
    }

    if (user.spendingType) {
      resultCategoryDistribution.frugalImpulsive[user.spendingType] += 1;
    }

    if (user.investingType) {
      resultCategoryDistribution.conservativeAggressive[user.investingType] += 1;
    }

    if (user.earningType) {
      resultCategoryDistribution.traditionalEntrepreneurial[user.earningType] += 1;
    }

    if (user.answers) {
      user.answers.forEach((answer, index) => {
        if (answer >= 0 && answer <= answerDistribution[index].length) {
          // Adjusted index to map answer 1 to array index 0
          answerDistribution[index][answer] += 1;
        }
      });
    }

    usersWithResults += 1;
  });

  // Convert counts to percentages for answer distribution
  const answerPercentageDistribution = answerDistribution.map(answerCounts => {
    const totalAnswers = answerCounts.reduce((acc, count) => acc + count, 0);
    return answerCounts.map(count => ((count / totalAnswers) * 100).toFixed(2));
  });

  const personalityChartData = {
    labels: Object.keys(personalityCount),
    datasets: [
      {
        label: 'Number of Users',
        data: Object.values(personalityCount),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const createPieChartData = (category) => ({
    labels: Object.keys(resultCategoryDistribution[category]),
    datasets: [
      {
        data: Object.values(resultCategoryDistribution[category]),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  });

  const answerChartData = index => ({
    labels: answerDistribution[index].map((_, i) => `Answer ${i + 1}`), // Labels as "Answer 1", "Answer 2", etc.
    datasets: [
      {
        label: `Question ${index + 1}`,
        data: answerDistribution[index], // Use raw counts for the Y-axis
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
    options: {
      scales: {
        y: {
          beginAtZero: true,
          min: 0,  // Start at 0
          max: totalUsers,  // Force the maximum to totalUsers
          ticks: {
            stepSize: Math.ceil(totalUsers / 10),  // Dynamic step size for better readability
            callback: function(value) {
              return `${value}`;  // Display tick values as they are (no extra formatting)
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const percentage = answerPercentageDistribution[index][context.dataIndex];
              return `${context.raw} users (${percentage}%)`; // Show both raw count and percentage
            }
          }
        }
      }
    }
  });

  return (
    <div className="admin-page">
      <h2>Welcome, Admin</h2>
      <p>Total Users: {totalUsers}</p>

      <div className="chart-section">
        <h3>Personality Distribution</h3>
        <Pie data={personalityChartData} />
        <p>Total Personality Types Analyzed: {usersWithResults}</p>
      </div>

      <div className="chart-section">
        <h3>Result Category Distribution (Percentage)</h3>
        {Object.keys(resultCategoryDistribution).map(category => (
          <div key={category} className="result-category-chart">
            <h4>{category}</h4>
            <Pie data={createPieChartData(category)} />
          </div>
        ))}
      </div>

      <div className="chart-section">
        <h3>Answer Distribution by Question (Percentage)</h3>
        {answerPercentageDistribution.map((_, index) => (
          <div key={index} className="answer-chart">
            <Bar data={answerChartData(index)} />
          </div>
        ))}
      </div>

      <button className="logout-btn" onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </button>
    </div>
  );
};

export default AdminPage;
