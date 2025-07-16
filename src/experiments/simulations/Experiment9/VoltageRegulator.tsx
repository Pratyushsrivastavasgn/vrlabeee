import React, { useState, useEffect, useMemo } from 'react';
// The new 'reactflow' import and its required types
import ReactFlow, {
    MiniMap,
    Background,
    Controls as FlowControls,
    ReactFlowProvider,
    Node,  // + Type for nodes
    Edge,  // + Type for edges
} from 'reactflow';
import 'reactflow/dist/style.css'; // The new way to import styles

// --- Type Definitions for Props and State ---

interface SliderProps {
    label: string;
    id: string;
    min: string;
    max: string;
    step: string;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    unit: string;
    displayValue: string | number;
}

interface InfoCardProps {
    title: string;
    value: string;
    unit: string;
    isRegulated: boolean;
}

interface FixedValueCardProps {
    title: string;
    value: number;
    unit: string;
}

interface ControlsProps {
    vin: number;
    setVin: React.Dispatch<React.SetStateAction<number>>;
    rl: number;
    setRl: React.Dispatch<React.SetStateAction<number>>;
}

interface OutputsState {
    vout: number;
    il: number;
    ib: number;
    iz: number;
    isRegulated: boolean;
}

interface OutputsProps {
    outputs: OutputsState;
}


// --- Reusable UI Components (Typed) ---

const Slider: React.FC<SliderProps> = ({ label, id, min, max, step, value, onChange, unit, displayValue }) => (
    <div className="mb-6">
        <label htmlFor={id} className="block mb-2 font-medium text-slate-200">{label}</label>
        <div className="flex items-center gap-4">
            <input
                type="range"
                id={id}
                min={min}
                max={max}
                value={value}
                step={step}
                onChange={onChange}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="font-mono text-lg text-blue-400 w-24 text-center bg-slate-700 rounded-md py-1">{displayValue} {unit}</span>
        </div>
    </div>
);

const InfoCard: React.FC<InfoCardProps> = ({ title, value, unit, isRegulated }) => {
    const textColor = isRegulated ? 'text-green-400' : 'text-yellow-400';
    return (
        <div className="bg-slate-700/50 p-4 rounded-xl text-center">
            <p className="text-sm font-medium text-slate-400">{title}</p>
            <p className={`text-2xl font-mono font-bold ${textColor} mt-1`}>
                {value} <span className="text-lg">{unit}</span>
            </p>
        </div>
    );
};

const FixedValueCard: React.FC<FixedValueCardProps> = ({ title, value, unit }) => (
     <div className="bg-slate-700/50 p-3 rounded-lg">
        <p className="font-bold">{title}</p>
        <p className="font-mono text-blue-400">{value} {unit}</p>
    </div>
);


// --- Main Application Components (Typed) ---

const Header: React.FC = () => (
    <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Transistor Series Voltage Regulator</h1>
        <p className="text-slate-400 mt-2 max-w-3xl mx-auto">An interactive simulation to demonstrate how a pass transistor and a Zener diode work together to maintain a constant output voltage despite changes in input voltage or load current.</p>
    </header>
);

