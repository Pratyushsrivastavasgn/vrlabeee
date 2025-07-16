import React, { useState } from 'react';
import ExperimentLayout from './layout/ExperimentLayout';
import VoltageRegulator from './simulations/Experiment9/VoltageRegulator';

const Experiment9 = () => {
  return (
    <ExperimentLayout
      title="Experiment 9"
      description="This experiment demonstrates the fundamentals and working of Transistor Series Voltage Regulator circuit for obtaining constant output voltage."
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
    <h2 className="font-bold text-blue-600">Introduction</h2>
    <p>
      A Transistor Series Voltage Regulator is an electronic circuit that maintains a constant output voltage regardless of changes in input voltage or load conditions. It uses a transistor connected in series with the load to regulate voltage, making it suitable for applications requiring a stable power supply.
    </p>

    <h2 className="font-bold text-blue-600">Working Principle</h2>
    <p>
      The series regulator operates by adjusting the resistance of the transistor in response to changes in input voltage or load. A Zener diode provides a reference voltage. When the output voltage tends to change, the base current of the transistor is adjusted to maintain a constant output.
    </p>

    <h2 className="font-bold text-blue-600">Circuit Description</h2>
    <p>
      The circuit consists of a Zener diode providing a reference voltage and a transistor acting as a variable resistor. The load is connected in series with the transistor. The transistor’s base is biased using the Zener diode, and any variation in input is compensated by the transistor adjusting its conduction level.
    </p>

    <h2 className="font-bold text-blue-600">Load and Line Regulation</h2>
    <ul>
      <li><strong>Load Regulation:</strong> Maintaining constant output despite changes in load current.</li>
      <li><strong>Line Regulation:</strong> Maintaining constant output despite changes in input voltage.</li>
    </ul>

    <h2 className="font-bold text-blue-600">Mathematical Analysis</h2>
    <ul>
      <li>Let V<sub>z</sub> = Zener voltage</li>
      <li>V<sub>BE</sub> = Base-emitter voltage of transistor</li>
      <li>Then, V<sub>out</sub> = V<sub>z</sub> - V<sub>BE</sub></li>
    </ul>

    <h2 className="font-bold text-blue-600">Applications</h2>
    <ul>
      <li>Used in DC power supplies</li>
      <li>Voltage regulation in battery chargers</li>
      <li>Used in electronic appliances requiring stable voltage</li>
    </ul>
  </div>
);

const ProcedureContent = () => (
  <div className="prose max-w-none">
    <h2 className="font-bold text-blue-600">Circuit Diagram</h2>
    <div className="flex justify-center my-4">
      <img
        src="https://i.postimg.cc/zBd0q1WZ/Circuit-diagram-exp-9.jpg"
        alt="Circuit Diagram"
        className="max-w-full border border-gray-300 rounded shadow-md"
      />
    </div>

    <h2 className="font-bold text-blue-600 mt-6">Model Graph</h2>
    <div className="flex justify-center my-4">
      <img
        src="https://i.postimg.cc/BZLVJXhm/model-graph-exp-9.jpg"
        alt="Model Graph"
        className="max-w-full border border-gray-300 rounded shadow-md"
      />
    </div>

    <h2 className="font-bold text-blue-600">Experimental Procedure</h2>
    
    <h3 className="font-bold text-blue-600 mt-4">Load Regulation Test:</h3>
    <ol className="list-decimal ml-6">
      <li>Make connections as per the circuit diagram</li>
      <li>Keep the input voltage constant</li>
      <li>Vary the values of R<sub>L</sub> and note Voltmeter and Ammeter readings</li>
      <li>Take care that R<sub>L</sub> should not be less than 150Ω</li>
      <li>Record the readings for analysis</li>
    </ol>

    <h3 className="font-bold text-blue-600 mt-4">Line Regulation Test:</h3>
    <ol className="list-decimal ml-6">
      <li>Make connections as per the circuit diagram</li>
      <li>Keep the output current constant</li>
      <li>Vary the input voltage for various values</li>
      <li>Note the corresponding output voltage readings</li>
      <li>Record the readings for analysis</li>
    </ol>

    <h3 className="font-bold text-blue-600 mt-4">Safety Precautions:</h3>
    <ul className="list-disc ml-6">
      <li>Ensure proper connections before applying power</li>
      <li>Use appropriate voltage and current ratings for components</li>
      <li>Handle measuring instruments carefully</li>
      <li>Switch off power before making any circuit changes</li>
      <li>Check polarity of components before connection</li>
    </ul>

    <h3 className="font-bold text-blue-600 mt-4">Expected Results:</h3>
    <ul className="list-disc ml-6">
      <li><strong>Load Regulation:</strong> Output voltage should remain relatively constant as load current varies</li>
      <li><strong>Line Regulation:</strong> Output voltage should remain stable despite input voltage variations</li>
      <li><strong>Regulation Quality:</strong> Good regulation is indicated by minimal voltage variation (typically less than 5%)</li>
    </ul>
  </div>
);

const SimulationContent = () => (
  <div>
    <VoltageRegulator />
  </div>
);

const questions = [
  {
    question: 'What is the main aim of the Transistor Series Voltage Regulator experiment?',
    options: [
      'To study JFET characteristics',
      'To obtain a constant current source',
      'To operate a transistor voltage regulator and obtain a constant output voltage',
      'To build an astable multivibrator'
    ],
    answer: 2
  },
  {
    question: 'Which component provides the reference voltage in the circuit?',
    options: ['Transistor', 'Zener Diode', 'Resistor', 'Ammeter'],
    answer: 1
  },
  {
    question: 'In the series regulator, the transistor acts like a:',
    options: ['Voltage source', 'Capacitor', 'Fixed resistor', 'Variable resistor'],
    answer: 3
  },
  {
    question: 'The relationship between Vout and VZ is given by:',
    options: ['Vout = VZ + VBE', 'Vout = VZ - VBE', 'Vout = VZ * VBE', 'Vout = VZ / VBE'],
    answer: 1
  },
  {
    question: 'What happens when the input voltage increases in the regulator circuit?',
    options: [
      'VBE increases and conduction increases',
      'VBE decreases, transistor conduction reduces',
      'Collector-emitter resistance decreases',
      'Zener diode stops conducting'
    ],
    answer: 1
  },
  {
    question: 'In load regulation, what parameter is varied?',
    options: ['Zener voltage', 'Transistor type', 'RL (Load Resistance)', 'RPS current'],
    answer: 2
  },
  {
    question: 'In line regulation, what is varied?',
    options: ['Load resistance', 'Output voltage', 'Input voltage', 'Base voltage'],
    answer: 2
  }
];

const QuizContent = () => {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleOptionChange = (qIndex, oIndex) => {
    if (!submitted) {
      const updated = [...selectedAnswers];
      updated[qIndex] = oIndex;
      setSelectedAnswers(updated);
    }
  };

  const getOptionStyle = (qIndex, oIndex) => {
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

export default Experiment9;
