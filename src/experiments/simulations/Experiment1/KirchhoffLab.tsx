import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';

import BatteryNode from './nodes/BatteryNode';
import ResistorNode from './nodes/ResistorNode';
import CircuitControls from './CircuitControls';

// Define types for node data
type BatteryNodeData = {
  id: string;
  voltage: number;
  current: number;
  onChange: (value: number) => void;
};

type ResistorNodeData = {
  id: string;
  label: string;
  resistance: number;
  voltageDrop: number;
  current: number;
  onChange: (id: string, value: number) => void;
};

const nodeTypes = {
  batteryNode: BatteryNode,
  resistorNode: ResistorNode,
};

export default function KirchhoffLab() {
  const [resistors, setResistors] = useState({
    r1: 100,
    r2: 200,
    r3: 300,
  });

  const [batteryVoltage, setBatteryVoltage] = useState(10);

  const totalResistance = resistors.r1 + resistors.r2 + resistors.r3;
  const current = batteryVoltage / totalResistance;

  const drops = {
    r1: current * resistors.r1,
    r2: current * resistors.r2,
    r3: current * resistors.r3,
  };

  const kvlSum = -batteryVoltage + drops.r1 + drops.r2 + drops.r3;
  const isKvlValid = Math.abs(kvlSum) < 0.001;

  const handleResistorChange = (id: string, value: number) => {
    setResistors((prev) => ({ ...prev, [id]: value }));
  };

  const handleVoltageChange = (value: number) => {
    setBatteryVoltage(value);
  };

  const initialNodes: Node<BatteryNodeData | ResistorNodeData>[] = [
    {
      id: 'battery',
      type: 'batteryNode',
      data: {
        id: 'battery',
        voltage: batteryVoltage,
        current,
        onChange: handleVoltageChange,
      },
      position: { x: 100, y: 150 },
    },
    {
      id: 'r1',
      type: 'resistorNode',
      data: {
        id: 'r1',
        label: 'R1',
        resistance: resistors.r1,
        voltageDrop: drops.r1,
        current,
        onChange: handleResistorChange,
      },
      position: { x: 350, y: 50 },
    },
    {
      id: 'r2',
      type: 'resistorNode',
      data: {
        id: 'r2',
        label: 'R2',
        resistance: resistors.r2,
        voltageDrop: drops.r2,
        current,
        onChange: handleResistorChange,
      },
      position: { x: 600, y: 150 },
    },
    {
      id: 'r3',
      type: 'resistorNode',
      data: {
        id: 'r3',
        label: 'R3',
        resistance: resistors.r3,
        voltageDrop: drops.r3,
        current,
        onChange: handleResistorChange,
      },
      position: { x: 350, y: 250 },
    },
  ];

  const initialEdges: Edge[] = [
    {
      id: 'e1',
      source: 'battery',
      target: 'r1',
      animated: true,
      style: { stroke: '#fcd34d', strokeWidth: 3 },
      label: `${current.toFixed(2)} A`,
    },
    {
      id: 'e2',
      source: 'r1',
      target: 'r2',
      animated: true,
      style: { stroke: '#fcd34d', strokeWidth: 3 },
      label: `${current.toFixed(2)} A`,
    },
    {
      id: 'e3',
      source: 'r2',
      target: 'r3',
      animated: true,
      style: { stroke: '#fcd34d', strokeWidth: 3 },
      label: `${current.toFixed(2)} A`,
    },
    {
      id: 'e4',
      source: 'r3',
      target: 'battery',
      animated: true,
      style: { stroke: '#fcd34d', strokeWidth: 3 },
      label: `${current.toFixed(2)} A`,
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.type === 'batteryNode') {
          return {
            ...node,
            data: {
              ...node.data,
              voltage: batteryVoltage,
              current,
            },
          };
        } else if (node.type === 'resistorNode' && node.id in resistors) {
          const resistance = resistors[node.id as keyof typeof resistors];
          const voltageDrop = current * resistance;
          return {
            ...node,
            data: {
              ...node.data,
              resistance,
              voltageDrop,
              current,
            },
          };
        }
        return node;
      })
    );

    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        animated: true,
        label: `${current.toFixed(2)} A`,
        style: { stroke: '#fcd34d', strokeWidth: 3 },
      }))
    );
  }, [resistors, batteryVoltage, current]);

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
    [setEdges]
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="h-[500px] border border-gray-600 rounded-xl overflow-hidden bg-gray-950 shadow-inner">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
              minZoom={0.5}
              maxZoom={2}
              proOptions={{ hideAttribution: true }}
            >
              <Controls className="bg-gray-800 border-gray-700" />
              <MiniMap style={{ background: '#1f2937' }} nodeColor="#4b5563" />
              <Background color="#4b5563" gap={16} />
            </ReactFlow>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 flex flex-col text-gray-200 shadow-lg">
          <CircuitControls
            resistors={resistors}
            batteryVoltage={batteryVoltage}
            onResistorChange={handleResistorChange}
            onVoltageChange={handleVoltageChange}
          />

          <div className="mt-6 border-t border-gray-700 pt-6">
            <h3 className="text-lg font-semibold mb-4">Circuit Analysis</h3>

            <div className="space-y-3">
              <div>
                <p className="text-gray-500 text-sm">Total Resistance</p>
                <p className="font-mono text-lg">
                  {totalResistance.toFixed(2)} Ω
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Current</p>
                <p className="font-mono text-lg">{current.toFixed(4)} A</p>
              </div>

              <div className="pt-3 border-t border-gray-700">
                <p className="text-gray-400 text-sm">KVL Equation</p>
                <p className="font-mono mt-1">
                  -{batteryVoltage.toFixed(2)}V + {drops.r1.toFixed(2)}V +{' '}
                  {drops.r2.toFixed(2)}V + {drops.r3.toFixed(2)}V ={' '}
                  {kvlSum.toFixed(4)}V
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      isKvlValid ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></div>
                  <p
                    className={`font-medium ${
                      isKvlValid ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {isKvlValid ? 'KVL Verified!' : 'KVL Not Verified'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
