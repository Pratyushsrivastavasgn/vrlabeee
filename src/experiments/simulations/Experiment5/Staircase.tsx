import React, { useState } from 'react';
import { Lightbulb, Zap, RotateCcw, Info } from 'lucide-react';

// Main App Component
// This is the standard entry point for a React application.
const App = () => {
  return <Staircase />;
};

// Main Staircase Simulation Component
// This component holds the entire state and logic for the simulation.
const Staircase = () => {
  // State for the type of connection: 'direct' or 'cross'
  const [connectionType, setConnectionType] = useState('direct');
  // State for the position of Switch 1 (false = A, true = B)
  const [switch1Position, setSwitch1Position] = useState(false);
  // State for the position of Switch 2 (false = A, true = B)
  const [switch2Position, setSwitch2Position] = useState(false);

  // Logic to determine if the lamp is ON
  // Direct connection: lamp is ON when switches are in the same position.
  // Cross connection: lamp is ON when switches are in different positions.
  const lampOn = connectionType === 'direct'
    ? switch1Position === switch2Position
    : switch1Position !== switch2Position;

  // Functions to set the switch positions directly
  const handleSwitch1Change = (newPosition) => setSwitch1Position(newPosition);
  const handleSwitch2Change = (newPosition) => setSwitch2Position(newPosition);

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
            Staircase Wiring Simulation
          </h1>
          <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto">
            An interactive demonstration of two-way switch circuits. Select a connection type and flip the switches to see how the circuit behaves.
          </p>

          {/* Connection Type Selector */}
          <div className="mb-8 flex justify-center">
            <div className="bg-gray-200 p-1.5 rounded-xl flex space-x-2">
              <button
                onClick={() => setConnectionType('direct')}
                className={`px-4 py-2 text-sm md:text-base rounded-lg font-semibold transition-all duration-300 w-36 ${
                  connectionType === 'direct'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-300'
                }`}
              >
                Direct
              </button>
              <button
                onClick={() => setConnectionType('cross')}
                className={`px-4 py-2 text-sm md:text-base rounded-lg font-semibold transition-all duration-300 w-36 ${
                  connectionType === 'cross'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-300'
                }`}
              >
                Cross
              </button>
            </div>
          </div>

          {/* Circuit Status Display */}
          <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-xl text-center transition-all duration-300">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Lightbulb
                className={`w-10 h-10 transition-all duration-300 ${lampOn ? 'text-yellow-400' : 'text-gray-400'}`}
                fill={lampOn ? 'currentColor' : 'none'}
                strokeWidth={2}
              />
              <span className={`text-2xl font-bold transition-colors duration-300 ${lampOn ? 'text-green-600' : 'text-red-600'}`}>
                Lamp is {lampOn ? 'ON' : 'OFF'}
              </span>
            </div>
          </div>

          {/* Main Content Area: Diagram and Controls */}
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Circuit Diagram (takes 3/5 of the width on large screens) */}
            <div className="lg:col-span-3 bg-gray-800 rounded-2xl p-6 shadow-inner">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                Live Wiring Diagram
              </h3>
              <CircuitDiagram
                connectionType={connectionType}
                switch1Position={switch1Position}
                switch2Position={switch2Position}
                lampOn={lampOn}
              />
            </div>

            {/* Control Panel (takes 2/5 of the width on large screens) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-6">Controls</h3>
                <div className="space-y-6">
                  <SwitchControlPanel position={switch1Position} onPositionChange={handleSwitch1Change} label="Switch 1" description="(e.g., Bottom of Stairs)" />
                  <SwitchControlPanel position={switch2Position} onPositionChange={handleSwitch2Change} label="Switch 2" description="(e.g., Top of Stairs)" />
                </div>
                 <button
                    onClick={() => {
                      setSwitch1Position(false);
                      setSwitch2Position(false);
                    }}
                    className="w-full mt-6 py-3 px-4 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Reset Switches
                  </button>
              </div>
            </div>
          </div>

          {/* Truth Tables */}
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <TruthTable
              title="Direct Connection"
              type="direct"
              currentState={{ switch1Position, switch2Position }}
              isActive={connectionType === 'direct'}
            />
            <TruthTable
              title="Cross Connection"
              type="cross"
              currentState={{ switch1Position, switch2Position }}
              isActive={connectionType === 'cross'}
            />
          </div>

          {/* Information Panel */}
          <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6">
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-blue-800 mb-2 text-lg">How It Works</h4>
                <div className="grid md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-700">
                  <div>
                    <strong className="text-gray-800">Direct Connection (Logic):</strong>
                    <p className="mt-1">The lamp turns ON only when both switches are in the *same* position (A-A or B-B). This is the most common and intuitive setup.</p>
                  </div>
                  <div>
                    <strong className="text-gray-800">Cross Connection (Logic):</strong>
                    <p className="mt-1">The lamp turns ON only when the switches are in *different* positions (A-B or B-A). This is an alternative wiring method that achieves the same two-way control.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       <style>{`
        .marching-ants {
          stroke-dasharray: 8 4;
          animation: march 1.5s linear infinite;
        }
        @keyframes march {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: 12; }
        }
      `}</style>
    </div>
  );
};