const Controls: React.FC<ControlsProps> = ({ vin, setVin, rl, setRl }) => {
    const fixedComponents: FixedValueCardProps[] = [
        { title: "Zener Voltage (Vz)", value: 5.1, unit: "V" },
        { title: "Series Resistor (Rs)", value: 220, unit: "Ω" },
        { title: "Transistor Vbe", value: 0.7, unit: "V" },
        { title: "Transistor β", value: 100, unit: "" },
    ];

    return (
        <div className="w-full lg:w-1/3">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg h-full">
                <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-600 pb-3">Circuit Parameters</h2>
                <Slider
                    label="Input Voltage (Vin)"
                    id="vin-slider"
                    min="6"
                    max="25"
                    step="0.1"
                    value={vin}
                    onChange={(e) => setVin(parseFloat(e.target.value))}
                    displayValue={vin.toFixed(1)}
                    unit="V"
                />
                <Slider
                    label="Load Resistance (RL)"
                    id="rl-slider"
                    min="100"
                    max="2000"
                    step="10"
                    value={rl}
                    onChange={(e) => setRl(parseFloat(e.target.value))}
                    displayValue={rl >= 1000 ? (rl / 1000).toFixed(1) : rl}
                    unit={rl >= 1000 ? "kΩ" : "Ω"}
                />
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3 mt-4">Fixed Components</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        {fixedComponents.map(c => <FixedValueCard key={c.title} {...c} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- React Flow Circuit Diagram (Typed) ---
// By using the `Node[]` and `Edge[]` types, TypeScript ensures our definitions are correct.
const initialNodes: Node[] = [
    { id: 'vin-line', type: 'input', data: { label: 'Vin' }, position: { x: 0, y: 50 }, draggable: false, style: { width: 80, textAlign: 'center' } },
    { id: 'gnd-line', type: 'output', data: { label: 'GND' }, position: { x: 0, y: 350 }, draggable: false, style: { width: 80, textAlign: 'center' } },
    { id: 'rs', data: { label: 'Rs (220Ω)' }, position: { x: 150, y: 50 }, draggable: false },
    { id: 'q1', type: 'default', data: { label: 'Q1 (Pass Transistor)' }, position: { x: 300, y: 120 }, draggable: false, style: { backgroundColor: '#334155', color: 'white', borderColor: '#475569', width: 150 } },
    { id: 'd1', data: { label: 'D1 (Zener 5.1V)' }, position: { x: 150, y: 200 }, draggable: false },
    { id: 'rl', data: { label: 'RL (Load)' }, position: { x: 450, y: 200 }, draggable: false },
    { id: 'j1', data: { label: '' }, position: { x: 250, y: 50 }, style: { width: 10, height: 10, backgroundColor: '#90cdf4' }, draggable: false },
    { id: 'j2', data: { label: '' }, position: { x: 450, y: 145 }, style: { width: 10, height: 10, backgroundColor: '#90cdf4' }, draggable: false },
    { id: 'j3', data: { label: '' }, position: { x: 250, y: 350 }, style: { width: 10, height: 10, backgroundColor: '#90cdf4' }, draggable: false },
    { id: 'j4', data: { label: '' }, position: { x: 450, y: 350 }, style: { width: 10, height: 10, backgroundColor: '#90cdf4' }, draggable: false },
    { id: 'j-base', data: { label: '' }, position: { x: 250, y: 200 }, style: { width: 10, height: 10, backgroundColor: '#90cdf4' }, draggable: false },
];
const initialEdges: Edge[] = [
    { id: 'e-vin-rs', source: 'vin-line', target: 'rs', animated: true, style: { stroke: '#4299e1' } },
    { id: 'e-rs-j1', source: 'rs', target: 'j1', animated: true, style: { stroke: '#4299e1' } },
    { id: 'e-j1-q1', source: 'j1', target: 'q1', type: 'step', animated: true, style: { stroke: '#4299e1' }, label: 'Collector' },
    { id: 'e-j1-jbase', source: 'j1', target: 'j-base', type: 'step', animated: true, style: { stroke: '#4299e1' } },
    { id: 'e-jbase-q1', source: 'j-base', target: 'q1', type: 'step', animated: true, style: { stroke: '#4299e1' }, label: 'Base' },
    { id: 'e-jbase-d1', source: 'j-base', target: 'd1', type: 'step', animated: true, style: { stroke: '#4299e1' } },
    { id: 'e-q1-j2', source: 'q1', target: 'j2', type: 'step', animated: true, style: { stroke: '#4299e1' }, label: 'Emitter' },
    { id: 'e-j2-rl', source: 'j2', target: 'rl', type: 'step', animated: true, style: { stroke: '#4299e1' } },
    { id: 'e-rl-j4', source: 'rl', target: 'j4', type: 'step', animated: true, style: { stroke: '#4299e1' } },
    { id: 'e-d1-j3', source: 'd1', target: 'j3', type: 'step', animated: true, style: { stroke: '#4299e1' } },
    { id: 'e-gnd-j3', source: 'gnd-line', target: 'j3', animated: true, style: { stroke: '#4299e1' } },
    { id: 'e-j3-j4', source: 'j3', target: 'j4', type: 'step', animated: true, style: { stroke: '#4299e1' } },
];


const CircuitDiagram: React.FC = () => (
    <div className="p-6 border-b border-slate-700 h-96">
        <h2 className="text-xl font-bold text-white mb-4">Circuit Diagram</h2>
        <div className="bg-slate-900 rounded-lg h-full">
            <ReactFlow
                nodes={initialNodes}
                edges={initialEdges}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                fitView
                minZoom={0.8}
                maxZoom={2}
                proOptions={{ hideAttribution: true }}
            >
                <MiniMap nodeColor="#4299e1" />
                <FlowControls />
                <Background color="#4a5568" gap={16} />
            </ReactFlow>
        </div>
    </div>
);


const Outputs: React.FC<OutputsProps> = ({ outputs }) => {
    const { vout, il, ib, iz, isRegulated } = outputs;
    return (
        <div className="p-6 flex-grow">
            <h2 className="text-xl font-bold text-white mb-4">Live Outputs</h2>
            {!isRegulated && (
                 <div className="mb-4 p-3 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                    <p className="font-bold">Unregulated!</p>
                    <p className="text-sm">Input voltage is too low or load is too high for regulation.</p>
                </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <InfoCard title="Output Voltage" value={vout.toFixed(2)} unit="V" isRegulated={isRegulated} />
                <InfoCard title="Load Current" value={(il * 1000).toFixed(2)} unit="mA" isRegulated={isRegulated} />
                <InfoCard title="Base Current" value={(ib * 1000000).toFixed(2)} unit="µA" isRegulated={isRegulated} />
                <InfoCard title="Zener Current" value={(iz > 0 ? iz * 1000 : 0).toFixed(2)} unit="mA" isRegulated={isRegulated} />
            </div>
        </div>
    );
};


// --- Main App Component ---

const App: React.FC = () => {
    // --- State Management (Typed) ---
    const [vin, setVin] = useState<number>(12.0);
    const [rl, setRl] = useState<number>(1000);
    const [outputs, setOutputs] = useState<OutputsState>({
        vout: 0, il: 0, ib: 0, iz: 0, isRegulated: true,
    });

    // --- Circuit Constants ---
    const circuitConstants = useMemo(() => ({
        VZ: 5.1, VBE: 0.7, BETA: 100, RS: 220, IZ_KNEE: 0.001,
    }), []);

    // --- Calculation Logic ---
    useEffect(() => {
        const { VZ, VBE, BETA, RS, IZ_KNEE } = circuitConstants;
        let isRegulated = true;
        const regulatedVout = VZ - VBE;
        const is = (vin - VZ) / RS;
        const il = regulatedVout / rl;
        const ib = il / BETA;
        const iz = is - ib;
        if (vin < VZ + VBE || iz < IZ_KNEE) {
            isRegulated = false;
        }
        setOutputs({ vout: regulatedVout, il, ib, iz, isRegulated });
    }, [vin, rl, circuitConstants]);

    return (
        <ReactFlowProvider>
            <div className="bg-slate-900 text-slate-300 min-h-screen">
                <style>{`
                    body { font-family: 'Inter', sans-serif; }
                    .react-flow__node {
                        background: #334155;
                        color: #e2e8f0;
                        border: 1px solid #475569;
                    }
                    .react-flow__edge-path { stroke-width: 2; }
                    .react-flow__edge-text {
                        fill: #cbd5e1;
                        font-size: 12px;
                    }
                    input[type="range"]::-webkit-slider-thumb {
                        -webkit-appearance: none; appearance: none;
                        width: 20px; height: 20px;
                        background: #4299e1; cursor: pointer; border-radius: 50%;
                        border: 2px solid #1a202c;
                    }
                    input[type="range"]::-moz-range-thumb {
                        width: 20px; height: 20px;
                        background: #4299e1; cursor: pointer; border-radius: 50%;
                        border: 2px solid #1a202c;
                    }
                `}</style>
                <div className="container mx-auto p-4 md:p-8">
                    <Header />
                    <main className="flex flex-col lg:flex-row gap-8">
                        <Controls vin={vin} setVin={setVin} rl={rl} setRl={setRl} />
                        <div className="w-full lg:w-2/3">
                            <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg h-full flex flex-col">
                                <CircuitDiagram />
                                <Outputs outputs={outputs} />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </ReactFlowProvider>
    );
}

export default App;