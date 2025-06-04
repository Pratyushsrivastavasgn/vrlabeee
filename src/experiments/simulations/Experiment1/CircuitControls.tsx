import React from 'react';
import { Battery, Zap } from 'lucide-react';

interface CircuitControlsProps {
  resistors: {
    r1: number;
    r2: number;
    r3: number;
  };
  batteryVoltage: number;
  onResistorChange: (id: string, value: number) => void;
  onVoltageChange: (value: number) => void;
}

export default function CircuitControls({
  resistors,
  batteryVoltage,
  onResistorChange,
  onVoltageChange
}: CircuitControlsProps) {
  // Input validation to prevent invalid values
  const handleResistorChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      onResistorChange(id, value);
    }
  };

  const handleVoltageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      onVoltageChange(value);
    }
  };

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold">Circuit Controls</h3>
      
      {/* Battery Controls */}
      <div className="p-3 bg-gray-700 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Battery className="text-yellow-400" size={18} />
          <h4 className="font-medium">Battery</h4>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="1"
            max="24"
            step="0.1"
            value={batteryVoltage}
            onChange={handleVoltageChange}
            className="flex-grow h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          <div className="w-20">
            <div className="relative">
              <input
                type="number"
                min="1"
                max="24"
                step="0.1"
                value={batteryVoltage}
                onChange={handleVoltageChange}
                className="w-full pl-2 pr-6 py-1 bg-gray-800 border border-gray-600 rounded text-right"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">V</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Resistor Controls */}
      <div className="space-y-3">
        {Object.entries(resistors).map(([id, value], index) => (
          <div key={id} className="p-3 bg-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="text-yellow-400" size={18} />
              <h4 className="font-medium">{`Resistor ${index + 1} (${id.toUpperCase()})`}</h4>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={value}
                onChange={(e) => handleResistorChange(e, id)}
                className="flex-grow h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
              <div className="w-24">
                <div className="relative">
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    step="10"
                    value={value}
                    onChange={(e) => handleResistorChange(e, id)}
                    className="w-full pl-2 pr-8 py-1 bg-gray-800 border border-gray-600 rounded text-right"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">Ω</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}