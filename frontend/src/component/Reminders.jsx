import React, { useEffect, useState } from 'react';
import './Reminders.css';

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const goal = localStorage.getItem('goal');
        const response = await fetch('/api/reminders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ goal }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch reminders');
        }
        const data = await response.json();
        setReminders(data.reminders);
      } catch (error) {
        console.error('Error fetching reminders:', error);
        setError('Failed to fetch reminders. Please try again later.');
      }
    };
    fetchReminders();
  }, []);

  return (
    <div className="reminders">
      <h3>Your Reminders</h3>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {reminders.map((reminder, index) => (
          <li key={index}>{reminder}</li>
        ))}
      </ul>
    </div>
  );
};

export default Reminders;