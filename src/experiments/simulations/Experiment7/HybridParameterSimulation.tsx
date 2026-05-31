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
    assetPath: '/assets/images/Experiment7/palette/ib.svg',
  },
  {
    key: 'bjt',
    label: 'BJT',
    description: 'BC107 transistor',
    tint: '#dcfce7',
    assetPath: '/assets/images/Experiment7/palette/bjt.svg',
  },
  {
    key: 'vbe',
    label: 'VBE',
    description: 'Voltmeter',
    tint: '#e0f2fe',
    assetPath: '/assets/images/Experiment7/palette/vbe.svg',
  },
  {
    key: 'ic',
    label: 'IC',
    description: 'Ammeter',
    tint: '#ede9fe',
    assetPath: '/assets/images/Experiment7/palette/ic.svg',
  },
  {
    key: 'rc',
    label: 'RC',
    description: '1kΩ resistor',
    tint: '#fef3c7',
    assetPath: '/assets/images/Experiment7/palette/rc.svg',
  },
  {
    key: 'vcc',
    label: 'VCC',
    description: 'Collector supply',
    tint: '#dbeafe',
    assetPath: '/assets/images/Experiment7/palette/vcc.svg',
  },
  {
    key: 'vce',
    label: 'VCE',
    description: 'Voltmeter',
    tint: '#e0f2fe',
    assetPath: '/assets/images/Experiment7/palette/vce.svg',
  },
  {
    key: 'ground',
    label: 'Ground',
    description: 'Reference',
    tint: '#f1f5f9',
    assetPath: '/assets/images/Experiment7/palette/ground.svg',
  },
];

const slots: SlotDef[] = [
  { id: 'vbb', label: 'VBB', accepts: 'vbb', x: 48, y: 126, width: 94, height: 64 },
  { id: 'rb', label: 'RB', accepts: 'rb', x: 150, y: 140, width: 112, height: 48 },
  { id: 'ib', label: 'IB', accepts: 'ib', x: 286, y: 140, width: 88, height: 48 },
  { id: 'bjt', label: 'BC107', accepts: 'bjt', x: 360, y: 86, width: 138, height: 220 },
  { id: 'vbe', label: 'VBE', accepts: 'vbe', x: 382, y: 280, width: 96, height: 56 },
  { id: 'ic', label: 'IC', accepts: 'ic', x: 540, y: 108, width: 90, height: 48 },
  { id: 'rc', label: 'RC', accepts: 'rc', x: 628, y: 108, width: 110, height: 48 },
  { id: 'vcc', label: 'VCC', accepts: 'vcc', x: 724, y: 92, width: 74, height: 94 },
  { id: 'vce', label: 'VCE', accepts: 'vce', x: 548, y: 276, width: 96, height: 56 },
  { id: 'ground', label: 'GND', accepts: 'ground', x: 398, y: 352, width: 82, height: 58 },
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

  const handleSlotDrop = (slotId: SlotId) => (event: React.DragEvent<SVGGElement>) => {
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
        <p>Drag the exact lab components from the left palette into the matching fixed slots on the SVG circuit board. Results unlock automatically when the placement is correct.</p>
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

              <line x1="18" y1="372" x2="962" y2="372" stroke="#ef4444" strokeWidth="2" />
              <line x1="74" y1="132" x2="74" y2="372" stroke="#ef4444" strokeWidth="2" />
              <line x1="848" y1="120" x2="848" y2="372" stroke="#ef4444" strokeWidth="2" />

              <line x1="74" y1="170" x2="170" y2="170" stroke="#111827" strokeWidth="2" />
              <line x1="300" y1="170" x2="330" y2="170" stroke="#111827" strokeWidth="2" />
              <line x1="452" y1="170" x2="500" y2="170" stroke="#111827" strokeWidth="2" />
              <line x1="604" y1="170" x2="662" y2="170" stroke="#111827" strokeWidth="2" />
              <line x1="730" y1="142" x2="848" y2="142" stroke="#111827" strokeWidth="2" />
              <line x1="596" y1="324" x2="596" y2="372" stroke="#111827" strokeWidth="2" />
              <line x1="456" y1="324" x2="456" y2="372" stroke="#111827" strokeWidth="2" />

              <circle cx="436" cy="214" r="58" fill="none" stroke="#111827" strokeWidth="2.5" />
              <path d="M408 214 L462 214" stroke="#111827" strokeWidth="2.5" />
              <path d="M436 156 L436 270" stroke="#111827" strokeWidth="2.5" />
              <path d="M450 184 L462 214 L450 244" fill="none" stroke="#111827" strokeWidth="2.5" />
              <text x="408" y="150" fontSize="14" fill="#111827">BC107</text>
              <text x="382" y="220" fontSize="14" fill="#111827">B</text>
              <text x="468" y="188" fontSize="14" fill="#111827">C</text>
              <text x="468" y="250" fontSize="14" fill="#111827">E</text>

              <line x1="378" y1="214" x2="382" y2="214" stroke="#111827" strokeWidth="2" />
              <line x1="494" y1="214" x2="500" y2="214" stroke="#111827" strokeWidth="2" />
              <line x1="554" y1="142" x2="554" y2="214" stroke="#111827" strokeWidth="2" />
              <line x1="662" y1="142" x2="662" y2="214" stroke="#111827" strokeWidth="2" />

              <g>
                <circle cx="74" cy="170" r="9" fill="#d97706" />
                <circle cx="170" cy="170" r="9" fill="#d97706" />
                <circle cx="300" cy="170" r="9" fill="#d97706" />
                <circle cx="330" cy="170" r="9" fill="#d97706" />
                <circle cx="452" cy="170" r="9" fill="#d97706" />
                <circle cx="500" cy="170" r="9" fill="#d97706" />
                <circle cx="604" cy="170" r="9" fill="#d97706" />
                <circle cx="662" cy="170" r="9" fill="#d97706" />
                <circle cx="730" cy="142" r="9" fill="#d97706" />
                <circle cx="848" cy="142" r="9" fill="#d97706" />
                <circle cx="382" cy="324" r="9" fill="#d97706" />
                <circle cx="456" cy="324" r="9" fill="#d97706" />
                <circle cx="596" cy="324" r="9" fill="#d97706" />
                <circle cx="448" cy="372" r="9" fill="#d97706" />
              </g>
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