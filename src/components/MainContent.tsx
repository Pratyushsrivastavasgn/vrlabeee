import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ExperimentsPage from '../pages/ExperimentsPage';
import TheoryPage from '../pages/TheoryPage';
import AboutPage from '../pages/AboutPage';
import Experiment1 from '../experiments/Experiment1';
import { experiments } from '../data/experiments';

const MainContent = () => {
  return (
    <main className="flex-grow">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/experiments" element={<ExperimentsPage />} />
        <Route path="/theory" element={<TheoryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/experiments/load-flow-analysis" element={<Experiment1 />} />
        {/* Add routes for other experiments as they are implemented */}
      </Routes>
    </main>
  );
};

export default MainContent;