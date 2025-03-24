import React, { useEffect, useState } from 'react';
import './Milestones.css';

const Milestones = () => {
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const goal = localStorage.getItem('goal'); // Retrieve the goal from localStorage
        const response = await fetch('/api/milestones', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ goal }), // Send the goal to the backend
        });
        if (!response.ok) {
          throw new Error('Failed to fetch milestones');
        }
        const data = await response.json();
        setMilestones(data.milestones); // Extract the milestones array
      } catch (error) {
        console.error('Error fetching milestones:', error);
      }
    };
    fetchMilestones();
  }, []);

  return (
    <div className="milestones">
      <h3>Your Milestones</h3>
      <ul>
        {milestones.map((milestone, index) => (
          <li key={index}>{milestone}</li>
        ))}
      </ul>
    </div>
  );
};

export default Milestones;