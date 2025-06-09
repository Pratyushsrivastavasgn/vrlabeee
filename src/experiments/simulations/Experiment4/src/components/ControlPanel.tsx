import React from 'react';
import { Power, RotateCcw, Lightbulb, Zap } from 'lucide-react';

interface ControlPanelProps {
  circuitState: {
    acSupply: boolean;
    starter: boolean;
    choke: boolean;
    led: boolean;
    tube: boolean;
    switch: boolean;
  };
  toggleComponent: (component: keyof ControlPanelProps['circuitState']) => void;
  resetCircuit: () => void;
  selectedCircuit: 'led' | 'fluorescent';
  setSelectedCircuit: (circuit: 'led' | 'fluorescent') => void;
  darkMode: boolean;
  isCircuitComplete: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  circuitState,
  toggleComponent,
  resetCircuit,
  selectedCircuit,
  setSelectedCircuit,
  darkMode,
  isCircuitComplete
}) => {
  const SwitchButton: React.FC<{
    label: string;
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    color: string;
    optional?: boolean;
  }> = ({ label, active, onClick, icon, color, optional = false }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-between w-full p-3 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 ${
        active
          ? `${color} shadow-lg`
          : darkMode
            ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
      } ${optional ? 'border-dashed' : ''}`}
    >
      <div className="flex items-center space-x-3">
        {icon}
        <div className="text-left">
          <span className="font-medium">{label}</span>
          {optional && (
            <div className="text-xs text-blue-600">Optional</div>
          )}
        </div>
      </div>
      <div className={`w-12 h-6 rounded-full transition-colors ${
        active ? 'bg-white' : darkMode ? 'bg-gray-600' : 'bg-gray-300'
      }`}>
        <div className={`w-5 h-5 rounded-full transition-transform duration-200 mt-0.5 ${
          active ? 'translate-x-6 bg-green-500' : 'translate-x-0.5 bg-gray-400'
        }`} />
      </div>
    </button>
  );

  return (
    <div className={`rounded-xl border-2 p-6 ${
      darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
    } shadow-xl`}>
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Power className="w-5 h-5 mr-2 text-blue-600" />
        Control Panel
      </h3>

      {/* Circuit Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Circuit Type</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setSelectedCircuit('led')}
            className={`p-3 rounded-lg border-2 transition-all ${
              selectedCircuit === 'led'
                ? 'bg-blue-500 border-blue-500 text-white'
                : darkMode
                  ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <Lightbulb className="w-5 h-5 mx-auto mb-1" />
            <div className="text-sm font-medium">LED</div>
          </button>
          <button
            onClick={() => setSelectedCircuit('fluorescent')}
            className={`p-3 rounded-lg border-2 transition-all ${
              selectedCircuit === 'fluorescent'
                ? 'bg-blue-500 border-blue-500 text-white'
                : darkMode
                  ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <Zap className="w-5 h-5 mx-auto mb-1" />
            <div className="text-sm font-medium">Fluorescent</div>
          </button>
        </div>
      </div>

      {/* Component Controls */}
      <div className="space-y-3">
        <SwitchButton
          label="AC Supply (230V)"
          active={circuitState.acSupply}
          onClick={() => toggleComponent('acSupply')}
          icon={<Power className="w-5 h-5" />}
          color="bg-yellow-100 border-yellow-300 text-yellow-800"
        />

        <SwitchButton
          label="Main Switch"
          active={circuitState.switch}
          onClick={() => toggleComponent('switch')}
          icon={<Power className="w-5 h-5" />}
          color="bg-green-100 border-green-300 text-green-800"
        />

        {selectedCircuit === 'led' ? (
          <SwitchButton
            label="LED"
            active={circuitState.led}
            onClick={() => toggleComponent('led')}
            icon={<Lightbulb className="w-5 h-5" />}
            color="bg-red-100 border-red-300 text-red-800"
          />
        ) : (
          <>
            <SwitchButton
              label="Choke/Ballast"
              active={circuitState.choke}
              onClick={() => toggleComponent('choke')}
              icon={<Zap className="w-5 h-5" />}
              color="bg-purple-100 border-purple-300 text-purple-800"
            />

            <SwitchButton
              label="Starter"
              active={circuitState.starter}
              onClick={() => toggleComponent('starter')}
              icon={<Zap className="w-5 h-5" />}
              color="bg-cyan-100 border-cyan-300 text-cyan-800"
              optional={true}
            />

            <SwitchButton
              label="Fluorescent Tube"
              active={circuitState.tube}
              onClick={() => toggleComponent('tube')}
              icon={<Lightbulb className="w-5 h-5" />}
              color="bg-blue-100 border-blue-300 text-blue-800"
            />
          </>
        )}
      </div>

      {/* Status Display */}
      <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Circuit Status:</span>
          <span className={`text-sm font-bold ${
            isCircuitComplete ? 'text-green-600' : 'text-red-600'
          }`}>
            {isCircuitComplete ? 'COMPLETE ✓' : 'INCOMPLETE ✗'}
          </span>
        </div>
        
        {isCircuitComplete && (
          <div className="mt-2 flex items-center text-xs text-green-600">
            <Zap className="w-3 h-3 mr-1 animate-pulse" />
            Current flowing through circuit
          </div>
        )}
        
        {selectedCircuit === 'fluorescent' && (
          <div className="mt-2 text-xs text-blue-600">
            💡 Starter is optional in modern fluorescent circuits
          </div>
        )}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetCircuit}
        className={`w-full mt-4 p-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-center space-x-2 ${
          darkMode
            ? 'bg-red-600 border-red-500 text-white hover:bg-red-700'
            : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
        }`}
      >
        <RotateCcw className="w-4 h-4" />
        <span className="font-medium">Reset Circuit</span>
      </button>
    </div>
  );
};

export default ControlPanel;