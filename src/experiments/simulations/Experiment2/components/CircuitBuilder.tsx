import React from 'react';
import { Circuit, ComponentType } from '../utils/circuitUtils';
import CircuitDiagram from './CircuitDiagram';
import { Sliders } from 'lucide-react';

interface CircuitBuilderProps {
  circuit: Circuit;
  updateComponent: (id: string, value: number) => void;
}

const CircuitBuilder: React.FC<CircuitBuilderProps> = ({ circuit, updateComponent }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Circuit Configuration</h2>
        <p className="text-gray-600 mb-4">
          Adjust the component values to see how they affect the Thévenin equivalent circuit.
          The load terminals are marked in the circuit diagram.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <Sliders className="mr-2 h-5 w-5 text-blue-500" />
            Component Values
          </h3>
          <div className="space-y-6">
            {circuit.components.map(component => (
              <div key={component.id} className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor={`component-${component.id}`} className="text-sm font-medium text-gray-700">
                    {component.label} 
                    ({component.type === ComponentType.Resistor ? 'Ω' : 'V'})
                  </label>
                  <span className="text-sm font-medium text-blue-600">
                    {component.value} {component.type === ComponentType.Resistor ? 'Ω' : 'V'}
                  </span>
                </div>
                <input
                  id={`component-${component.id}`}
                  type="range"
                  min={component.type === ComponentType.Resistor ? 100 : 1}
                  max={component.type === ComponentType.Resistor ? 10000 : 24}
                  step={component.type === ComponentType.Resistor ? 100 : 0.5}
                  value={component.value}
                  onChange={(e) => updateComponent(component.id, parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Circuit Diagram</h3>
          <CircuitDiagram circuit={circuit} />
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
        <h3 className="text-lg font-medium text-blue-800 mb-2">Analysis</h3>
        <p className="text-blue-700">
          This circuit contains {circuit.components.filter(c => c.type === ComponentType.VoltageSource).length} voltage 
          source(s) and {circuit.components.filter(c => c.type === ComponentType.Resistor).length} resistor(s).
          According to Thévenin's Theorem, this can be simplified to an equivalent circuit with a single voltage source
          and a single series resistor.
        </p>
        <div className="mt-4">
          <button 
            onClick={() => {}} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Calculate Thévenin Equivalent
          </button>
        </div>
      </div>
    </div>
  );
};

export default CircuitBuilder;