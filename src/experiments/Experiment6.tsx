import React, { useState } from 'react';
import ExperimentLayout from './layout/ExperimentLayout';
import FullBridgeRectifier from './simulations/Experiment6/src/pages/Index';
const Experiment6 = () => {
  return (
    <ExperimentLayout
      title="Experiment 6"
      description="This experiment demonstrates the fundamentals and working of single phase full wave bridge rectifier."
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
    {/* Add the theory content for Experiment 1 here */}
    <h2 className="font-bold text-blue-600">Theory</h2>
    <p>A full-wave bridge rectifier is an essential component in power electronics, used to convert alternating current (AC) into direct current (DC). It utilizes four diodes arranged in a bridge configuration to efficiently use both halves of the AC waveform.</p>
    <h3 className="font-bold text-blue-600 mt-4">Working Principle</h3>
    <ol className="list-decimal ml-6">
      <li>In a bridge rectifier, the AC input is applied to a transformer, which steps down the voltage to a safer level (e.g., 6-0-6V).  
</li>
<li>
  The secondary winding of the transformer is connected to a diode bridge comprising four diodes (D1, D2, D3, D4).
  </li>
  <li>
    The load resistor (R) is connected across the output terminals of the bridge.
  </li>
    </ol>
    <br />
    <p>
      The following changes will be observed:-
    </p>
    <ul className="list-disc ml-6">
     <li>
       During the positive half-cycle of the AC input, diodes D1 and D2 conduct, allowing current to flow through the load in one direction.
     </li>
     <li>
      During the negative half-cycle, diodes D3 and D4 conduct, again allowing current to flow through the load in the same direction.
     </li>
     <li>
      As a result, both halves of the AC signal contribute to the output, which is a pulsating DC voltage.
     </li>
    </ul>
    <h3 className="font-bold text-black-600 mt-4">With Capacitor Filter :</h3>
    <p>
      To smoothen the pulsating DC, a capacitor is connected in parallel with the load resistor. This capacitor:</p>
    <ul className="list-disc ml-6">
      <li>
        Charges during the rising part of the waveform.
      </li>
      <li>
        Discharges during the falling edge, maintaining the output voltage level.
      </li>
      <li>
        Reduces ripple voltage, resulting in a smoother DC output.     
        </li>
    </ul>
    <h3 className="font-bold text-blue-600 mt-4">Apparatus Required:</h3>
    <p className="text-gray-700 mb-4">The following equipments are needed to perform this experiment:</p>
    <div className="overflow-x-auto">
  <table className="min-w-full text-sm text-left border border-gray-400 border-collapse">
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        <th className="px-4 py-2 border border-gray-400">S. No</th>
        <th className="px-4 py-2 border border-gray-400">Name</th>
        <th className="px-4 py-2 border border-gray-400">Range</th>
        <th className="px-4 py-2 border border-gray-400">Quantity</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-gray-100 transition-colors">
        <td className="px-4 py-2 border border-gray-400">1</td>
        <td className="px-4 py-2 border border-gray-400">Transformer</td>
        <td className="px-4 py-2 border border-gray-400">230V / (6–0–6)V</td>
        <td className="px-4 py-2 border border-gray-400">1</td>
      </tr>
      <tr className="hover:bg-gray-100 transition-colors">
        <td className="px-4 py-2 border border-gray-400">2</td>
        <td className="px-4 py-2 border border-gray-400">R.P.S</td>
        <td className="px-4 py-2 border border-gray-400">(0–30)V</td>
        <td className="px-4 py-2 border border-gray-400">2</td>
      </tr>
    </tbody>
  </table>
</div>
<h3 className="font-bold text-blue-600 mt-4">Components Required:</h3>
<p className="text-gray-700 mb-4">The following components are needed to perform this experiment:</p>
<div className="overflow-x-auto">
  <table className="min-w-full text-sm text-left border border-gray-400 border-collapse">
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        <th className="px-4 py-2 border border-gray-400">S. No</th>
        <th className="px-4 py-2 border border-gray-400">Name</th>
        <th className="px-4 py-2 border border-gray-400">Specification</th>
        <th className="px-4 py-2 border border-gray-400">Quantity</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-gray-100 transition-colors">
        <td className="px-4 py-2 border border-gray-400">1</td>
        <td className="px-4 py-2 border border-gray-400">Diode</td>
        <td className="px-4 py-2 border border-gray-400">IN4007</td>
        <td className="px-4 py-2 border border-gray-400">4</td>
      </tr>
      <tr className="hover:bg-gray-100 transition-colors">
        <td className="px-4 py-2 border border-gray-400">2</td>
        <td className="px-4 py-2 border border-gray-400">Resistor</td>
        <td className="px-4 py-2 border border-gray-400">1KΩ</td>
        <td className="px-4 py-2 border border-gray-400">1</td>
      </tr>
      <tr className="hover:bg-gray-100 transition-colors">
        <td className="px-4 py-2 border border-gray-400">3</td>
        <td className="px-4 py-2 border border-gray-400">Breadboard</td>
        <td className="px-4 py-2 border border-gray-400">—</td>
        <td className="px-4 py-2 border border-gray-400">1</td>
      </tr>
      <tr className="hover:bg-gray-100 transition-colors">
        <td className="px-4 py-2 border border-gray-400">4</td>
        <td className="px-4 py-2 border border-gray-400">Capacitor</td>
        <td className="px-4 py-2 border border-gray-400">100 µF</td>
        <td className="px-4 py-2 border border-gray-400">1</td>
      </tr>
      <tr className="hover:bg-gray-100 transition-colors">
        <td className="px-4 py-2 border border-gray-400">5</td>
        <td className="px-4 py-2 border border-gray-400">CRO</td>
        <td className="px-4 py-2 border border-gray-400">1Hz – 20MHz</td>
        <td className="px-4 py-2 border border-gray-400">1</td>
      </tr>
      <tr className="hover:bg-gray-100 transition-colors">
        <td className="px-4 py-2 border border-gray-400">6</td>
        <td className="px-4 py-2 border border-gray-400">Connecting wires</td>
        <td className="px-4 py-2 border border-gray-400">—</td>
        <td className="px-4 py-2 border border-gray-400">As required</td>
      </tr>
    </tbody>
  </table>
</div>
  </div>
);

const ProcedureContent = () => (
  <div>
    {/* Add the procedure content for Experiment 1 here */}
     <h2 className="font-bold text-blue-600">Procedure</h2>
   <p>Following is the procedure to conduct the experiment:</p>
   <h3 className="font-bold text-blue-600 mt-4">Without Filter:</h3>
   <ol className="list-decimal ml-6">
    <li>
  Make the circuit connections as per the <strong>full-wave bridge rectifier diagram</strong>.
  </li>

    <li>
      Connect the <strong>230V, 50Hz AC supply</strong> to <strong>the primary side of the step-down transformer</strong>.
    </li>
    <li>
      Connect the <strong>secondary output of the transformer</strong> to the input of the <strong>bridge rectifier circuit</strong>bridge rectifier circuit.
    </li>
    <li>
      Take the <strong>output across the load resistor</strong> (1KΩ) using a <strong>CRO</strong>.
    </li>
    <li>
      Observe and plot the waveform (typically shows pulsating DC).
    </li>
   </ol>

   <h3 className="font-bold text-blue-600 mt-4">With Filter:</h3>
   <ol className="list-decimal ml-6">
    <li>
  Repeat the above steps, but  <strong>add a capacitor </strong>(100µF) across the output (load).
  </li>

    <li>
      The capacitor will act as a<strong> filter</strong> , reducing the ripple in the DC output.
    </li>
    <li>
      Take the  <strong>filtered output</strong>across the load using a <strong>CRO</strong>.
    </li>
    <li>
      Take the <strong>output across the load resistor</strong> (1KΩ) using a <strong>CRO</strong>.
    </li>
    <li>
      Observe and <strong>plot the waveform</strong>, which should now be <strong>smoother DC</strong>.
    </li>
   </ol>
    <h3 className="font-bold text-blue-600 mt-4">Precautions:</h3>
    <ul className="list-disc ml-6">
      <li>Ensure all connections are correct <strong>before powering the circuit</strong>.
        </li>
      <li>Use <strong>IN4007 diodes</strong> with correct polarity (anode to positive, cathode to negative).</li>
      <li>Do not <strong>short-circuit</strong> the transformer output.</li>
      <li>Use a capacitor of correct <strong>rating and polarity</strong> (electrolytic).</li>
      <li>Handle the <strong>CRO probes carefully</strong> and ensure proper grounding.</li>
      <li>
        Avoid <strong>touching live wires or terminals</strong> when power is ON.
      </li>
    </ul>

    <h3 className="font-bold text-blue-600 mt-4">Conclusion</h3>
    <p>
    The experiment to construct and test a <strong>single-phase full-wave bridge rectifier</strong> was successfully performed. The output waveform was observed on the CRO, and it was found that:
</p>
<ul className="list-disc ml-6">
  <li>
    Without the filter capacitor, the rectifier output was pulsating DC with noticeable ripples.</li>
<li>
  With the filter capacitor connected, the output became smoother, demonstrating a significant reduction in ripple voltage.
</li>
<br />
<p>
  The rectifier effectively converted <strong>AC to DC </strong>using a bridge configuration of four diodes, confirming the theoretical working of full-wave rectification. This setup is widely applicable in designing DC power supplies for various electronic devices.

</p>
</ul>
  </div>
);

const SimulationContent = () => (
  <div>
    <p>hello</p> 
    <FullBridgeRectifier />
  </div>
);

const QuizContent = () => {
  const questions = [
    {
      question: 'How many diodes are used in a single-phase full-wave bridge rectifier?',
      options: [
        '2',
        '3', 
        '4',
        '6'
      ],
      answer: 2
    },
    {
      question: 'During the positive half-cycle of AC input, which diodes conduct in a bridge rectifier?',
      options: ['D1 and D3', 'D2 and D4', 'D1 and D2', 'D3 and D4'],
      answer: 2
    },
    {
      question: 'What is the primary purpose of connecting a filter capacitor across the load in a bridge rectifier?',
      options: [
        'To increase the output voltage',
        'To reduce ripple voltage and smooth the DC output',
        'To protect the diodes from damage',
        'To increase the current capacity'
      ],
      answer: 1
    },
    {
      question: 'In the experiment, what is the specification of the step-down transformer used?',
      options: [
        '230V / 12-0-12V',
        '230V / 9-0-9V',
        '230V / 6-0-6V',
        '230V / 15-0-15V'
      ],
      answer: 2
    },
    {
      question: 'What is the ripple frequency of the output in a single-phase full-wave bridge rectifier if the input frequency is 50Hz?',
      options: [
        '25Hz',
        '50Hz',
        '100Hz',
        '200Hz'
      ],
      answer: 2
    },
    {
      question: 'What is the main advantage of a bridge rectifier over a center-tap rectifier?',
      options: [
        'Uses fewer diodes',
        'Better transformer utilization factor',
        'Higher output voltage',
        'Lower cost'
      ],
      answer: 1
    },
    {
      question: 'What type of output waveform is obtained from a bridge rectifier WITHOUT a filter capacitor?',
      options: [
        'Pure DC',
        'Pulsating DC with ripples',
        'Sinusoidal AC',
        'Square wave'
      ],
      answer: 1
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
export default Experiment6;
