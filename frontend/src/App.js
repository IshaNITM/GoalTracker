import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/Header'; // Correct path
import HomePage from './pages/HomePage'; // Correct path
import Dashboard from './pages/Dashboard'; // Correct path

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header is displayed on all pages */}
        <Header />

        {/* Define routes for different pages */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;