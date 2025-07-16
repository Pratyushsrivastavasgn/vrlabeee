import React, { useState, useEffect, useMemo, useRef } from 'react';

// --- Reusable UI Components ---

const Slider = ({ label, id, min, max, step, value, onChange, unit, displayValue }) => (
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
            <span className="font-mono text-lg text-blue-400 w-28 text-center bg-slate-700 rounded-md py-1">{displayValue} {unit}</span>
        </div>
    </div>
);

const InfoCard = ({ title, value, unit, formula }) => (
    <div className="bg-slate-700/50 p-4 rounded-xl text-center flex flex-col justify-between">
        <div>
            <p className="text-sm font-medium text-slate-400">{title}</p>
            <p className="text-2xl font-mono font-bold text-green-400 mt-1">
                {value} <span className="text-lg">{unit}</span>
            </p>
        </div>
        {formula && <p className="text-xs font-mono text-slate-500 mt-2">{formula}</p>}
    </div>
);


// --- Main Application Components ---

const Header = () => (
    <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white">RC Phase Shift Oscillator</h1>
        <p className="text-slate-400 mt-2 max-w-3xl mx-auto">An interactive simulation of an op-amp based RC phase shift oscillator. Adjust the R and C values to see how they determine the output frequency.</p>
    </header>
);