// A dedicated component for the switch controls for better reusability
const SwitchControlPanel = ({ position, onPositionChange, label, description }) => (
    <div>
      <h4 className="font-semibold text-gray-700 mb-2">{label} <span className="text-sm text-gray-500 font-normal">{description}</span></h4>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onPositionChange(false)}
          className={`py-2 px-4 rounded-lg font-semibold transition-all duration-200 text-center ${
            !position 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Position A
        </button>
        <button
          onClick={() => onPositionChange(true)}
          className={`py-2 px-4 rounded-lg font-semibold transition-all duration-200 text-center ${
            position 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Position B
        </button>
      </div>
    </div>
  );

// The NEW schematic-style Circuit Diagram component based on user image
const CircuitDiagram = ({ connectionType, switch1Position, switch2Position, lampOn }) => {
    const activeColor = "stroke-red-500";
    const inactiveColor = "stroke-gray-500";
    const neutralColor = "stroke-blue-500";
    const activeNeutralColor = "stroke-blue-400";

    // Determine active paths
    const powerToS1 = lampOn;
    const s2ToLamp = lampOn;
    
    // Logic for the wires between the switches
    const s1A_s2A = lampOn && connectionType === 'direct' && !switch1Position && !switch2Position;
    const s1B_s2B = lampOn && connectionType === 'direct' && switch1Position && switch2Position;
    const s1A_s2B = lampOn && connectionType === 'cross' && !switch1Position && switch2Position;
    const s1B_s2A = lampOn && connectionType === 'cross' && switch1Position && !switch2Position;

    return (
        <div className="w-full h-64 bg-gray-800 rounded-lg p-4">
            <svg viewBox="0 0 800 300" className="w-full h-full">
                {/* Main Wires */}
                <path d="M 100 150 H 200" className={`${powerToS1 ? activeColor : inactiveColor} transition-colors`} strokeWidth="4" fill="none" />
                <path d="M 600 150 H 700" className={`${s2ToLamp ? activeColor : inactiveColor} transition-colors`} strokeWidth="4" fill="none" />
                <path d="M 100 250 H 700" className={`${lampOn ? activeNeutralColor : neutralColor} transition-colors`} strokeWidth="4" fill="none" />

                {/* Connection wires based on type */}
                {connectionType === 'direct' ? (
                    <>
                        <path d="M 300 100 H 500" className={`${s1A_s2A ? activeColor : inactiveColor} transition-colors`} strokeWidth="4" fill="none" />
                        <path d="M 300 200 H 500" className={`${s1B_s2B ? activeColor : inactiveColor} transition-colors`} strokeWidth="4" fill="none" />
                    </>
                ) : (
                    <>
                        <path d="M 300 100 H 500" className={`${s1B_s2A ? activeColor : inactiveColor} transition-colors`} strokeWidth="4" fill="none" />
                        <path d="M 300 200 H 500" className={`${s1A_s2B ? activeColor : inactiveColor} transition-colors`} strokeWidth="4" fill="none" />
                    </>
                )}

                {/* Animated paths */}
                {powerToS1 && <path d="M 100 150 H 200" className={`${activeColor} marching-ants`} strokeWidth="4" fill="none" />}
                {s2ToLamp && <path d="M 600 150 H 700" className={`${activeColor} marching-ants`} strokeWidth="4" fill="none" />}
                {s1A_s2A && <path d="M 300 100 H 500" className={`${activeColor} marching-ants`} strokeWidth="4" fill="none" />}
                {s1B_s2B && <path d="M 300 200 H 500" className={`${activeColor} marching-ants`} strokeWidth="4" fill="none" />}
                {s1A_s2B && <path d="M 300 200 H 500" className={`${activeColor} marching-ants`} strokeWidth="4" fill="none" />}
                {s1B_s2A && <path d="M 300 100 H 500" className={`${activeColor} marching-ants`} strokeWidth="4" fill="none" />}

                {/* Components */}
                <PowerSource x={50} y={150} active={lampOn} />
                <SwitchSchematic x={200} y={150} position={switch1Position} label="Switch No. 1" isActive={powerToS1} />
                <SwitchSchematic x={500} y={150} position={switch2Position} label="Switch No. 2" isActive={s2ToLamp} />
                <Lamp x={700} y={150} on={lampOn} />
            </svg>
        </div>
    );
};

// SVG component for the AC Power Source
const PowerSource = ({ x, y, active }) => (
    <g>
        <circle cx={x} cy={y} r="25" className={`${active ? 'stroke-red-500' : 'stroke-gray-500'} transition-colors`} strokeWidth="3" fill="none" />
        <path d="M 35 150 C 45 130, 55 170, 65 150" className={`${active ? 'stroke-red-500' : 'stroke-gray-500'} transition-colors`} strokeWidth="3" fill="none" />
        <line x1={x+25} y1={y} x2={x+50} y2={y} className={`${active ? 'stroke-red-500' : 'stroke-gray-500'} transition-colors`} strokeWidth="4" />
        <line x1={x} y1={y+25} x2={x} y2={y+100} className="stroke-blue-500" strokeWidth="4" />
        <line x1={x} y1={y+100} x2={x+50} y2={y+100} className="stroke-blue-500" strokeWidth="4" />
    </g>
);

// SVG component for the Lamp
const Lamp = ({ x, y, on }) => (
    <g>
        <circle cx={x} cy={y} r="25" className={`${on ? 'stroke-yellow-400' : 'stroke-gray-500'} transition-colors`} strokeWidth="3" fill={on ? "rgba(251, 191, 36, 0.2)" : "none"} />
        <line x1={x-10} y1={y-10} x2={x+10} y2={y+10} className={`${on ? 'stroke-yellow-400' : 'stroke-gray-500'} transition-colors`} strokeWidth="3" />
        <line x1={x+10} y1={y-10} x2={x-10} y2={y+10} className={`${on ? 'stroke-yellow-400' : 'stroke-gray-500'} transition-colors`} strokeWidth="3" />
        <line x1={x-25} y1={y} x2={x-50} y2={y} className={`${on ? 'stroke-red-500' : 'stroke-gray-500'} transition-colors`} strokeWidth="4" />
        <line x1={x} y1={y+25} x2={x} y2={y+100} className={`${on ? 'stroke-blue-400' : 'stroke-blue-500'} transition-colors`} strokeWidth="4" />
    </g>
);


// FIXED schematic switch based on user image
const SwitchSchematic = ({ x, y, position, label, isActive }) => {
    const activeColor = "stroke-red-500";
    const inactiveColor = "stroke-gray-500";

    // position: false = A (up), true = B (down)
    const comToA = !position;
    const comToB = position;

    return (
        <g>
            {/* Box */}
            <rect x={x} y={y-75} width="100" height="150" className="stroke-gray-400" fill="rgba(255,255,255,0.05)" />
            <text x={x + 5} y={y - 85} className="fill-white text-sm">{label}</text>

            {/* Terminals */}
            <circle cx={x} cy={y} r="6" className="fill-white" />
            <circle cx={x + 100} cy={y - 50} r="6" className="fill-white" />
            <circle cx={x + 100} cy={y + 50} r="6" className="fill-white" />

            {/* Internal Connections */}
            <line x1={x} y1={y} x2={x+100} y2={y-50} className={`${comToA ? (isActive ? activeColor : inactiveColor) : 'stroke-transparent'} transition-colors`} strokeWidth="4" />
            <line x1={x} y1={y} x2={x+100} y2={y+50} className={`${comToB ? (isActive ? activeColor : inactiveColor) : 'stroke-transparent'} transition-colors`} strokeWidth="4" />
        </g>
    );
};


// Reusable Truth Table component
const TruthTable = ({ title, type, currentState, isActive }) => {
  const { switch1Position, switch2Position } = currentState;

  const getRowHighlight = (sw1, sw2) => {
    if (!isActive) return 'bg-white';
    return (sw1 === switch1Position) && (sw2 === switch2Position) ? 'bg-yellow-100' : 'bg-white';
  };

  const getLampStatus = (sw1, sw2) => type === 'direct' ? (sw1 === sw2 ? 'ON' : 'OFF') : (sw1 !== sw2 ? 'ON' : 'OFF');

  const rows = [
    { sw1: false, sw2: false, sw1Text: 'A', sw2Text: 'A' },
    { sw1: false, sw2: true,  sw1Text: 'A', sw2Text: 'B' },
    { sw1: true,  sw2: false, sw1Text: 'B', sw2Text: 'A' },
    { sw1: true,  sw2: true,  sw1Text: 'B', sw2Text: 'B' },
  ];

  return (
    <div className={`border-2 rounded-2xl p-4 transition-all duration-300 ${isActive ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`}>
      <h4 className="font-bold text-gray-800 mb-4 text-center text-lg">{title}</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-3 py-2 font-semibold text-gray-600 rounded-tl-lg">SW 1</th>
              <th className="px-3 py-2 font-semibold text-gray-600">SW 2</th>
              <th className="px-3 py-2 font-semibold text-gray-600 rounded-tr-lg">Lamp</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className={`border-b border-gray-200 last:border-b-0 transition-colors duration-200 ${getRowHighlight(row.sw1, row.sw2)}`}>
                <td className="px-3 py-2 font-mono">{row.sw1Text}</td>
                <td className="px-3 py-2 font-mono">{row.sw2Text}</td>
                <td className={`px-3 py-2 font-bold ${getLampStatus(row.sw1, row.sw2) === 'ON' ? 'text-green-600' : 'text-red-600'}`}>
                  {getLampStatus(row.sw1, row.sw2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
