import React, { useState } from 'react';
import ExperimentLayout from './layout/ExperimentLayout';

const Experiment8 = () => {
  return (
    <ExperimentLayout
      title="Experiment 8"
      description="To obtain the Drain and Transfer Characteristics of a JFET."
      experiment={{
        theory: <TheoryContent />,
        procedure: <ProcedureContent />,
        simulation: <SimulationContent />,
        quiz: <QuizContent />
      }}
    />
  );
};

// -------------------- THEORY --------------------
const TheoryContent = () => (
  <div className="prose max-w-none">
    <h2 className="font-bold text-blue-600">Theory</h2>
    <p>
      The Junction Field Effect Transistor (JFET) is a voltage-controlled device in which the current conduction takes place by majority carriers. It has three terminals: Gate (G), Drain (D), and Source (S). The JFET operates in three regions: ohmic, active, and cutoff.
    </p>
    <ul className="list-disc ml-6">
      <li><strong>Drain Characteristics:</strong> Relationship between Drain current (ID) and Drain-source voltage (VDS) for different values of Gate-source voltage (VGS).</li>
      <li><strong>Transfer Characteristics:</strong> Relationship between ID and VGS while keeping VDS constant.</li>
    </ul>
    <p>
      In an N-channel JFET, as VGS becomes more negative, the channel narrows and the drain current reduces. Beyond a certain negative value of VGS (called pinch-off voltage), the current becomes negligible and the JFET turns off.
    </p>

    <h3 className="font-bold text-blue-600 mt-4">Aim:</h3>
    <p>To obtain the Drain and Transfer Characteristics of a Junction Field Effect Transistor (JFET).</p>

    <h3 className="font-bold text-blue-600 mt-4">Materials Required:</h3>
    <table className="table-auto border border-collapse border-gray-400">
      <thead>
        <tr>
          <th className="border px-4 py-2">S.No.</th>
          <th className="border px-4 py-2">Component</th>
          <th className="border px-4 py-2">Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr><td className="border px-4 py-2">1</td><td className="border px-4 py-2">JFET (BFW11 / BFW10)</td><td className="border px-4 py-2">1 No.</td></tr>
        <tr><td className="border px-4 py-2">2</td><td className="border px-4 py-2">Resistor (1KΩ, 100KΩ)</td><td className="border px-4 py-2">1 No. each</td></tr>
        <tr><td className="border px-4 py-2">3</td><td className="border px-4 py-2">Bread Board</td><td className="border px-4 py-2">1 No.</td></tr>
        <tr><td className="border px-4 py-2">4</td><td className="border px-4 py-2">Dual DC Regulated Power Supply (0–30 V)</td><td className="border px-4 py-2">1 No.</td></tr>
        <tr><td className="border px-4 py-2">5</td><td className="border px-4 py-2">Digital Ammeter (0–200 mA)</td><td className="border px-4 py-2">1 No.</td></tr>
        <tr><td className="border px-4 py-2">6</td><td className="border px-4 py-2">Digital Voltmeter (0–20 V)</td><td className="border px-4 py-2">2 No.</td></tr>
        <tr><td className="border px-4 py-2">7</td><td className="border px-4 py-2">Connecting Wires (Single Strand)</td><td className="border px-4 py-2">As required</td></tr>
      </tbody>
    </table>

    <h3 className="font-bold text-blue-600 mt-4">Specifications of JFET (BFW11):</h3>
    <ul className="list-disc ml-6">
      <li><strong>Gate-Source Voltage (V<sub>GS</sub>)</strong>: -30 V</li>
      <li><strong>Forward Gate Current (I<sub>GF</sub>)</strong>: 10 mA</li>
      <li><strong>Maximum Power Dissipation (P<sub>D</sub>)</strong>: 300 mW</li>
    </ul>
  </div>
);

