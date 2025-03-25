import React, { useEffect, useState } from 'react';
import './BurnoutPrevention.css';

const BurnoutPrevention = () => {
  const [prompts, setPrompts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const goal = localStorage.getItem('goal');
        const response = await fetch('/api/burnout-prompts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ goal }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch burnout prompts');
        }
        const data = await response.json();
        setPrompts(data.prompts);
      } catch (error) {
        console.error('Error fetching burnout prompts:', error);
        setError('Failed to fetch burnout prompts. Please try again later.');
      }
    };
    fetchPrompts();
  }, []);

  return (
    <div className="burnout-prevention">
      <h3>Burnout Prevention</h3>
      {error && <p className="error-message">{error}</p>}
      <ul className="prompts-list">
        {prompts.map((prompt, index) => (
          <li key={index} className="prompt-item">{prompt}</li>
        ))}
      </ul>
    </div>
  );
};

export default BurnoutPrevention;