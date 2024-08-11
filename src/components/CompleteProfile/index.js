import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom'; // Updated from useHistory
import './index.scss';

const CompleteProfile = () => {
  const { user } = useAuth0();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: '',
    gender: '',
  });
  const navigate = useNavigate(); // Updated from useHistory

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form:', formData, user.email);
    // Validate form data
    if (!formData.name || !formData.age || !formData.gender) {
      console.error('Please complete all fields before submitting.');
      return;
    }
  
    // Check if age is a valid number
    if (isNaN(formData.age) || formData.age <= 0) {
      console.error('Please enter a valid age.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3001/api/update-user-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, email: user.email }),
      });
  
      if (response.ok) {
        navigate('/home');
      } else {
        console.error('Failed to update profile:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  

  return (
    <div className="complete-profile-container">
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <button type="submit">Complete Profile</button>
      </form>
    </div>
  );
};

export default CompleteProfile;
