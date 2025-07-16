import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Zap, TrendingUp, Settings } from 'lucide-react';

interface MeasurementPanelProps {
  measurements: {
    inputVoltage: number;
    outputVoltage: number;
    inputCurrent: number;
    outputCurrent: number;
    inputPower: number;
    outputPower: number;
    voltageGain: number;
    currentGain: number;
    powerGain: number;
    efficiency: number;
    quiescentPoint: {
      vce: number;
      ic: number;
      ib: number;
    };
  };
  frequencyResponse: Array<{
    frequency: number;
    gain: number;
    phase: number;
  }>;
  isAnalyzing: boolean;
  onStartAnalysis: () => void;
}

const MeasurementPanel: React.FC<MeasurementPanelProps> = ({
  measurements,
  frequencyResponse,
  isAnalyzing,
  onStartAnalysis,
}) => {
  const formatValue = (value: number, unit: string, decimals: number = 2) => {
    if (isNaN(value) || !isFinite(value)) return '---';
    return `${value.toFixed(decimals)} ${unit}`;
  };

  const formatGain = (gain: number) => {
    if (isNaN(gain) || !isFinite(gain)) return '--- dB';
    return `${(20 * Math.log10(Math.abs(gain))).toFixed(1)} dB`;
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white flex items-center">
          <Activity className="mr-2 text-green-400" />
          Circuit Analysis
        </h2>
        <button
          onClick={onStartAnalysis}
          disabled={isAnalyzing}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isAnalyzing
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DC Operating Point */}
        <div className="bg-gray-900 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-yellow-400 flex items-center">
            <Settings className="mr-2" size={18} />
            DC Operating Point (Q-Point)
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Collector-Emitter Voltage (VCE):</span>
              <span className="text-white font-mono">{formatValue(measurements.quiescentPoint.vce, 'V')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Collector Current (IC):</span>
              <span className="text-white font-mono">{formatValue(measurements.quiescentPoint.ic * 1000, 'mA')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Base Current (IB):</span>
              <span className="text-white font-mono">{formatValue(measurements.quiescentPoint.ib * 1000000, 'µA')}</span>
            </div>
          </div>
        </div>

        {/* AC Analysis */}
        <div className="bg-gray-900 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-blue-400 flex items-center">
            <Zap className="mr-2" size={18} />
            AC Signal Analysis
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Input Voltage (Vin):</span>
              <span className="text-white font-mono">{formatValue(measurements.inputVoltage * 1000, 'mV')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Output Voltage (Vout):</span>
              <span className="text-white font-mono">{formatValue(measurements.outputVoltage, 'V')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Input Current (Iin):</span>
              <span className="text-white font-mono">{formatValue(measurements.inputCurrent * 1000000, 'µA')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Output Current (Iout):</span>
              <span className="text-white font-mono">{formatValue(measurements.outputCurrent * 1000, 'mA')}</span>
            </div>
          </div>
        </div>

        {/* Gain Measurements */}
        <div className="bg-gray-900 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-green-400 flex items-center">
            <TrendingUp className="mr-2" size={18} />
            Gain Analysis
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Voltage Gain (Av):</span>
              <span className="text-white font-mono">{formatValue(measurements.voltageGain, '')} ({formatGain(measurements.voltageGain)})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Current Gain (Ai):</span>
              <span className="text-white font-mono">{formatValue(measurements.currentGain, '')} ({formatGain(measurements.currentGain)})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Power Gain (Ap):</span>
              <span className="text-white font-mono">{formatValue(measurements.powerGain, '')} ({formatGain(measurements.powerGain)})</span>
            </div>
          </div>
        </div>

        {/* Power Analysis */}
        <div className="bg-gray-900 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-purple-400">Power Analysis</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Input Power (Pin):</span>
              <span className="text-white font-mono">{formatValue(measurements.inputPower * 1000, 'mW')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Output Power (Pout):</span>
              <span className="text-white font-mono">{formatValue(measurements.outputPower * 1000, 'mW')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Efficiency (η):</span>
              <span className="text-white font-mono">{formatValue(measurements.efficiency, '%')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Frequency Response Chart */}
      {frequencyResponse.length > 0 && (
        <div className="mt-6 bg-gray-900 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-cyan-400">Frequency Response</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={frequencyResponse}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="frequency" 
                  scale="log" 
                  domain={['dataMin', 'dataMax']}
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="gain" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Gain (dB)"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="phase" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  name="Phase (°)"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Analysis Status */}
      <div className="mt-4 p-3 bg-gray-900 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Analysis Status:</span>
          <span className={`font-medium ${isAnalyzing ? 'text-yellow-400' : 'text-green-400'}`}>
            {isAnalyzing ? 'Running simulation...' : 'Ready for analysis'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MeasurementPanel;