import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import './index.scss'; // Updated import for the unique SCSS file

const CompleteProfile = () => {
  const { user } = useAuth0();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: '',
    gender: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form:', formData, user.email);

    if (!formData.name || !formData.age || !formData.gender) {
      console.error('Please complete all fields before submitting.');
      return;
    }

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
        navigate('/');
      } else {
        console.error('Failed to update profile:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="complete-profile-container">
      <div className="complete-profile-unique-container">
        <h2>Complete Your Profile</h2>
        <form onSubmit={handleSubmit} className="complete-profile-unique-form">
          <label className="complete-profile-unique-label">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="complete-profile-unique-input"
              required
            />
          </label>
          <label className="complete-profile-unique-label">
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="complete-profile-unique-input"
              required
            />
          </label>
          <label className="complete-profile-unique-label">
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="complete-profile-unique-select"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <button type="submit" className="complete-profile-unique-submit-button">
            Complete Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;