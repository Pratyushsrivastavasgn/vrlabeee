import React from 'react';
import { Handle, Position } from 'reactflow';
import { Zap } from 'lucide-react';

interface ResistorNodeProps {
  data: {
    id: string;
    label: string;
    resistance: number;
    voltageDrop: number;
    current: number;
    onChange: (id: string, value: number) => void;
  };
}

// Custom resistor zigzag symbol
const ResistorSymbol = () => (
  <svg width="36" height="16" viewBox="0 0 36 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1 8H5L8 4L12 12L16 4L20 12L24 4L28 12L32 8H35"
      stroke="#fcd34d"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ResistorNode({ data }: ResistorNodeProps) {
  return (
    <div className="w-40 bg-gray-800 border-2 border-indigo-500 rounded-lg overflow-hidden shadow-lg transition-all group hover:border-indigo-400">
      <div className="bg-indigo-900 px-2 py-1 text-center text-sm font-medium text-indigo-100">
        {data.label} - Resistor
      </div>
      
      <div className="p-3 flex flex-col items-center gap-2">
        <div className="flex items-center justify-center">
          <ResistorSymbol />
        </div>
        
        <div className="flex items-center justify-between w-full">
          <span className="text-xs text-gray-400">Resistance:</span>
          <span className="font-mono text-sm font-semibold">{data.resistance}Ω</span>
        </div>
        
        <div className="flex items-center justify-between w-full">
          <span className="text-xs text-gray-400">Voltage Drop:</span>
          <span className="font-mono text-sm font-semibold text-yellow-400">{data.voltageDrop.toFixed(2)}V</span>
        </div>
        
        <div className="flex items-center justify-between w-full">
          <span className="text-xs text-gray-400">Current:</span>
          <span className="font-mono text-sm font-semibold text-blue-400">{data.current.toFixed(3)}A</span>
        </div>
      </div>
      
      {/* Connection points */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#818cf8', width: '10px', height: '10px', border: '2px solid #312e81' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#818cf8', width: '10px', height: '10px', border: '2px solid #312e81' }}
      />
    </div>
  );
}