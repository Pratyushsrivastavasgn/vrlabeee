import React, { useState } from 'react';
import { Lightbulb, Zap, RotateCcw, Info } from 'lucide-react';

const Staircase = () => {
  const [connectionType, setConnectionType] = useState('direct'); // 'direct' or 'cross'
  const [switch1Position, setSwitch1Position] = useState(false); // false = A, true = B
  const [switch2Position, setSwitch2Position] = useState(false);
  
  // For direct connection: lamp ON when switches are in same position
  // For cross connection: lamp ON when switches are in different positions
  const lampOn = connectionType === 'direct' 
    ? switch1Position === switch2Position 
    : switch1Position !== switch2Position;
  
  const toggleSwitch1 = () => setSwitch1Position(!switch1Position);
  const toggleSwitch2 = () => setSwitch2Position(!switch2Position);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-blue-600 mb-2 text-center">
            Staircase Wiring Simulation
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Interactive demonstration of two-way switch circuits with direct and cross connections
          </p>

          {/* Connection Type Selector */}
          <div className="mb-6 flex justify-center">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setConnectionType('direct')}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  connectionType === 'direct'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Direct Connection
              </button>
              <button
                onClick={() => setConnectionType('cross')}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  connectionType === 'cross'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Cross Connection
              </button>
            </div>
          </div>

          {/* Circuit Status */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Lightbulb 
                className={`w-8 h-8 ${lampOn ? 'text-yellow-500' : 'text-gray-400'}`}
                fill={lampOn ? 'currentColor' : 'none'}
              />
              <span className={`text-xl font-semibold ${lampOn ? 'text-green-600' : 'text-red-600'}`}>
                Lamp is {lampOn ? 'ON' : 'OFF'}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {connectionType === 'direct' 
                ? 'Direct: Current flows when both switches are in the same position'
                : 'Cross: Current flows when switches are in different positions'
              }
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Circuit Diagram */}
            <div className="bg-white border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-600 mb-4 text-center">
                {connectionType === 'direct' ? 'Direct Connection' : 'Cross Connection'} Circuit Diagram
              </h3>
              <CircuitDiagram 
                connectionType={connectionType}
                switch1Position={switch1Position}
                switch2Position={switch2Position}
                lampOn={lampOn}
              />
            </div>

            {/* Control Panel */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-600 text-center">Switch Controls</h3>
              
              {/* Switch 1 */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700 mb-3">Switch 1 (Bottom of Staircase)</h4>
                <div className="flex items-center gap-4">
                  <SwitchVisual 
                    position={switch1Position}
                    onToggle={toggleSwitch1}
                    label="SW1"
                  />
                  <div className="flex-1">
                    <button
                      onClick={toggleSwitch1}
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                        switch1Position 
                          ? 'bg-green-500 text-white shadow-lg' 
                          : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                      }`}
                    >
                      Position: {switch1Position ? 'B' : 'A'}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Switch 2 */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700 mb-3">Switch 2 (Top of Staircase)</h4>
                <div className="flex items-center gap-4">
                  <SwitchVisual 
                    position={switch2Position}
                    onToggle={toggleSwitch2}
                    label="SW2"
                  />
                  <div className="flex-1">
                    <button
                      onClick={toggleSwitch2}
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                        switch2Position 
                          ? 'bg-green-500 text-white shadow-lg' 
                          : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                      }`}
                    >
                      Position: {switch2Position ? 'B' : 'A'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setSwitch1Position(false);
                  setSwitch2Position(false);
                }}
                className="w-full py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Switches
              </button>
            </div>
          </div>

          {/* Truth Tables */}
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <TruthTable 
              title="Direct Connection Truth Table"
              type="direct"
              currentState={{ switch1Position, switch2Position }}
            />
            <TruthTable 
              title="Cross Connection Truth Table"
              type="cross"
              currentState={{ switch1Position, switch2Position }}
            />
          </div>

          {/* Information Panel */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">Connection Types Explained:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <strong>Direct Connection:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Terminal A of SW1 connects to Terminal A of SW2</li>
                      <li>Terminal B of SW1 connects to Terminal B of SW2</li>
                      <li>Lamp ON when both switches in same position</li>
                      <li>Most common in residential wiring</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Cross Connection:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Terminal A of SW1 connects to Terminal B of SW2</li>
                      <li>Terminal B of SW1 connects to Terminal A of SW2</li>
                      <li>Lamp ON when switches in different positions</li>
                      <li>Alternative wiring method</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SwitchVisual = ({ position, onToggle, label }) => {
  return (
    <div className="text-center">
      <div className="mb-2 text-xs font-medium text-gray-700">{label}</div>
      <button
        onClick={onToggle}
        className={`relative w-16 h-10 rounded-lg border-2 transition-all duration-200 ${
          position 
            ? 'bg-green-500 border-green-600' 
            : 'bg-gray-300 border-gray-400'
        }`}
      >
        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-md transition-all duration-200 ${
          position ? 'right-1' : 'left-1'
        }`} />
      </button>
      <div className="mt-1 text-xs text-gray-600">
        {position ? 'B' : 'A'}
      </div>
    </div>
  );
};

const CircuitDiagram = ({ connectionType, switch1Position, switch2Position, lampOn }) => {
  return (
    <div className="relative bg-white p-4 rounded-lg border">
      <svg viewBox="0 0 700 400" className="w-full h-80">
        {/* Power Supply */}
        <g>
          <text x="50" y="25" className="text-xs font-semibold fill-gray-700">230V AC</text>
          <rect x="40" y="30" width="30" height="15" fill="#ff6b6b" stroke="#000" strokeWidth="1"/>
          <text x="47" y="40" className="text-xs fill-white">L</text>
          <rect x="40" y="50" width="30" height="15" fill="#4ecdc4" stroke="#000" strokeWidth="1"/>
          <text x="47" y="60" className="text-xs">N</text>
        </g>
        
        {/* Phase line to Switch 1 */}
        <line x1="70" y1="37" x2="120" y2="37" stroke={lampOn ? "#ff6b6b" : "#999"} strokeWidth="3"/>
        
        {/* Switch 1 */}
        <SwitchSVG x={120} y={50} position={switch1Position} active={lampOn} label="SW1" />
        
        {/* Interconnecting wires based on connection type */}
        {connectionType === 'direct' ? (
          <>
            {/* Direct Connection - A to A, B to B */}
            <line x1="180" y1="40" x2="320" y2="40" 
                  stroke={switch1Position === false && lampOn ? "#ff6b6b" : "#999"} 
                  strokeWidth="3"/>
            <line x1="180" y1="60" x2="320" y2="60" 
                  stroke={switch1Position === true && lampOn ? "#ff6b6b" : "#999"} 
                  strokeWidth="3"/>
            <text x="230" y="35" className="text-xs fill-gray-600">A-A (Direct)</text>
            <text x="230" y="75" className="text-xs fill-gray-600">B-B (Direct)</text>
          </>
        ) : (
          <>
            {/* Cross Connection - A to B, B to A */}
            <path d="M 180 40 Q 250 20 320 60" 
                  stroke={switch1Position === false && lampOn ? "#ff6b6b" : "#999"} 
                  strokeWidth="3" fill="none"/>
            <path d="M 180 60 Q 250 80 320 40" 
                  stroke={switch1Position === true && lampOn ? "#ff6b6b" : "#999"} 
                  strokeWidth="3" fill="none"/>
            <text x="220" y="25" className="text-xs fill-gray-600">A-B (Cross)</text>
            <text x="220" y="85" className="text-xs fill-gray-600">B-A (Cross)</text>
          </>
        )}
        
        {/* Switch 2 */}
        <SwitchSVG x={320} y={50} position={switch2Position} active={lampOn} label="SW2" />
        
        {/* Line to Lamp */}
        <line x1="380" y1="50" x2="460" y2="50" stroke={lampOn ? "#ff6b6b" : "#999"} strokeWidth="3"/>
        
        {/* Lamp */}
        <circle cx="480" cy="50" r="18" fill={lampOn ? "#ffd93d" : "#f0f0f0"} stroke="#000" strokeWidth="2"/>
        <Lightbulb className={`w-6 h-6 ${lampOn ? 'text-yellow-600' : 'text-gray-400'}`} 
                   style={{position: 'absolute', left: '474px', top: '44px'}} />
        
        {/* Neutral return */}
        <line x1="500" y1="50" x2="540" y2="50" stroke={lampOn ? "#4ecdc4" : "#999"} strokeWidth="3"/>
        <line x1="540" y1="50" x2="540" y2="57" stroke={lampOn ? "#4ecdc4" : "#999"} strokeWidth="3"/>
        <line x1="540" y1="57" x2="70" y2="57" stroke={lampOn ? "#4ecdc4" : "#999"} strokeWidth="3"/>
        
        {/* Current flow indicators */}
        {lampOn && (
          <>
            <circle cx="150" cy="37" r="3" fill="#ff6b6b" className="animate-pulse">
              <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/>
            </circle>
            <circle cx="250" cy={connectionType === 'direct' ? (switch1Position ? 60 : 40) : (switch1Position ? 50 : 50)} r="3" fill="#ff6b6b" className="animate-pulse">
              <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/>
            </circle>
            <circle cx="350" cy="50" r="3" fill="#ff6b6b" className="animate-pulse">
              <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/>
            </circle>
          </>
        )}
        
        {/* Labels */}
        <text x="480" y="25" className="text-xs font-semibold fill-gray-700">Lamp</text>
        <text x="500" y="75" className="text-xs fill-gray-600">Neutral Return</text>
        
        {/* Connection type indicator */}
        <rect x="20" y="100" width="200" height="60" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="1" rx="5"/>
        <text x="30" y="115" className="text-sm font-semibold fill-blue-600">
          {connectionType === 'direct' ? 'Direct Connection' : 'Cross Connection'}
        </text>
        <text x="30" y="130" className="text-xs fill-gray-600">
          {connectionType === 'direct' ? 'A→A, B→B' : 'A→B, B→A'}
        </text>
        <text x="30" y="145" className="text-xs fill-gray-600">
          Lamp ON when switches are
        </text>
        <text x="30" y="155" className="text-xs fill-gray-600">
          {connectionType === 'direct' ? 'in SAME position' : 'in DIFFERENT positions'}
        </text>
      </svg>
    </div>
  );
};
  
const SwitchSVG = ({ x, y, position, active, label }) => {
  return (
    <g>
      {/* Switch body */}
      <rect x={x} y={y-15} width="60" height="30" fill="#e0e0e0" stroke="#000" strokeWidth="1" rx="3"/>
      
      {/* Common terminal (left) */}
      <circle cx={x-5} cy={y} r="3" fill="#ff6b6b"/>
      <text x={x-15} y={y+3} className="text-xs fill-gray-700">C</text>
      
      {/* Terminal A (top right) */}
      <circle cx={x+65} cy={y-10} r="3" fill="#666"/>
      <text x={x+70} y={y-7} className="text-xs fill-gray-700">A</text>
      
      {/* Terminal B (bottom right) */}
      <circle cx={x+65} cy={y+10} r="3" fill="#666"/>
      <text x={x+70} y={y+13} className="text-xs fill-gray-700">B</text>
      
      {/* Switch lever */}
      <line 
        x1={x+10} 
        y1={y} 
        x2={x+55} 
        y2={position ? y+8 : y-8} 
        stroke={active ? "#ff6b6b" : "#999"} 
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      {/* Connection dot */}
      <circle 
        cx={x+55} 
        cy={position ? y+8 : y-8} 
        r="2" 
        fill={active ? "#ff6b6b" : "#999"}
      />
      
      {/* Labels */}
      <text x={x+20} y={y-20} className="text-xs font-semibold fill-gray-700">{label}</text>
    </g>
  );
};

const TruthTable = ({ title, type, currentState }) => {
  const { switch1Position, switch2Position } = currentState;
  
  const getRowHighlight = (sw1, sw2) => {
    const isCurrentRow = (sw1 === switch1Position) && (sw2 === switch2Position);
    return isCurrentRow ? 'bg-yellow-100 border-yellow-300' : '';
  };
  
  const getLampStatus = (sw1, sw2) => {
    if (type === 'direct') {
      return sw1 === sw2 ? 'ON' : 'OFF';
    } else {
      return sw1 !== sw2 ? 'ON' : 'OFF';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h4 className="font-semibold text-blue-700 mb-3 text-center">{title}</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2">Switch 1</th>
              <th className="border border-gray-300 px-3 py-2">Switch 2</th>
              <th className="border border-gray-300 px-3 py-2">Lamp Status</th>
            </tr>   
          </thead>
          <tbody>  
            <tr className={`${getRowHighlight(false, false)} border`}>
              <td className="border border-gray-300 px-3 py-2 text-center">A</td>
              <td className="border border-gray-300 px-3 py-2 text-center">A</td>
              <td className={`border border-gray-300 px-3 py-2 text-center font-semibold ${
                getLampStatus(false, false) === 'ON' ? 'text-green-600' : 'text-red-600'
              }`}>
                {getLampStatus(false, false)}
              </td>
            </tr>
            <tr className={`${getRowHighlight(false, true)} border`}>
              <td className="border border-gray-300 px-3 py-2 text-center">A</td>
              <td className="border border-gray-300 px-3 py-2 text-center">B</td>
              <td className={`border border-gray-300 px-3 py-2 text-center font-semibold ${
                getLampStatus(false, true) === 'ON' ? 'text-green-600' : 'text-red-600'
              }`}>
                {getLampStatus(false, true)}
              </td>
            </tr>
            <tr className={`${getRowHighlight(true, false)} border`}>
              <td className="border border-gray-300 px-3 py-2 text-center">B</td>
              <td className="border border-gray-300 px-3 py-2 text-center">A</td>
              <td className={`border border-gray-300 px-3 py-2 text-center font-semibold ${
                getLampStatus(true, false) === 'ON' ? 'text-green-600' : 'text-red-600'
              }`}>
                {getLampStatus(true, false)}
              </td>
            </tr>
            <tr className={`${getRowHighlight(true, true)} border`}>
              <td className="border border-gray-300 px-3 py-2 text-center">B</td>
              <td className="border border-gray-300 px-3 py-2 text-center">B</td>
              <td className={`border border-gray-300 px-3 py-2 text-center font-semibold ${
                getLampStatus(true, true) === 'ON' ? 'text-green-600' : 'text-red-600'
              }`}>
                {getLampStatus(true, true)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Staircase;