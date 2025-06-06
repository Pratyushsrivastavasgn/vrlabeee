import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls,
  Node,
  Edge,
  Connection,
  addEdge,
  Handle,
  Position,
  NodeProps
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Circuit, Component, ComponentType, calculateThevenin } from '../utils/circuitUtils';
import { Sliders, Zap, CheckCircle2, Calculator } from 'lucide-react';

const VoltageSourceNode = ({ data }: NodeProps) => (
  <div className="w-20 h-32 border-2 border-red-500 rounded-lg bg-white p-2 shadow-lg">
    <Handle type="source" position={Position.Top} />
    <div className="flex flex-col items-center h-full">
      <span className="font-bold text-sm">{data.label}</span>
      <span className="text-xs text-gray-600">{data.value}V</span>
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="w-2 h-2 bg-red-500 rounded-full" />
        <div className="w-0.5 h-6 bg-red-500" />
        <div className="w-4 h-0.5 bg-red-500" />
        <div className="w-0.5 h-6 bg-red-500" />
        <div className="w-2 h-2 bg-red-500 rounded-full" />
      </div>
    </div>
    <Handle type="target" position={Position.Bottom} />
  </div>
);

const ResistorNode = ({ data }: NodeProps) => (
  <div className="w-32 h-16 border-2 border-blue-500 rounded-lg bg-white p-2 shadow-lg">
    <Handle type="target" position={Position.Left} />
    <div className="flex flex-col items-center">
      <span className="font-bold text-sm">{data.label}</span>
      <span className="text-xs text-gray-600">{data.value}Ω</span>
      <div className="flex items-center justify-center">
        <div className="w-16 h-2 bg-blue-500/20 rounded" />
      </div>
    </div>
    <Handle type="source" position={Position.Right} />
  </div>
);

const LoadNode = ({ data }: NodeProps) => (
  <div className="w-20 h-20 border-2 border-green-500 rounded-full bg-white p-2 shadow-lg flex items-center justify-center animate-pulse">
    <Handle type="target" position={Position.Left} />
    <div className="flex flex-col items-center">
      <span className="font-bold text-sm">LOAD</span>
      <span className="text-xs text-gray-600">{data.resistance}Ω</span>
    </div>
    <Handle type="source" position={Position.Right} />
  </div>
);

const nodeTypes = {
  voltageSource: VoltageSourceNode,
  resistor: ResistorNode,
  load: LoadNode,
};