const Controls = ({ rValue, setRValue, cValue, setCValue }) => {
    const fixedComponents = [
        { title: "Input Resistor (R1)", value: "10 kΩ" },
        { title: "Feedback Resistor (Rf)", value: "290 kΩ" },
        { title: "Gain (A = Rf/R1)", value: "29" },
        { title: "Phase Shift Stages", value: "3" },
    ];

    return (
        <div className="w-full lg:w-1/3">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg h-full">
                <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-600 pb-3">Circuit Parameters</h2>
                <Slider
                    label="Resistance (R)"
                    id="r-slider"
                    min="1000"
                    max="20000"
                    step="100"
                    value={rValue}
                    onChange={(e) => setRValue(parseFloat(e.target.value))}
                    displayValue={(rValue / 1000).toFixed(1)}
                    unit="kΩ"
                />
                <Slider
                    label="Capacitance (C)"
                    id="c-slider"
                    min="1"
                    max="100"
                    step="1"
                    value={cValue}
                    onChange={(e) => setCValue(parseFloat(e.target.value))}
                    displayValue={cValue}
                    unit="nF"
                />
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3 mt-4">Fixed Components & Conditions</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        {fixedComponents.map(c => (
                             <div key={c.title} className="bg-slate-700/50 p-3 rounded-lg">
                                <p className="font-bold">{c.title}</p>
                                <p className="font-mono text-blue-400">{c.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const CircuitDiagram = () => (
    <div className="p-6 border-b border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Circuit Diagram</h2>
        <div className="bg-slate-900 rounded-lg h-80 w-full overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 500 250" className="text-slate-300">
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#90cdf4" />
                    </marker>
                </defs>
                {/* Op-Amp */}
                <path d="M 100 100 L 100 180 L 180 140 Z" stroke="#90cdf4" strokeWidth="1.5" fill="#1e293b" />
                <text x="105" y="120" fontSize="12" fill="currentColor">-</text>
                <text x="105" y="165" fontSize="12" fill="currentColor">+</text>
                <line x1="180" y1="140" x2="220" y2="140" stroke="#90cdf4" strokeWidth="1.5" />
                <text x="195" y="130" fontSize="10" fill="currentColor">Vout</text>

                {/* Inverting Input Path */}
                <line x1="50" y1="120" x2="100" y2="120" stroke="#90cdf4" strokeWidth="1.5" />
                <rect x="30" y="112.5" width="20" height="15" stroke="#90cdf4" strokeWidth="1.5" fill="none" />
                <text x="28" y="105" fontSize="10" fill="currentColor">R1</text>
                
                {/* Feedback Loop */}
                <path d="M 180 140 C 220 100, 90 60, 50 120" stroke="#90cdf4" strokeWidth="1.5" fill="none" />
                <rect x="100" y="62.5" width="40" height="15" stroke="#90cdf4" strokeWidth="1.5" fill="none" />
                <text x="108" y="55" fontSize="10" fill="currentColor">Rf</text>

                {/* Non-inverting to Ground */}
                <line x1="100" y1="160" x2="70" y2="160" stroke="#90cdf4" strokeWidth="1.5" />
                <line x1="70" y1="160" x2="70" y2="180" stroke="#90cdf4" strokeWidth="1.5" />
                <line x1="60" y1="180" x2="80" y2="180" stroke="#90cdf4" strokeWidth="1.5" />
                <line x1="65" y1="185" x2="75" y2="185" stroke="#90cdf4" strokeWidth="1.5" />

                {/* RC Phase Shift Network */}
                <line x1="220" y1="140" x2="250" y2="140" stroke="#90cdf4" strokeWidth="1.5" />
                {/* Stage 1 */}
                <rect x="250" y="132.5" width="40" height="15" stroke="#90cdf4" strokeWidth="1.5" fill="none" />
                <text x="268" y="125" fontSize="10" fill="currentColor">R</text>
                <line x1="290" y1="140" x2="320" y2="140" stroke="#90cdf4" strokeWidth="1.5" />
                <line x1="270" y1="155" x2="270" y2="180" stroke="#90cdf4" strokeWidth="1.5" />
                <line x1="265" y1="155" x2="275" y2="155" stroke="#90cdf4" strokeWidth="1.5" />
                <text x="275" y="170" fontSize="10" fill="currentColor">C</text>
                {/* Stage 2 */}
                <rect x="320" y="132.5" width="40" height="15" stroke="#90cdf4" strokeWidth="1.5" fill="none" />
                <text x="338" y="125" fontSize="10" fill="currentColor">R</text>
                <line x1="360" y1="140" x2="390" y2="140" stroke="#90cdf4" strokeWidth="1.5" />
                <line x1="340" y1="155" x2="340" y2="180" stroke="#90cdf4" strokeWidth="1.5" />
                <line x1="335" y1="155" x2="345" y2="155" stroke="#90cdf4" strokeWidth="1.5" />
                <text x="345" y="170" fontSize="10" fill="currentColor">C</text>
                {/* Stage 3 */}
                <rect x="390" y="132.5" width="40" height="15" stroke="#90cdf4" strokeWidth="1.5" fill="none" />
                <text x="408" y="125" fontSize="10" fill="currentColor">R</text>
                <line x1="430" y1="140" x2="450" y2="140" stroke="#90cdf4" strokeWidth="1.5" />
                <line x1="410" y1="155" x2="410" y2="180" stroke="#90cdf4" strokeWidth="1.5" />
                <line x1="405" y1="155" x2="415" y2="155" stroke="#90cdf4" strokeWidth="1.5" />
                <text x="415" y="170" fontSize="10" fill="currentColor">C</text>

                {/* Ground Line for RC network */}
                <line x1="270" y1="180" x2="410" y2="180" stroke="#90cdf4" strokeWidth="1.5" />
                <line x1="70" y1="180" x2="270" y2="180" stroke="#90cdf4" strokeWidth="1.5" />

                {/* Feedback connection from last stage */}
                <path d="M 450 140 L 450 20 L 30 20 L 30 112.5" stroke="#90cdf4" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
            </svg>
        </div>
    </div>
);

const WaveformGraph = ({ frequency }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        let animationFrameId;

        let time = 0;
        const amplitude = height / 2.5;
        const angularFrequency = 2 * Math.PI * frequency;

        const render = () => {
            time += 0.01;
            ctx.clearRect(0, 0, width, height);

            // Draw grid
            ctx.strokeStyle = '#374151';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < width; i += 20) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, height);
                ctx.stroke();
            }
            for (let i = 0; i < height; i += 20) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(width, i);
                ctx.stroke();
            }
            
            // Draw axes
            ctx.strokeStyle = '#6b7280';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, height / 2);
            ctx.lineTo(width, height / 2);
            ctx.stroke();

            // Draw sine wave
            ctx.beginPath();
            ctx.strokeStyle = '#34d399';
            ctx.lineWidth = 2;
            ctx.moveTo(0, height / 2);

            for (let x = 0; x < width; x++) {
                const y = (height / 2) - amplitude * Math.sin(angularFrequency * (x / width) + time);
                ctx.lineTo(x, y);
            }
            ctx.stroke();
            animationFrameId = window.requestAnimationFrame(render);
        };

        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [frequency]);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">Output Waveform</h2>
            <div className="bg-slate-900 rounded-lg p-2 h-48">
                 <canvas ref={canvasRef} width="500" height="180"></canvas>
            </div>
        </div>
    );
};

