import React from 'react';
import HouseWiringSimulation from './components/HouseWiringSimulation';
import 'src/simulations/Experiment3/src/styles.css'; // Import your CSS styles

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="container mx-auto py-8 px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            House Wiring Power Simulation
          </h1>
          <p className="text-slate-600 text-lg">
            Interactive electrical circuit with real-time power monitoring
          </p>
        </header>
        <HouseWiringSimulation />
      </div>
    </div>
  );
}

export default App;