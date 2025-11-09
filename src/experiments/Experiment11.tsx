import { useState, useEffect } from 'react';
import ExperimentLayout from './layout/ExperimentLayout';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import './Experiment11.css'; // For custom animations

const Experiment11 = () => {
  return (
    <ExperimentLayout
      title="Experiment 11"
      description="This experiment illustrates how to design an astable multivibrator to generate clock pulses for a given frequency, obtain waveforms, and test performance"
      experiment={{
        theory: <TheoryContent />,
        procedure: <  ProcedureContent />,
        simulation: <SimulationContent />,
        quiz: <QuizContent />,
      }}
    />
  );
};

// ---------------- TheoryContent ----------------
const TheoryContent = () => (
  <div className="prose max-w-none">
    <h2 className="font-bold text-blue-600">Theory:</h2>
    <p>An Astable multivibrator has two quasi-stable states, and it keeps switching between these two states by itself. No external triggering signal is needed. The two amplifiers of an astable multivibrator are regenerative cross-coupled by capacitor.</p>

    <h2 className="font-bold text-blue-600">Principle:</h2>
    <p>A collector-coupled astable multivibrator using n-p-n transistor works as follows: Assume Q2 is ON and Q1 is OFF. Capacitor C2 charges through resistor RC1, and capacitor C1 discharges through resistor R1. Eventually, Q1 starts conducting, turning Q2 OFF. Then the cycle repeats. Square wave voltages are generated at the collector terminals of Q1 and Q2.</p>

    <h2 className="font-bold text-blue-600 mt-4">Apparatus Required:</h2>
    <table className="table-auto border-collapse border border-gray-300 w-full">
      <thead>
        <tr>
          <th className="border border-gray-300 px-2 py-1">S.No</th>
          <th className="border border-gray-300 px-2 py-1">Apparatus</th>
          <th className="border border-gray-300 px-2 py-1">Specification/Range</th>
          <th className="border border-gray-300 px-2 py-1">Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr><td className="border px-2 py-1 text-center">1</td><td className="border px-2 py-1">CRO</td><td className="border px-2 py-1">1Hz-20MHz</td><td className="border px-2 py-1 text-center">1</td></tr>
        <tr><td className="border px-2 py-1 text-center">2</td><td className="border px-2 py-1">RPS</td><td className="border px-2 py-1">(0-30)V</td><td className="border px-2 py-1 text-center">1</td></tr>
        <tr><td className="border px-2 py-1 text-center">3</td><td className="border px-2 py-1">Bread Board</td><td className="border px-2 py-1">-</td><td className="border px-2 py-1 text-center">1</td></tr>
        <tr><td className="border px-2 py-1 text-center">4</td><td className="border px-2 py-1">Connecting Wires</td><td className="border px-2 py-1">-</td><td className="border px-2 py-1 text-center">As required</td></tr>
        <tr><td className="border px-2 py-1 text-center">5</td><td className="border px-2 py-1">Resistors</td><td className="border px-2 py-1">1 K-ohm and 47 K-ohm</td><td className="border px-2 py-1 text-center">2 each</td></tr>
        <tr><td className="border px-2 py-1 text-center">6</td><td className="border px-2 py-1">Capacitors</td><td className="border px-2 py-1">0.01 µF</td><td className="border px-2 py-1 text-center">1</td></tr>
        <tr><td className="border px-2 py-1 text-center">7</td><td className="border px-2 py-1">Transistors</td><td className="border px-2 py-1">2N2369</td><td className="border px-2 py-1 text-center">2</td></tr>
      </tbody>
    </table>

    <h2 className="font-bold text-blue-600 mt-4">Circuit Diagram:</h2>
    <img src="https://i.postimg.cc/T3xDS5ST/Circuit-diagram-1.jpg" alt="Circuit Diagram for Astable Multi-Vibrator" className="w-[20%] h-[20%] border border-gray-300 p-2"/>
  </div>
);

