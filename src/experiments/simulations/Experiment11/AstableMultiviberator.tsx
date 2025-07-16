import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Zap, Settings, TrendingUp, Activity } from 'lucide-react';

interface CircuitParameters {
  vcc: number;
  rb: number;
  rc: number;
  re: number;
  rl: number;
  vin: number;
  frequency: number;
}

interface Measurements {
  vce: number;
  ic: number;
  ib: number;
  ie: number;
  vout: number;
  iout: number;
  voltageGain: number;
  currentGain: number;
  powerGain: number;
  efficiency: number;
  inputPower: number;
  outputPower: number;
}

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [parameters, setParameters] = useState<CircuitParameters>({
    vcc: 12,
    rb: 470000,
    rc: 2200,
    re: 1000,
    rl: 8,
    vin: 0.01,
    frequency: 1000,
  });

  const [measurements, setMeasurements] = useState<Measurements>({
    vce: 0,
    ic: 0,
    ib: 0,
    ie: 0,
    vout: 0,
    iout: 0,
    voltageGain: 0,
    currentGain: 0,
    powerGain: 0,
    efficiency: 0,
    inputPower: 0,
    outputPower: 0,
  });

  const [waveformData, setWaveformData] = useState<Array<{time: number, input: number, output: number}>>([]);
  const [currentTime, setCurrentTime] = useState(0);

  // Calculate circuit measurements
  const calculateMeasurements = () => {
    const { vcc, rb, rc, re, rl, vin } = parameters;
    const beta = 100; // Transistor current gain
    const vbe = 0.7; // Base-emitter voltage

    // DC Analysis (Q-Point)
    const ib = (vcc - vbe) / rb;
    const ic = beta * ib;
    const ie = ic + ib;
    const vce = vcc - ic * (rc + re);

    // AC Analysis
    const r_e = 0.026 / ie; // Dynamic emitter resistance
    const rcParallel = (rc * rl) / (rc + rl); // RC parallel with RL
    const voltageGain = -rcParallel / (r_e + re);
    const currentGain = beta;
    const powerGain = Math.abs(voltageGain * currentGain);

    // Signal calculations
    const vout = Math.abs(voltageGain * vin);
    const iout = vout / rl;
    const inputPower = vin * ib;
    const outputPower = vout * iout;
    const efficiency = (outputPower / (vcc * ic)) * 100;

    return {
      vce,
      ic,
      ib,
      ie,
      vout,
      iout,
      voltageGain,
      currentGain,
      powerGain,
      efficiency,
      inputPower,
      outputPower,
    };
  };

  // Update measurements when parameters change
  useEffect(() => {
    setMeasurements(calculateMeasurements());
  }, [parameters]);

  // Simulation loop for waveforms
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev + 0.1;
        const inputSignal = parameters.vin * Math.sin(2 * Math.PI * parameters.frequency * newTime / 1000);
        const outputSignal = measurements.vout * Math.sin(2 * Math.PI * parameters.frequency * newTime / 1000 + Math.PI); // Inverted

        setWaveformData(prevData => {
          const newData = [...prevData, { time: newTime, input: inputSignal, output: outputSignal }];
          return newData.slice(-200); // Keep last 200 points
        });

        return newTime;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isRunning, parameters.frequency, parameters.vin, measurements.vout]);

  const handleParameterChange = (param: keyof CircuitParameters, value: number) => {
    setParameters(prev => ({ ...prev, [param]: value }));
  };

  const startSimulation = () => {
    setIsRunning(true);
  };

  const pauseSimulation = () => {
    setIsRunning(false);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setCurrentTime(0);
    setWaveformData([]);
  };

  const formatValue = (value: number, unit: string, decimals: number = 2) => {
    if (isNaN(value) || !isFinite(value)) return '---';
    return `${value.toFixed(decimals)} ${unit}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
          Class-A Power Amplifier Laboratory
        </h1>
        <p className="text-gray-300">Interactive circuit analysis and waveform visualization</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Circuit Diagram */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4 text-white flex items-center">
            <Zap className="mr-2 text-yellow-400" />
            Circuit Diagram
          </h2>
          
          <div className="bg-gray-900 rounded-lg p-6 h-96 flex items-center justify-center">
            <svg width="600" height="350" viewBox="0 0 600 350" className="w-full h-full">
              {/* Grid background */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* VCC Supply */}
              <circle cx="300" cy="50" r="15" fill="none" stroke="#ef4444" strokeWidth="2"/>
              <text x="285" y="55" fill="#ef4444" fontSize="12">+</text>
              <text x="320" y="45" fill="#ef4444" fontSize="12">VCC</text>
              <text x="315" y="60" fill="#ef4444" fontSize="10">{parameters.vcc}V</text>
              
              {/* Wires from VCC */}
              <line x1="300" y1="65" x2="300" y2="90" stroke="#00ff88" strokeWidth="2"/>
              <line x1="300" y1="90" x2="150" y2="90" stroke="#00ff88" strokeWidth="2"/>
              <line x1="300" y1="90" x2="450" y2="90" stroke="#00ff88" strokeWidth="2"/>
              
              {/* RB (Base Resistor) */}
              <rect x="130" y="85" width="40" height="10" fill="none" stroke="#60a5fa" strokeWidth="2"/>
              <line x1="100" y1="90" x2="130" y2="90" stroke="#00ff88" strokeWidth="2"/>
              <line x1="170" y1="90" x2="200" y2="90" stroke="#00ff88" strokeWidth="2"/>
              <text x="135" y="105" fill="#60a5fa" fontSize="10">RB</text>
              <text x="125" y="115" fill="#60a5fa" fontSize="8">{(parameters.rb/1000).toFixed(0)}kΩ</text>
              
              {/* RC (Collector Resistor) */}
              <rect x="430" y="85" width="40" height="10" fill="none" stroke="#60a5fa" strokeWidth="2"/>
              <line x1="450" y1="95" x2="450" y2="120" stroke="#00ff88" strokeWidth="2"/>
              <text x="435" y="105" fill="#60a5fa" fontSize="10">RC</text>
              <text x="425" y="115" fill="#60a5fa" fontSize="8">{parameters.rc}Ω</text>
              
              {/* Transistor Q1 (NPN) */}
              <circle cx="250" cy="180" r="25" fill="none" stroke="#fff" strokeWidth="2"/>
              <line x1="200" y1="90" x2="200" y2="180" stroke="#00ff88" strokeWidth="2"/>
              <line x1="200" y1="180" x2="235" y2="180" stroke="#00ff88" strokeWidth="2"/>
              <line x1="250" y1="155" x2="250" y2="120" stroke="#00ff88" strokeWidth="2"/>
              <line x1="450" y1="120" x2="250" y2="120" stroke="#00ff88" strokeWidth="2"/>
              <line x1="250" y1="205" x2="250" y2="240" stroke="#00ff88" strokeWidth="2"/>
              
              {/* Transistor symbol */}
              <line x1="235" y1="165" x2="235" y2="195" stroke="#fff" strokeWidth="3"/>
              <line x1="235" y1="170" x2="260" y2="155" stroke="#fff" strokeWidth="2"/>
              <line x1="235" y1="190" x2="260" y2="205" stroke="#fff" strokeWidth="2"/>
              <polygon points="255,200 260,205 260,195" fill="#fff"/>
              
              <text x="280" y="185" fill="#fff" fontSize="12">Q1</text>
              <text x="210" y="175" fill="#fbbf24" fontSize="10">B</text>
              <text x="255" y="145" fill="#10b981" fontSize="10">C</text>
              <text x="255" y="225" fill="#3b82f6" fontSize="10">E</text>
              
              {/* RE (Emitter Resistor) */}
              <rect x="230" y="235" width="40" height="10" fill="none" stroke="#60a5fa" strokeWidth="2"/>
              <line x1="250" y1="245" x2="250" y2="270" stroke="#00ff88" strokeWidth="2"/>
              <text x="235" y="255" fill="#60a5fa" fontSize="10">RE</text>
              <text x="225" y="265" fill="#60a5fa" fontSize="8">{parameters.re}Ω</text>
              
              {/* RL (Load Resistor) */}
              <rect x="430" y="175" width="40" height="10" fill="none" stroke="#f97316" strokeWidth="2"/>
              <line x1="450" y1="120" x2="450" y2="175" stroke="#00ff88" strokeWidth="2"/>
              <line x1="450" y1="185" x2="450" y2="270" stroke="#00ff88" strokeWidth="2"/>
              <text x="435" y="195" fill="#f97316" fontSize="10">RL</text>
              <text x="430" y="205" fill="#f97316" fontSize="8">{parameters.rl}Ω</text>
              
              {/* Ground connections */}
              <line x1="250" y1="270" x2="450" y2="270" stroke="#00ff88" strokeWidth="2"/>
              <line x1="100" y1="270" x2="250" y2="270" stroke="#00ff88" strokeWidth="2"/>
              
              {/* Ground symbols */}
              <line x1="95" y1="270" x2="105" y2="270" stroke="#fff" strokeWidth="3"/>
              <line x1="97" y1="275" x2="103" y2="275" stroke="#fff" strokeWidth="2"/>
              <line x1="99" y1="280" x2="101" y2="280" stroke="#fff" strokeWidth="1"/>
              
              <line x1="245" y1="285" x2="255" y2="285" stroke="#fff" strokeWidth="3"/>
              <line x1="247" y1="290" x2="253" y2="290" stroke="#fff" strokeWidth="2"/>
              <line x1="249" y1="295" x2="251" y2="295" stroke="#fff" strokeWidth="1"/>
              
              {/* Input signal source */}
              <circle cx="100" cy="200" r="15" fill="none" stroke="#a855f7" strokeWidth="2"/>
              <text x="95" y="205" fill="#a855f7" fontSize="10">~</text>
              <line x1="100" y1="185" x2="100" y2="90" stroke="#00ff88" strokeWidth="2"/>
              <line x1="100" y1="215" x2="100" y2="270" stroke="#00ff88" strokeWidth="2"/>
              <text x="70" y="195" fill="#a855f7" fontSize="10">Vin</text>
              <text x="65" y="210" fill="#a855f7" fontSize="8">{(parameters.vin*1000).toFixed(0)}mV</text>
              
              {/* Output terminals */}
              <circle cx="500" cy="120" r="3" fill="#00ff88"/>
              <circle cx="500" cy="270" r="3" fill="#00ff88"/>
              <line x1="450" y1="120" x2="500" y2="120" stroke="#00ff88" strokeWidth="2"/>
              <line x1="450" y1="270" x2="500" y2="270" stroke="#00ff88" strokeWidth="2"/>
              <text x="510" y="125" fill="#00ff88" fontSize="12">Vout</text>
              <text x="510" y="140" fill="#00ff88" fontSize="10">{measurements.vout.toFixed(2)}V</text>
              
              {/* Current flow indicators */}
              {isRunning && (
                <>
                  <circle cx="225" cy="90" r="2" fill="#fbbf24">
                    <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="250" cy="140" r="2" fill="#10b981">
                    <animate attributeName="opacity" values="0;1;0" dur="0.8s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="250" cy="220" r="2" fill="#3b82f6">
                    <animate attributeName="opacity" values="0;1;0" dur="0.9s" repeatCount="indefinite"/>
                  </circle>
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4 text-white flex items-center">
            <Settings className="mr-2 text-blue-400" />
            Control Panel
          </h2>
          
          {/* Simulation Controls */}
          <div className="mb-6">
            <div className="flex gap-2 mb-4">
              <button
                onClick={startSimulation}
                disabled={isRunning}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isRunning
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                <Play className="inline mr-1" size={16} />
                Start
              </button>
              <button
                onClick={pauseSimulation}
                disabled={!isRunning}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  !isRunning
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                }`}
              >
                <Pause className="inline mr-1" size={16} />
                Pause
              </button>
              <button
                onClick={resetSimulation}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                <RotateCcw className="inline mr-1" size={16} />
                Reset
              </button>
            </div>
          </div>

          {/* Parameter Controls */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Supply Voltage (VCC): {parameters.vcc}V
              </label>
              <input
                type="range"
                min="5"
                max="24"
                step="1"
                value={parameters.vcc}
                onChange={(e) => handleParameterChange('vcc', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Base Resistor (RB): {(parameters.rb/1000).toFixed(0)}kΩ
              </label>
              <input
                type="range"
                min="100000"
                max="1000000"
                step="10000"
                value={parameters.rb}
                onChange={(e) => handleParameterChange('rb', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Collector Resistor (RC): {parameters.rc}Ω
              </label>
              <input
                type="range"
                min="1000"
                max="10000"
                step="100"
                value={parameters.rc}
                onChange={(e) => handleParameterChange('rc', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Emitter Resistor (RE): {parameters.re}Ω
              </label>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={parameters.re}
                onChange={(e) => handleParameterChange('re', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Load Resistor (RL): {parameters.rl}Ω
              </label>
              <input
                type="range"
                min="4"
                max="16"
                step="1"
                value={parameters.rl}
                onChange={(e) => handleParameterChange('rl', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Input Voltage (Vin): {(parameters.vin*1000).toFixed(0)}mV
              </label>
              <input
                type="range"
                min="0.001"
                max="0.1"
                step="0.001"
                value={parameters.vin}
                onChange={(e) => handleParameterChange('vin', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Frequency: {parameters.frequency}Hz
              </label>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={parameters.frequency}
                onChange={(e) => handleParameterChange('frequency', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>

        {/* Measurements Panel */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4 text-white flex items-center">
            <Activity className="mr-2 text-green-400" />
            Circuit Measurements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DC Operating Point */}
            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3 text-yellow-400">DC Operating Point (Q-Point)</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Collector-Emitter Voltage (VCE):</span>
                  <span className="text-white font-mono">{formatValue(measurements.vce, 'V')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Collector Current (IC):</span>
                  <span className="text-white font-mono">{formatValue(measurements.ic * 1000, 'mA')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Base Current (IB):</span>
                  <span className="text-white font-mono">{formatValue(measurements.ib * 1000000, 'µA')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Emitter Current (IE):</span>
                  <span className="text-white font-mono">{formatValue(measurements.ie * 1000, 'mA')}</span>
                </div>
              </div>
            </div>

            {/* Gain Analysis */}
            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3 text-green-400 flex items-center">
                <TrendingUp className="mr-2" size={18} />
                Gain Analysis
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Voltage Gain (Av):</span>
                  <span className="text-white font-mono">{formatValue(measurements.voltageGain, '')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Gain (Ai):</span>
                  <span className="text-white font-mono">{formatValue(measurements.currentGain, '')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Power Gain (Ap):</span>
                  <span className="text-white font-mono">{formatValue(measurements.powerGain, '')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Efficiency (η):</span>
                  <span className="text-white font-mono">{formatValue(measurements.efficiency, '%')}</span>
                </div>
              </div>
            </div>

            {/* Power Analysis */}
            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3 text-purple-400">Power Analysis</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Input Power (Pin):</span>
                  <span className="text-white font-mono">{formatValue(measurements.inputPower * 1000000, 'µW')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Output Power (Pout):</span>
                  <span className="text-white font-mono">{formatValue(measurements.outputPower * 1000, 'mW')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Output Voltage (Vout):</span>
                  <span className="text-white font-mono">{formatValue(measurements.vout, 'V')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Output Current (Iout):</span>
                  <span className="text-white font-mono">{formatValue(measurements.iout * 1000, 'mA')}</span>
                </div>
              </div>
            </div>

            {/* Signal Analysis */}
            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3 text-cyan-400">Signal Analysis</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Input Amplitude:</span>
                  <span className="text-white font-mono">{formatValue(parameters.vin * 1000, 'mV')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Output Amplitude:</span>
                  <span className="text-white font-mono">{formatValue(measurements.vout, 'V')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Signal Frequency:</span>
                  <span className="text-white font-mono">{formatValue(parameters.frequency, 'Hz', 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Phase Shift:</span>
                  <span className="text-white font-mono">180°</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Waveform Display */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4 text-white">Waveform Display</h2>
          
          <div className="bg-gray-900 rounded-lg p-4 h-64">
            <svg width="100%" height="100%" viewBox="0 0 300 200">
              {/* Grid */}
              <defs>
                <pattern id="waveGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#waveGrid)" />
              
              {/* Axes */}
              <line x1="20" y1="100" x2="280" y2="100" stroke="#6b7280" strokeWidth="1"/>
              <line x1="20" y1="20" x2="20" y2="180" stroke="#6b7280" strokeWidth="1"/>
              
              {/* Labels */}
              <text x="150" y="195" fill="#9ca3af" fontSize="12" textAnchor="middle">Time</text>
              <text x="10" y="15" fill="#9ca3af" fontSize="12" textAnchor="middle">V</text>
              
              {/* Waveforms */}
              {waveformData.length > 1 && (
                <>
                  {/* Input waveform */}
                  <polyline
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="2"
                    points={waveformData.map((point, index) => 
                      `${20 + (index * 260 / waveformData.length)},${100 - point.input * 2000}`
                    ).join(' ')}
                  />
                  
                  {/* Output waveform */}
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    points={waveformData.map((point, index) => 
                      `${20 + (index * 260 / waveformData.length)},${100 - point.output * 20}`
                    ).join(' ')}
                  />
                </>
              )}
              
              {/* Legend */}
              <line x1="230" y1="30" x2="250" y2="30" stroke="#a855f7" strokeWidth="2"/>
              <text x="255" y="35" fill="#a855f7" fontSize="10">Input</text>
              <line x1="230" y1="45" x2="250" y2="45" stroke="#10b981" strokeWidth="2"/>
              <text x="255" y="50" fill="#10b981" fontSize="10">Output</text>
            </svg>
          </div>

          {/* Status */}
          <div className="mt-4 p-3 bg-gray-900 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Simulation Status:</span>
              <span className={`font-medium ${isRunning ? 'text-green-400' : 'text-yellow-400'}`}>
                {isRunning ? 'Running' : 'Stopped'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;