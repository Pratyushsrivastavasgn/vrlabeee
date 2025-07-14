import { useState } from 'react';
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
    <h2 className="font-bold text-blue-600">Procedure</h2>

    <h3 className="font-bold text-blue-600 mt-4">Circuit Diagram:</h3>
<div className="mt-2">
  <img
    src="https://www.electronics-tutorials.ws/wp-content/uploads/2013/07/amp14.gif"
    alt="JFET Circuit Diagram"
    className="w-[40%] h-auto border border-gray-300 p-2"
  />
</div>


    <h3 className="font-bold text-blue-600 mt-4">Pin Diagram:</h3>
    <div className="mt-2">
      <img
        src="https://microcontrollerslab.com/wp-content/uploads/2021/01/2N3819-pinout-diagram.gif"
        alt="JFET Pin Diagram"
        className="w-[30%] h-auto border border-gray-300 p-2"
      />
    </div>

    <h3 className="font-bold text-blue-600 mt-4">Operation:</h3>
    <ul className="list-decimal ml-6">
      <li>Drain characteristics are obtained by plotting ID vs VDS for various constant values of VGS.</li>
      <li>Transfer characteristics are obtained by plotting ID vs VGS while keeping VDS constant.</li>
    </ul>

    <h3 className="font-bold text-blue-600 mt-4">Graphs:</h3>
    <div className="flex flex-wrap gap-4">
      <div>
        <p className="font-semibold">Drain Characteristics</p>
        <img
          src="https://electronicscoach.com/wp-content/uploads/2018/05/transfer-characteristics-of-JFET.jpg"
          alt="Drain Characteristics"
          className="border border-gray-300 p-2 max-w-sm"
        />
      </div>
      <div>
        <p className="font-semibold">Transfer Characteristics</p>
        <img
          src="https://www.circuitstoday.com/wp-content/uploads/2009/08/Transfer-Characteristics-of-JFET.jpg"
          alt="Transfer Characteristics"
          className="border border-gray-300 p-2 max-w-sm"
        />
      </div>
    </div>

    <h3 className="font-bold text-blue-600 mt-4">Calculations from Graph:</h3>
    <ul className="list-disc ml-6">
      <li><strong>Drain Resistance (r<sub>d</sub>):</strong> ΔVDS / ΔID at constant VGS</li>
      <li><strong>Transconductance (g<sub>m</sub>):</strong> ΔID / ΔVGS at constant VDS</li>
      <li><strong>Amplification factor (μ):</strong> μ = r<sub>d</sub> × g<sub>m</sub></li>
    </ul>

    <h3 className="font-bold text-blue-600 mt-4">Inference:</h3>
    <ol className="list-decimal ml-6">
      <li>As VGS increases negatively, pinch-off occurs earlier, reducing ID.</li>
      <li>At higher |VGS|, the JFET reaches cutoff quickly and ID becomes nearly zero.</li>
    </ol>

    <h3 className="font-bold text-blue-600 mt-4">Precautions:</h3>
    <ul className="list-disc ml-6">
      <li>Do not exceed JFET maximum ratings.</li>
      <li>Check all polarities before switching on power.</li>
      <li>Identify Source, Drain, and Gate correctly before connections.</li>
    </ul>

    <h3 className="font-bold text-blue-600 mt-4">Result:</h3>
    <p>Thus, the Drain and Transfer Characteristics of a JFET were obtained and key parameters like r<sub>d</sub>, g<sub>m</sub>, and μ were calculated.</p>
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

export default Experiment8;