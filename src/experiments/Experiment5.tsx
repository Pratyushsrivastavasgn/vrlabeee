import React, { useState } from 'react';
import ExperimentLayout from './layout/ExperimentLayout';
import Staircase from './simulations/Experiment5/Staircase';
const Experiment5 = () => {
  return (
    <ExperimentLayout
      title="Experiment 5"
      description="This experiment demonstrates the staircase wiring in household circuits."
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
    <p>
    Staircase wiring allows convenient control of lighting from two different locations, enhancing safety and accessibility on staircases.
    </p>
    <h3 className="font-bold text-blue-600 mt-4">Key Concepts:</h3>
    <ol className="list-decimal ml-6">
      <li><strong>Installation of Switches:</strong></li>
      <ul className="list-disc ml-6">
          <li> One two-way switch is installed at the bottom of the stairs.
          </li>
          <li>Another is installed at the top of the stairs.</li>
      </ul>
      <li>
        <strong>Lamp Position:</strong>
        <ul className="list-disc ml-6">
          <li>The lamp is placed midway or in a suitable place where its light can illuminate the staircase.
          </li>
            </ul>
      </li>
      <li>
        <strong>Convenience:</strong>
        <ul className="list-disc ml-6">
          <li>This circuit is ideal for bedrooms or staircases so that the light can be switched on/off from either end without moving back.
          </li>
        </ul>
      </li>
      <li>
        <strong>Two-Way Switch Operation:</strong>
        <ul className="list-disc ml-6">
          <li>These are single-pole double-throw (SPDT) switches.</li>
          <li>Power is supplied to switch 1, and the lamp receives power through switch 2.
          </li>
          <li>Depending on the positions of the switches, the circuit is completed or broken, turning the lamp ON or OFF.
          </li>
            </ul>
      </li>
    </ol>
    <h3 className="font-bold text-blue-600 mt-4">Working Principle:</h3>
    <ul className="list-disc ml-6">
          <li> The circuit works by creating or breaking a closed loop between the common terminal and either of the two terminals in both switches.
          </li>
          <li>Changing the position of any one switch toggles the state of the lamp.</li>
          <li>The phase (P) wire from the power supply is connected to terminal 1 of switch 1.</li>
          <li>Switch 1 has two output terminals (2 and 3), which are connected to corresponding terminals (2’ and 3’) of switch 2</li>
          <li>Switch 2 connects one of these outputs to terminal 1’, which then connects to the lamp.</li>
          <li>The neutral (N) line completes the circuit from the other side of the lamp.</li>
      </ul>
      <h3 className="font-bold text-blue-600 mt-4">Apparatus Required:</h3>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
  <p className="text-gray-700 mb-4">The following equipment is needed to perform this experiment:</p>

  <div className="overflow-x-auto">
    <table className="min-w-full table-auto border border-gray-300 text-left">
      <thead className="bg-gray-100">
        <tr>
          <th className="border border-gray-300 px-4 py-2">S.No</th>
          <th className="border border-gray-300 px-4 py-2">Components</th>
          <th className="border border-gray-300 px-4 py-2">Quantity / Range</th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        <tr>
          <td className="border border-gray-300 px-4 py-2">1</td>
          <td className="border border-gray-300 px-4 py-2">Incandescent Lamp</td>
          <td className="border border-gray-300 px-4 py-2">1 (230V, 40W)</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">2</td>
          <td className="border border-gray-300 px-4 py-2">Lamp holder</td>
          <td className="border border-gray-300 px-4 py-2">1</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">3</td>
          <td className="border border-gray-300 px-4 py-2">Two way switches</td>
          <td className="border border-gray-300 px-4 py-2">2 (230V, 5A)</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">4</td>
          <td className="border border-gray-300 px-4 py-2">Connecting Wires</td>
          <td className="border border-gray-300 px-4 py-2">As required</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
<h3 className="font-bold text-blue-600 mt-4">Tools Required:</h3>
<ul className="list-disc ml-6">
          <li> Wireman's Tool Kit – 1 No.
 (Includes screwdrivers, pliers, strippers, etc.)

          </li>
          </ul>
  </div>
);

const ProcedureContent = () => (
  <div>
    {/* Add the procedure content for Experiment 1 here */}
    <h2 className="font-bold text-blue-600">Procedure</h2>
    <p>Following is the procedure to conduct the experiment:</p>
    
    <h3 className="font-bold text-blue-600 mt-4">Objective:</h3>
    <p>To construct a staircase wiring circuit using two two-way switches and a lamp, and to demonstrate the control of the lamp from two different locations by verifying its operation through various switch combinations.</p>
    <h3 className="font-bold text-blue-600 mt-4">Steps:</h3>
    <ol className="list-decimal ml-6">
      <li>
        <strong> Give the connections as per the circuit diagram
        </strong>
        <ul className="list-disc ml-6">
          <li>Begin by assembling all components: the lamp, two-way switches, and connecting wires.
          </li>
          <li>Connect the phase (live) wire from the AC supply to the common terminal (1) of Switch 1.</li>
          <li>Connect the two output terminals (2 and 3) of Switch 1 to the corresponding terminals (2′ and 3′) of Switch 2 using two separate wires.</li>
          <li>Connect the common terminal (1′) of Switch 2 to one end of the lamp.
          </li>
          <li>Finally, connect the other terminal of the lamp to the neutral (N) wire from the AC supply.
          </li>
          <li>Make sure all wire joints are properly insulated and terminals are tightened.</li>
        </ul>
      </li>
      <li>
        <strong>Verify the connections</strong>
        <ul className="list-disc ml-6">
          <li>Double-check all connections against the circuit diagram.</li>
          <li>Ensure there are no loose connections or short circuits.</li>
          <li>Confirm that the switches are connected to the correct terminals (common and output).</li>
          <li>Ensure polarity is correctly observed: phase to switch, and neutral to the lamp.</li>
          <li>Use a multimeter or continuity tester to verify wire paths if necessary.</li>
        </ul>
      </li>
      <li>
        <strong> Switch on the supply</strong>
        <ul className="list-disc ml-6">
          <li>After verifying the connections, carefully switch ON the main power supply (230V AC).</li>
          <li>Observe safety precautions: wear rubber gloves and stand on an insulated surface while switching on.</li>
          <li>Ensure no exposed wires or faulty connections that may cause electric shock.</li>
        </ul>
      </li>
      <li>
        <strong>  Verify the conditions</strong>
        <ul className="list-disc ml-6">
          <li>Test the operation of the circuit by toggling each switch:
          <ul className="list-disc ml-6">
              <li>Turn ON the lamp using Switch 1, and turn it OFF using Switch 2.</li>
              <li>Then, reverse the roles—turn ON using Switch 2, and OFF using Switch 1.</li>
              <li>Verify that the lamp turns ON/OFF from either location, proving that the staircase wiring works correctly.</li>
            </ul>
          </li>
          <li>If any switch fails to operate correctly, turn off the power and recheck the wiring.</li>
        </ul>
      </li>
      </ol>
      <h3 className="font-bold text-blue-600 mt-4">Practical Use Case:</h3>
      <p>
      Imagine you turn the light ON from the bottom of the stairs using switch 1. After reaching the top, you can turn it OFF using switch 2—and vice versa. This adds safety and convenience.
      </p>
      <h3 className="font-bold text-blue-600 mt-4">Precautions:</h3>
    <ul className="list-disc ml-6">
      <li>Ensure the main supply is switched OFF while wiring.</li>
      <li>Use properly insulated tools and wires.</li>
      <li>Verify connections carefully before switching ON the power.</li>
      <li>Avoid loose connections and ensure firm tightening at terminals.</li>
      <li>Maintain proper polarity: phase wire to switch, neutral to lamp.</li>
    </ul>

    <h3 className="font-bold text-blue-600 mt-4">Conclusion</h3>
    <p>
    This procedure confirms that staircase wiring using two-way switches allows a lamp to be controlled from two different locations safely and efficiently.</p>
  </div>
);

const SimulationContent = () => (
  <div>
   <Staircase />
  </div>
);

  const questions = [
  {
    question: "What is the purpose of staircase wiring?",
    options: ["To control fan speed", "To operate a lamp from two different locations", "To reduce voltage drop", "To increase power efficiency"],
    answer: 1
  },
  {
    question: "Which component is essential in staircase wiring?",
    options: ["Two way switch", "Single pole switch", "Double pole switch", "Rotary switch"],
    answer: 0
  },
  {
    question: "What is the function of a two-way switch?",
    options: ["To break the neutral line", "To reduce current", "To allow ON/OFF from multiple locations", "To short circuit the loop"],
    answer: 2
  },
  {
    question: "Where is the lamp connected in the staircase wiring circuit?",
    options: ["Between two switch terminals", "Across both switches directly", "To the ground wire", "Between switch 2 and neutral"],
    answer: 3
  },
  {
    question: "What happens when both switches are in the same position?",
    options: ["The lamp flickers", "The circuit breaks", "The lamp turns ON", "Voltage drops to zero"],
    answer: 1
  },
  {
    question: "Which terminal is common in a two-way switch?",
    options: ["Terminal 1", "Terminal 2", "Common terminal (COM)", "Neutral terminal"],
    answer: 2
  },
  {
    question: "What happens if one of the wires between the switches is disconnected?",
    options: ["Nothing happens", "The lamp always remains ON", "Both switches stop working", "The lamp cannot be controlled properly"],
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
      <h2 className="font-bold text-blue-600">Quiz</h2>
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
export default Experiment5;
