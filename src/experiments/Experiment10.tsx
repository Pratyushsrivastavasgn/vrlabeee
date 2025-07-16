import React, { useState } from 'react';
import ExperimentLayout from './layout/ExperimentLayout';
import RCsim from './simulations/Experiment10/RCoscillator';

const Experiment10 = () => {
  return (
    <ExperimentLayout
      title="Experiment 10"
      description="This experiment demonstrates the design and construction of RC Phase Shift Oscillator to obtain sinusoidal output and verify practical frequency with theoretical calculations."
      experiment={{
        theory: <TheoryContent />,
        procedure: <ProcedureContent />,
        simulation: <SimulationContent />,
        quiz: <QuizContent />
      }}
    />
  );
};

const TheoryContent = () => (
  <div className="prose max-w-none">
    <h2 className="text-xl font-bold mb-4">Theory</h2>
    <p>
      A Phase Shift Oscillator is a type of electronic oscillator circuit that generates
      sinusoidal waveforms. It consists of an inverting amplifier element such as a
      transistor or "op-amp" with its output fed back to its input through a phase shift
      network to provide positive feedback. The oscillator produces a stable sinusoidal
      output by using the phase shift created by the RC network. The circuit is commonly
      used in audio frequency applications and is simple to construct. It uses a
      Common-Emitter (CE) configuration of the transistor and a feedback network that
      provides a 180° phase shift.
    </p>
    <h3 className="text-lg font-semibold mt-4">Working</h3>
    <ul>
      <li>
        A CE amplifier inverts the input signal by 180° and amplifies it.
      </li>
      <li>
        The three-stage RC feedback network provides an additional 180° phase shift.
      </li>
      <li>
        The total 360° (or 0°) phase shift ensures sustained oscillations.
      </li>
      <li>
        Noise or initial base current causes the transistor to amplify, starting the oscillations.
      </li>
      <li>
        Capacitor charging/discharging introduces time delays, creating the sinusoidal waveform.
      </li>
    </ul>
    <h3 className="text-lg font-semibold mt-4">Conditions for Oscillation</h3>
    <ul>
      <li>
        Total phase shift = 360° (180° by CE amplifier and 180° by RC network)
      </li>
      <li>
        Loop gain (βA) ≥ 1
      </li>
    </ul>
    <h3 className="text-lg font-semibold mt-4">Design</h3>
    <p>
      For three RC sections in the feedback path, the frequency of oscillation is given by:
    </p>
    <p className="text-center font-mono">
      F = 1 / (2πRC√(6 + 4RC/R))
    </p>
    <p>
      Where:
      <br /> R = Resistance in ohms
      <br /> C = Capacitance in farads
    </p>
  </div>
);

const ProcedureContent = () => (
  <div className="prose max-w-none">
    <h2 className="font-bold text-blue-600">Circuit Diagram</h2>
    <div className="flex justify-center my-4">
      <img
        src="https://i.postimg.cc/8cp3pHs9/circuit-diagram-exp-10.jpg"
        alt="RC Phase Shift Oscillator Circuit Diagram"
        className="border rounded-lg shadow-md w-full max-w-3xl"
      />
    </div>

    <h2 className="font-bold text-blue-600">Model Graph</h2>
    <div className="flex justify-center my-4">
      <img
        src="https://i.postimg.cc/6QxM60mc/model-graph-exp-10.jpg"
        alt="Model Graph"
        className="border rounded-lg shadow-md w-full max-w-3xl"
      />
    </div>

    <h3 className="text-lg font-semibold mt-6">Circuit Construction</h3>
    <ul>
      <li>Connect the transistor in Common-Emitter configuration.</li>
      <li>Connect the three RC stages from the collector to the base of the transistor as feedback network.</li>
      <li>Connect the DC power supply to the circuit.</li>
      <li>Connect the CRO at the output to observe waveforms.</li>
    </ul>

    <h3 className="text-lg font-semibold mt-4">Testing the Circuit</h3>
    <ul>
      <li>Switch on the DC supply.</li>
      <li>Adjust the variable resistor if available.</li>
      <li>Observe the output on the CRO.</li>
    </ul>

    <h3 className="text-lg font-semibold mt-4">Finding Frequency</h3>
    <ul>
      <li>Count the divisions of one cycle (T) on the CRO screen.</li>
      <li>Multiply by the time/div setting of the CRO to get the time period.</li>
      <li>Calculate frequency using: F = 1 / T</li>
    </ul>

    <h3 className="text-lg font-semibold mt-4">Safety Precautions</h3>
    <ul>
      <li>Check all connections before powering the circuit.</li>
      <li>Do not short circuit the power supply.</li>
      <li>Handle CRO probes carefully.</li>
    </ul>

    <h3 className="text-lg font-semibold mt-4">Expected Results</h3>
    <ul>
      <li>Sinusoidal waveform observed on CRO.</li>
      <li>Frequency of oscillation matches theoretical value.</li>
    </ul>
  </div>
);

const SimulationContent = () => (
  <div>y
  <RCsim/ >
  </div>
);

const QuizContent = () => {
  const questions = [
    {
      question: 'What is the aim of the RC Phase Shift Oscillator experiment?',
      options: [
        'To study zener diode breakdown',
        'To design and construct RC phase shift oscillator and verify theoretical frequency',
        'To build a JFET amplifier',
        'To measure transistor gain'
      ],
      answer: 1
    },
    {
      question: 'Which configuration is used in the transistor for this oscillator?',
      options: ['CB Configuration', 'CC Configuration', 'CE Configuration', 'Differential pair'],
      answer: 2
    },
    {
      question: 'How much total phase shift is required for sustained oscillations?',
      options: ['90°', '180°', '360° or 0°', '270°'],
      answer: 2
    },
    {
      question: 'What causes the initial oscillation in the circuit?',
      options: [
        'Thermal runaway',
        'Manual triggering',
        'Noise or variation in base current',
        'Short circuit in transistor'
      ],
      answer: 2
    },
    {
      question: 'What is the role of the RC network in the oscillator?',
      options: [
        'Biasing the base',
        'Amplifying the signal',
        'Stabilizing the collector current',
        'Providing 180° phase shift for feedback'
      ],
      answer: 3
    },
    {
      question: 'What software is used to simulate this experiment?',
      options: ['Proteus', 'MATLAB Simulink', 'TinkerCAD', 'LTspice'],
      answer: 0
    },
    {
      question: 'Which formula is used to calculate the frequency of the oscillator?',
      options: [
        'F = 1 / (2πRC)',
        'F = 1 / (2πRC√3)',
        'F = 1 / (2πRC√(6 + 4RC/R))',
        'F = 1 / (RC)'
      ],
      answer: 2
    }
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

  const getOptionStyle = (qIndex: number, oIndex: number) => {
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
            <label
              key={oIndex}
              className={`block p-2 border rounded mb-1 cursor-pointer ${getOptionStyle(qIndex, oIndex)}`}
            >
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

export default Experiment10;
