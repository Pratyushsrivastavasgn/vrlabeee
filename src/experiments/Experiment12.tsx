import React, { useState } from 'react';
import ExperimentLayout from './layout/ExperimentLayout';
import ClassAPowerAmplifier  from './simulations/Experiment12/ClassAPowerAmplifier';

const Experiment12 = () => {
  return (
    <ExperimentLayout
      title="Experiment 12"
      description="This experiment demonstrates how to construct and determine the gain of Class - A Power amplifier."
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
    <p>
      The power amplifier is said to be Class A amplifier if the Q point and the input signal are selected such that the output signal is obtained for a full input signal cycle.
      For all values of input signal, the transistor remains in the active region and never enters into cut-off or saturation region.
      When an AC signal is applied, the collector voltage varies sinusoidally hence the collector current also varies sinusoidally.
      The collector current flows for 360 degree (full cycle) of the input signal i.e. the angle of the collector current flow is 360 degree.
    </p>

    <h2 className="font-bold text-blue-600">Apparatus Required:</h2>
    <p>MATLAB Simulink Software</p>

    <h2 className="font-bold text-blue-600">Formula:</h2>
    <p>Gain = V<sub>o</sub> / V<sub>in</sub></p>
    <p>where V<sub>o</sub> is the output voltage of amplifier and V<sub>in</sub> is the input voltage of amplifier.</p>

    <h2 className="font-bold text-blue-600 mt-4">Circuit Diagram:</h2>
    <img src="https://i.postimg.cc/ht0dqPWT/Circuit-diagram-2.jpg" alt="Circuit Diagram for Class-A Power Amplifier" className="w-[20%] h-[20%] border border-gray-300 p-2" />
  </div>
);

const ProcedureContent = () => (
  <div>
    <h2 className="font-bold text-blue-600">Procedure:</h2>
    <p><strong>It includes the following steps:</strong></p>
    <ol className="list-disc ml-6">
      <li>Give the connections as per the circuit diagram.</li>
      <li>Set input as 50 mV, frequency of 1kHz.</li>
      <li>Note down Vo from the CRO.</li>
      <li>Calculate gain using formula given.</li>
      <li>The same steps may be followed with different input voltages or with different frequencies and their corresponding gain can be calculated.</li>
    </ol>

    <h2 className="font-bold text-blue-600 mt-4">Model Graph:</h2>
    <img src="https://i.postimg.cc/fy5KL71j/model-graph.jpg" alt="Model Graph" className="w-[20%] h-[20%] border border-gray-300 p-2" />

    <h2 className="font-bold text-blue-600 mt-4">Precautions:</h2>
    <ol className="list-disc ml-6">
      <li>Ensure correct biasing of the transistor to keep it in the active region.</li>
      <li>Use proper input voltage levels to avoid signal clipping or distortion.</li>
      <li>Verify all connections in the Simulink model before simulation.</li>
      <li>Set the CRO parameters correctly for accurate Vo measurement.</li>
      <li>Avoid high input frequency that may exceed the amplifier's bandwidth.</li>
    </ol>

    <h2 className="font-bold text-blue-600 mt-4">Conclusion:</h2>
    <p>Thus the gain of class-A power amplifier has been determined.</p>
  </div>
);

const SimulationContent = () => (
  <div>
    <ClassAPowerAmplifier />
    {/* <h2>Simulation</h2>
    <p>Interactive simulation or instructions will go here.</p> */}
  </div>
);

const questions = [
  {
    question: 'What defines a Class-A power amplifier operation?',
    options: [
      'Transistor conducts for half of the input cycle',
      'Transistor conducts only when input is positive',
      'Transistor switches between cut-off and saturation',
      'Transistor conducts for the entire input signal cycle'
    ],
    answer: 3
  },
  {
    question: 'In the experiment, what does the term “gain” refer to?',
    options: [
      'Power consumed by the amplifier',
      'Ratio of output current to input current',
      'Ratio of output voltage to input voltage',
      'Frequency response of the amplifier'
    ],
    answer: 2
  },
  {
    question: 'Which of the following software is used in this experiment?',
    options: ['Multisim', 'MATLAB Simulink', 'LabVIEW', 'PSPICE'],
    answer: 1
  },
  {
    question: 'What is the initial input voltage and frequency used in the procedure?',
    options: ['5 V, 1 MHz', '500 mV, 10 kHz', '50 mV, 1 kHz', '5 mV, 100 Hz'],
    answer: 2
  },
  {
    question: 'What is the collector current conduction angle in a Class-A amplifier?',
    options: ['90', '180', '270', '360'],
    answer: 3
  },
  {
    question: 'What is the purpose of using a CRO in this experiment?',
    options: [
      'To measure resistance',
      'To display the frequency response',
      'To observe and measure the output voltage waveform',
      'To apply the input signal'
    ],
    answer: 2
  },
  {
    question: 'Why does the transistor in a Class-A amplifier not enter cut-off or saturation?',
    options: [
      'The biasing keeps it in the active region always',
      'The signal amplitude is too high',
      'The Q point is biased in the cutoff region',
      'The input is too weak to affect it'
    ],
    answer: 0
  }
];

const QuizContent = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
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

export default Experiment12;