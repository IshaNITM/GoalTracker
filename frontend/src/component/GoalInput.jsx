import React from 'react';
import './GoalInput.css';

const GoalInput = ({ goal, setGoal, onSubmit }) => {
  return (
    <div className="goal-input-container">
      <input
        type="text"
        placeholder="Enter your goal (e.g., Frontend Developer in 1 Year)"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        className="goal-input"
      />
      <button type="submit" className="submit-button" onClick={onSubmit}>
        Start My Journey
      </button>
    </div>
  );
};

export default GoalInput;