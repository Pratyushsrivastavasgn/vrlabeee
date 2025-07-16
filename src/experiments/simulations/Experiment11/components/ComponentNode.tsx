import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Component } from '../types/circuit';

interface ComponentNodeProps extends NodeProps {
  data: Component & {
    onValueChange: (id: string, value: number) => void;
    isSelected: boolean;
  };
}

const ComponentNode: React.FC<ComponentNodeProps> = ({ data, selected }) => {
  const getComponentIcon = () => {
    switch (data.type) {
      case 'transistor':
        return (
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="20" fill="none" stroke="#fff" strokeWidth="2"/>
            <line x1="15" y1="20" x2="25" y2="30" stroke="#fff" strokeWidth="2"/>
            <line x1="15" y1="40" x2="25" y2="30" stroke="#fff" strokeWidth="2"/>
            <line x1="30" y1="10" x2="30" y2="20" stroke="#fff" strokeWidth="2"/>
            <line x1="30" y1="40" x2="30" y2="50" stroke="#fff" strokeWidth="2"/>
            <line x1="35" y1="20" x2="45" y2="10" stroke="#fff" strokeWidth="2"/>
            <polygon points="40,15 45,10 45,20" fill="#fff"/>
            <text x="50" y="35" fill="#fff" fontSize="8">{data.label}</text>
          </svg>
        );
      case 'resistor':
        return (
          <svg width="60" height="30" viewBox="0 0 60 30">
            <rect x="10" y="10" width="40" height="10" fill="none" stroke="#fff" strokeWidth="2"/>
            <line x1="0" y1="15" x2="10" y2="15" stroke="#fff" strokeWidth="2"/>
            <line x1="50" y1="15" x2="60" y2="15" stroke="#fff" strokeWidth="2"/>
            <text x="15" y="25" fill="#fff" fontSize="8">{data.value}{data.unit}</text>
          </svg>
        );
      case 'capacitor':
        return (
          <svg width="40" height="30" viewBox="0 0 40 30">
            <line x1="18" y1="5" x2="18" y2="25" stroke="#fff" strokeWidth="3"/>
            <line x1="22" y1="5" x2="22" y2="25" stroke="#fff" strokeWidth="3"/>
            <line x1="0" y1="15" x2="18" y2="15" stroke="#fff" strokeWidth="2"/>
            <line x1="22" y1="15" x2="40" y2="15" stroke="#fff" strokeWidth="2"/>
            <text x="5" y="35" fill="#fff" fontSize="8">{data.value}{data.unit}</text>
          </svg>
        );
      case 'voltage_source':
        return (
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="15" fill="none" stroke="#fff" strokeWidth="2"/>
            <line x1="20" y1="0" x2="20" y2="5" stroke="#fff" strokeWidth="2"/>
            <line x1="20" y1="35" x2="20" y2="40" stroke="#fff" strokeWidth="2"/>
            <text x="15" y="25" fill="#fff" fontSize="10">+</text>
            <text x="12" y="45" fill="#fff" fontSize="8">{data.value}V</text>
          </svg>
        );
      case 'ground':
        return (
          <svg width="30" height="30" viewBox="0 0 30 30">
            <line x1="15" y1="0" x2="15" y2="10" stroke="#fff" strokeWidth="2"/>
            <line x1="5" y1="10" x2="25" y2="10" stroke="#fff" strokeWidth="3"/>
            <line x1="8" y1="15" x2="22" y2="15" stroke="#fff" strokeWidth="2"/>
            <line x1="11" y1="20" x2="19" y2="20" stroke="#fff" strokeWidth="1"/>
          </svg>
        );
      case 'load':
        return (
          <svg width="50" height="30" viewBox="0 0 50 30">
            <rect x="10" y="10" width="30" height="10" fill="none" stroke="#00ff88" strokeWidth="2"/>
            <line x1="0" y1="15" x2="10" y2="15" stroke="#fff" strokeWidth="2"/>
            <line x1="40" y1="15" x2="50" y2="15" stroke="#fff" strokeWidth="2"/>
            <text x="15" y="25" fill="#00ff88" fontSize="8">RL</text>
          </svg>
        );
      default:
        return <div className="w-12 h-12 bg-gray-600 rounded"></div>;
    }
  };

  const getHandles = () => {
    switch (data.type) {
      case 'transistor':
        return (
          <>
            <Handle type="target" position={Position.Left} id="base" style={{ top: '50%', background: '#ff6b6b' }} />
            <Handle type="source" position={Position.Top} id="collector" style={{ background: '#4ecdc4' }} />
            <Handle type="source" position={Position.Bottom} id="emitter" style={{ background: '#45b7d1' }} />
          </>
        );
      case 'voltage_source':
        return (
          <>
            <Handle type="source" position={Position.Top} id="positive" style={{ background: '#ff6b6b' }} />
            <Handle type="target" position={Position.Bottom} id="negative" style={{ background: '#666' }} />
          </>
        );
      case 'ground':
        return <Handle type="target" position={Position.Top} id="ground" style={{ background: '#666' }} />;
      default:
        return (
          <>
            <Handle type="target" position={Position.Left} id="left" style={{ background: '#fff' }} />
            <Handle type="source" position={Position.Right} id="right" style={{ background: '#fff' }} />
          </>
        );
    }
  };

  return (
    <div className={`bg-gray-800 border-2 rounded-lg p-2 ${selected ? 'border-blue-400' : 'border-gray-600'} ${data.isSelected ? 'ring-2 ring-blue-400' : ''}`}>
      {getComponentIcon()}
      {getHandles()}
      {(data.type === 'resistor' || data.type === 'capacitor') && (
        <div className="mt-2">
          <input
            type="number"
            value={data.value}
            onChange={(e) => data.onValueChange(data.id, parseFloat(e.target.value) || 0)}
            className="w-16 px-1 py-0.5 text-xs bg-gray-700 text-white rounded border border-gray-600"
            step={data.type === 'capacitor' ? '0.1' : '100'}
          />
        </div>
      )}
    </div>
  );
};

export default ComponentNode;