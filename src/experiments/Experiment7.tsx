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
      The aim of this experiment is to determine the hybrid parameters of a Common Emitter (CE) amplifier using its input and output characteristics. 
      A Bipolar Junction Transistor (BJT) is used for this purpose. It is a three-terminal device with emitter, base, and collector regions.
    </p>

    <ul className="list-disc ml-6">
      <li><strong>Emitter:</strong> Heavily doped and moderate in area. It supplies majority charge carriers.</li>
      <li><strong>Base:</strong> Very thin and lightly doped. It controls the number of carriers flowing through the transistor.</li>
      <li><strong>Collector:</strong> Moderately doped and large in area. It collects carriers from the emitter via base.</li>
    </ul>

    <p>
      In the active region of operation, the emitter-base junction is forward biased, while the collector-base junction is reverse biased.
    </p>

    <h3 className="font-bold text-blue-600 mt-4">Components Required:</h3>
    <table className="table-auto border border-collapse border-gray-400">
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
          <td className="border px-4 py-2">–</td>
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
    <table className="table-auto border border-collapse border-gray-400">
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
          <td className="border px-4 py-2">R.P.S</td>
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
    <h2 className="font-bold text-blue-600">Procedure</h2>

    <h3 className="font-bold text-blue-600 mt-4">Input Characteristics:</h3>
    <ul className="list-disc ml-6">
      <li>Connect the circuit according to the input characteristics diagram.</li>
      <li>Set the collector-emitter voltage (V<sub>CE</sub>) to a constant value using the DC power supply.</li>
      <li>Vary the base-emitter voltage (V<sub>BE</sub>) in small regular steps.</li>
      <li>Note the corresponding base current (I<sub>B</sub>) for each V<sub>BE</sub> value.</li>
      <li>Repeat the above steps for multiple values of V<sub>CE</sub>.</li>
      <li>Plot a graph of V<sub>BE</sub> vs I<sub>B</sub> for each constant V<sub>CE</sub>.</li>
    </ul>

    <h3 className="font-bold text-blue-600 mt-4">Output Characteristics:</h3>
    <ul className="list-disc ml-6">
      <li>Connect the circuit as per the output characteristics configuration.</li>
      <li>Set the base current (I<sub>B</sub>) to a constant value using the microammeter.</li>
      <li>Gradually vary the collector-emitter voltage (V<sub>CE</sub>) using the power supply.</li>
      <li>Note the corresponding collector current (I<sub>C</sub>) for each V<sub>CE</sub> value.</li>
      <li>Repeat the procedure for different base current values.</li>
      <li>Plot a graph of V<sub>CE</sub> vs I<sub>C</sub> for each constant I<sub>B</sub>.</li>
    </ul>

    <h3 className="font-bold text-blue-600 mt-4">Circuit Diagram:</h3>
    <div className="mt-2">
      <img
        src="https://www.poriyaan.in/media/imgPori/images21/tPfpa37.png"
        alt="Circuit Diagram"
        className="w-[20%] h-[20%] border border-gray-300 p-2"
      />
    </div>

    <h3 className="font-bold text-blue-600 mt-4">Pin Diagram:</h3>
    <div className="text-left mt-2">
      <img
        src="https://i.postimg.cc/4nVsTcgv/imag-1.jpg"
        alt="Pin Diagram"
        className="max-w-full h-auto border border-gray-300 p-2"
      />
    </div>

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