// ---------------- ProcedureContent ----------------
const ProcedureContent = () => (
  <div>
    <h2 className="font-bold text-blue-600">Design:</h2>
    <p>I<sub>Cmax</sub> = 5 mA ;</p>
    <p>V<sub>CC</sub> = 12 V; V<sub>CE(SAT)</sub> = 0.2V </p>
    <p>R<sub>C</sub> = (V<sub>CC</sub> - V<sub>CE(SAT)</sub>) / I<sub>Cmax</sub> </p>
    <p>Let C = 0.1 µF and R= 10KΩ </p>
    <p>T = 0.69 (R1C1+R2C2) = 0.69(2R<sub>C</sub>) </p>
    <p>( R1=R2 ; C1=C2), C = 0.01µF </p>

    <h2 className="font-bold text-blue-600">Procedure:</h2>
    <ol className="list-disc ml-6">
      <li>Connect the circuit as shown in circuit diagram.</li>
      <li>Observe the waveforms at V<sub>BE1</sub>, V<sub>BE2</sub>, V<sub>CE1</sub>, V<sub>CE2</sub> and find frequency.</li>
    </ol>

    <h2 className="font-bold text-blue-600 mt-4">Model Graph:</h2>
    <img src="https://i.postimg.cc/mr2FZfBq/model-graph-2.jpg" alt="Model Graph" className="w-[20%] h-[20%] border border-gray-300 p-2"/>
    
    <h2 className="font-bold text-blue-600">Conclusion:</h2>
    <p>Thus an astable multivibrator was designed and it is proved that the theoretical and practical frequencies are identical.</p>
  </div>
);

