import React from 'react';
import { Handle, Position } from 'reactflow';
import { Battery } from 'lucide-react';

interface BatteryNodeProps {
  data: {
    id: string;
    voltage: number;
    current: number;
    onChange: (value: number) => void;
  };
}

export default function BatteryNode({ data }: BatteryNodeProps) {
  return (
    <div className="w-36 h-20 flex flex-col bg-gray-800 border-2 border-yellow-500 rounded-lg overflow-hidden shadow-lg transition-all group hover:border-yellow-400">
      <div className="bg-yellow-900 px-2 py-1 text-center text-sm font-medium text-yellow-100">
        Battery
      </div>
      
      <div className="flex-grow p-2 flex items-center justify-center gap-3">
        <Battery className="text-yellow-400" size={32} />
        <div className="text-center">
          <div className="text-lg font-mono font-bold text-white">
            {data.voltage.toFixed(1)}V
          </div>
          <div className="text-xs text-gray-300">
            {data.current.toFixed(2)}A
          </div>
        </div>
      </div>
      
      {/* Connection points */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#fcd34d', width: '10px', height: '10px', border: '2px solid #78350f' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#fcd34d', width: '10px', height: '10px', border: '2px solid #78350f' }}
      />
    </div>
  );
}