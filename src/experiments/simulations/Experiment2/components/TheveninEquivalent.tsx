import React, { useState } from 'react';
import { Circuit } from '../utils/circuitUtils';
import { Zap, Gauge } from 'lucide-react';

interface TheveninEquivalentProps {
  circuit: Circuit;
  theveninVoltage: number;
  theveninResistance: number;
}

const TheveninEquivalent: React.FC<TheveninEquivalentProps> = ({ 
  circuit, 
  theveninVoltage, 
  theveninResistance 
}) => {
  const [loadResistance, setLoadResistance] = useState(1000);
  
  // Calculate current through the load
  const loadCurrent = theveninVoltage / (theveninResistance + loadResistance);
  
  // Calculate voltage across the load
  const loadVoltage = loadCurrent * loadResistance;
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Thévenin Equivalent Circuit</h2>
        <p className="text-gray-600 mb-4">
          The Thévenin equivalent circuit replaces the entire network with a single voltage source (V<sub>th</sub>)
          in series with a resistor (R<sub>th</sub>). This simplification makes circuit analysis much easier.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Thévenin Parameters</h3>
          
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <Zap className="h-8 w-8 text-blue-600 mr-4" />
              <div>
                <p className="text-sm text-gray-500">Thévenin Voltage (V<sub>th</sub>)</p>
                <p className="text-2xl font-bold text-blue-600">{theveninVoltage.toFixed(2)} V</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-teal-50 rounded-lg">
              <Gauge className="h-8 w-8 text-teal-600 mr-4" />
              <div>
                <p className="text-sm text-gray-500">Thévenin Resistance (R<sub>th</sub>)</p>
                <p className="text-2xl font-bold text-teal-600">{theveninResistance.toFixed(2)} Ω</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Equivalent Circuit Diagram</h3>
          
          <div className="border border-gray-200 rounded-lg p-4 h-40 relative">
            {/* Simple Thévenin equivalent circuit drawing */}
            <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2">
              <div className="w-12 h-20 border-2 border-blue-500 rounded-md flex items-center justify-center">
                <span className="text-xs font-bold">V<sub>th</sub></span>
              </div>
            </div>
            
            {/* Wire from voltage source to resistor */}
            <div className="absolute top-1/3 left-1/3 w-1/4 h-0.5 bg-gray-800"></div>
            
            {/* Thévenin resistor */}
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-8 border-2 border-teal-500 rounded-md flex items-center justify-center">
                <span className="text-xs font-bold">R<sub>th</sub></span>
              </div>
            </div>
            
            {/* Wire to load */}
            <div className="absolute top-1/3 right-1/3 w-1/12 h-0.5 bg-gray-800"></div>
            
            {/* Load resistor */}
            <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2">
              <div className="w-16 h-8 border-2 border-green-500 rounded-md flex items-center justify-center">
                <span className="text-xs font-bold">R<sub>L</sub></span>
              </div>
            </div>
            
            {/* Return wire */}
            <div className="absolute top-2/3 left-1/4 right-1/4 h-0.5 bg-gray-800"></div>
            <div className="absolute top-1/3 left-1/4 w-0.5 h-1/3 bg-gray-800"></div>
            <div className="absolute top-1/3 right-1/4 w-0.5 h-1/3 bg-gray-800"></div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Load Analysis</h3>
        
        <div className="mb-4">
          <label htmlFor="load-resistance" className="block text-sm font-medium text-gray-700 mb-1">
            Load Resistance (R<sub>L</sub>)
          </label>
          <div className="flex items-center space-x-4">
            <input
              id="load-resistance"
              type="range"
              min="100"
              max="10000"
              step="100"
              value={loadResistance}
              onChange={(e) => setLoadResistance(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <span className="text-sm font-medium text-gray-900 w-20 text-right">
              {loadResistance} Ω
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Load Resistance</p>
            <p className="text-xl font-bold text-green-600">{loadResistance.toFixed(2)} Ω</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Current Through Load</p>
            <p className="text-xl font-bold text-amber-600">{(loadCurrent * 1000).toFixed(2)} mA</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Voltage Across Load</p>
            <p className="text-xl font-bold text-purple-600">{loadVoltage.toFixed(2)} V</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheveninEquivalent;