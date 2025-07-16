import React, { useCallback, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import ComponentNode from './ComponentNode';
import { Component } from '../types/circuit';

interface CircuitBuilderProps {
  onCircuitChange: (components: Component[], connections: any[]) => void;
}

const nodeTypes = {
  component: ComponentNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const CircuitBuilder: React.FC<CircuitBuilderProps> = ({ onCircuitChange }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedComponent, setSelectedComponent] = useState<string>('');

  const componentLibrary = [
    { type: 'transistor', label: 'NPN Transistor', value: 0, unit: '', icon: '🔌' },
    { type: 'resistor', label: 'Resistor', value: 1000, unit: 'Ω', icon: '⚡' },
    { type: 'capacitor', label: 'Capacitor', value: 10, unit: 'µF', icon: '⚡' },
    { type: 'voltage_source', label: 'DC Source', value: 12, unit: 'V', icon: '🔋' },
    { type: 'load', label: 'Load Resistor', value: 8, unit: 'Ω', icon: '📊' },
    { type: 'ground', label: 'Ground', value: 0, unit: '', icon: '⏚' },
  ];

  const addComponent = (type: string) => {
    const component = componentLibrary.find(c => c.type === type);
    if (!component) return;

    const newNode: Node = {
      id: `${type}-${Date.now()}`,
      type: 'component',
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
      data: {
        ...component,
        id: `${type}-${Date.now()}`,
        position: { x: 0, y: 0 },
        connections: [],
        onValueChange: handleValueChange,
        isSelected: false,
      },
    };

    setNodes((nds) => nds.concat(newNode));
    updateCircuit([...nodes, newNode], edges);
  };

  const handleValueChange = (id: string, value: number) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, value } }
          : node
      )
    );
  };

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = addEdge(params, edges);
      setEdges(newEdge);
      updateCircuit(nodes, newEdge);
    },
    [nodes, edges]
  );

  const updateCircuit = (currentNodes: Node[], currentEdges: Edge[]) => {
    const components: Component[] = currentNodes.map(node => ({
      id: node.id,
      type: node.data.type,
      label: node.data.label,
      value: node.data.value,
      unit: node.data.unit,
      position: node.position,
      connections: currentEdges
        .filter(edge => edge.source === node.id || edge.target === node.id)
        .map(edge => edge.source === node.id ? edge.target : edge.source),
    }));

    const connections = currentEdges.map(edge => ({
      id: edge.id,
      source: edge.source!,
      target: edge.target!,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
    }));

    onCircuitChange(components, connections);
  };

  const clearCircuit = () => {
    setNodes([]);
    setEdges([]);
    onCircuitChange([], []);
  };

  const loadPresetCircuit = () => {
    const presetNodes: Node[] = [
      {
        id: 'vcc',
        type: 'component',
        position: { x: 100, y: 50 },
        data: {
          id: 'vcc',
          type: 'voltage_source',
          label: 'VCC',
          value: 12,
          unit: 'V',
          position: { x: 100, y: 50 },
          connections: [],
          onValueChange: handleValueChange,
          isSelected: false,
        },
      },
      {
        id: 'rc',
        type: 'component',
        position: { x: 200, y: 100 },
        data: {
          id: 'rc',
          type: 'resistor',
          label: 'RC',
          value: 2200,
          unit: 'Ω',
          position: { x: 200, y: 100 },
          connections: [],
          onValueChange: handleValueChange,
          isSelected: false,
        },
      },
      {
        id: 'rb',
        type: 'component',
        position: { x: 50, y: 200 },
        data: {
          id: 'rb',
          type: 'resistor',
          label: 'RB',
          value: 470000,
          unit: 'Ω',
          position: { x: 50, y: 200 },
          connections: [],
          onValueChange: handleValueChange,
          isSelected: false,
        },
      },
      {
        id: 'q1',
        type: 'component',
        position: { x: 200, y: 200 },
        data: {
          id: 'q1',
          type: 'transistor',
          label: 'Q1',
          value: 0,
          unit: '',
          position: { x: 200, y: 200 },
          connections: [],
          onValueChange: handleValueChange,
          isSelected: false,
          properties: { model: '2N2222', beta: 100, vbe: 0.7, vce_sat: 0.2 },
        },
      },
      {
        id: 're',
        type: 'component',
        position: { x: 200, y: 300 },
        data: {
          id: 're',
          type: 'resistor',
          label: 'RE',
          value: 1000,
          unit: 'Ω',
          position: { x: 200, y: 300 },
          connections: [],
          onValueChange: handleValueChange,
          isSelected: false,
        },
      },
      {
        id: 'rl',
        type: 'component',
        position: { x: 350, y: 200 },
        data: {
          id: 'rl',
          type: 'load',
          label: 'RL',
          value: 8,
          unit: 'Ω',
          position: { x: 350, y: 200 },
          connections: [],
          onValueChange: handleValueChange,
          isSelected: false,
        },
      },
      {
        id: 'gnd',
        type: 'component',
        position: { x: 200, y: 400 },
        data: {
          id: 'gnd',
          type: 'ground',
          label: 'GND',
          value: 0,
          unit: '',
          position: { x: 200, y: 400 },
          connections: [],
          onValueChange: handleValueChange,
          isSelected: false,
        },
      },
    ];

    setNodes(presetNodes);
    setEdges([]);
    updateCircuit(presetNodes, []);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Component Library */}
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold mb-3 text-white">Component Library</h3>
        <div className="flex flex-wrap gap-2">
          {componentLibrary.map((component) => (
            <button
              key={component.type}
              onClick={() => addComponent(component.type)}
              className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
            >
              <span className="mr-2">{component.icon}</span>
              {component.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={loadPresetCircuit}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
          >
            Load Class-A Circuit
          </button>
          <button
            onClick={clearCircuit}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
          >
            Clear Circuit
          </button>
        </div>
      </div>

      {/* Circuit Canvas */}
      <div className="flex-1 bg-gray-900">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gray-900"
        >
          <Controls className="bg-gray-800 border-gray-600" />
          <Background 
            variant={BackgroundVariant.Dots} 
            gap={20} 
            size={1} 
            color="#374151"
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export default CircuitBuilder;