// ---------------- SimulationContent ----------------
const SimulationContent = () => {
  const [angle, setAngle] = useState(30);
  const [resistance, setResistance] = useState(10);
  const [inductance, setInductance] = useState(5);
  const [mode, setMode] = useState('output');
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const data = Array.from({ length: 360 }, (_, x) => {
    const rad = (x * Math.PI) / 180;
    let v = Math.sin(rad);
    if (mode === 'output') {
      if (x < angle || (x > 180 && x < 180 + angle)) v = 0;
      v = v / (resistance / 10 + inductance / 5);
    }
    return { x, v };
  });

  const avgVoltage = (data.reduce((sum, d) => sum + d.v, 0) / data.length).toFixed(2);
  const rmsVoltage = Math.sqrt(data.reduce((sum, d) => sum + d.v ** 2, 0) / data.length).toFixed(2);

  useEffect(() => {
    if (playing) {
      const timer = setInterval(() => {
        setStep((prev) => (prev < 3 ? prev + 1 : 0));
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [playing]);

  const nodes = [
    { id: '1', position: { x: 50, y: 100 }, data: { label: 'AC Source' }, style: { border: '2px solid blue', padding: 10, borderRadius: 8 } },
    { id: '2', position: { x: 250, y: 50 }, data: { label: 'SCR' }, style: { border: '2px solid black', padding: 10, borderRadius: 8, background: step >= 1 ? '#ff4d4d' : '#f0f0f0', color: step >= 1 ? 'white' : 'black', boxShadow: step >= 1 ? '0px 0px 20px red' : 'none', cursor: 'pointer', transition: '0.3s' } },
    { id: '3', position: { x: 450, y: 100 }, data: { label: `R = ${resistance}Ω` }, style: { border: '2px solid green', padding: 10, borderRadius: 8 } },
    { id: '4', position: { x: 650, y: 100 }, data: { label: `L = ${inductance}H` }, style: { border: '2px solid orange', padding: 10, borderRadius: 8 } },
  ];

  const edges = [
    { id: 'e1-2', source: '1', target: '2', animated: step >= 1, style: { stroke: 'red' } },
    { id: 'e2-3', source: '2', target: '3', animated: step >= 2, style: { stroke: 'green' } },
    { id: 'e3-4', source: '3', target: '4', animated: step >= 3, style: { stroke: 'orange' } },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">⚡ Experiment 11: Single Phase Semi-Converter Simulation</h2>

      <div className="flex gap-4 items-center">
        <button onClick={() => setPlaying(!playing)} className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow">
          {playing ? '⏸ Pause' : '▶ Play Simulation'}
        </button>
        <span className="text-lg">Step: {step}</span>
      </div>

      <div className="h-72 border rounded-xl shadow">
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="font-medium">Firing Angle α: {angle}°</label>
          <input type="range" min="0" max="180" value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="font-medium">Resistance R: {resistance}Ω</label>
          <input type="range" min="1" max="50" value={resistance} onChange={(e) => setResistance(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="font-medium">Inductance L: {inductance}H</label>
          <input type="range" min="1" max="20" value={inductance} onChange={(e) => setInductance(Number(e.target.value))} className="w-full" />
        </div>
      </div>

      <button onClick={() => setMode(mode === 'input' ? 'output' : 'input')} className="px-4 py-2 rounded-lg bg-purple-600 text-white shadow">
        Show {mode === 'input' ? 'Output Voltage' : 'Input Voltage'}
      </button>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" label={{ value: 'Angle (°)', position: 'insideBottom', dy: 10 }} />
          <YAxis domain={[-1.5, 1.5]} />
          <Tooltip />
          <Line type="monotone" dataKey="v" stroke={mode === 'input' ? '#0088ff' : '#ff4500'} strokeWidth={2} dot={false} isAnimationActive={true} />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex gap-6 mt-2">
        <p>Avg Voltage: <strong>{avgVoltage} V</strong></p>
        <p>RMS Voltage: <strong>{rmsVoltage} V</strong></p>
      </div>
    </div>
  );
};

// ---------------- QuizContent ----------------
const QuizContent = () => {
  const questions = [
    { question: 'Which multivibrator is called a "one-shot"?', options: ['Astable multivibrator','Monostable multivibrator','Bistable multivibrator','Schmitt trigger'], answer: 1 },
    { question: 'What is a relaxation oscillator?', options: ['An oscillator that uses resistors only','An oscillator that maintains a constant amplitude','An oscillator that generates periodic waveforms using energy storage and sudden release','An oscillator with no capacitors or inductors'], answer: 2 },
    { question: 'Which of the following are applications of astable multivibrators?', options: ['Timers','LED flashers','Square wave generators','All of the above'], answer: 3 },
    { question: 'Why monostable multivibrator is called "one-shot"?', options: ['because it has no stable states','because it has two unstable states','because it has one stable state','because it produces a continuous output'], answer: 2 },
    { question: 'What are typical applications of monostable and bistable multivibrators?', options: ['Monostable – timing circuits; Bistable – flip-flops','Monostable – oscillators; Bistable – voltage regulators','Monostable – amplifiers; Bistable – filters','Both are only used in power supplies'], answer: 0 },
    { question: 'What is the significance of a capacitor in multivibrators?', options: ['It reduces power consumption','It provides high gain','It controls timing and frequency by charging and discharging','It increases the output voltage'], answer: 2 },
    { question: 'What is the definition of duty cycle in a waveform?', options: ['Ratio of voltage to current','Time taken to complete one full cycle','Frequency of the waveform in Hertz','Ratio of ON time to total time of the waveform, expressed as a percentage'], answer: 3 },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleOptionChange = (qIndex: number, oIndex: number) => {
    if (!submitted) {
      const updated = [...selectedAnswers];
      updated[qIndex] = oIndex;
      setSelectedAnswers(updated);
    }
  };

  const getOptionStyle = (qIndex: number, oIndex: number): string => {
    if (!submitted) return '';
    const isCorrect = oIndex === questions[qIndex].answer;
    const isSelected = selectedAnswers[qIndex] === oIndex;

    if (isCorrect) return 'bg-green-200';
    if (isSelected && !isCorrect) return 'bg-red-200';
    return '';
  };

  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold mb-4">Quiz</h2>
      {questions.map((q, qIndex) => (
        <div key={qIndex} className="mb-6">
          <p className="font-semibold">{qIndex + 1}. {q.question}</p>
          {q.options.map((option, oIndex) => (
            <label key={oIndex} className={`block p-2 border rounded mb-1 cursor-pointer ${getOptionStyle(qIndex, oIndex)}`}>
              <input
                type="radio"
                name={`question-${qIndex}`}
                value={oIndex}
                checked={selectedAnswers[qIndex] === oIndex}
                onChange={() => handleOptionChange(qIndex, oIndex)}
                disabled={submitted}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => setSubmitted(true)}
      >
        Submit
      </button>
    </div>
  );
};

export default Experiment11;
