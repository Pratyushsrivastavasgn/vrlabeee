import React, { useState } from 'react';
import ExperimentLayout from './layout/ExperimentLayout';
import HouseWiringSimulation from './simulations/Experiment3/src/components/HouseWiringSimulation';


const Experiment3 = () => {
  return (
    <ExperimentLayout
      title="Experiment 3"
      description="This experiment demonstrates the basic setup and functioning of household electrical wiring systems."
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
    <h2 className="font-bold text-blue-600">Theory:</h2>
    <p>House wiring refers to the installation of electrical wires and components in residential buildings to safely distribute electrical power.</p>
    <h2 className="font-bold text-blue-600 mt-4">Key Concepts:</h2>
    <ol className="list-decimal ml-6">
      <li><strong>A basic house wiring setup typically includes:</strong></li>
        <ul className="list-disc ml-6">
          <li>Main control box (with MCB or fuse).</li>
          <li>Energy meter for measuring power consumption.</li>
          <li>Switches and sockets for control and appliance connection.</li>
          <li>Wiring layout that connects power source to lights, fans, plugs.</li>
        </ul>
      <li><strong>Proper wiring ensures:</strong>
        <ul className="list-disc ml-6">
          <li>Efficient power distribution.</li>
          <li>Safety from electrical hazards.</li>
          <li>Reliable operation of domestic appliances.</li>
        </ul>
      </li>
    </ol>
    <h2 className="font-bold text-blue-600 mt-4">Apparatus Required:</h2>
    <p>The following equipments are required to perform this experiment:</p>
    <br></br>
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
        <tr>
          <td className="border border-gray-300 px-2 py-1 text-center">1</td>
          <td className="border border-gray-300 px-2 py-1">1-Phase Energy Meter</td>
          <td className="border border-gray-300 px-2 py-1">-</td>
          <td className="border border-gray-300 px-2 py-1 text-center">1</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-2 py-1 text-center">2</td>
          <td className="border border-gray-300 px-2 py-1">Main Box</td>
          <td className="border border-gray-300 px-2 py-1">-</td>
          <td className="border border-gray-300 px-2 py-1 text-center">1</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-2 py-1 text-center">3</td>
          <td className="border border-gray-300 px-2 py-1">Switch</td>
          <td className="border border-gray-300 px-2 py-1">5 A</td>
          <td className="border border-gray-300 px-2 py-1 text-center">3</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-2 py-1 text-center">4</td>
          <td className="border border-gray-300 px-2 py-1">Indicator</td>
          <td className="border border-gray-300 px-2 py-1">-</td>
          <td className="border border-gray-300 px-2 py-1 text-center">1</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-2 py-1 text-center">5</td>
          <td className="border border-gray-300 px-2 py-1">Incandescent Lamp</td>
          <td className="border border-gray-300 px-2 py-1">-</td>
          <td className="border border-gray-300 px-2 py-1 text-center">2</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-2 py-1 text-center">6</td>
          <td className="border border-gray-300 px-2 py-1">Incandescent Lamp holder</td>
          <td className="border border-gray-300 px-2 py-1">-</td>
          <td className="border border-gray-300 px-2 py-1 text-center">2</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-2 py-1 text-center">7</td>
          <td className="border border-gray-300 px-2 py-1">Fan</td>
          <td className="border border-gray-300 px-2 py-1">-</td>
          <td className="border border-gray-300 px-2 py-1 text-center">1</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-2 py-1 text-center">8</td>
          <td className="border border-gray-300 px-2 py-1">Three Pin Plug</td>
          <td className="border border-gray-300 px-2 py-1">-</td>
          <td className="border border-gray-300 px-2 py-1 text-center">1</td>
        </tr>
      </tbody>
    </table>
    <h2 className="font-bold text-blue-600 mt-4">Circuit Diagram:</h2>
    <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bharathuniv.ac.in%2Fcolleges1%2Fdownloads%2Fcourseware_ece%2Fnotes%2FBEE%25201L1%2528BEE%2520%26%2520BEC%2529%2520%2520LAB%2520MANUAL.pdf&psig=AOvVaw2UIVR2Sl_68Rj7v1MAYIXb&ust=1749197769380000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKDlru7v2Y0DFQAAAAAdAAAAABAU" alt="Circuit Diagram for House wiring"/>
  </div>
);

const ProcedureContent = () => (
  <div>
    {/* Add the procedure content for Experiment 1 here */}
    <h2 className="font-bold text-blue-600">Procedure:</h2>
    <p>This experiment involves assembling a basic house wiring circuit using switches, sockets, and lamps to understand domestic wiring and test proper electrical connections.</p>
    <p><strong>It include the following steps:</strong></p>
    <ol className="list-disc ml-6">
      <li>Make connections as per the provided circuit diagram (includes main box → meter → switch → loads).</li>
      <li>Turn ON switches one by one to observe corresponding load operation (lamp, fan, plug).</li>
      <li>Record the energy meter readings as each device is powered on.</li>
      <li> Ensure proper earthing and safety measures during operation.</li>
    </ol>
    <br></br>
    <h2 className="font-bold text-blue-600">Precautions:</h2>
    <p><strong>Here are some important precautions to be kept in mind while performing this experiment:</strong></p>
    <ol className="list-disc ml-6">
      <li>Always switch off the main power supply before starting or modifying any wiring connections.</li>
      <li>Use insulated tools and wires to prevent electric shocks.</li>
      <li>Double-check all connections against the wiring diagram before powering the circuit.</li>
      <li>Avoid loose connections as they can cause short circuits or sparking.</li>
      <li>Ensure proper earthing of the circuit to prevent electrical hazards.</li>
      <li>Do not touch live wires or components with bare hands.</li>
      <li>Work under supervision if you are not confident with electrical connections.</li>
    </ol>
    <br></br>
    <h2 className="font-bold text-blue-600">Conclusion:</h2>
    <p>House wiring was successfully implemented, and all connected loads (lamp, fan, etc.) operated correctly. The energy meter recorded the expected power usage, demonstrating correct residential wiring principles.</p>
  </div>
);

const SimulationContent = () => (
  <div>
    {/* Add the simulation content for Experiment  here */}
    <h2></h2>
    <p></p>
    <HouseWiringSimulation />
  </div>
);

const questions = [
  {
    question: 'What is the standard color code for the neutral wire in household electrical wiring in India?',
    options: [
      'Red',
      'Black',
      'Blue',
      'Green'
    ],
    answer: 3
  },
  {
    question: 'Which type of circuit connection is typically used for wiring lights in a house?',
    options: ['Series Connection', 'Parallel Connection', 'Star Connection', 'Delta Connection'],
    answer: 2
  },
  {
    question: 'What is the main purpose of a fuse in a household circuit?',
    options: ['To step down the voltage','To control current direction','To prevent overload by breaking the circuit','To act as a switch'],
    answer: 3
  },
  {
    question: 'Which of the following devices is used to detect live and neutral in a wiring system?',
    options: ['Multimeter', 'Megger', 'Test Lamp', 'Oscilloscope'],
    answer: 3
  },
 {
    question: 'In a household wiring system, the Earth wire is primarily connected to:',
    options: ['Light fittings', 'Switch terminals', 'Appliance mettalic body', 'Live terminal'],
    answer: 3
  },
  {
    question: 'What is the typical value of voltage supplied to Indian households?',
    options: [
      '110 V AC',
      '220 V AC',
      '400 V DC',
      '230 V DC'
    ],
    answer: 2
  },
  {
    question: 'Which type of switch is commonly used to operate a single light from two different locations (e.g., stairs)?',
    options: ['DPST switch', 'One-way switch', 'Two-way switch', 'Toggle switch'],
    answer: 3
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
          {q.options.map((option: string, oIndex: number) => (
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

export default Experiment3;
