import React, { useEffect, useState } from 'react';
import './Accomplishments.css';

const Accomplishments = () => {
  const [accomplishments, setAccomplishments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAccomplishments = async () => {
      try {
        const goal = localStorage.getItem('goal');
        const response = await fetch('/api/accomplishments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ goal }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch accomplishments');
        }
        const data = await response.json();
        setAccomplishments(data.accomplishments);
      } catch (error) {
        console.error('Error fetching accomplishments:', error);
        setError('Failed to fetch accomplishments. Please try again later.');
      }
    };
    fetchAccomplishments();
  }, []);

  return (
    <div className="accomplishments">
      <h3>Your Accomplishments</h3>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {accomplishments.map((accomplishment, index) => (
          <li key={index}>{accomplishment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Accomplishments;