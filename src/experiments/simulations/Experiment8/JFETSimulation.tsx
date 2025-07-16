import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Define types for chart data points
interface DrainDataPoint {
  vds: string;
  id: number;
}

interface TransferDataPoint {
  vgs: string;
  id: number;
}

const JFETSimulation: React.FC = () => {
  const [vgs, setVgs] = useState<number>(-2);
  const [vds, setVds] = useState<number>(4);

  const idss = 10;
  const vp = -4;

  // Calculate drain current based on VGS and VDS
  const calculateId = (vgs: number, vds: number): number => {
    if (vgs >= 0 || vgs <= vp) return 0;
    const id = idss * Math.pow(1 - vgs / vp, 2);
    return Math.min(id, vds < 4 ? (vds * id) / 4 : id);
  };

  // Generate data for Drain Characteristics
  const drainData: DrainDataPoint[] = Array.from({ length: 21 }, (_, i) => {
    const x = i * 0.5;
    return {
      vds: x.toFixed(1),
      id: parseFloat(calculateId(vgs, x).toFixed(2))
    };
  });

  // Generate data for Transfer Characteristics
  const transferData: TransferDataPoint[] = Array.from({ length: 13 }, (_, i) => {
    const x = -6 + i * 0.5;
    return {
      vgs: x.toFixed(1),
      id: parseFloat(calculateId(x, vds).toFixed(2))
    };
  });

  const currentId: string = calculateId(vgs, vds).toFixed(2);

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 bg-white border rounded shadow">
      {/* Control Panel */}
      <div className="bg-gray-100 p-4 rounded w-full lg:w-1/4">
        <h3 className="font-bold text-blue-600 mb-2">⚙️ Control Panel</h3>
        <label className="block font-medium mb-1">V<sub>GS</sub></label>
        <input
          type="range"
          min={-6}
          max={0}
          step={0.5}
          value={vgs}
          onChange={(e) => setVgs(parseFloat(e.target.value))}
          className="w-full mb-2"
        />
        <p>V<sub>GS</sub> = <b>{vgs}V</b></p>

        <label className="block font-medium mt-4 mb-1">V<sub>DS</sub></label>
        <input
          type="range"
          min={0}
          max={10}
          step={0.5}
          value={vds}
          onChange={(e) => setVds(parseFloat(e.target.value))}
          className="w-full mb-2"
        />
        <p>V<sub>DS</sub> = <b>{vds}V</b></p>
      </div>

      {/* Charts Section */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Drain Characteristics */}
        <div className="bg-white p-4 border rounded">
          <h3 className="font-bold mb-2 text-blue-600">📈 Drain Characteristics</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={drainData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="vds" label={{ value: 'VDS (V)', position: 'insideBottomRight', offset: -5 }} />
              <YAxis label={{ value: 'ID (mA)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="id" name={`VGS = ${vgs}V`} stroke="#f97316" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Transfer Characteristics */}
        <div className="bg-white p-4 border rounded">
          <h3 className="font-bold mb-2 text-blue-600">📊 Transfer Characteristics</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={transferData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="vgs" label={{ value: 'VGS (V)', position: 'insideBottomRight', offset: -5 }} />
              <YAxis label={{ value: 'ID (mA)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="id" name={`VDS = ${vds}V`} stroke="#14b8a6" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Output Section */}
      <div className="bg-gray-100 p-4 rounded w-full lg:w-1/4">
        <h3 className="font-bold text-blue-600 mb-3">📟 Output Status</h3>
        <p><b>Drain Current:</b> <span className="text-green-600">{currentId} mA</span></p>
        <p><b>Status:</b> {parseFloat(currentId) > 0 ? '✅ Conducting' : '❌ Cutoff'}</p>
        <p className="mt-3 text-sm"><b>r<sub>d</sub>:</b> {(vds / (parseFloat(currentId) || 1)).toFixed(2)} Ω</p>
        <p className="text-sm"><b>g<sub>m</sub>:</b> {(parseFloat(currentId) / Math.abs(vgs || 0.01)).toFixed(3)} S</p>
        <p className="text-sm"><b>μ:</b> {((vds / (parseFloat(currentId) || 1)) * (parseFloat(currentId) / Math.abs(vgs || 0.01))).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default JFETSimulation;
