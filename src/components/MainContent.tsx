import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ExperimentsPage from '../pages/ExperimentsPage';
import AboutPage from '../pages/AboutPage';
import Experiment1 from '../experiments/Experiment1';
import Experiment2 from '../experiments/Experiment2';
import Experiment3 from '../experiments/Experiment3';
import Experiment4 from '../experiments/Experiment4';
import Experiment5 from '../experiments/Experiment5';
import Experiment6 from '../experiments/Experiment6';
import Experiment7 from '../experiments/Experiment7';
import Experiment8 from '../experiments/Experiment8';
import Experiment9 from '../experiments/Experiment9';
import Experiment10 from '../experiments/Experiment10';
import Experiment11 from '../experiments/Experiment11';
import Experiment12 from '../experiments/Experiment12';


import { experiments } from '../data/experiments';

const MainContent = () => {
  return (
    <main className="flex-grow">
      <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/experiments" element={<ExperimentsPage />} />
  <Route path="/about" element={<AboutPage />} />
  
  <Route path="/experiments/experiment1" element={<Experiment1 />} />
  <Route path="/experiments/experiment2" element={<Experiment2 />} />
  <Route path="/experiments/experiment3" element={<Experiment3 />} />
  <Route path="/experiments/experiment4" element={<Experiment4 />} />
  <Route path="/experiments/experiment5" element={<Experiment5 />} />
  <Route path="/experiments/experiment6" element={<Experiment6 />} />
  <Route path="/experiments/experiment7" element={<Experiment7 />} />
  <Route path="/experiments/experiment8" element={<Experiment8 />} />
  <Route path="/experiments/experiment9" element={<Experiment9 />} />
  <Route path="/experiments/experiment10" element={<Experiment10 />} />
  <Route path="/experiments/experiment11" element={<Experiment11 />} />
  <Route path="/experiments/experiment12" element={<Experiment12 />} />
  


</Routes>
    </main>
  );
};
export default MainContent;