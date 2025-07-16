import React, { useState } from 'react';
import ExperimentLayout from './layout/ExperimentLayout';
import AstableMultiviberator from './simulations/Experiment11/AstableMultiviberator';

const Experiment11 = () => {
  return (
    <ExperimentLayout
      title="Experiment 11"
      description="This experiment illustrates to design a astable multivibrator to generate clock pulse for a given frequency and obtain the waveforms and test its performance"
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
    <h2 className="font-bold text-blue-600">Theory:</h2>
    <p>An Astable multivibrator has two quasi-stable states, and it keeps on switching between these two states, by itself, No external triggering signal is needed...</p>
    <h2 className="font-bold text-blue-600">Principle:</h2>
    <p>A collector-coupled astable multivibrator using n-p-n transistor...</p>
    <ol className="list-disc ml-6">
      <li>Since Q2 is ON, capacitor C2 charges through resistor RC1...</li>
      <li>Capacitor C1 discharges through resistor R1...</li>
    </ol>
    <p>As capacitor C1 discharges more and more...</p>
    <p>Thus with Q1 ON and Q2 OFF, capacitor C1 charges...</p>

    <h2 className="font-bold text-blue-600 mt-4">Apparatus Required:</h2>
    <p>The following equipments are required to perform this experiment:</p>
    <br />
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
        <tr><td className="border text-center">1</td><td className="border">CRO</td><td className="border">1Hz-20MHz</td><td className="border text-center">1</td></tr>
        <tr><td className="border text-center">2</td><td className="border">RPS</td><td className="border">(0-30)V</td><td className="border text-center">1</td></tr>
        <tr><td className="border text-center">3</td><td className="border">Bread Board</td><td className="border">-</td><td className="border text-center">1</td></tr>
        <tr><td className="border text-center">4</td><td className="border">Connecting Wires</td><td className="border">-</td><td className="border text-center">As required</td></tr>
        <tr><td className="border text-center">5</td><td className="border">Resistors</td><td className="border">1 K-ohm and 47 K-ohm</td><td className="border text-center">2 each</td></tr>
        <tr><td className="border text-center">6</td><td className="border">Capacitors</td><td className="border">0.01 micro Farad</td><td className="border text-center">1</td></tr>
        <tr><td className="border text-center">7</td><td className="border">Transistors</td><td className="border">2N2369</td><td className="border text-center">2</td></tr>
      </tbody>
    </table>
    <h2 className="font-bold text-blue-600 mt-4">Circuit Diagram:</h2>
    <img src="https://i.postimg.cc/T3xDS5ST/Circuit-diagram-1.jpg" alt="Circuit Diagram for Astable Multi-Vibrator" className="w-[20%] h-[20%] border border-gray-300 p-2" />
  </div>
);

const ProcedureContent = () => (
  <div>
    <h2 className="font-bold text-blue-600">Design:</h2>
    <p>I<sub>Cmax</sub> = 5 mA ;</p>
    <p>V<sub>CC</sub> = 12 V; V<sub>CE(SAT)</sub> = 0.2V </p>
    <p>R<sub>C</sub> = (V<sub>CC</sub> - V<sub>CE(SAT)</sub>) / I<sub>Cmax</sub> </p>
    <p>Let C = 0.1 µF and R= 10KΩ </p>
    <p>T = 0.69 (R1C1+R2C2) = 0.69(2R<sub>C</sub>) </p>
    <p>( R1=R2 ; C1=C2), C = 0.01µF </p>
    <br />
    <h2 className="font-bold text-blue-600">Procedure:</h2>
    <ol className="list-disc ml-6">
      <li>Connect the circuit as shown in circuit diagram.</li>
      <li>Observe the waveforms at V<sub>BE1</sub>, V<sub>BE2</sub>, V<sub>CE1</sub>, V<sub>CE2</sub> and find frequency.</li>
    </ol>
    <br />
    <h2 className="font-bold text-blue-600 mt-4">Model Graph:</h2>
    <img src="https://i.postimg.cc/mr2FZfBq/model-graph-2.jpg" alt="Model Graph" className="w-[20%] h-[20%] border border-gray-300 p-2" />
    <br />
    <h2 className="font-bold text-blue-600">Conclusion:</h2>
    <p>Thus an astable multivibrator was designed and it is proved that the theoretical, practical frequencies are identical.</p>
  </div>
);

const SimulationContent = () => (
  <div>
    <AstableMultiviberator />
  </div>
);

const questions = [
  {
    question: 'Which multivibrator is called a "one-shot"?',
    options: ['Astable multivibrator', 'Monoable multivibrator', 'Bistable multivibrator', 'Schmitt trigger'],
    answer: 2
  },
  {
    question: 'What is a relaxation oscillator?',
    options: [
      'An oscillator that uses resistors only',
      'An oscillator that maintains a constant amplitude',
      'An oscillator that generates periodic waveforms using energy storage and sudden release',
      'An oscillator with no capacitors or inductors'
    ],
    answer: 2
  },
  {
    question: 'Which of the following are applications of astable multivibrators?',
    options: ['Timers', 'LED flashers', 'Square wave generators', 'All of the above'],
    answer: 3
  },
  {
    question: 'Why monostable multivibrator is called "one-shot"?',
    options: [
      'because it has no stable states',
      'because it has two unstable states',
      'because it has one stable state',
      'because it produces a continuous output'
    ],
    answer: 2
  },
  {
    question: 'What are typical applications of monostable and bistable multivibrators?',
    options: [
      'Monostable – timing circuits; Bistable – flip-flops',
      'Monostable – oscillators; Bistable – voltage regulators',
      'Monostable – amplifiers; Bistable – filters',
      'Both are only used in power supplies'
    ],
    answer: 0
  },
  {
    question: 'What is the significance of a capacitor in multivibrators?',
    options: [
      'It reduces power consumption',
      'It provides high gain',
      'It controls timing and frequency by charging and discharging',
      'It increases the output voltage'
    ],
    answer: 2
  },
  {
    question: 'What is the definition of duty cycle in a waveform?',
    options: [
      'Ratio of voltage to current',
      'Time taken to complete one full cycle',
      'Frequency of the waveform in Hertz',
      'Ratio of ON time to total time of the waveform, expressed as a percentage'
    ],
    answer: 3
  }
];

const QuizContent = () => {
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
                value={oIndex.toString()}
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