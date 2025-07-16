import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Zap, Settings, BookOpen, Eye, BarChart3 } from 'lucide-react';

const Index = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [withFilter, setWithFilter] = useState(false);
  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState(1); // Animation speed multiplier
  const [showExplanation, setShowExplanation] = useState(true);
  const [highlightMode, setHighlightMode] = useState(true);
  const [capacitorValue, setCapacitorValue] = useState(100); // µF
  const [loadResistorValue, setLoadResistorValue] = useState(1000); // Ω
  const animationRef = useRef<number>();

  // Slower animation with configurable speed
  useEffect(() => {
    if (isRunning) {
      const animate = () => {
        setTime(prevTime => (prevTime + 0.01 * speed) % (4 * Math.PI));
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, speed]);

  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };

  // Format resistor value for display
  const formatResistorValue = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}MΩ`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}kΩ`;
    return `${value}Ω`;
  };

  // Format capacitor value for display
  const formatCapacitorValue = (value: number) => {
    if (value >= 1000) return `${(value / 1000).toFixed(1)}mF`;
    return `${value}µF`;
  };

  // Function to calculate realistic filtered output with RC time constant
  const calculateRealisticFilter = (t: number, amplitude: number, RC: number, rippleFactor: number) => {
    const rectified = Math.abs(amplitude * Math.sin(t));
    const rippleAmplitude = amplitude * rippleFactor * 0.5; // Scale ripple based on RC
    const dcLevel = amplitude * 0.9; // Average DC level after filtering
    const ripple = rippleAmplitude * Math.cos(2 * t); // 100Hz ripple component
    
    // Exponential decay simulation between peaks
    const cyclePosition = (t % (Math.PI)) / Math.PI;
    const decayFactor = Math.exp(-cyclePosition / (RC * 100)); // Discharge rate
    
    return Math.max(0, dcLevel - ripple * decayFactor);
  };

  // Calculate waveforms with realistic RC filtering
  const frequency = 50; // Hz
  const amplitude = 6; // Volts
  const inputVoltage = amplitude * Math.sin(time);
  const rectifiedVoltage = Math.abs(inputVoltage);
  
  // Calculate RC time constant and realistic filtering
  const RC = (loadResistorValue / 1000) * (capacitorValue / 1000000); // Convert to seconds
  const rippleFreq = 2 * frequency; // 100Hz for full wave
  const rippleFactor = withFilter ? Math.max(0.01, 1 / (2 * Math.PI * rippleFreq * RC)) : 1;
  
  // More realistic filtered output with exponential decay
  const filteredVoltage = withFilter ? 
    calculateRealisticFilter(time, amplitude, RC, rippleFactor) : 
    rectifiedVoltage;

  // Determine conducting diodes with clear logic
  const isPositiveHalf = inputVoltage >= 0;
  const conductingDiodes = isPositiveHalf ? ['D1', 'D2'] : ['D3', 'D4'];
  
  // Current cycle information for educational purposes
  const cycleInfo = {
    phase: isPositiveHalf ? 'Positive Half Cycle' : 'Negative Half Cycle',
    description: isPositiveHalf 
      ? 'Current flows: Secondary → D1 → Load → D2 → Secondary'
      : 'Current flows: Secondary → D3 → Load → D4 → Secondary',
    diodes: conductingDiodes.join(' and ') + ' are conducting'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-blue-700 mb-3 flex items-center justify-center gap-3">
              <Zap className="w-10 h-10" />
              Bridge Rectifier Learning Simulation
            </h1>
            <p className="text-gray-600 text-lg">
              Interactive demonstration of AC to DC conversion with educational insights
            </p>
          </div>

          {/* Enhanced Control Panel */}
          <div className="mb-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                isRunning 
                  ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg' 
                  : 'bg-green-500 text-white hover:bg-green-600 shadow-lg'
              }`}
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isRunning ? 'Pause' : 'Start'} Animation
            </button>
            
            <button
              onClick={reset}
              className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all transform hover:scale-105 shadow-lg"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>

            <button
              onClick={() => setWithFilter(!withFilter)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg ${
                withFilter 
                  ? 'bg-purple-500 text-white hover:bg-purple-600' 
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              <Settings className="w-5 h-5" />
              {withFilter ? 'With Filter' : 'Add Filter'}
            </button>

            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg ${
                showExplanation 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              {showExplanation ? 'Hide Guide' : 'Show Guide'}
            </button>
          </div>

          {/* Speed Control */}
          <div className="mb-6 flex justify-center items-center gap-4">
            <label className="text-sm font-semibold text-gray-700">Animation Speed:</label>
            <input
              type="range"
              min="0.2"
              max="3"
              step="0.2"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-32"
            />
            <span className="text-sm text-gray-600">{speed}x</span>
          </div>

          {/* Component Value Controls */}
          <div className="mb-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-blue-700 mb-4 text-center">Circuit Parameters</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Load Resistor Value (Ω)
                </label>
                <input
                  type="number"
                  min="100"
                  max="10000"
                  step="100"
                  value={loadResistorValue}
                  onChange={(e) => setLoadResistorValue(parseInt(e.target.value) || 1000)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="text-sm text-gray-600 mt-1">
                  Display: {formatResistorValue(loadResistorValue)}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Filter Capacitor Value (µF)
                </label>
                <input
                  type="number"
                  min="10"
                  max="2000"
                  step="10"
                  value={capacitorValue}
                  onChange={(e) => setCapacitorValue(parseInt(e.target.value) || 100)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="text-sm text-gray-600 mt-1">
                  Display: {formatCapacitorValue(capacitorValue)}
                </div>
              </div>
            </div>
          </div>

          {/* Current Cycle Information */}
          {showExplanation && (
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-blue-700 mb-2 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Current Operation
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <strong className="text-blue-600">Phase:</strong>
                  <div className={`font-semibold ${isPositiveHalf ? 'text-green-600' : 'text-orange-600'}`}>
                    {cycleInfo.phase}
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <strong className="text-blue-600">Conducting Diodes:</strong>
                  <div className="font-semibold text-purple-600">{cycleInfo.diodes}</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <strong className="text-blue-600">Current Path:</strong>
                  <div className="text-gray-700 text-xs">{cycleInfo.description}</div>
                </div>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Enhanced Circuit Diagram */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-blue-700 mb-4 text-center flex items-center justify-center gap-2">
                <Zap className="w-6 h-6" />
                Bridge Rectifier Circuit
              </h3>
              
              <BridgeRectifierCircuit 
                conductingDiodes={conductingDiodes}
                withFilter={withFilter}
                inputVoltage={inputVoltage}
                outputVoltage={withFilter ? filteredVoltage : rectifiedVoltage}
                highlightMode={highlightMode}
                time={time}
                capacitorValue={capacitorValue}
                loadResistorValue={loadResistorValue}
                formatCapacitorValue={formatCapacitorValue}
                formatResistorValue={formatResistorValue}
              />
            </div>

            {/* Enhanced Waveform Display */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-blue-700 mb-4 text-center flex items-center justify-center gap-2">
                <BarChart3 className="w-6 h-6" />
                Voltage Waveforms
              </h3>
              <WaveformDisplay 
                time={time}
                inputVoltage={inputVoltage}
                outputVoltage={withFilter ? filteredVoltage : rectifiedVoltage}
                withFilter={withFilter}
                amplitude={amplitude}
                showExplanation={showExplanation}
                capacitorValue={capacitorValue}
                loadResistorValue={loadResistorValue}
                RC={RC}
                rippleFactor={rippleFactor}
                calculateRealisticFilter={calculateRealisticFilter}
              />
            </div>
          </div>

          {/* Enhanced Real-time Values */}
          <div className="mt-6 grid md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center border border-blue-200">
              <h4 className="font-semibold text-blue-700 mb-2">Input Voltage</h4>
              <div className="text-3xl font-bold text-blue-600">
                {inputVoltage.toFixed(2)}V
              </div>
              <div className="text-sm text-gray-600">AC Sinusoidal</div>
              <div className="text-xs text-gray-500 mt-1">50Hz, ±6V</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center border border-green-200">
              <h4 className="font-semibold text-green-700 mb-2">Output Voltage</h4>
              <div className="text-3xl font-bold text-green-600">
                {(withFilter ? filteredVoltage : rectifiedVoltage).toFixed(2)}V
              </div>
              <div className="text-sm text-gray-600">
                {withFilter ? 'Filtered DC' : 'Pulsating DC'}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {withFilter ? 'Low Ripple' : '100Hz Ripple'}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl text-center border border-purple-200">
              <h4 className="font-semibold text-purple-700 mb-2">Active Diodes</h4>
              <div className="text-lg font-bold text-purple-600">
                {conductingDiodes.join(', ')}
              </div>
              <div className="text-sm text-gray-600">Conducting</div>
              <div className="text-xs text-gray-500 mt-1">Forward Biased</div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl text-center border border-orange-200">
              <h4 className="font-semibold text-orange-700 mb-2">RC Time Constant</h4>
              <div className="text-3xl font-bold text-orange-600">{(RC * 1000).toFixed(1)}ms</div>
              <div className="text-sm text-gray-600">Filter Response</div>
              <div className="text-xs text-gray-500 mt-1">
                Ripple: {(rippleFactor * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Educational Analysis Section */}
          {showExplanation && (
            <div className="mt-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Learning Insights</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Current Operation Analysis:</h4>
                  <div className="space-y-3 text-sm">
                    <div className={`p-3 rounded-lg ${isPositiveHalf ? 'bg-green-100 border-green-300' : 'bg-orange-100 border-orange-300'} border`}>
                      <strong className={isPositiveHalf ? 'text-green-700' : 'text-orange-700'}>
                        {cycleInfo.phase}:
                      </strong>
                      <br />
                      <span className="text-gray-700">
                        • Diodes {conductingDiodes.join(' and ')} are forward biased
                        <br />
                        • Current flows through load resistor
                        <br />
                        • Output voltage follows input magnitude
                      </span>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <strong className="text-blue-700">Key Observation:</strong>
                      <br />
                      <span className="text-gray-700">
                        Both half-cycles contribute to output, doubling the ripple frequency to 100Hz
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Circuit Parameters:</h4>
                  <div className="space-y-2 text-sm bg-white p-4 rounded-lg border">
                    <div className="flex justify-between">
                      <span>Input Frequency:</span>
                      <span className="font-semibold">{frequency} Hz</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Output Frequency:</span>
                      <span className="font-semibold">{frequency * 2} Hz</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Peak Input:</span>
                      <span className="font-semibold">±{amplitude}V</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transformer:</span>
                      <span className="font-semibold">230V/6-0-6V</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Load Resistor:</span>
                      <span className="font-semibold">{formatResistorValue(loadResistorValue)}</span>
                    </div>
                    {withFilter && (
                      <div className="flex justify-between border-t pt-2">
                        <span>Filter Capacitor:</span>
                        <span className="font-semibold">{formatCapacitorValue(capacitorValue)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Theory Summary with Enhanced Content */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Working Principle Summary</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold mb-3 text-blue-600">Without Filter Capacitor:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Four diodes arranged in bridge configuration</li>
                  <li>During positive half-cycle: D1, D2 conduct (current path shown)</li>
                  <li>During negative half-cycle: D3, D4 conduct (alternate path)</li>
                  <li>Output is pulsating DC with 100Hz ripple frequency</li>
                  <li>Both halves of AC waveform contribute to output</li>
                  <li>Rectification efficiency: 81.2%</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-blue-600">With Filter Capacitor:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Capacitor charges during rising voltage periods</li>
                  <li>Discharges through load during falling voltage</li>
                  <li>Maintains voltage level between peaks</li>
                  <li>Significantly reduces ripple content (smoothing)</li>
                  <li>Provides nearly constant DC output</li>
                  <li>Larger capacitor = lower ripple factor</li>
                  <li>Higher load resistance = lower ripple</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BridgeRectifierCircuit = ({ 
  conductingDiodes, 
  withFilter, 
  inputVoltage, 
  outputVoltage, 
  highlightMode, 
  time, 
  capacitorValue, 
  loadResistorValue,
  formatCapacitorValue,
  formatResistorValue
}) => {
  const isD1Conducting = conductingDiodes.includes('D1');
  const isD2Conducting = conductingDiodes.includes('D2');
  const isD3Conducting = conductingDiodes.includes('D3');
  const isD4Conducting = conductingDiodes.includes('D4');

  // Animation for current flow
  const flowAnimation = time * 2;

  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border-2 border-gray-200">
      <svg viewBox="0 0 900 600" className="w-full h-96">
        {/* Enhanced Grid Background */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
          </pattern>
          
          {/* Gradient definitions for better visuals */}
          <linearGradient id="transformerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e3f2fd"/>
            <stop offset="100%" stopColor="#bbdefb"/>
          </linearGradient>
          
          <linearGradient id="loadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3e5f5"/>
            <stop offset="100%" stopColor="#e1bee7"/>
          </linearGradient>
        </defs>
        
        <rect width="900" height="600" fill="url(#grid)"/>

        {/* Enhanced Transformer with better styling */}
        <g>
          <text x="60" y="35" className="text-sm font-bold fill-blue-700">230V AC Supply</text>
          <rect x="50" y="45" width="60" height="80" fill="url(#transformerGrad)" stroke="#1976d2" strokeWidth="2" rx="5"/>
          <text x="75" y="90" className="text-sm font-bold fill-blue-700">T1</text>
          
          {/* Enhanced coil representations */}
          <g stroke="#1976d2" strokeWidth="2" fill="none">
            <path d="M 60 55 Q 65 50 70 55 Q 75 60 80 55 Q 85 50 90 55 Q 95 60 100 55"/>
            <path d="M 60 65 Q 65 60 70 65 Q 75 70 80 65 Q 85 60 90 65 Q 95 70 100 65"/>
            <path d="M 60 95 Q 65 90 70 95 Q 75 100 80 95 Q 85 90 90 95 Q 95 100 100 95"/>
            <path d="M 60 105 Q 65 100 70 105 Q 75 110 80 105 Q 85 100 90 105 Q 95 110 100 105"/>
          </g>
          
          {/* Center tap with enhanced styling */}
          <circle cx="80" cy="115" r="3" fill="#1976d2"/>
          <text x="88" y="120" className="text-sm font-semibold fill-blue-700">CT</text>
        </g>

        {/* Enhanced AC Input connections with voltage indicators */}
        <line x1="20" y1="60" x2="50" y2="60" stroke="#ff5722" strokeWidth="3"/>
        <line x1="20" y1="100" x2="50" y2="100" stroke="#4caf50" strokeWidth="3"/>
        <text x="15" y="55" className="text-xs fill-red-600 font-semibold">L</text>
        <text x="15" y="95" className="text-xs fill-green-600 font-semibold">N</text>
        
        {/* Voltage indicator */}
        <text x="25" y="80" className="text-sm font-bold fill-blue-600">
          {inputVoltage.toFixed(1)}V
        </text>

        {/* Enhanced Secondary output with animated current flow */}
        <line x1="110" y1="70" x2="160" y2="70" 
              stroke={inputVoltage >= 0 ? "#ff5722" : "#666"} 
              strokeWidth={inputVoltage >= 0 ? "4" : "2"}
              className={inputVoltage >= 0 ? "animate-pulse" : ""} />
        <line x1="110" y1="100" x2="160" y2="140" 
              stroke={inputVoltage < 0 ? "#ff5722" : "#666"} 
              strokeWidth={inputVoltage < 0 ? "4" : "2"}
              className={inputVoltage < 0 ? "animate-pulse" : ""} />
        <line x1="80" y1="115" x2="80" y2="250" stroke="#4caf50" strokeWidth="3"/>
        <line x1="80" y1="250" x2="650" y2="250" stroke="#4caf50" strokeWidth="3"/>

        {/* Enhanced Bridge Diodes with better positioning and styling */}
        <DiodeSVG x={200} y={100} rotation={0} conducting={isD1Conducting} label="D1" enhanced={true} />
        <DiodeSVG x={450} y={100} rotation={180} conducting={isD2Conducting} label="D2" enhanced={true} />
        <DiodeSVG x={200} y={180} rotation={0} conducting={isD3Conducting} label="D3" enhanced={true} />
        <DiodeSVG x={450} y={180} rotation={180} conducting={isD4Conducting} label="D4" enhanced={true} />

        {/* Enhanced Bridge connections with current flow animation */}
        <AnimatedWire x1={160} y1={70} x2={200} y2={105} 
                     active={inputVoltage >= 0} 
                     flowAnimation={flowAnimation} />
        <AnimatedWire x1={160} y1={140} x2={200} y2={185} 
                     active={inputVoltage < 0} 
                     flowAnimation={flowAnimation} />
        
        <AnimatedWire x1={250} y1={105} x2={300} y2={105} 
                     active={isD1Conducting} 
                     flowAnimation={flowAnimation} />
        <AnimatedWire x1={250} y1={185} x2={300} y2={185} 
                     active={isD3Conducting} 
                     flowAnimation={flowAnimation} />
        
        <line x1="300" y1="105" x2="300" y2="185" stroke="#333" strokeWidth="2"/>
        
        <AnimatedWire x1={350} y1={105} x2={450} y2={105} 
                     active={isD2Conducting} 
                     flowAnimation={flowAnimation} />
        <AnimatedWire x1={350} y1={185} x2={450} y2={185} 
                     active={isD4Conducting} 
                     flowAnimation={flowAnimation} />
        
        <line x1="350" y1="105" x2="350" y2="185" stroke="#333" strokeWidth="2"/>
        
        <AnimatedWire x1={500} y1={105} x2={550} y2={105} 
                     active={isD2Conducting} 
                     flowAnimation={flowAnimation} />
        <AnimatedWire x1={500} y1={185} x2={550} y2={185} 
                     active={isD4Conducting} 
                     flowAnimation={flowAnimation} />
        
        <line x1="550" y1="105" x2="550" y2="185" stroke="#333" strokeWidth="2"/>

        {/* Enhanced Load Resistor with dynamic value */}
        <rect x="580" y="130" width="70" height="30" fill="url(#loadGrad)" stroke="#7b1fa2" strokeWidth="2" rx="5"/>
        <text x="615" y="148" className="text-sm font-bold fill-purple-700">{formatResistorValue(loadResistorValue)}</text>
        <text x="605" y="125" className="text-sm font-bold fill-purple-700">Load</text>
        
        <AnimatedWire x1={550} y1={105} x2={580} y2={105} 
                     active={outputVoltage > 0} 
                     flowAnimation={flowAnimation} />
        <line x1="580" y1="105" x2="580" y2="130" stroke={outputVoltage > 0 ? "#ff5722" : "#666"} strokeWidth="3"/>
        <line x1="650" y1="130" x2="650" y2="105" stroke={outputVoltage > 0 ? "#ff5722" : "#666"} strokeWidth="3"/>
        
        <line x1="580" y1="160" x2="580" y2="185" stroke={outputVoltage > 0 ? "#4caf50" : "#666"} strokeWidth="3"/>
        <line x1="650" y1="160" x2="650" y2="185" stroke={outputVoltage > 0 ? "#4caf50" : "#666"} strokeWidth="3"/>
        <AnimatedWire x1={550} y1={185} x2={580} y2={185} 
                     active={outputVoltage > 0} 
                     flowAnimation={flowAnimation} />
        <line x1="650" y1="185" x2="650" y2="250" stroke={outputVoltage > 0 ? "#4caf50" : "#666"} strokeWidth="3"/>

        {/* Enhanced Filter Capacitor with dynamic value */}
        {withFilter && (
          <g>
            <line x1="680" y1="105" x2="680" y2="120" stroke="#333" strokeWidth="2"/>
            <line x1="680" y1="135" x2="680" y2="185" stroke="#333" strokeWidth="2"/>
            <line x1="670" y1="120" x2="690" y2="120" stroke="#333" strokeWidth="4"/>
            <line x1="670" y1="135" x2="690" y2="135" stroke="#333" strokeWidth="4"/>
            <text x="700" y="130" className="text-sm font-bold fill-blue-700">{formatCapacitorValue(capacitorValue)}</text>
            <text x="700" y="115" className="text-sm font-bold fill-blue-700">Filter</text>
            
            <line x1="650" y1="105" x2="680" y2="105" stroke={outputVoltage > 0 ? "#ff5722" : "#666"} strokeWidth="2"/>
            <line x1="680" y1="185" x2="650" y2="185" stroke={outputVoltage > 0 ? "#4caf50" : "#666"} strokeWidth="2"/>
            
            {/* Capacitor charge indicator */}
            {outputVoltage > 0 && (
              <circle cx="680" cy="127" r="8" fill="none" stroke="#2196f3" strokeWidth="2" className="animate-pulse">
                <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite"/>
              </circle>
            )}
          </g>
        )}

        {/* Enhanced Output terminals */}
        <circle cx="720" cy="105" r="5" fill="#ff5722"/>
        <text x="735" y="110" className="text-sm font-bold fill-red-600">+Vout</text>
        <circle cx="720" cy="185" r="5" fill="#4caf50"/>
        <text x="735" y="190" className="text-sm font-bold fill-green-600">-Vout</text>

        {/* Enhanced voltage and current indicators */}
        <text x="325" y="50" className="text-lg font-bold fill-blue-600">
          Vin = {inputVoltage.toFixed(1)}V
        </text>
        <text x="580" y="50" className="text-lg font-bold fill-green-600">
          Vout = {outputVoltage.toFixed(1)}V
        </text>

        {/* Current flow direction indicators */}
        {outputVoltage > 0 && (
          <>
            <CurrentFlowIndicator x={275} y={105} active={isD1Conducting} />
            <CurrentFlowIndicator x={275} y={185} active={isD3Conducting} />
            <CurrentFlowIndicator x={425} y={105} active={isD2Conducting} />
            <CurrentFlowIndicator x={425} y={185} active={isD4Conducting} />
          </>
        )}

        {/* Educational annotations */}
        <text x="325" y="220" className="text-sm fill-gray-600 text-center">
          Bridge Configuration: All four diodes work together
        </text>
        <text x="325" y="235" className="text-sm fill-gray-600 text-center">
          to provide full-wave rectification
        </text>
      </svg>
    </div>
  );
};

const DiodeSVG = ({ x, y, rotation, conducting, label, enhanced = false }) => {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation})`}>
      {/* Enhanced diode body with gradient */}
      <defs>
        <linearGradient id={`diodeGrad-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={conducting ? "#ffcdd2" : "#f5f5f5"}/>
          <stop offset="100%" stopColor={conducting ? "#f44336" : "#e0e0e0"}/>
        </linearGradient>
      </defs>
      
      <rect x={0} y={-10} width="50" height="20" 
            fill={`url(#diodeGrad-${label})`}
            stroke={conducting ? "#d32f2f" : "#666"} 
            strokeWidth="2" rx="3"/>
      
      {/* Enhanced anode line */}
      <line x1="10" y1="-8" x2="10" y2="8" stroke="#333" strokeWidth="3"/>
      
      {/* Enhanced cathode line */}
      <line x1="40" y1="-8" x2="40" y2="8" stroke="#333" strokeWidth="4"/>
      
      {/* Enhanced triangle with better styling */}
      <polygon points="10,-6 10,6 35,0" 
               fill={conducting ? "#fff" : "#999"} 
               stroke="#333" strokeWidth="1"/>
      
      {/* Enhanced terminals */}
      <circle cx={-8} cy={0} r="3" fill="#666"/>
      <circle cx={58} cy={0} r="3" fill="#666"/>
      
      {/* Enhanced label with background */}
      <rect x={15} y={-20} width="20" height="12" fill="white" stroke="#ccc" strokeWidth="1" rx="2"/>
      <text x={25} y={-12} className="text-sm font-bold fill-gray-700" textAnchor="middle">
        {label}
      </text>
      
      {/* Enhanced conducting indicator */}
      {conducting && (
        <>
          <circle cx={25} cy={0} r="4" fill="#ff5722" className="animate-pulse">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite"/>
          </circle>
          <text x={25} y={25} className="text-xs fill-red-600 font-bold" textAnchor="middle">
            ON
          </text>
        </>
      )}
      
      {!conducting && (
        <text x={25} y={25} className="text-xs fill-gray-500" textAnchor="middle">
          OFF
        </text>
      )}
    </g>
  );
};