const TheorySection = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="px-6 pb-6">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left text-lg font-semibold text-white mb-2 flex items-center justify-between">
                <span>📚 Theory & Working Principle</span>
                <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isOpen && (
                <div className="text-slate-400 space-y-3 text-sm bg-slate-700/30 p-4 rounded-lg">
                    <p>The RC Phase Shift Oscillator produces a stable sine wave output. Its operation relies on two key conditions based on the Barkhausen stability criterion:</p>
                    <ul className="list-disc list-inside space-y-2 pl-2">
                        <li>
                            <strong className="text-slate-200">Phase Shift Condition:</strong> The total phase shift around the feedback loop must be 360° (or 0°). The op-amp is used in an inverting configuration, which provides an initial 180° phase shift. The remaining 180° is provided by the three-stage RC network. Each of the three RC stages contributes a 60° phase shift at the desired oscillation frequency.
                        </li>
                        <li>
                            <strong className="text-slate-200">Gain Condition:</strong> The magnitude of the loop gain must be equal to or greater than 1. The RC network attenuates (reduces) the signal by a factor of 29. Therefore, the op-amp's gain must be at least 29 to compensate for this loss and sustain oscillations. This is set by the ratio <strong className="font-mono">Rf / R1 ≥ 29</strong>.
                        </li>
                    </ul>
                    <p>When both conditions are met, the circuit generates a continuous and stable sine wave at a specific frequency determined by the R and C values.</p>
                </div>
            )}
        </div>
    );
}

// --- Main App Component ---

export default function App() {
    const [rValue, setRValue] = useState(10000); // 10 kΩ
    const [cValue, setCValue] = useState(10);    // 10 nF
    const [frequency, setFrequency] = useState(0);

    useEffect(() => {
        const r = rValue;
        const c = cValue * 1e-9; // convert nF to F
        const f = 1 / (2 * Math.PI * r * c * Math.sqrt(6));
        setFrequency(f);
    }, [rValue, cValue]);

    return (
        <div className="bg-slate-900 text-slate-300 min-h-screen">
            <style>{`
                body { font-family: 'Inter', sans-serif; }
                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none; appearance: none;
                    width: 20px; height: 20px;
                    background: #4299e1; cursor: pointer;
                    border-radius: 50%; border: 2px solid #1a202c;
                }
                input[type="range"]::-moz-range-thumb {
                    width: 20px; height: 20px;
                    background: #4299e1; cursor: pointer;
                    border-radius: 50%; border: 2px solid #1a202c;
                }
            `}</style>
            <div className="container mx-auto p-4 md:p-8">
                <Header />
                <main className="flex flex-col lg:flex-row gap-8">
                    <Controls rValue={rValue} setRValue={setRValue} cValue={cValue} setCValue={setCValue} />
                    <div className="w-full lg:w-2/3">
                        <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg h-full flex flex-col">
                            <div className="p-6 grid grid-cols-2 gap-4 border-b border-slate-700">
                                <InfoCard 
                                    title="Oscillation Frequency" 
                                    value={frequency > 1000 ? (frequency / 1000).toFixed(2) : frequency.toFixed(2)} 
                                    unit={frequency > 1000 ? 'kHz' : 'Hz'}
                                    formula="f = 1/(2πRC√6)"
                                />
                                <InfoCard 
                                    title="Required Gain (A)" 
                                    value="≥ 29" 
                                    unit=""
                                    formula="A = Rf/R1"
                                />
                            </div>
                            <WaveformGraph frequency={frequency / 1000} /> {/* Divide for better visualization speed */}
                            <CircuitDiagram />
                            <TheorySection />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
