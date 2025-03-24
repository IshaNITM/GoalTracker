import React from 'react';
import Header from '../component/Header';
import Milestones from '../component/Milestones';
import Reminders from '../component/Reminders';
import Accomplishments from '../component/Accomplishments';
import BurnoutPrevention from '../component/BurnoutPrevention';
// import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Header />
      <Milestones />
      <Reminders />
      <Accomplishments />
      <BurnoutPrevention />
    </div>
  );
};

export default Dashboard;