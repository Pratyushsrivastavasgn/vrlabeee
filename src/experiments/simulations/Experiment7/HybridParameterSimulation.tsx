import React, { useState } from 'react';

const HybridParameterSimulation = () => {
  const [vbe, setVbe] = useState(0.7);
  const [ib, setIb] = useState(100);
  const [vce, setVce] = useState(5);
  const [ic, setIc] = useState(8);

  const ibA = ib * 1e-6;
  const icA = ic * 1e-3;

  const hie = ibA !== 0 ? (vbe / ibA).toFixed(2) : '∞';
  const hfe = ibA !== 0 ? (icA / ibA).toFixed(2) : '∞';
  const hoe = vce !== 0 ? (icA / vce).toFixed(4) : '∞';
  const hre = vce !== 0 ? (vbe / vce).toFixed(4) : '∞';

  return (
    <div className="flex flex-col lg:flex-row justify-between bg-[#0a0f1c] text-white p-8 min-h-screen font-sans">
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <div className="grid grid-cols-3 gap-4 text-sm items-center">
          <Block label="RPS" note="W" color="bg-yellow-500" />
          <WireHorizontal />
          <Block label="Resistor" note="1kΩ" color="bg-red-600" />
          <WireVertical />
          <div></div>
          <WireVertical />
          <Block label="Transistor" note="0:0 kΩ" color="bg-green-600" />
          <WireHorizontal />
          <Block label="BC107" note="" color="bg-blue-600" />
          <WireVertical />
          <div></div>
          <div></div>
          <Block label="Voltmeter" note="0:30V" color="bg-purple-600" />
          <div></div>
          <div></div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-[#12182b] p-6 rounded-lg shadow-lg mt-10 lg:mt-0">
        <h2 className="text-white text-lg font-semibold mb-3">CE Amplifier Hybrid Parameter Determination</h2>
        <h3 className="text-yellow-400 mb-3 font-semibold text-md">Controls</h3>
        <Slider label="V<sub>BE</sub>" unit="V" value={vbe} onChange={setVbe} min={0} max={1} step={0.01} />
        <Slider label="I<sub>B</sub>" unit="μA" value={ib} onChange={setIb} min={0} max={250} step={1} />
        <Slider label="V<sub>CE</sub>" unit="V" value={vce} onChange={setVce} min={0} max={30} step={0.1} />
        <Slider label="I<sub>C</sub>" unit="mA" value={ic} onChange={setIc} min={0} max={30} step={0.1} />
        <div className="mt-6 p-4 border border-yellow-400 rounded-lg bg-[#1f2a44]">
          <h4 className="text-yellow-400 font-semibold mb-3 text-md">Results</h4>
          <div className="text-sm text-gray-300 leading-6">
            <p>h<sub>ie</sub> = {hie} Ω</p>
            <p>h<sub>fe</sub> = {hfe}</p>
            <p>h<sub>oe</sub> = {hoe} mho</p>
            <p>h<sub>re</sub> = {hre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Block = ({ label, note, color }) => (
  <div className={`text-center w-32 h-20 px-2 py-2 rounded-lg shadow-md ${color} text-white`}>
    <p className="font-bold text-sm">{label}</p>
    <p className="text-xs mt-1">{note}</p>
  </div>
);

const Slider = ({ label, unit, value, onChange, min, max, step }) => (
  <div className="mb-4">
    <label className="text-yellow-300 font-medium text-sm" dangerouslySetInnerHTML={{ __html: label }} />
    <div className="flex items-center gap-4">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
      <span className="text-white text-sm w-20 text-right">{value} {unit}</span>
    </div>
  </div>
);

const WireHorizontal = () => (
  <div className="w-full h-0.5 bg-yellow-400 bg-[length:16px_2px] bg-[repeating-linear-gradient(to right, yellow 0, yellow 2px, transparent 2px, transparent 14px)]"></div>
);

const WireVertical = () => (
  <div className="h-20 w-0.5 bg-yellow-400 bg-[length:2px_16px] bg-[repeating-linear-gradient(to bottom, yellow 0, yellow 2px, transparent 2px, transparent 14px)] mx-auto"></div>
);

export default HybridParameterSimulation;
