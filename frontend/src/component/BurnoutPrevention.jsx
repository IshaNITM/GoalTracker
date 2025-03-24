import React, { useEffect, useState } from 'react';
// import './BurnoutPrevention.css';

const BurnoutPrevention = () => {
  const [prompts, setPrompts] = useState([]);

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
      }
    };
    fetchPrompts();
  }, []);

  return (
    <div className="burnout-prevention">
      <h3>Burnout Prevention</h3>
      <ul>
        {prompts.map((prompt, index) => (
          <li key={index}>{prompt}</li>
        ))}
      </ul>
    </div>
  );
};

export default BurnoutPrevention;