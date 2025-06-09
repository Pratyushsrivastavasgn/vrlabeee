import React from 'react';
import { BulbState, SimulationState } from '../types/simulation';

interface ControlPanelProps {
  bulbs: BulbState[];
  simulationState: SimulationState;
  onBulbToggle: (bulbId: string) => void;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  bulbs,
  simulationState,
  onBulbToggle,
  onStart,
  onStop,
  onReset
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">Control Panel</h2>
      
      {/* Main Controls */}
      <div className="space-y-4 mb-6">
        <button
          onClick={onStart}
          disabled={simulationState.isRunning}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
            simulationState.isRunning
              ? 'bg-slate-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 active:transform active:scale-95'
          }`}
        >
          {simulationState.isRunning ? 'MONITORING...' : 'START CYCLE'}
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onStop}
            disabled={!simulationState.isRunning}
            className={`py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
              !simulationState.isRunning
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700 active:transform active:scale-95'
            }`}
          >
            STOP
          </button>
          
          <button
            onClick={onReset}
            className="py-2 px-4 rounded-lg font-medium bg-slate-600 text-white hover:bg-slate-700 transition-all duration-200 active:transform active:scale-95"
          >
            RESET
          </button>
        </div>
      </div>

      {/* Individual Light Controls */}
      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">Individual Controls</h3>
        <div className="space-y-3">
          {bulbs.map((bulb) => (
            <div key={bulb.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  bulb.isOn ? 'bg-yellow-400 shadow-sm shadow-yellow-400' : 'bg-slate-300'
                }`}></div>
                <span className="font-medium text-slate-700">{bulb.name}</span>
                <span className="text-sm text-slate-500">({bulb.wattage}W)</span>
              </div>
              
              <button
                onClick={() => onBulbToggle(bulb.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  bulb.isOn ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    bulb.isOn ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-slate-200 pt-6 mt-6">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => bulbs.forEach(bulb => !bulb.isOn && onBulbToggle(bulb.id))}
            className="py-2 px-3 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
          >
            All ON
          </button>
          <button
            onClick={() => bulbs.forEach(bulb => bulb.isOn && onBulbToggle(bulb.id))}
            className="py-2 px-3 text-sm font-medium bg-slate-100 text-slate-800 rounded-lg hover:bg-slate-200 transition-colors"
          >
            All OFF
          </button>
        </div>
      </div>

      {/* Current Status */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Current Status</h4>
        <div className="text-sm text-blue-800">
          <div className="flex justify-between">
            <span>Lights On:</span>
            <span className="font-semibold">
              {bulbs.filter(b => b.isOn).length} / {bulbs.length}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Total Load:</span>
            <span className="font-semibold">
              {bulbs.reduce((total, bulb) => total + (bulb.isOn ? bulb.wattage : 0), 0)}W
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;