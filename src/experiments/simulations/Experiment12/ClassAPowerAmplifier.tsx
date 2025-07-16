import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';



// --- Helper Components & Icons ---

const ResistorNode = ({ data }) => (
    <div className="p-2 bg-gray-700 border-2 border-gray-500 rounded-md text-white w-32 text-center shadow-lg">
        <div className="text-xs font-mono">{data.label}</div>
        <svg width="80" height="20" viewBox="0 0 80 20" className="mx-auto my-1">
            <path d="M0 10 H10 L15 5 L25 15 L35 5 L45 15 L55 5 L65 15 L70 10 H80" stroke="#a0aec0" strokeWidth="2" fill="none" />
        </svg>
        <div className="text-sm font-bold">{data.value}</div>
    </div>
);

const CapacitorNode = ({ data }) => (
     <div className="p-2 bg-gray-700 border-2 border-gray-500 rounded-md text-white w-32 text-center shadow-lg">
        <div className="text-xs font-mono">{data.label}</div>
        <svg width="40" height="30" viewBox="0 0 40 30" className="mx-auto my-1">
            <path d="M0 15 H15 M25 15 H40 M15 5 V25 M25 5 V25" stroke="#a0aec0" strokeWidth="2" fill="none" />
        </svg>
        <div className="text-sm font-bold">{data.value}</div>
    </div>
);

const TransistorNode = ({ data }) => (
    <div className="p-2 bg-gray-700 border-2 border-gray-500 rounded-md text-white w-32 text-center shadow-lg">
        <div className="text-xs font-mono">{data.label}</div>
        <svg width="60" height="60" viewBox="0 0 60 60" className="mx-auto">
            <circle cx="30" cy="30" r="20" stroke="#a0aec0" strokeWidth="2" fill="none" />
            <path d="M30 10 V 22 M15 30 H 25 M30 38 V 50 M18 42 L30 38 L42 42" stroke="#a0aec0" strokeWidth="2" fill="none" />
            <path d="M25 30 L40 20" stroke="#a0aec0" strokeWidth="2" fill="none" />
            <path d="M35 17 L40 20 L37 25" stroke="#a0aec0" strokeWidth="2" fill="none" />
        </svg>
         <div className="text-sm font-bold">{data.value}</div>
    </div>
);

const VccNode = ({ data }) => (
    <div className="p-2 bg-green-900 border-2 border-green-500 rounded-full text-white w-24 h-24 flex flex-col justify-center items-center shadow-lg">
        <div className="font-bold text-lg">{data.label}</div>
        <div className="text-md">{data.value}</div>
    </div>
);

const GroundNode = () => (
    <div className="p-2 text-white w-24 text-center">
        <svg width="40" height="30" viewBox="0 0 40 30" className="mx-auto">
            <path d="M20 0 V 15 M10 15 H 30 M14 20 H 26 M18 25 H 22" stroke="#a0aec0" strokeWidth="2" fill="none" />
        </svg>
        <div className="text-xs font-mono">GND</div>
    </div>
);

const nodeTypes = { resistor: ResistorNode, capacitor: CapacitorNode, transistor: TransistorNode, vcc: VccNode, ground: GroundNode };

const initialNodes = [
    { id: 'vcc', type: 'vcc', data: { label: 'VCC', value: '12V' }, position: { x: 250, y: 0 }, draggable: false },
    { id: 'r1', type: 'resistor', data: { label: 'R1', value: '10kΩ' }, position: { x: 100, y: 100 }, draggable: false },
    { id: 'r2', type: 'resistor', data: { label: 'R2', value: '2.2kΩ' }, position: { x: 100, y: 250 }, draggable: false },
    { id: 'rc', type: 'resistor', data: { label: 'RC', value: '1kΩ' }, position: { x: 400, y: 100 }, draggable: false },
    { id: 're', type: 'resistor', data: { label: 'RE', value: '100Ω' }, position: { x: 400, y: 350 }, draggable: false },
    { id: 'q1', type: 'transistor', data: { label: 'Q1', value: 'β=100' }, position: { x: 225, y: 200 }, draggable: false },
    { id: 'cin', type: 'capacitor', data: { label: 'Cin', value: '10μF' }, position: { x: 0, y: 175 }, draggable: false },
    { id: 'cout', type: 'capacitor', data: { label: 'Cout', value: '10μF' }, position: { x: 500, y: 175 }, draggable: false },
    { id: 'gnd1', type: 'ground', data: {}, position: { x: 100, y: 350 }, draggable: false },
    { id: 'gnd2', type: 'ground', data: {}, position: { x: 400, y: 450 }, draggable: false },
];

