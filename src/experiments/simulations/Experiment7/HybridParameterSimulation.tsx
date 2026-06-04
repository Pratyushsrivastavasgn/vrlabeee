import React, { useMemo, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type ComponentKey = 'vbb' | 'rb' | 'ib' | 'bjt' | 'vbe' | 'ic' | 'rc' | 'vcc' | 'vce' | 'ground';
type SlotId = 'vbb' | 'rb' | 'ib' | 'bjt' | 'vbe' | 'ic' | 'rc' | 'vcc' | 'vce' | 'ground';

type SlotDef = {
  id: SlotId;
  label: string;
  accepts: ComponentKey;
  x: number;
  y: number;
  width: number;
  height: number;
};

type MeasurementRow = {
  vbe: number;
  ib: number;
  vce: number;
  ic: number;
};

type CurvePoint = {
  x: number;
  y1?: number;
  y2?: number;
  y3?: number;
  y4?: number;
};

type PaletteItem = {
  key: ComponentKey;
  label: string;
  description: string;
  tint: string;
  assetPath: string;
};

const palette: PaletteItem[] = [
  {
    key: 'vbb',
    label: 'VBB',
    description: 'Base supply',
    tint: '#dbeafe',
    assetPath: '/assets/images/Experiment7/palette/vbb.png',
  },
  {
    key: 'rb',
    label: 'RB',
    description: '100kΩ resistor',
    tint: '#fef3c7',
    assetPath: '/assets/images/Experiment7/palette/rb.png',
  },
  {
    key: 'ib',
    label: 'IB',
    description: 'Microammeter',
    tint: '#ede9fe',
    assetPath: '/assets/images/Experiment7/palette/ib.png',
  },
  {
    key: 'bjt',
    label: 'BJT',
    description: 'BC107 transistor',
    tint: '#dcfce7',
    assetPath: '/assets/images/Experiment7/palette/bjt.png',
  },
  {
    key: 'vbe',
    label: 'VBE',
    description: 'Voltmeter',
    tint: '#e0f2fe',
    assetPath: '/assets/images/Experiment7/palette/vbe.png',
  },
  {
    key: 'ic',
    label: 'IC',
    description: 'Ammeter',
    tint: '#ede9fe',
    assetPath: '/assets/images/Experiment7/palette/ic.png',
  },
  {
    key: 'rc',
    label: 'RC',
    description: '1kΩ resistor',
    tint: '#fef3c7',
    assetPath: '/assets/images/Experiment7/palette/rc.png',
  },
  {
    key: 'vcc',
    label: 'VCC',
    description: 'Collector supply',
    tint: '#dbeafe',
    assetPath: '/assets/images/Experiment7/palette/vcc.png',
  },
  {
    key: 'vce',
    label: 'VCE',
    description: 'Voltmeter',
    tint: '#e0f2fe',
    assetPath: '/assets/images/Experiment7/palette/vce.png',
  },
  {
    key: 'ground',
    label: 'Ground',
    description: 'Reference',
    tint: '#f1f5f9',
    assetPath: '/assets/images/Experiment7/palette/ground.png',
  },
];

const slots: SlotDef[] = [
  { id: 'vbb', label: 'VBB', accepts: 'vbb', x: 60, y: 260, width: 80, height: 80 },
  { id: 'rb', label: 'RB', accepts: 'rb', x: 160, y: 190, width: 80, height: 60 },
  { id: 'ib', label: 'IB', accepts: 'ib', x: 300, y: 190, width: 80, height: 60 },
  { id: 'bjt', label: 'BC107', accepts: 'bjt', x: 470, y: 150, width: 100, height: 160 },
  { id: 'vbe', label: 'VBE', accepts: 'vbe', x: 380, y: 270, width: 80, height: 80 },
  { id: 'ic', label: 'IC', accepts: 'ic', x: 660, y: 90, width: 80, height: 60 },
  { id: 'rc', label: 'RC', accepts: 'rc', x: 800, y: 90, width: 80, height: 60 },
  { id: 'vcc', label: 'VCC', accepts: 'vcc', x: 880, y: 230, width: 80, height: 80 },
  { id: 'vce', label: 'VCE', accepts: 'vce', x: 560, y: 230, width: 80, height: 80 },
  { id: 'ground', label: 'GND', accepts: 'ground', x: 480, y: 400, width: 80, height: 50 },
];

const initialPlacement = slots.reduce((acc, slot) => {
  acc[slot.id] = null;
  return acc;
}, {} as Record<SlotId, ComponentKey | null>);

const measurementRows: MeasurementRow[] = [
  { vbe: 0.61, ib: 6, vce: 8.8, ic: 0.6 },
  { vbe: 0.65, ib: 14, vce: 7.0, ic: 1.7 },
  { vbe: 0.68, ib: 26, vce: 5.4, ic: 3.2 },
  { vbe: 0.70, ib: 40, vce: 4.0, ic: 4.8 },
  { vbe: 0.72, ib: 58, vce: 3.0, ic: 6.5 },
];

const inputCurve: CurvePoint[] = [

  { x: 0.55, y1: 0.05, y2: 0.05, y3: 0.05, y4: 0.05 },
  { x: 0.58, y1: 0.30, y2: 0.20, y3: 0.15, y4: 0.10 },
  { x: 0.60, y1: 2.0,  y2: 1.5,  y3: 1.0,  y4: 0.8 },
  { x: 0.62, y1: 12,   y2: 8,    y3: 5,    y4: 3 },
  { x: 0.64, y1: 45,   y2: 30,   y3: 18,   y4: 10 },
  { x: 0.66, y1: 130,  y2: 90,   y3: 60,   y4: 35 },
  { x: 0.68, y1: 280,  y2: 220,  y3: 150,  y4: 100 },
  { x: 0.70, y1: 500,  y2: 420,  y3: 330,  y4: 250 },
  { x: 0.72, y1: 800,  y2: 700,  y3: 600,  y4: 500 }

];

const outputCurve: CurvePoint[] = [

  { x: 0.0, y0: 0,  y1: 0,  y2: 0,  y3: 0,  y4: 0,  y5: 0 },
  { x: 0.2, y0: 0,  y1: 4,  y2: 8,  y3: 13, y4: 18, y5: 22 },
  { x: 0.4, y0: 0,  y1: 6,  y2: 13, y3: 20, y4: 27, y5: 34 },
  { x: 0.6, y0: 0,  y1: 7,  y2: 16, y3: 24, y4: 33, y5: 42 },
  { x: 0.8, y0: 0,  y1: 8,  y2: 18, y3: 27, y4: 37, y5: 46 },
  { x: 1.0, y0: 0,  y1: 8,  y2: 20, y3: 30, y4: 40, y5: 50 },
  { x: 2.0, y0: 0,  y1: 8,  y2: 20, y3: 30, y4: 40, y5: 50 },
  { x: 3.0, y0: 0,  y1: 8,  y2: 20, y3: 30, y4: 40, y5: 50 },
  { x: 4.0, y0: 0,  y1: 8,  y2: 20, y3: 30, y4: 40, y5: 50 },
  { x: 5.0, y0: 0,  y1: 8,  y2: 20, y3: 30, y4: 40, y5: 50 },
  { x: 6.0, y0: 0,  y1: 8,  y2: 20, y3: 30, y4: 40, y5: 50 }

];

const defaultMeasurementDisplay = {
  vbe: 0.71,
  ib: 18.2,
  vce: 6.42,
  ic: 1.83,
};

const hParameters = {
  hie: 39011,
  hfe: 100.55,
  hre: 0.1105,
  hoe: 0.000285,
};

const formatMicro = (value: number) => `${value.toFixed(2)} µA`;
const formatMilli = (value: number) => `${value.toFixed(2)} mA`;

const HybridParameterSimulation = () => {
  const [placed, setPlaced] = useState<Record<SlotId, ComponentKey | null>>(initialPlacement);
  const [dragKey, setDragKey] = useState<ComponentKey | null>(null);
  const [selectedKey, setSelectedKey] = useState<ComponentKey | null>(null);
  const [vbeSlider, setVbeSlider] = useState<number>(0.71);
  const [ibSlider, setIbSlider] = useState<number>(18.2);
  const [currentMeasurement, setCurrentMeasurement] = useState(defaultMeasurementDisplay);

  // Update measurement whenever sliders change
  React.useEffect(() => {
    const vce = Math.max(0.2, 10 - (ibSlider / 100) * 2);
    const ic = (ibSlider / 100) * 3.5;
    setCurrentMeasurement({ vbe: vbeSlider, ib: ibSlider, vce, ic });
  }, [vbeSlider, ibSlider]);

  const isCorrect = useMemo(() => slots.every((slot) => placed[slot.id] === slot.accepts), [placed]);

  const handlePaletteDragStart = (key: ComponentKey) => (event: React.DragEvent<HTMLButtonElement>) => {
    event.dataTransfer.effectAllowed = 'copy';
    event.dataTransfer.setData('text/plain', key);
    setDragKey(key);
  };

  const handlePaletteClick = (key: ComponentKey) => {
    setSelectedKey(key);
  };

  const handleSlotDrop = (slotId: SlotId) => (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const raw = event.dataTransfer.getData('text/plain');
    const key = (raw || dragKey) as ComponentKey | null;
    if (!key) return;
    setPlaced((current) => ({ ...current, [slotId]: key }));
    setDragKey(null);
    setSelectedKey(null);
  };

  const handleSlotClick = (slotId: SlotId) => {
    if (!selectedKey) return;
    setPlaced((current) => ({ ...current, [slotId]: selectedKey }));
    setSelectedKey(null);
  };

  const resetBoard = () => {
    setPlaced(initialPlacement);
    setDragKey(null);
    setSelectedKey(null);
  };



  const slotStatus = (slot: SlotDef) => {
    const value = placed[slot.id];
    if (!value) return 'empty';
    return value === slot.accepts ? 'correct' : 'wrong';
  };

  const boardMessage = isCorrect
    ? 'Circuit is correct. Graph and calculation table are unlocked.'
    : 'Place the exact components into the matching slots.';

  return (
    <div className="space-y-6 rounded-xl bg-gradient-to-br from-slate-50 via-white to-blue-50 p-4 md:p-6">
      <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-3 text-sm text-slate-700">
        <p className="font-semibold">Experiment 7: Common Emitter hybrid-parameter puzzle</p>
        <p>Drag the exact lab components from the left palette into the matching fixed slots on the png circuit board. Results unlock automatically when the placement is correct.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)] items-start">
        <aside className="sticky top-4 max-h-[calc(100vh-1.5rem)] space-y-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm overflow-y-auto">
          <div className="rounded-md bg-[#2563eb] px-4 py-3 text-white">
            <h2 className="text-lg font-semibold tracking-wide">INSTRUCTION</h2>
          </div>
          <div className="space-y-3 text-sm text-slate-800">
            <p className="rounded-md bg-slate-50 p-3 text-slate-700">Build the circuit like a puzzle. Use the left palette and drop each part into its matching slot.</p>
            <ol className="list-decimal space-y-2 pl-5">
              <li>Drag or click a component card from the left palette.</li>
              <li>Drop it into the matching slot on the circuit image.</li>
              <li>When all slots are correct, the graph and table appear automatically.</li>
            </ol>
            <div className="rounded-md bg-[#dbeafe] p-3 text-xs text-blue-900">
              The board stays inactive until the correct component is placed in every slot.
            </div>
          </div>

          <div className="space-y-2">
            {palette.map((item) => (
              <button
                key={item.key}
                type="button"
                draggable
                onDragStart={handlePaletteDragStart(item.key)}
                onClick={() => handlePaletteClick(item.key)}
                className={`w-full rounded-xl border p-2 text-left shadow-sm transition ${
                  selectedKey === item.key
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-slate-400'
                }`}
                style={{ background: item.tint }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-16 w-20 items-center justify-center overflow-hidden rounded-lg border border-white/80 bg-white/70">
                    <img
                      src={item.assetPath}
                      alt={item.label}
                      className="h-full w-full object-contain"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-slate-800">{item.label}</div>
                    <div className="text-xs text-slate-500">{item.description}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-wide text-slate-500">drag or tap to place</div>
                    <div className="mt-1 break-all text-[10px] text-slate-400">{item.assetPath}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-3 text-xs text-slate-600">
            Place the image files in <span className="font-mono">public/assets/images/Experiment7/palette/</span> using the names shown above.
          </div>

          <button
            type="button"
            onClick={resetBoard}
            className="rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm"
          >
            Reset board
          </button>
        </aside>

        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Circuit Board</h3>
              <p className="text-xs text-slate-500">Inactive until the exact circuit is assembled.</p>
            </div>
            <div className={`rounded-full px-3 py-1 text-xs font-semibold ${isCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
              {boardMessage}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-[#fcfcfe]" style={{ aspectRatio: '980 / 460' }}>
            <svg viewBox="0 0 980 460" className="absolute inset-0 h-full w-full bg-white">
              <rect x="0" y="0" width="980" height="460" fill="#ffffff" />
              <text x="32" y="34" fontSize="18" fill="#111827" fontWeight="700">
                BC107 Common Emitter Hybrid Parameter Setup
              </text>

              {/* Main Wires */}
              {/* Ground Line */}
              <line x1="100" y1="400" x2="920" y2="400" stroke="#111827" strokeWidth="2.5" />
              
              {/* Left Branch */}
              <line x1="100" y1="400" x2="100" y2="340" stroke="#111827" strokeWidth="2.5" />
              <line x1="100" y1="260" x2="100" y2="220" stroke="#111827" strokeWidth="2.5" />
              
              {/* Top Left Horizontal */}
              <line x1="100" y1="220" x2="160" y2="220" stroke="#111827" strokeWidth="2.5" />
              <line x1="240" y1="220" x2="300" y2="220" stroke="#111827" strokeWidth="2.5" />
              <line x1="380" y1="220" x2="470" y2="220" stroke="#111827" strokeWidth="2.5" />
              
              {/* VBE Branch */}
              <line x1="420" y1="220" x2="420" y2="270" stroke="#111827" strokeWidth="2.5" />
              <line x1="420" y1="350" x2="420" y2="400" stroke="#111827" strokeWidth="2.5" />
              
              {/* BJT Collector & Emitter Verticals */}
              <line x1="520" y1="120" x2="520" y2="150" stroke="#111827" strokeWidth="2.5" />
              <line x1="520" y1="310" x2="520" y2="400" stroke="#111827" strokeWidth="2.5" />
              
              {/* Top Right Horizontal */}
              <line x1="520" y1="120" x2="660" y2="120" stroke="#111827" strokeWidth="2.5" />
              <line x1="740" y1="120" x2="800" y2="120" stroke="#111827" strokeWidth="2.5" />
              <line x1="880" y1="120" x2="920" y2="120" stroke="#111827" strokeWidth="2.5" />
              
              {/* VCE Branch */}
              <line x1="600" y1="120" x2="600" y2="230" stroke="#111827" strokeWidth="2.5" />
              <line x1="600" y1="310" x2="600" y2="400" stroke="#111827" strokeWidth="2.5" />
              
              {/* Right Branch */}
              <line x1="920" y1="120" x2="920" y2="230" stroke="#111827" strokeWidth="2.5" />
              <line x1="920" y1="310" x2="920" y2="400" stroke="#111827" strokeWidth="2.5" />

              {/* Junction Dots */}
              <circle cx="420" cy="220" r="4.5" fill="#111827" />
              <circle cx="420" cy="400" r="4.5" fill="#111827" />
              <circle cx="520" cy="400" r="4.5" fill="#111827" />
              <circle cx="600" cy="120" r="4.5" fill="#111827" />
              <circle cx="600" cy="400" r="4.5" fill="#111827" />

              {/* Labels & Polarities */}
              {/* VBB */}
              <text x="25" y="300" fontSize="14" fill="#111827" fontWeight="bold">VBB</text>
              <text x="15" y="315" fontSize="11" fill="#64748b">(0-30V)</text>
              <text x="80" y="255" fontSize="18" fill="#111827" fontWeight="bold">+</text>
              <text x="85" y="355" fontSize="18" fill="#111827" fontWeight="bold">-</text>

              {/* RB */}
              <text x="200" y="175" fontSize="14" fill="#111827" fontWeight="bold" textAnchor="middle">RB</text>
              <text x="200" y="190" fontSize="11" fill="#64748b" textAnchor="middle">100KΩ</text>

              {/* IB */}
              <text x="340" y="175" fontSize="14" fill="#111827" fontWeight="bold" textAnchor="middle">IB</text>
              <text x="340" y="190" fontSize="11" fill="#64748b" textAnchor="middle">(0-200)µA</text>
              <text x="285" y="215" fontSize="16" fill="#111827" fontWeight="bold">+</text>
              <text x="385" y="215" fontSize="16" fill="#111827" fontWeight="bold">-</text>

              {/* VBE */}
              <text x="340" y="305" fontSize="14" fill="#111827" fontWeight="bold" textAnchor="middle">VBE</text>
              <text x="340" y="320" fontSize="11" fill="#64748b" textAnchor="middle">(0-20V)</text>
              <text x="405" y="265" fontSize="16" fill="#111827" fontWeight="bold">+</text>
              <text x="405" y="365" fontSize="16" fill="#111827" fontWeight="bold">-</text>

              {/* BJT */}
              <text x="455" y="215" fontSize="14" fill="#111827" fontWeight="bold">B</text>
              <text x="530" y="165" fontSize="14" fill="#111827" fontWeight="bold">C</text>
              <text x="530" y="305" fontSize="14" fill="#111827" fontWeight="bold">E</text>
              <text x="560" y="210" fontSize="14" fill="#111827" fontWeight="bold">BC 107</text>

              {/* IC */}
              <text x="700" y="75" fontSize="14" fill="#111827" fontWeight="bold" textAnchor="middle">IC</text>
              <text x="700" y="90" fontSize="11" fill="#64748b" textAnchor="middle">(0-200mA)</text>
              <text x="645" y="115" fontSize="16" fill="#111827" fontWeight="bold">+</text>
              <text x="745" y="115" fontSize="16" fill="#111827" fontWeight="bold">-</text>

              {/* RC */}
              <text x="840" y="75" fontSize="14" fill="#111827" fontWeight="bold" textAnchor="middle">RC</text>
              <text x="840" y="90" fontSize="11" fill="#64748b" textAnchor="middle">1.0kΩ</text>

              {/* VCE */}
              <text x="655" y="265" fontSize="14" fill="#111827" fontWeight="bold" textAnchor="middle">VCE</text>
              <text x="655" y="280" fontSize="11" fill="#64748b" textAnchor="middle">(0-20V)</text>
              <text x="585" y="225" fontSize="16" fill="#111827" fontWeight="bold">+</text>
              <text x="585" y="325" fontSize="16" fill="#111827" fontWeight="bold">-</text>

              {/* VCC */}
              <text x="965" y="270" fontSize="14" fill="#111827" fontWeight="bold" textAnchor="middle">VCC</text>
              <text x="965" y="285" fontSize="11" fill="#64748b" textAnchor="middle">(0-30V)</text>
              <text x="905" y="225" fontSize="16" fill="#111827" fontWeight="bold">+</text>
              <text x="905" y="325" fontSize="16" fill="#111827" fontWeight="bold">-</text>
            </svg>

            <div className="absolute inset-0">
              {slots.map((slot) => {
                const placedKey = placed[slot.id];
                const item = palette.find((p) => p.key === placedKey);
                const status = slotStatus(slot);
                const posLeft = (slot.x / 980) * 100;
                const posTop = (slot.y / 460) * 100;
                const width = (slot.width / 980) * 100;
                const height = (slot.height / 460) * 100;

                return (
                  <div
                    key={slot.id}
                    className="absolute"
                    style={{
                      left: `${posLeft}%`,
                      top: `${posTop}%`,
                      width: `${width}%`,
                      height: `${height}%`,
                    }}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={handleSlotDrop(slot.id)}
                    onClick={() => handleSlotClick(slot.id)}
                  >
                    {item ? (
                      <img
                        src={item.assetPath}
                        alt={item.label}
                        draggable={true}
                        onDragStart={handlePaletteDragStart(item.key)}
                        className={`h-full w-full object-contain cursor-grab active:cursor-grabbing transition ${
                          status === 'correct' ? 'opacity-100 drop-shadow-lg' : 'opacity-75 drop-shadow-md'
                        }`}
                        onError={(e) => {
                          e.currentTarget.style.opacity = '0.2';
                        }}
                      />
                    ) : (
                      <div
                        className={`h-full w-full rounded-lg border-2 border-dashed flex items-center justify-center text-xs font-semibold transition ${
                          status === 'empty'
                            ? 'border-slate-300 bg-slate-50 text-slate-500'
                            : 'border-red-400 bg-red-50 text-red-600'
                        }`}
                      >
                        {slot.label}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <div className={`rounded px-3 py-2 text-sm font-medium ${isCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
              {boardMessage}
            </div>
            <button
              type="button"
              onClick={resetBoard}
              className="rounded border border-slate-300 bg-slate-100 px-4 py-2 text-sm text-slate-800 shadow-sm"
            >
              Reset board
            </button>
          </div>
        </section>

      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="rounded-md bg-[#2563eb] px-4 py-3 text-white">
          <h2 className="text-lg font-semibold tracking-wide">CONTROLS</h2>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="space-y-3 rounded-md border border-[#2563eb] p-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-slate-900">VBE (V)</label>
                <span className="rounded bg-blue-100 px-2 py-1 text-sm font-bold text-blue-900">{vbeSlider.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.58"
                max="0.72"
                step="0.01"
                value={vbeSlider}
                onChange={(e) => setVbeSlider(parseFloat(e.target.value))}
                className="w-full cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>0.58V</span>
                <span>0.72V</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-slate-900">IB (µA)</label>
                <span className="rounded bg-purple-100 px-2 py-1 text-sm font-bold text-purple-900">{ibSlider.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="0.5"
                value={ibSlider}
                onChange={(e) => setIbSlider(parseFloat(e.target.value))}
                className="w-full cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>0 µA</span>
                <span>100 µA</span>
              </div>
            </div>
            <div className="space-y-1 rounded bg-slate-50 p-2 text-xs text-slate-600">
              <p>Fixed Parameters:</p>
              <p>Resistance (RB): 100kΩ</p>
              <p>Resistance (RC): 1.0kΩ</p>
              <p>VBB: 0-30V</p>
              <p>VCC: 0-30V</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
              <h3 className="text-sm font-semibold text-slate-800">Measurements</h3>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Metric label="VBE" value={`${currentMeasurement.vbe.toFixed(2)}V`} tone="orange" />
                <Metric label="IB" value={formatMicro(currentMeasurement.ib)} tone="orange" />
                <Metric label="VCE" value={`${currentMeasurement.vce.toFixed(2)}V`} tone="green" />
                <Metric label="IC" value={formatMilli(currentMeasurement.ic)} tone="green" />
              </div>
            </div>

            <div className="rounded-md border border-slate-200 bg-white p-3 text-sm text-slate-700">
              <p className="font-semibold text-slate-800">h-parameters</p>
              <p>hie = {hParameters.hie} Ω</p>
              <p>hfe = {hParameters.hfe}</p>
              <p>hre = {hParameters.hre}</p>
              <p>hoe = {hParameters.hoe} mho</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="rounded-md bg-emerald-500 px-4 py-3 text-white mb-4">
          <h2 className="text-lg font-semibold tracking-wide"> LIVE DATA & GRAPHS</h2>
        </div>
        <p className="text-sm text-slate-600 mb-4">Adjust sliders above to see table and graphs update instantly</p>
        
        <div className="grid gap-4 xl:grid-cols-2 mb-6">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 mb-2">Input Characteristic Family</h3>
            <p className="text-xs text-slate-500 mb-3">Multiple curves for different VCE values</p>
            <div className="h-60 rounded-md border border-slate-300 bg-slate-50 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={inputCurve}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" label={{ value: 'VBE (V)', position: 'insideBottom', offset: -4 }} />
                  <YAxis label={{ value: 'IB (µA)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="y1" stroke="#3b82f6" strokeWidth={2.5} dot={false} name="VCE=10V" />
                  <Line type="monotone" dataKey="y2" stroke="#06b6d4" strokeWidth={2.5} dot={false} name="VCE=8V" />
                  <Line type="monotone" dataKey="y3" stroke="#10b981" strokeWidth={2.5} dot={false} name="VCE=5V" />
                  <Line type="monotone" dataKey="y4" stroke="#f59e0b" strokeWidth={2.5} dot={false} name="VCE=3V" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-1"><div className="h-3 w-3 rounded-full bg-blue-500"></div><span>VCE=10V</span></div>
              <div className="flex items-center gap-1"><div className="h-3 w-3 rounded-full bg-cyan-500"></div><span>VCE=8V</span></div>
              <div className="flex items-center gap-1"><div className="h-3 w-3 rounded-full bg-emerald-500"></div><span>VCE=5V</span></div>
              <div className="flex items-center gap-1"><div className="h-3 w-3 rounded-full bg-amber-500"></div><span>VCE=3V</span></div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 mb-2">Output Characteristic Family</h3>
            <p className="text-xs text-slate-500 mb-3">Multiple curves for different IB values</p>
            <div className="h-60 rounded-md border border-slate-300 bg-slate-50 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={outputCurve}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" label={{ value: 'VCE (V)', position: 'insideBottom', offset: -4 }} />
                  <YAxis label={{ value: 'IC (mA)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="y1" stroke="#ef4444" strokeWidth={2.5} dot={false} name="IB=10µA" />
                  <Line type="monotone" dataKey="y2" stroke="#f97316" strokeWidth={2.5} dot={false} name="IB=30µA" />
                  <Line type="monotone" dataKey="y3" stroke="#eab308" strokeWidth={2.5} dot={false} name="IB=60µA" />
                  <Line type="monotone" dataKey="y4" stroke="#22c55e" strokeWidth={2.5} dot={false} name="IB=100µA" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-1"><div className="h-3 w-3 rounded-full bg-red-500"></div><span>IB=10µA</span></div>
              <div className="flex items-center gap-1"><div className="h-3 w-3 rounded-full bg-orange-500"></div><span>IB=30µA</span></div>
              <div className="flex items-center gap-1"><div className="h-3 w-3 rounded-full bg-yellow-500"></div><span>IB=60µA</span></div>
              <div className="flex items-center gap-1"><div className="h-3 w-3 rounded-full bg-green-500"></div><span>IB=100µA</span></div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Tabular Calculation</h3>
          <div className="overflow-hidden rounded-md border border-slate-300">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border-b px-2 py-2 text-left">VBE (V)</th>
                  <th className="border-b px-2 py-2 text-left">IB (µA)</th>
                  <th className="border-b px-2 py-2 text-left">VCE (V)</th>
                  <th className="border-b px-2 py-2 text-left">IC (mA)</th>
                </tr>
              </thead>
              <tbody>
                {[...measurementRows, { vbe: currentMeasurement.vbe, ib: currentMeasurement.ib, vce: currentMeasurement.vce, ic: currentMeasurement.ic }].map((row, index) => (
                  <tr key={index} className={`${index === measurementRows.length ? 'bg-emerald-100 font-bold border-2 border-emerald-500' : 'odd:bg-white even:bg-slate-50'}`}>
                    <td className="border-b px-2 py-2">{row.vbe.toFixed(2)}</td>
                    <td className="border-b px-2 py-2">{row.ib.toFixed(1)} µA</td>
                    <td className="border-b px-2 py-2">{row.vce.toFixed(2)}</td>
                    <td className="border-b px-2 py-2">{row.ic.toFixed(2)} mA</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">✓ Bold green row = current slider values (live updates)</p>
        </div>
      </section>

      {isCorrect && (
        <div className="rounded-lg border-4 border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">✓</span>
            <h2 className="text-lg font-bold text-green-800">Circuit Assembly Complete!</h2>
          </div>
          <p className="text-sm text-green-700">You've successfully assembled the circuit. The data above shows all measurements and characteristics.</p>
        </div>
      )}
    </div>
  );
};

const Metric = ({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'orange' | 'green';
}) => {
  const className = tone === 'orange' ? 'border-orange-300 bg-orange-50 text-orange-900' : 'border-emerald-300 bg-emerald-50 text-emerald-900';

  return (
    <div className={`rounded border p-2 text-sm ${className}`}>
      <div className="text-[11px] uppercase tracking-wide opacity-70">{label}</div>
      <div className="font-mono font-semibold">{value}</div>
    </div>
  );
};

export default HybridParameterSimulation;