// -------------------- PROCEDURE --------------------
const ProcedureContent = () => (
  <div className="prose max-w-none">
    <h3 className="font-bold text-blue-600 mt-4">Circuit Diagram:</h3>
    <div className="mt-2">
      <img
        src="/assets/images/jfet-circuit-diagram.jpeg"
        alt="JFET Circuit Diagram for Drain and Transfer Characteristics"
        className="w-[50%] h-auto border border-gray-300 p-2"
      />
    </div>

    <h3 className="font-bold text-blue-600 mt-4">Pin Diagram:</h3>
    <div className="flex flex-wrap gap-4 mt-2">
      <div>
        <p className="font-semibold text-sm">Top View</p>
        <img
          src="/assets/images/jfet-pin-diagram-top.jpeg"
          alt="JFET Pin Diagram Top View"
          className="w-56 h-auto border border-gray-300 p-2"
        />
      </div>
      <div>
        <p className="font-semibold text-sm">Bottom View</p>
        <img
          src="/assets/images/jfet-pin-diagram-bottom.jpeg"
          alt="JFET Pin Diagram Bottom View"
          className="w-56 h-auto border border-gray-300 p-2"
        />
      </div>
    </div>

    <h3 className="font-bold text-blue-600 mt-4">Operation:</h3>
    <ol className="list-decimal ml-6">
      <li>Drain characteristics are obtained between the Drain-to-Source voltage (VDS) and Drain current (ID), keeping Gate-to-Source voltage (VGS) as the constant parameter.</li>
      <li>Transfer characteristics are obtained between the Gate-to-Source voltage (VGS) and Drain current (ID), keeping Drain-to-Source voltage (VDS) as the constant parameter.</li>
    </ol>

    <h3 className="font-bold text-blue-600 mt-4">Procedure – Drain Characteristics:</h3>
    <ol className="list-decimal ml-6">
      <li>Connect the circuit as shown in the circuit diagram.</li>
      <li>Keep VGS = 0V by varying VGG.</li>
      <li>Vary VDD gradually in steps of 1V up to 10V. Note down Drain current (ID) and Drain-to-Source voltage (VDS) at each step.</li>
      <li>Repeat the above procedure for VGS = −1V.</li>
    </ol>

    <h3 className="font-bold text-blue-600 mt-4">Procedure – Transfer Characteristics:</h3>
    <ol className="list-decimal ml-6">
      <li>Connect the circuit as shown in the circuit diagram.</li>
      <li>Set VDS = 2V (for BFW10) or 5V (for BFW11).</li>
      <li>Vary VDD in steps of 0.5V until the Drain current (ID) reduces to its minimum value.</li>
      <li>Vary VGG gradually, noting down both Drain current (ID) and Gate-to-Source voltage (VGS) at each step.</li>
      <li>Repeat step 3 for VDS = 4V (BFW10) or 8V (BFW11).</li>
    </ol>

    <h3 className="font-bold text-blue-600 mt-4">Graph:</h3>
    <div className="mt-2">
      <img
        src="/assets/images/jfet-characteristics-graph.jpeg"
        alt="JFET Drain and Transfer Characteristics Graph"
        className="w-[60%] h-auto border border-gray-300 p-2"
      />
    </div>

    <h3 className="font-bold text-blue-600 mt-4">Calculations from Graph:</h3>
    <ul className="list-disc ml-6">
      <li><strong>Drain Resistance (r<sub>d</sub>):</strong> r<sub>d</sub> = ΔVDS / ΔID, at a constant VGS, when JFET is operating in the pinch-off region (from drain characteristics).</li>
      <li><strong>Transconductance (g<sub>m</sub>):</strong> g<sub>m</sub> = ΔID / ΔVGS, at a constant VDS (from transfer characteristics). Expressed in mho/Siemens.</li>
      <li><strong>Amplification factor (µ):</strong> µ = ΔVDS / ΔVGS, at a constant ID. Also, µ = r<sub>d</sub> × g<sub>m</sub>.</li>
    </ul>

    <h3 className="font-bold text-blue-600 mt-4">Inference:</h3>
    <ol className="list-decimal ml-6">
      <li>As the gate-to-source voltage (VGS) is increased above zero (i.e., made more negative), pinch-off occurs at a smaller value of drain current compared to VGS = 0V.</li>
      <li>The drain-to-source voltage (VDS) at pinch-off decreases as compared to when VGS = 0V.</li>
    </ol>

    <h3 className="font-bold text-blue-600 mt-4">Precautions:</h3>
    <ul className="list-disc ml-6">
      <li>Do not exceed the maximum ratings of the FET; this may damage the device.</li>
      <li>Connect the voltmeter and ammeter with correct polarities as per the circuit diagram.</li>
      <li>Do not switch ON the power supply until circuit connections are verified.</li>
      <li>Properly identify the Source, Drain, and Gate terminals before connecting.</li>
    </ul>

    <h3 className="font-bold text-blue-600 mt-4">Result:</h3>
    <p>Thus, the Drain and Transfer Characteristics of a JFET were obtained, and the parameters Drain Resistance (r<sub>d</sub>), Transconductance (g<sub>m</sub>), and Amplification factor (µ) were calculated.</p>
  </div>
);

// -------------------- SIMULATION --------------------
const SimulationContent = () => (
  <div className="prose max-w-none">
    <h2 className="font-bold text-blue-600">Simulation</h2>
    <p>Interactive simulation or Multisim/PSpice instructions will be added here for JFET characteristics.</p>
  </div>
);

// -------------------- QUIZ --------------------
const questions = [
  {
    question: 'What is the purpose of obtaining the drain characteristics of a JFET?',
    options: [
      'To measure voltage gain of the amplifier',
      'To observe ID vs VDS for different VGS values',
      'To find the input resistance of the transistor',
      'To calculate base current in the JFET'
    ],
    answer: 1
  },
  {
    question: 'Which voltage is kept constant while plotting the drain characteristics?',
    options: ['VDS', 'ID', 'VGS', 'VDD'],
    answer: 2
  },
  {
    question: 'Which parameter is kept constant while plotting transfer characteristics?',
    options: ['ID', 'VGS', 'VDS', 'IG'],
    answer: 2
  },
  {
    question: 'The transfer characteristics of a JFET show the relationship between:',
    options: ['VDS and ID', 'VGS and ID', 'VDS and VGS', 'IG and VGS'],
    answer: 1
  },
  {
    question: 'What is the typical Gate-Source voltage (VGS) rating for BFW11 JFET?',
    options: ['+30V', '0V', '-30V', '+10V'],
    answer: 2
  },
  {
    question: 'In a JFET, the current conduction occurs due to:',
    options: ['Minority carriers', 'Hole injection', 'Majority carriers only', 'Electron-hole recombination'],
    answer: 2
  },
  {
    question: 'What happens when VGS becomes more negative in an N-channel JFET?',
    options: [
      'Drain current increases rapidly',
      'JFET goes into saturation',
      'Drain current reduces',
      'JFET behaves like a resistor'
    ],
    answer: 2
  }
];

const QuizContent: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState<boolean>(false);

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

export default Experiment8;