const initialEdges = [
    { id: 'e-vcc-r1', source: 'vcc', target: 'r1', type: 'smoothstep', animated: true },
    { id: 'e-vcc-rc', source: 'vcc', target: 'rc', type: 'smoothstep', animated: true },
    { id: 'e-r1-r2', source: 'r1', target: 'r2', type: 'smoothstep' },
    { id: 'e-r1-q1', source: 'r1', target: 'q1', type: 'smoothstep' },
    { id: 'e-cin-q1', source: 'cin', target: 'q1', type: 'smoothstep' },
    { id: 'e-rc-q1', source: 'rc', target: 'q1', type: 'smoothstep' },
    { id: 'e-q1-re', source: 'q1', target: 're', type: 'smoothstep' },
    { id: 'e-r2-gnd1', source: 'r2', target: 'gnd1', type: 'smoothstep' },
    { id: 'e-re-gnd2', source: 're', target: 'gnd2', type: 'smoothstep' },
    { id: 'e-q1-cout', source: 'q1', target: 'cout', type: 'smoothstep' },
];

// --- Main App Component ---
export default function ClassAAmplifierSim() {
    // --- State Management ---
    const [vcc, setVcc] = useState(12); // Volts
    const [r1, setR1] = useState(10); // kOhms
    const [r2, setR2] = useState(2.2); // kOhms
    const [rc, setRc] = useState(1); // kOhms
    const [re, setRe] = useState(100); // Ohms
    const [beta, setBeta] = useState(100); // Transistor Beta (hFE)
    const [vin, setVin] = useState(10); // mV

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const [calculations, setCalculations] = useState({});
    const scopeCanvasRef = useRef(null);
    const loadlineCanvasRef = useRef(null);
    
    // --- Effect to update node labels when sliders change ---
    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {
                switch (node.id) {
                    case 'vcc':
                        node.data = { ...node.data, value: `${vcc}V` };
                        break;
                    case 'r1':
                        node.data = { ...node.data, value: `${r1}kΩ` };
                        break;
                    case 'r2':
                        node.data = { ...node.data, value: `${r2}kΩ` };
                        break;
                    case 'rc':
                        node.data = { ...node.data, value: `${rc}kΩ` };
                        break;
                    case 're':
                        node.data = { ...node.data, value: `${re}Ω` };
                        break;
                    case 'q1':
                        node.data = { ...node.data, value: `β=${beta}` };
                        break;
                }
                return node;
            })
        );
    }, [vcc, r1, r2, rc, re, beta, setNodes]);


    // --- Calculations Effect ---
    useEffect(() => {
        const R1 = r1 * 1000;
        const R2 = r2 * 1000;
        const RC = rc * 1000;
        const RE = re;

        // DC Analysis
        const Vb = vcc * (R2 / (R1 + R2));
        const Ve = Vb - 0.7; // Assume Vbe = 0.7V
        const Ie = Ve > 0 ? Ve / RE : 0;
        const Ic = Ie; // Assume Ic ~= Ie
        const Vce = vcc - Ic * (RC + RE);

        // AC Analysis
        const re_prime = (Ic > 0) ? 25 / (Ic * 1000) : Infinity; // 25mV / Ie
        const Zin_base = beta * (RE + re_prime);
        const Zin = 1 / (1/R1 + 1/R2 + 1/Zin_base);
        const Av = (RE + re_prime > 0) ? -RC / (RE + re_prime) : 0;
        const Zout = RC;

        // Power
        const Pdc = vcc * Ic;
        const Vout_peak = Math.abs(Av * (vin / 1000));
        const Vout_max_swing = Math.min(Ic * RC, Vce - 0.2); // 0.2V saturation
        const Vout_actual_peak = Math.min(Vout_peak, Vout_max_swing);
        const Pac = (RC > 0) ? Math.pow(Vout_actual_peak, 2) / (2 * RC) : 0;
        const efficiency = (Pdc > 0) ? (Pac / Pdc) * 100 : 0;
        
        setCalculations({ Vb, Ve, Ie, Ic, Vce, Av, Zin, Zout, Pdc, Pac, efficiency });

    }, [vcc, r1, r2, rc, re, beta, vin]);

    // --- Drawing Effects for Canvases ---
    useEffect(() => {
        // Oscilloscope
        const canvas = scopeCanvasRef.current;
        if (!canvas || !calculations.Av) return;
        const ctx = canvas.getContext('2d');
        const { width, height } = canvas;
        const midY = height / 2;
        const vin_V = vin / 1000;
        const vout_V = vin_V * calculations.Av;
        
        ctx.clearRect(0, 0, width, height);

        // Grid
        ctx.strokeStyle = 'rgba(0, 255, 150, 0.2)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < width; i += 20) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke(); }
        for (let i = 0; i < height; i += 20) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(width, i); ctx.stroke(); }
        
        // Vin
        ctx.strokeStyle = '#f6e05e'; // yellow
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let t = 0; t < width; t++) {
            const y = midY - Math.sin(t * 0.1) * (vin_V * 500); // Scaled for visibility
            if (t === 0) ctx.moveTo(t, y); else ctx.lineTo(t, y);
        }
        ctx.stroke();

        // Vout
        ctx.strokeStyle = '#68d391'; // green
        ctx.beginPath();
        for (let t = 0; t < width; t++) {
            let vout_val = Math.sin(t * 0.1) * vout_V;
            // Clipping simulation
            const Vce_sat = 0.2;
            
            let vout_display = vout_val;
            if (calculations.Vce + vout_val > vcc - Vce_sat) {
                vout_display = vcc - Vce_sat - calculations.Vce;
            }
            if (calculations.Vce + vout_val < Vce_sat) {
                vout_display = Vce_sat - calculations.Vce;
            }

            const y = midY - vout_display * 20; // Scale for visibility
            if (t === 0) ctx.moveTo(t, y); else ctx.lineTo(t, y);
        }
        ctx.stroke();
    }, [calculations, vin, vcc, rc]);

    useEffect(() => {
        // Load Line
        const canvas = loadlineCanvasRef.current;
        if (!canvas || !calculations.Vce) return;
        const ctx = canvas.getContext('2d');
        const { width, height } = canvas;
        
        const R_dc = rc * 1000 + re;
        if (R_dc === 0) return;

        const Ic_max = vcc / R_dc; // Saturation current
        const Vce_max = vcc; // Cutoff voltage

        const scaleX = width / (Vce_max * 1.1);
        const scaleY = (Ic_max > 0) ? height / (Ic_max * 1000 * 1.1) : 0;

        ctx.clearRect(0, 0, width, height);
        ctx.font = "10px monospace";
        ctx.fillStyle = "#a0aec0";

        // Axes
        ctx.strokeStyle = "#4a5568";
        ctx.beginPath(); ctx.moveTo(30, 0); ctx.lineTo(30, height - 20); ctx.lineTo(width, height - 20); ctx.stroke();
        ctx.fillText("Ic (mA)", 0, 10);
        ctx.fillText("Vce (V)", width - 50, height - 5);

        // Load Line
        ctx.strokeStyle = "#4299e1"; // blue
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(30, height - 20 - (Ic_max * 1000 * scaleY));
        ctx.lineTo(30 + Vce_max * scaleX, height - 20);
        ctx.stroke();

        // Q-Point
        if(calculations.Vce >= 0 && calculations.Ic >= 0) {
            const qx = 30 + calculations.Vce * scaleX;
            const qy = height - 20 - (calculations.Ic * 1000 * scaleY);
            ctx.fillStyle = "#f56565"; // red
            ctx.beginPath();
            ctx.arc(qx, qy, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = "#f56565";
            ctx.fillText(`Q(${calculations.Vce.toFixed(2)}V, ${ (calculations.Ic * 1000).toFixed(2)}mA)`, qx + 10, qy - 10);
        }

    }, [calculations, vcc, rc, re]);

    const Slider = ({ label, value, min, max, step, unit, onChange }) => (
        <div className="mb-4">
            <label className="flex justify-between text-sm font-medium text-gray-300">
                <span>{label}</span>
                <span className="font-bold text-indigo-400">{value} {unit}</span>
            </label>
            <input type="range" min={min} max={max} step={step} value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer" />
        </div>
    );

    return (
        <div className="bg-gray-900 text-gray-200 min-h-screen p-4 font-sans">
            <div className="max-w-8xl mx-auto">
                <header className="text-center mb-6">
                    <h1 className="text-4xl font-bold text-white">Class-A Power Amplifier Virtual Lab</h1>
                    <p className="text-gray-400 mt-1">Construct, test, and analyze a common-emitter Class-A amplifier.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Controls & Data */}
                    <div className="lg:col-span-1 bg-gray-800 rounded-xl shadow-2xl p-6">
                        <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-3">Control Panel</h2>
                        <Slider label="VCC" value={vcc} min="5" max="24" step="1" unit="V" onChange={setVcc} />
                        <Slider label="R1" value={r1} min="1" max="100" step="0.5" unit="kΩ" onChange={setR1} />
                        <Slider label="R2" value={r2} min="1" max="20" step="0.1" unit="kΩ" onChange={setR2} />
                        <Slider label="RC" value={rc} min="0.1" max="10" step="0.1" unit="kΩ" onChange={setRc} />
                        <Slider label="RE" value={re} min="50" max="1000" step="10" unit="Ω" onChange={setRe} />
                        <Slider label="Transistor Beta (hFE)" value={beta} min="50" max="300" step="10" unit="" onChange={setBeta} />
                        <Slider label="Input Signal (Vin)" value={vin} min="1" max="100" step="1" unit="mV" onChange={setVin} />
                        
                        <h2 className="text-2xl font-semibold mb-4 mt-6 text-white border-b border-gray-700 pb-3">Analysis & Results</h2>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-gray-700/50 p-3 rounded-lg">
                                <p className="text-gray-400">Q-Point Vce</p>
                                <p className="text-xl font-mono text-green-400">{calculations.Vce?.toFixed(2)} V</p>
                            </div>
                            <div className="bg-gray-700/50 p-3 rounded-lg">
                                <p className="text-gray-400">Q-Point Ic</p>
                                <p className="text-xl font-mono text-green-400">{(calculations.Ic * 1000)?.toFixed(2)} mA</p>
                            </div>
                            <div className="bg-gray-700/50 p-3 rounded-lg">
                                <p className="text-gray-400">Voltage Gain (Av)</p>
                                <p className="text-xl font-mono text-green-400">{calculations.Av?.toFixed(2)}</p>
                            </div>
                            <div className="bg-gray-700/50 p-3 rounded-lg">
                                <p className="text-gray-400">Input Z (Zin)</p>
                                <p className="text-xl font-mono text-green-400">{(calculations.Zin / 1000)?.toFixed(2)} kΩ</p>
                            </div>
                            <div className="bg-gray-700/50 p-3 rounded-lg">
                                <p className="text-gray-400">DC Power (Pdc)</p>
                                <p className="text-xl font-mono text-green-400">{(calculations.Pdc * 1000)?.toFixed(2)} mW</p>
                            </div>
                            <div className="bg-gray-700/50 p-3 rounded-lg">
                                <p className="text-gray-400">AC Power (Pac)</p>
                                <p className="text-xl font-mono text-green-400">{(calculations.Pac * 1000)?.toFixed(2)} mW</p>
                            </div>
                            <div className="bg-red-800/50 p-3 rounded-lg col-span-2 text-center">
                                <p className="text-gray-300">Efficiency (η)</p>
                                <p className="text-2xl font-mono text-red-400">{calculations.efficiency?.toFixed(2)} %</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Circuit & Instruments */}
                    <div className="lg:col-span-2 bg-gray-800 rounded-xl shadow-2xl p-6">
                        <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-3">Virtual Breadboard</h2>
                        <div className="w-full h-96 bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-700">
                            <ReactFlow
                                nodes={nodes}
                                edges={edges}
                                onNodesChange={onNodesChange}
                                onEdgesChange={onEdgesChange}
                                nodeTypes={nodeTypes}
                                fitView
                                className="bg-gray-900"
                            >
                                <MiniMap nodeColor="#6366f1" />
                                <Controls />
                                <Background color="#4a5568" gap={16} />
                            </ReactFlow>
                        </div>
                        
                        <h2 className="text-2xl font-semibold mb-4 mt-6 text-white border-b border-gray-700 pb-3">Instrumentation</h2>
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            <div className="bg-black p-2 rounded-lg border-2 border-green-500/50">
                                <h3 className="text-center text-sm text-gray-400">Oscilloscope</h3>
                                 <div className="text-xs text-center mb-1">
                                    <span className="text-yellow-400">■ Vin</span>
                                    <span className="text-green-400 ml-4">■ Vout</span>
                                </div>
                                <canvas ref={scopeCanvasRef} width="400" height="200" className="w-full"></canvas>
                            </div>
                             <div className="bg-gray-900 p-2 rounded-lg border-2 border-blue-500/50">
                                <h3 className="text-center text-sm text-gray-400">DC Load Line</h3>
                                <canvas ref={loadlineCanvasRef} width="400" height="200" className="w-full"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
