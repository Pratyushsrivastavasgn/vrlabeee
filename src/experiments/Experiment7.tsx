import React, { useState } from 'react';
import ExperimentLayout from './layout/ExperimentLayout';
import HybridParameterSimulation from './simulations/Experiment7/HybridParameterSimulation';

const Experiment7 = () => {
  return (
    <ExperimentLayout
      title="Experiment 7"
      description="To determine the hybrid parameters of a Common Emitter (CE) amplifier using input and output characteristics."
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
    <h2 className="font-bold text-blue-600">Theory</h2>
    <p>
      The Common Emitter (CE) configuration is one of the most widely used transistor configurations in amplifier circuits because it provides both current gain and voltage gain. In this experiment, the hybrid (h) parameters of a Bipolar Junction Transistor (BJT) operating in Common Emitter mode are determined from its input and output characteristics.
    </p>
    <br />
    <p>A Bipolar Junction Transistor (BJT) is a three-terminal semiconductor device consisting of:
    <h3><strong>Emitter(E)</strong></h3>
    <ul className="list-disc ml-6">
      <li>Heavily doped region.</li>
      <li>Supplies a large number of charge carriers.</li>
      <li>Responsible for injecting carriers into the base region.</li>
    </ul>
    <h3><strong>Base(B)</strong></h3>
    <ul className="list-disc ml-6">
      <li>Very thin and lightly doped.</li>
      <li>Controls the flow of charge carriers between emitter and collector.</li>
      <li>Acts as the control terminal of the transistor.</li>
    </ul>
    <h3><strong>Collector(C)</strong></h3>
    <ul className="list-disc ml-6">
      <li>Moderately doped and large in area.</li>
      <li>Collects carriers from the emitter via the base.</li>
      <li>Designed to dissipate more heat due to higher power handling capability.</li>
    </ul>
    </p>
    <br />
    <p>
      For proper amplification, the transistor must operate in the Active Region, where:
    <ul>
      <li>The Emitter-Base (E-B) junction is forward biased.</li>
      <li>The Collector-Base (C-B) junction is reverse biased.</li>
    </ul>
    Under these conditions, small variations in base current produce significant variations in collector current, enabling amplification.
    </p>

    <h3 className="font-bold text-blue-600 mt-4">Components Required:</h3>
    <table className="min-w-full text-sm text-left border border-gray-400 border-collapse">
      <thead>
        <tr>
          <th className="border px-4 py-2">S.No.</th>
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Range</th>
          <th className="border px-4 py-2">Qty</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border px-4 py-2">1</td>
          <td className="border px-4 py-2">Transistor</td>
          <td className="border px-4 py-2">BC 107</td>
          <td className="border px-4 py-2">1</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">2</td>
          <td className="border px-4 py-2">Resistor</td>
          <td className="border px-4 py-2">1 kΩ</td>
          <td className="border px-4 py-2">2</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">3</td>
          <td className="border px-4 py-2">Breadboard</td>
          <td className="border px-4 py-2">Standard</td>
          <td className="border px-4 py-2">1</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">4</td>
          <td className="border px-4 py-2">Wires</td>
          <td className="border px-4 py-2">–</td>
          <td className="border px-4 py-2">As required</td>
        </tr>
      </tbody>
    </table>

    <h3 className="font-bold text-blue-600 mt-4">Apparatus Required:</h3>
    <table className="min-w-full text-sm text-left border border-gray-400 border-collapse">
      <thead>
        <tr>
          <th className="border px-4 py-2">S.No.</th>
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Range</th>
          <th className="border px-4 py-2">Qty</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border px-4 py-2">1</td>
          <td className="border px-4 py-2">Regulated Power Supply (R.P.S.)</td>
          <td className="border px-4 py-2">(0–30)V</td>
          <td className="border px-4 py-2">2</td>
        </tr>
        <tr>
          <td className="border px-4 py-2" rowSpan={2}>2</td>
          <td className="border px-4 py-2">Ammeter</td>
          <td className="border px-4 py-2">(0–30)mA</td>
          <td className="border px-4 py-2">1</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">Microammeter (MC)</td>
          <td className="border px-4 py-2">(0–250)µA</td>
          <td className="border px-4 py-2">1</td>
        </tr>
        <tr>
          <td className="border px-4 py-2" rowSpan={2}>3</td>
          <td className="border px-4 py-2">Voltmeter</td>
          <td className="border px-4 py-2">(0–30)V</td>
          <td className="border px-4 py-2">1</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">Voltmeter (MC)</td>
          <td className="border px-4 py-2">(0–1)V</td>
          <td className="border px-4 py-2">1</td>
        </tr>
      </tbody>
    </table>

    <h3 className="font-bold text-blue-600 mt-4">Formulas Used:</h3>
    <p>v<sub>be</sub> = h<sub>ie</sub>·i<sub>b</sub> + h<sub>re</sub>·v<sub>ce</sub></p>
    <p>i<sub>c</sub> = h<sub>fe</sub>·i<sub>b</sub> + h<sub>oe</sub>·v<sub>ce</sub></p>
    <ul className="list-disc ml-6">
      <li>h<sub>ie</sub> = v<sub>be</sub> / i<sub>b</sub> | v<sub>ce</sub> = 0</li>
      <li>h<sub>re</sub> = v<sub>be</sub> / v<sub>ce</sub> | i<sub>b</sub> = 0</li>
      <li>h<sub>fe</sub> = i<sub>c</sub> / i<sub>b</sub> | v<sub>ce</sub> = 0</li>
      <li>h<sub>oe</sub> = i<sub>c</sub> / v<sub>ce</sub> | i<sub>b</sub> = 0</li>
    </ul>
  </div>
);

const ProcedureContent = () => (
  <div className="prose max-w-none">

    <h3 className="font-bold text-blue-600 mt-4">Components & Supply Values:</h3>
    <ul className="list-disc ml-6">
      <li>Base resistor R<sub>B</sub> = 100 kΩ</li>
      <li>Collector resistor R<sub>C</sub> = 1.0 kΩ</li>
      <li>Base supply voltage V<sub>BB</sub>: 0 to 30V</li>
      <li>Collector supply voltage V<sub>CC</sub>: 0 to 30V</li>
      <li>Base current I<sub>B</sub> is measured in µA (range: 0–200 µA)</li>
      <li>Collector current I<sub>C</sub> is measured in mA (range: 0–200 mA)</li>
      <li>V<sub>BE</sub> voltmeter range: 0–20V</li>
      <li>V<sub>CE</sub> voltmeter range: 0–20V</li>
    </ul>

    <h3 className="font-bold text-blue-600 mt-4">Circuit Diagram:</h3>
    <div className="mt-2">
      <img
        src="/assets/images/exp7-circuit.jpeg"
        alt="CE Amplifier Circuit Diagram"
        className="w-[70%] h-auto border border-gray-300 p-2"
      />
    </div>

    <h3 className="font-bold text-blue-600 mt-4">Circuit Setup:</h3>
    <ul className="list-disc ml-6">
      <li>Drag and drop all components — Transistor (BC107), R<sub>B</sub> (100kΩ), R<sub>C</sub> (1kΩ), Ammeters, and Voltmeters — onto the breadboard as per the circuit diagram.</li>
      <li>Connect the base resistor R<sub>B</sub> (100kΩ) in series with the base circuit between V<sub>BB</sub> and the base terminal (B) of the transistor.</li>
      <li>Connect the microammeter (0–200µA) in series in the base circuit to measure I<sub>B</sub>.</li>
      <li>Connect the collector resistor R<sub>C</sub> (1kΩ) between V<sub>CC</sub> and the collector terminal (C) of the transistor.</li>
      <li>Connect the ammeter (0–200mA) in series in the collector circuit to measure I<sub>C</sub>.</li>
      <li>Connect the emitter terminal (E) directly to ground.</li>
      <li>Connect voltmeter (0–20V) across base and emitter terminals to measure V<sub>BE</sub>.</li>
      <li>Connect voltmeter (0–20V) across collector and emitter terminals to measure V<sub>CE</sub>.</li>
      <li>Connect V<sub>BB</sub> (0–30V) to the base circuit and V<sub>CC</sub> (0–30V) to the collector circuit with correct polarity.</li>
      <li>I<sub>B</sub> and V<sub>BE</sub> are the <strong>input</strong> current and voltage respectively.</li>
      <li>I<sub>C</sub> and V<sub>CE</sub> are the <strong>output</strong> current and voltage respectively.</li>
      <li>Check all connections carefully before turning on the power supply.</li>
    </ul>

    <h3 className="font-bold text-blue-600 mt-4">Input Characteristics (V<sub>BE</sub> vs I<sub>B</sub>):</h3>
    <ul className="list-disc ml-6">
      <li>Set V<sub>CE</sub> to a constant value using the button to give digital values. Use the following set of values: <strong>1V, 2V, 3V, 4V</strong>.</li>
      <li>For each constant V<sub>CE</sub>, vary V<sub>BE</sub> through the following steps: <strong>0, 0.1, 0.3, 0.5, 0.7, 0.8, 0.9, 1V</strong>.</li>
      <li>Note down the corresponding I<sub>B</sub> (in µA) for each value of V<sub>BE</sub>.</li>
      <li>Each time, display the value in the <strong>'display' box</strong>.</li>
      <li>Repeat for all four V<sub>CE</sub> values and tabulate the readings.</li>
    </ul>

    <h3 className="font-bold text-blue-600 mt-4">Output Characteristics (V<sub>CE</sub> vs I<sub>C</sub>):</h3>
    <ul className="list-disc ml-6">
      <li>Set I<sub>B</sub> to a constant value using the microammeter. Use the following set of values: <strong>20µA, 40µA, 60µA, 80µA</strong>.</li>
      <li>For each constant I<sub>B</sub>, vary V<sub>CE</sub> through the following steps: <strong>0, 1, 2, 3, 4, 5, 6, 7, 8V</strong>.</li>
      <li>Note the corresponding I<sub>C</sub> (in mA) for each V<sub>CE</sub> value.</li>
      <li>Each time, display the value in the <strong>'display' box</strong>.</li>
      <li>Repeat for all four I<sub>B</sub> values and tabulate the readings.</li>
    </ul>

    <h3 className="font-bold text-blue-600 mt-4">Graph:</h3>
    <ul className="list-disc ml-6">
      <li><strong>Input characteristics:</strong> Plot I<sub>B</sub> (µA) on Y-axis vs V<sub>BE</sub> (V) on X-axis for each constant V<sub>CE</sub> value (V<sub>CE1</sub> &lt; V<sub>CE2</sub> &lt; V<sub>CE3</sub> &lt; V<sub>CE4</sub>).</li>
      <li><strong>Output characteristics:</strong> Plot I<sub>C</sub> (mA) on Y-axis vs V<sub>CE</sub> (V) on X-axis for each constant I<sub>B</sub> value.</li>
    </ul>

    <h3 className="font-bold text-blue-600 mt-4">Precautions:</h3>
    <ul className="list-disc ml-6">
      <li>Ensure that all connections are correct before turning on the power supply.</li>
      <li>Use appropriate ranges on all meters for accurate readings.</li>
      <li>Do not exceed voltage or current ratings of the transistor to avoid damage.</li>
      <li>Switch off the power supply immediately after taking readings.</li>
    </ul>

    <h3 className="font-bold text-blue-600 mt-4">Conclusion:</h3>
    <ul className="list-disc ml-6">
      <li>The hybrid parameters of the CE amplifier were successfully determined.</li>
      <li>The input and output characteristics were plotted.</li>
      <li>Values of h<sub>ie</sub>, h<sub>re</sub>, h<sub>fe</sub>, and h<sub>oe</sub> were calculated using observed values.</li>
    </ul>
  </div>
);

const SimulationContent = () => (
  <div className="prose max-w-none">
    < HybridParameterSimulation />
  </div>
);

const questions = [
  {
    question: 'What is the main purpose of determining hybrid parameters in a CE amplifier?',
    options: [
      'To calculate input resistance only',
      'To measure current gain only',
      'To understand the transistor’s behavior in small signal models',
      'To operate transistor in cutoff region'
    ],
    answer: 2
  },
  {
    question: 'In the input characteristics of a CE amplifier, which quantity is kept constant?',
    options: ['I_B', 'V_BE', 'V_CE', 'I_C'],
    answer: 2
  },
  {
    question: 'Which parameter is determined from the slope of the input characteristic curve?',
    options: ['h_oe', 'h_fe', 'h_ie', 'h_re'],
    answer: 2
  },
  {
    question: 'What is the configuration of the transistor used in this experiment?',
    options: ['Common Base', 'Common Emitter', 'Common Collector', 'Darlington Pair'],
    answer: 1
  },
  {
    question: 'Which instrument is used to measure base current (I_B) in microamperes?',
    options: ['Voltmeter', 'Ammeter', 'Microammeter', 'Multimeter'],
    answer: 2
  },
  {
    question: 'What is the role of the emitter in a BJT?',
    options: [
      'Collects charge carriers',
      'Controls base current',
      'Supplies majority carriers',
      'Blocks current flow'
    ],
    answer: 2
  },
  {
    question: 'Which region is the transistor biased in for this experiment?',
    options: ['Cut-off', 'Saturation', 'Active', 'Breakdown'],
    answer: 2
  }
];

const QuizContent = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState<boolean>(false);

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
          {q.options.map((option: string, oIndex: number) => (
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

export default Experiment7;