const CircuitSimulation: React.FC = () => {
  const [circuit, setCircuit] = useState<Circuit>({
    components: [
      { id: '1', type: ComponentType.VoltageSource, value: 12, label: 'V1' },
      { id: '2', type: ComponentType.Resistor, value: 1000, label: 'R1' },
      { id: '3', type: ComponentType.Resistor, value: 2000, label: 'R2' },
    ],
    connections: [],
    loadTerminals: ['2', '3'],
  });

  const [loadResistance, setLoadResistance] = useState(1000);
  const theveninEquivalent = calculateThevenin(circuit);

  const initialNodes: Node[] = [
    {
      id: '1',
      type: 'voltageSource',
      position: { x: 50, y: 100 },
      data: { label: 'V1', value: circuit.components[0].value },
    },
    {
      id: '2',
      type: 'resistor',
      position: { x: 200, y: 50 },
      data: { label: 'R1', value: circuit.components[1].value },
    },
    {
      id: '3',
      type: 'resistor',
      position: { x: 200, y: 150 },
      data: { label: 'R2', value: circuit.components[2].value },
    },
    {
      id: '4',
      type: 'load',
      position: { x: 400, y: 100 },
      data: { resistance: loadResistance },
    },
  ];

  const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-4', source: '2', target: '4' },
    { id: 'e1-3', source: '1', target: '3' },
    { id: 'e3-4', source: '3', target: '4' },
  ];

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges(eds => addEdge(params, eds)),
    []
  );

  const updateComponent = (id: string, value: number) => {
    setCircuit(prev => ({
      ...prev,
      components: prev.components.map(comp =>
        comp.id === id ? { ...comp, value } : comp
      ),
    }));

    setNodes(nds =>
      nds.map(node =>
        node.id === id
          ? { ...node, data: { ...node.data, value } }
          : node
      )
    );
  };

  // Calculate verification values
  const loadCurrent = theveninEquivalent.voltage / (theveninEquivalent.resistance + loadResistance);
  const loadVoltage = loadCurrent * loadResistance;
  
  // Calculate using original circuit for verification
  const r1 = circuit.components[1].value; // R1
  const r2 = circuit.components[2].value; // R2
  const vs = circuit.components[0].value; // Voltage source
  
  const originalCircuitCurrent = vs / (r1 + ((r2 * loadResistance) / (r2 + loadResistance)));
  const originalLoadVoltage = originalCircuitCurrent * ((r2 * loadResistance) / (r2 + loadResistance));
  
  // Calculate percentage difference for verification
  const voltageDifference = Math.abs((loadVoltage - originalLoadVoltage) / originalLoadVoltage * 100);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Sliders className="mr-2 h-6 w-6 text-blue-500" />
            Circuit Configuration
          </h2>
          
          <div className="space-y-4 mb-6">
            {circuit.components.map(component => (
              <div key={component.id} className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    {component.label} 
                    ({component.type === ComponentType.Resistor ? 'Ω' : 'V'})
                  </label>
                  <span className="text-sm font-medium text-blue-600">
                    {component.value} {component.type === ComponentType.Resistor ? 'Ω' : 'V'}
                  </span>
                </div>
                <input
                  type="range"
                  min={component.type === ComponentType.Resistor ? 100 : 1}
                  max={component.type === ComponentType.Resistor ? 10000 : 24}
                  step={component.type === ComponentType.Resistor ? 100 : 0.5}
                  value={component.value}
                  onChange={(e) => updateComponent(component.id, parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            ))}
          </div>

          <div style={{ height: 400 }} className="border border-gray-200 rounded-lg">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              fitView
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Zap className="mr-2 h-6 w-6 text-amber-500" />
            Thévenin Equivalent
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Thévenin Voltage</p>
                <p className="text-2xl font-bold text-blue-600">
                  {theveninEquivalent.voltage.toFixed(2)} V
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Thévenin Resistance</p>
                <p className="text-2xl font-bold text-green-600">
                  {theveninEquivalent.resistance.toFixed(2)} Ω
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Load Resistance
              </label>
              <input
                type="range"
                min={100}
                max={10000}
                step={100}
                value={loadResistance}
                onChange={(e) => setLoadResistance(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>100Ω</span>
                <span>{loadResistance}Ω</span>
                <span>10kΩ</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Load Current</p>
                <p className="text-2xl font-bold text-purple-600">
                  {((theveninEquivalent.voltage / (theveninEquivalent.resistance + loadResistance)) * 1000).toFixed(2)} mA
                </p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Load Voltage</p>
                <p className="text-2xl font-bold text-amber-600">
                  {(theveninEquivalent.voltage * (loadResistance / (theveninEquivalent.resistance + loadResistance))).toFixed(2)} V
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <Calculator className="mr-2 h-6 w-6 text-purple-500" />
          Verification & Calculations
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Original Circuit Analysis</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="text-sm text-gray-600">Step 1: Calculate total resistance</p>
              <div className="font-mono text-sm">
                R<sub>total</sub> = R1 + (R2 ∥ R<sub>L</sub>)
                <br />
                R<sub>parallel</sub> = (R2 × R<sub>L</sub>) / (R2 + R<sub>L</sub>)
                <br />
                = ({r2} × {loadResistance}) / ({r2} + {loadResistance})
                <br />
                = {((r2 * loadResistance) / (r2 + loadResistance)).toFixed(2)}Ω
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="text-sm text-gray-600">Step 2: Calculate circuit current</p>
              <div className="font-mono text-sm">
                I = V<sub>s</sub> / R<sub>total</sub>
                <br />
                = {vs} / {(r1 + ((r2 * loadResistance) / (r2 + loadResistance))).toFixed(2)}
                <br />
                = {originalCircuitCurrent.toFixed(4)}A
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="text-sm text-gray-600">Step 3: Calculate load voltage</p>
              <div className="font-mono text-sm">
                V<sub>L</sub> = I × R<sub>equivalent</sub>
                <br />
                = {originalCircuitCurrent.toFixed(4)} × {((r2 * loadResistance) / (r2 + loadResistance)).toFixed(2)}
                <br />
                = {originalLoadVoltage.toFixed(2)}V
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Thévenin Equivalent Analysis</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="text-sm text-gray-600">Step 1: Calculate load current</p>
              <div className="font-mono text-sm">
                I<sub>L</sub> = V<sub>th</sub> / (R<sub>th</sub> + R<sub>L</sub>)
                <br />
                = {theveninEquivalent.voltage.toFixed(2)} / ({theveninEquivalent.resistance.toFixed(2)} + {loadResistance})
                <br />
                = {loadCurrent.toFixed(4)}A
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="text-sm text-gray-600">Step 2: Calculate load voltage</p>
              <div className="font-mono text-sm">
                V<sub>L</sub> = I<sub>L</sub> × R<sub>L</sub>
                <br />
                = {loadCurrent.toFixed(4)} × {loadResistance}
                <br />
                = {loadVoltage.toFixed(2)}V
              </div>
            </div>
            

            <div className="bg-green-50 p-4 rounded-lg space-y-2">
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                <p className="text-sm font-medium text-green-800">Verification Result</p>
              </div>
              <p className="text-sm text-green-700">
                The difference between the two methods is {voltageDifference.toFixed(4)}%
                {voltageDifference < 0.01 && " - Thévenin's Theorem is verified!"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="text-m text-gray-950 font-semibold">Maximum Power Transfer Theorem</p>
                <p className="text-sm text-gray-600">
                  According to the Maximum Power Transfer Theorem, the load receives maximum power when the load resistance (R<sub>L</sub>) equals the Thévenin resistance (R<sub>th</sub>) of the source network.
              </p>
              <div className="font-mono text-sm text-gray-800 bg-white p-2 rounded border">
                  R<sub>L</sub> = R<sub>th</sub> = {theveninEquivalent.resistance} Ω<br />
                  P<sub>max</sub> = V<sub>th</sub><sup>2</sup> / (4 × R<sub>th</sub>)<br />
                  = ({theveninEquivalent.voltage}<sup>2</sup>) / (4 × {theveninEquivalent.resistance})<br />
                = {((theveninEquivalent.voltage ** 2) / (4 * theveninEquivalent.resistance)).toFixed(2)} W
              </div>
                  <p className="text-sm text-gray-600">
                    This configuration ensures that the load receives the maximum possible power from the source.
                  </p>
              </div>

          </div>
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Key Observations</h3>
          <ul className="list-disc pl-5 space-y-2 text-blue-700">
            <li>Both analysis methods yield the same results, confirming Thévenin's theorem.</li>
            <li>The Thévenin equivalent circuit provides a simpler way to analyze the load behavior.</li>
            <li>Changes in load resistance affect both circuits identically.</li>
            <li>The maximum power transfer occurs when R<sub>L</sub> = R<sub>th</sub>.</li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-blue-800 mb-2">Learning Points</h3>
        <ul className="list-disc pl-5 space-y-2 text-blue-700">
          <li>Adjust the voltage source and resistor values to see how they affect the Thévenin equivalent circuit.</li>
          <li>Notice how the load current and voltage change as you modify the load resistance.</li>
          <li>The Thévenin voltage represents the open-circuit voltage across the load terminals.</li>
          <li>The Thévenin resistance is the equivalent resistance seen by the load looking back into the circuit.</li>
        
        </ul>
        
      </div>
    </div>
  );
};

export default CircuitSimulation;