const AnimatedWire = ({ x1, y1, x2, y2, active, flowAnimation }) => {
  const strokeColor = active ? "#ff5722" : "#666";
  const strokeWidth = active ? "4" : "2";
  
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} 
            stroke={strokeColor} strokeWidth={strokeWidth}
            className={active ? "animate-pulse" : ""} />
      
      {active && (
        <circle r="3" fill="#ffeb3b">
          <animateMotion dur="2s" repeatCount="indefinite">
            <mpath href={`#path-${x1}-${y1}-${x2}-${y2}`}/>
          </animateMotion>
        </circle>
      )}
      
      <defs>
        <path id={`path-${x1}-${y1}-${x2}-${y2}`} d={`M ${x1} ${y1} L ${x2} ${y2}`}/>
      </defs>
    </g>
  );
};

const CurrentFlowIndicator = ({ x, y, active }) => {
  if (!active) return null;
  
  return (
    <circle cx={x} cy={y} r="4" fill="#ffeb3b" className="animate-ping">
      <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/>
    </circle>
  );
};

const WaveformDisplay = ({ 
  time, 
  inputVoltage, 
  outputVoltage, 
  withFilter, 
  amplitude, 
  showExplanation, 
  capacitorValue, 
  loadResistorValue, 
  RC, 
  rippleFactor, 
  calculateRealisticFilter 
}) => {
  const generateWaveformPoints = (func, color, strokeWidth = 3) => {
    const points = [];
    for (let t = 0; t <= 4 * Math.PI; t += 0.05) {
      const x = (t / (4 * Math.PI)) * 700 + 50;
      const y = 200 - func(t) * (120 / amplitude);
      points.push(`${x},${y}`);
    }
    return (
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    );
  };

  const inputWaveform = (t) => amplitude * Math.sin(t);
  
  // Use the realistic filter calculation for the waveform display
  const outputWaveform = (t) => {
    const rectified = Math.abs(amplitude * Math.sin(t));
    return withFilter ? calculateRealisticFilter(t, amplitude, RC, rippleFactor) : rectified;
  };

  const currentX = (time / (4 * Math.PI)) * 700 + 50;

  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border-2 border-gray-200">
      <svg viewBox="0 0 800 500" className="w-full h-96">
        {/* Enhanced Grid */}
        <defs>
          <pattern id="waveGrid" width="25" height="20" patternUnits="userSpaceOnUse">
            <path d="M 25 0 L 0 0 0 20" fill="none" stroke="#e8f5e8" strokeWidth="1"/>
          </pattern>
          <pattern id="majorGrid" width="100" height="80" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 80" fill="none" stroke="#c8e6c9" strokeWidth="1"/>
          </pattern>
        </defs>
        
        <rect width="800" height="500" fill="url(#waveGrid)"/>
        <rect width="800" height="500" fill="url(#majorGrid)"/>

        {/* Enhanced Axes with labels */}
        <line x1="50" y1="80" x2="750" y2="80" stroke="#333" strokeWidth="1"/>
        <line x1="50" y1="200" x2="750" y2="200" stroke="#333" strokeWidth="3"/>
        <line x1="50" y1="320" x2="750" y2="320" stroke="#333" strokeWidth="1"/>
        <line x1="50" y1="440" x2="750" y2="440" stroke="#333" strokeWidth="1"/>

        {/* Vertical time axis */}
        <line x1="50" y1="80" x2="50" y2="440" stroke="#333" strokeWidth="3"/>

        {/* Enhanced waveforms */}
        {generateWaveformPoints(inputWaveform, "#2196f3", 4)}
        {generateWaveformPoints(outputWaveform, "#4caf50", 4)}

        {/* Enhanced current time indicator */}
        <line x1={currentX} y1="80" x2={currentX} y2="440" 
              stroke="#ff9800" strokeWidth="3" strokeDasharray="8,4"/>
        
        <circle cx={currentX} cy={200 - inputVoltage * (120 / amplitude)} r="6" 
                fill="#2196f3" stroke="white" strokeWidth="2"/>
        <circle cx={currentX} cy={200 - outputVoltage * (120 / amplitude)} r="6" 
                fill="#4caf50" stroke="white" strokeWidth="2"/>

        {/* Enhanced labels with better positioning */}
        <text x="60" y="75" className="text-sm font-bold fill-blue-600">+{amplitude}V</text>
        <text x="60" y="205" className="text-sm font-bold fill-gray-700">0V</text>
        <text x="60" y="325" className="text-sm font-bold fill-blue-600">-{amplitude}V</text>

        {/* Enhanced waveform labels */}
        <rect x="90" y="50" width="120" height="25" fill="white" stroke="#2196f3" strokeWidth="2" rx="5"/>
        <text x="150" y="67" className="text-sm font-bold fill-blue-600" textAnchor="middle">
          Input (AC)
        </text>
        
        <rect x="90" y="400" width="160" height="25" fill="white" stroke="#4caf50" strokeWidth="2" rx="5"/>
        <text x="170" y="417" className="text-sm font-bold fill-green-600" textAnchor="middle">
          Output ({withFilter ? 'Filtered DC' : 'Pulsating DC'})
        </text>

        {/* Enhanced time markers */}
        <g className="text-xs fill-gray-600">
          <text x="150" y="460" textAnchor="middle">π/2</text>
          <text x="250" y="460" textAnchor="middle">π</text>
          <text x="350" y="460" textAnchor="middle">3π/2</text>
          <text x="450" y="460" textAnchor="middle">2π</text>
          <text x="550" y="460" textAnchor="middle">5π/2</text>
          <text x="650" y="460" textAnchor="middle">3π</text>
        </g>

        {/* Enhanced zero crossing indicators */}
        <g stroke="#999" strokeWidth="1" strokeDasharray="3,3">
          <line x1="250" y1="190" x2="250" y2="210"/>
          <line x1="450" y1="190" x2="450" y2="210"/>
          <line x1="650" y1="190" x2="650" y2="210"/>
        </g>

        {/* Frequency indicators */}
        {showExplanation && (
          <g>
            <text x="300" y="40" className="text-sm fill-blue-600 font-semibold">
              Input: 50Hz
            </text>
            <text x="500" y="40" className="text-sm fill-green-600 font-semibold">
              Output: 100Hz (Full Wave)
            </text>
            {withFilter && (
              <text x="600" y="40" className="text-xs fill-orange-600 font-semibold">
                RC = {(RC * 1000).toFixed(1)}ms
              </text>
            )}
          </g>
        )}

        {/* Peak value indicators */}
        <circle cx="150" cy="80" r="3" fill="#2196f3"/>
        <text x="155" y="75" className="text-xs fill-blue-600">Peak</text>
        
        <circle cx="150" cy="80" r="3" fill="#4caf50"/>
        <circle cx="250" cy="80" r="3" fill="#4caf50"/>
        <text x="200" y="70" className="text-xs fill-green-600">Peaks (100Hz)</text>
      </svg>
    </div>
  );
};

export default Index;