import React, { useState, useEffect } from 'react';
import { Power, Lightbulb, Zap, RotateCcw, Info, Settings, Moon } from 'lucide-react';
import CircuitBoard from './components/CircuitBoard';
import ComponentPanel from './components/ComponentPanel';
import ControlPanel from './components/ControlPanel';
import InfoPanel from './components/InfoPanel';

interface CircuitState {
  acSupply: boolean;
  starter: boolean;
  choke: boolean;
  led: boolean;
  tube: boolean;
  switch: boolean;
}

function App() {
  const [circuitState, setCircuitState] = useState<CircuitState>({
    acSupply: false,
    starter: false,
    choke: false,
    led: false,
    tube: false,
    switch: false
  });
  
  const [currentFlow, setCurrentFlow] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedCircuit, setSelectedCircuit] = useState<'led' | 'fluorescent'>('led');

  useEffect(() => {
    // Simulate circuit analysis
    const analyzeCircuit = () => {
      const flow: string[] = [];
      
      if (circuitState.acSupply && circuitState.switch) {
        flow.push('ac-supply');
        flow.push('switch');
        
        if (selectedCircuit === 'led' && circuitState.led) {
          flow.push('led');
          setCurrentFlow(['ac-supply', 'switch', 'led']);
        } else if (selectedCircuit === 'fluorescent') {
          if (circuitState.choke && circuitState.tube) {
            // Fluorescent tube can work with or without starter
            flow.push('choke');
            if (circuitState.starter) {
              flow.push('starter');
            }
            flow.push('tube');
            
            const flowPath = ['ac-supply', 'switch', 'choke'];
            if (circuitState.starter) {
              flowPath.push('starter');
            }
            flowPath.push('tube');
            setCurrentFlow(flowPath);
          } else {
            setCurrentFlow(['ac-supply', 'switch']);
          }
        }
      } else {
        setCurrentFlow([]);
      }
    };

    analyzeCircuit();
  }, [circuitState, selectedCircuit]);

  const toggleComponent = (component: keyof CircuitState) => {
    setCircuitState(prev => ({
      ...prev,
      [component]: !prev[component]
    }));
  };

  const resetCircuit = () => {
    setCircuitState({
      acSupply: false,
      starter: false,
      choke: false,
      led: false,
      tube: false,
      switch: false
    });
    setCurrentFlow([]);
  };

  const isCircuitComplete = () => {
    if (selectedCircuit === 'led') {
      return circuitState.acSupply && circuitState.switch && circuitState.led;
    } else {
      // Fluorescent circuit is complete with choke and tube (starter is optional)
      return circuitState.acSupply && circuitState.switch && 
             circuitState.choke && circuitState.tube;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className={`shadow-lg border-b-2 ${
        darkMode ? 'bg-gray-800 border-blue-500' : 'bg-white border-blue-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Zap className={`w-8 h-8 ${
                  isCircuitComplete() ? 'text-yellow-400 animate-pulse' : 'text-blue-600'
                }`} />
                {isCircuitComplete() && (
                  <div className="absolute -inset-2 bg-yellow-400 rounded-full opacity-20 animate-ping" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Circuit Simulator
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Interactive Fluorescent Tube & LED Circuit Analysis
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
                title="Circuit Information"
              >
                <Info className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
                title="Toggle Dark Mode"
              >
                
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <ControlPanel
              circuitState={circuitState}
              toggleComponent={toggleComponent}
              resetCircuit={resetCircuit}
              selectedCircuit={selectedCircuit}
              setSelectedCircuit={setSelectedCircuit}
              darkMode={darkMode}
              isCircuitComplete={isCircuitComplete()}
            />
          </div>

          {/* Circuit Board */}
          <div className="lg:col-span-2">
            <CircuitBoard
              circuitState={circuitState}
              currentFlow={currentFlow}
              selectedCircuit={selectedCircuit}
              darkMode={darkMode}
            />
          </div>

          {/* Component Panel */}
          <div className="lg:col-span-1">
            <ComponentPanel
              selectedCircuit={selectedCircuit}
              currentFlow={currentFlow}
              darkMode={darkMode}
              circuitState={circuitState}
            />
          </div>
        </div>
        
        {/* Info Panel */}
        {showInfo && (
          <div className="mt-6">
            <InfoPanel
              selectedCircuit={selectedCircuit}
              darkMode={darkMode}
              onClose={() => setShowInfo(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;