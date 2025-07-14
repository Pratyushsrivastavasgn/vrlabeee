import React from 'react';

interface PowerMeterProps {
  currentPower: number;
  totalEnergyUsed: number;
  voltage: number;
  isRunning: boolean;
  progressPercentage: number;
  elapsedTime: number;
  cycleDuration: number;
}

const PowerMeter: React.FC<PowerMeterProps> = ({
  currentPower,
  totalEnergyUsed,
  voltage,
  isRunning,
  progressPercentage,
  elapsedTime,
  cycleDuration
}) => {
  const current = currentPower / voltage; // I = P / V

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const totalCycleTime = formatTime(cycleDuration);
  const currentTime = formatTime(elapsedTime);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">Power Monitor</h2>
      
      {/* Main Display */}
      <div className="bg-black rounded-lg p-6 mb-6 text-green-400 font-mono">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{currentPower.toFixed(1)}</div>
            <div className="text-sm opacity-75">WATTS</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{current.toFixed(2)}</div>
            <div className="text-sm opacity-75">AMPS</div>
          </div>
        </div>
        
        <div className="border-t border-green-800 mt-4 pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{totalEnergyUsed.toFixed(4)}</div>
            <div className="text-sm opacity-75">WATT-HOURS</div>
          </div>
        </div>
      </div>

      {/* Cycle Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600">Cycle Progress</span>
          <span className="text-sm text-slate-600">
            {currentTime} / {totalCycleTime}
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${
              isRunning ? 'bg-blue-600' : 'bg-slate-400'
            }`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="text-xs text-slate-500 mt-1">
          {progressPercentage.toFixed(1)}% Complete
        </div>
      </div>

      {/* Status Indicators */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-slate-50 rounded-lg">
          <div className="text-sm text-slate-600 mb-1">Voltage</div>
          <div className="text-lg font-semibold text-slate-800">{voltage}V</div>
        </div>
        <div className="text-center p-3 bg-slate-50 rounded-lg">
          <div className="text-sm text-slate-600 mb-1">Status</div>
          <div className={`text-lg font-semibold ${
            isRunning ? 'text-green-600' : 'text-slate-500'
          }`}>
            {isRunning ? 'MONITORING' : 'STANDBY'}
          </div>
        </div>
      </div>

      {/* Power Factor and Efficiency Display */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Power Analysis</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-blue-600">Power Factor:</span>
            <span className="ml-2 font-semibold">1.00</span>
          </div>
          <div>
            <span className="text-blue-600">Frequency:</span>
            <span className="ml-2 font-semibold">60 Hz</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerMeter;