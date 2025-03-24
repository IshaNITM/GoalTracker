import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [goal, setGoal] = useState('');
  const [milestones, setMilestones] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
  
    // Parse role and duration from the goal string
    const [role, duration] = goal.split(' in ').map(s => s.trim());
  
    if (!role || !duration) {
      setError('Please enter a valid goal (e.g., Frontend Developer in 1 Year).');
      return;
    }
  
    try {
      // Save the goal to localStorage
      localStorage.setItem('goal', goal);
  
      // Send goal to backend
      const response = await axios.post('/api/milestones', { goal: `${role} in ${duration}` });
      setMilestones(response.data.milestones);
      navigate('/dashboard'); // Navigate to the Dashboard after submitting the goal
    } catch (error) {
      console.error('Error submitting goal:', error);
      setError('Failed to generate milestones. Please try again.');
    }
  };

  return (
    <div className="homepage">
      <h1>Welcome to Start-Upathon</h1>
      <p>Your journey to success starts here.</p>
      <form onSubmit={handleSubmit} className="goal-form">
        <input
          type="text"
          placeholder="Enter your goal (e.g., Frontend Developer in 1 Year)"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="goal-input"
        />
        <button type="submit" className="submit-button">
          Start My Journey
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {milestones.length > 0 && (
        <div className="milestones">
          <h3>Your Milestones</h3>
          <ul>
            {milestones.map((milestone, index) => (
              <li key={index}>{milestone}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomePage;