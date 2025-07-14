import React, { useState } from 'react';
import ExperimentLayout from './layout/ExperimentLayout';
import CircuitSimulation from './simulations/Experiment2/components/CircuitSimulation';

const Experiment2 = () => {
  return (
    <ExperimentLayout
      title="Experiment 2"
      description="Thevenin’s Theorem simplifies a complex linear circuit to a single voltage source and series resistor, making analysis easier. It helps find current and voltage across any load in the circuit."
      experiment={{
        theory: <TheoryContent />,
        procedure: <ProcedureContent />,
        simulation: <SimulationContent />,
        quiz: <QuizContent />,
      }}
    />
  );
};

const TheoryContent = () => (
  <div className="prose max-w-none">
    <h2 className="font-bold text-blue-600">Theory</h2>
    <p>
      Thevenin's Theorem is a fundamental principle in electrical circuit analysis that simplifies complex linear networks. It states that any linear, bilateral, active two-terminal network can be replaced by an equivalent circuit consisting of:
    </p>

    {/* Diagram */}
    <img
      src="https://www.tutoroot.com/blog/wp-content/uploads/2024/04/Thevenins-theorem.png"
      alt="Thevenin's Theorem Diagram"
      className="my-4"
    />

    {/* Concepts */}
    <ul className="list-disc ml-6">
      <li><strong>Thevenin Voltage (V<sub>th</sub>)</strong>: The open-circuit voltage measured across the load terminals when the load is removed.</li>
      <li><strong>Thevenin Resistance (R<sub>th</sub>)</strong>: The equivalent resistance seen from the load terminals with all independent sources deactivated (voltage sources replaced by short circuits and current sources by open circuits).</li>
    </ul>
    
    <p><strong>Key Features:</strong></p>
    <ul className="list-disc ml-6">
      <li>Applies only to linear networks (components obey Ohm's Law)</li>
      <li>Preserves the voltage-current characteristics at the load terminals</li>
      <li>Extremely useful for analysing the effect of different loads on a circuit</li>
      <li>Simplifies complex power systems and electronic circuits for analysis</li>
    </ul>

    <p>
      The equivalent circuit allows us to calculate the load current using the simple formula:<br />
      <em>I<sub>L</sub> = V<sub>th</sub> / (R<sub>th</sub> + R<sub>L</sub>)</em>
    </p>

    <h2 className="font-bold text-blue-600 mt-6">Apparatus Required</h2>
    <table className="table-auto border-collapse border border-gray-300 w-full">
      <thead>
        <tr>
          <th className="border border-gray-300 px-2 py-1">S.No</th>
          <th className="border border-gray-300 px-2 py-1">Apparatus</th>
          <th className="border border-gray-300 px-2 py-1">Specifications</th>
          <th className="border border-gray-300 px-2 py-1">Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-gray-300 px-2 py-1 text-center">1</td>
          <td className="border border-gray-300 px-2 py-1">Regulated Power Supply (RPS)</td>
          <td className="border border-gray-300 px-2 py-1">0-30V DC</td>
          <td className="border border-gray-300 px-2 py-1 text-center">2</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-2 py-1 text-center">2</td>
          <td className="border border-gray-300 px-2 py-1">Digital Multimeter</td>
          <td className="border border-gray-300 px-2 py-1">-</td>
          <td className="border border-gray-300 px-2 py-1 text-center">1</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-2 py-1 text-center">3</td>
          <td className="border border-gray-300 px-2 py-1">Ammeter</td>
          <td className="border border-gray-300 px-2 py-1">0-10mA DC</td>
          <td className="border border-gray-300 px-2 py-1 text-center">1</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-2 py-1 text-center">4</td>
          <td className="border border-gray-300 px-2 py-1">Resistors</td>
          <td className="border border-gray-300 px-2 py-1">1KΩ, 330Ω</td>
          <td className="border border-gray-300 px-2 py-1 text-center">3, 1</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-2 py-1 text-center">5</td>
          <td className="border border-gray-300 px-2 py-1">Breadboard</td>
          <td className="border border-gray-300 px-2 py-1">-</td>
          <td className="border border-gray-300 px-2 py-1 text-center">1</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-2 py-1 text-center">6</td>
          <td className="border border-gray-300 px-2 py-1">Decade Resistance Box (DRB)</td>
          <td className="border border-gray-300 px-2 py-1">0-10KΩ</td>
          <td className="border border-gray-300 px-2 py-1 text-center">1</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-2 py-1 text-center">7</td>
          <td className="border border-gray-300 px-2 py-1">Connecting Wires</td>
          <td className="border border-gray-300 px-2 py-1">-</td>
          <td className="border border-gray-300 px-2 py-1 text-center">As needed</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const ProcedureContent = () => (
  <div className="prose max-w-none">
    <h2 className="font-bold text-blue-600">Objective</h2>
    <p>To verify Thevenin’s Theorem by experimentally determining the Thevenin equivalent voltage and resistance and comparing the calculated and measured load currents.</p>

    <h2 className="font-bold text-blue-600 mt-6">Experimental Procedure</h2>

    <h3 className="font-bold mt-4">A. Measurement of V<sub>th</sub></h3>
    <ol className="list-decimal ml-6">
      <li>Construct the given circuit on the breadboard without connecting the load resistor (R<sub>L</sub>).</li>
      <li>Using a digital multimeter in DC voltage mode, measure the open-circuit voltage across the load terminals.</li>
      <li>Record this value as V<sub>th</sub>.</li>
    </ol>

    <h3 className="font-bold mt-4">B. Measurement of R<sub>th</sub></h3>
    <ol className="list-decimal ml-6">
      <li>Remove all power sources from the circuit.</li>
      <li>Replace voltage sources with short circuits (use connecting wires).</li>
      <li>Using the multimeter in ohmmeter mode, measure the resistance between the load terminals.</li>
      <li>Record this value as R<sub>th</sub>.</li>
    </ol>

    <h3 className="font-bold mt-4">C. Verification of Theorem</h3>
    <ol className="list-decimal ml-6">
      <li>Construct the Thevenin equivalent circuit using:
        <ul className="list-disc ml-6">
          <li>A power supply set to V<sub>th</sub></li>
          <li>A resistor of value R<sub>th</sub> in series</li>
          <li>The actual load resistor R<sub>L</sub></li>
        </ul>
      </li>
      <li>Connect an ammeter in series to measure the load current (I<sub>L</sub>).</li>
      <li>Compare this measured current with the theoretical value calculated using the formula.</li>
    </ol>

    <h2 className="font-bold text-blue-600 mt-6">Precautions</h2>
    <ul className="list-disc ml-6">
      <li>Always start with the RPS voltage control at minimum to prevent sudden current surges.</li>
      <li>Ensure all connections are secure to avoid measurement errors.</li>
      <li>Verify the multimeter is properly zeroed before taking measurements.</li>
      <li>Handle resistors carefully to prevent overheating.</li>
      <li>Double-check all polarities when connecting meters and power supplies.</li>
    </ul>

    <h2 className="font-bold text-blue-600 mt-6">Conclusion</h2>
    <p>
      Thevenin's Theorem was successfully verified when the practical measurements matched the theoretical predictions within acceptable error margins. This theorem proves invaluable for circuit analysis as it:
    </p>
    <ul className="list-disc ml-6">
      <li>Simplifies complex networks for easier analysis</li>
      <li>Allows quick evaluation of load effects</li>
      <li>Reduces computation time in circuit design</li>
      <li>Provides a standardized approach to network reduction</li>
    </ul>
    <p>The small percentage errors observed can be attributed to:</p>
    <ul className="list-disc ml-6">
      <li>Component tolerances</li>
      <li>Measurement instrument inaccuracies</li>
      <li>Contact resistances in connections</li>
      <li>Environmental factors</li>
    </ul>
    <p>
      This experiment demonstrates the practical utility of Thevenin's Theorem in electrical engineering applications, from basic circuit design to complex power system analysis.
    </p>
  </div>
);

const SimulationContent = () => (
  <div className="prose max-w-none">
    <h2>Simulation</h2>
    <p>Use the interactive simulation below to visualize Thevenin’s theorem in action and verify calculations.</p>
    <CircuitSimulation />
  </div>
);

const questions = [
  {
    id: 1,
    question: "What is the Thevenin equivalent voltage?",
    options: [
      "The open-circuit voltage across load terminals",
      "The total current in the circuit",
      "The short-circuit current through the load",
      "The power dissipated by the load",
    ],
    answer: 0,
  },
  {
    id: 2,
    question: "How do you calculate Thevenin resistance?",
    options: [
      "Measure resistance with all sources active",
      "Deactivate all independent sources and measure resistance across terminals",
      "Add all resistors in series",
      "Subtract load resistance from total resistance",
    ],
    answer: 1,
  },
  {
    id: 3,
    question: "Why is Thevenin's Theorem useful?",
    options: [
      "To simplify complex circuits into simpler equivalent circuits",
      "To increase circuit voltage",
      "To calculate power loss in circuits",
      "To design filters",
    ],
    answer: 0,
  },
  {
    id: 4,
    question: "What happens to voltage sources when measuring Thevenin resistance?",
    options: [
      "They are replaced by open circuits",
      "They remain unchanged",
      "They are replaced by short circuits",
      "They are removed completely",
    ],
    answer: 2,
  },
  {
    id: 5,
    question: "What instrument is used to measure open-circuit voltage for Vth?",
    options: [
      "Ammeter",
      "Voltmeter",
      "Ohmmeter",
      "Wattmeter",
    ],
    answer: 1,
  },
  {
    id: 6,
    question: "When constructing Thevenin equivalent circuit, what components are used?",
    options: [
      "Voltage source and load resistor only",
      "Thevenin voltage source and Thevenin resistance in series with load resistor",
      "Load resistor and current source",
      "Only resistors in series",
    ],
    answer: 1,
  },
  {
    id: 7,
    question: "Which of the following is a precaution during the experiment?",
    options: [
      "Keep power on when making connections",
      "Use incorrect component values for testing",
      "Ensure measuring instruments are calibrated",
      "Ignore connection checks",
    ],
    answer: 2,
  },
];

const QuizContent = () => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>(Array(questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);

  const handleOptionChange = (qIndex: number, optionIndex: number) => {
    if (submitted) return; // disable changes after submission
    const newSelected = [...selectedOptions];
    newSelected[qIndex] = optionIndex;
    setSelectedOptions(newSelected);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="prose max-w-none">
      <h2>Quiz</h2>
      <p>Select the correct option for each question below and then submit to see your results.</p>

      <form onSubmit={(e) => e.preventDefault()}>
        {questions.map((q, qIndex) => (
          <div key={q.id} className="mb-6">
            <p className="font-semibold">{qIndex + 1}. {q.question}</p>
            <div className="ml-4">
              {q.options.map((option, oIndex) => {
                // Determine styling after submit
                let optionClass = "cursor-pointer block my-1";

                if (submitted) {
                  if (oIndex === q.answer) {
                    optionClass += " text-green-700 font-bold";
                  }
                  if (selectedOptions[qIndex] === oIndex && oIndex !== q.answer) {
                    optionClass += " text-red-700 font-bold line-through";
                  }
                }

                return (
                  <label key={oIndex} className={optionClass}>
                    <input
                      type="radio"
                      name={`question-${qIndex}`}
                      value={oIndex}
                      checked={selectedOptions[qIndex] === oIndex}
                      onChange={() => handleOptionChange(qIndex, oIndex)}
                      disabled={submitted}
                      className="mr-2"
                    />
                    {option}
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        {!submitted && (
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={selectedOptions.includes(-1)} // disable if any question unanswered
          >
            Submit
          </button>
        )}

        {submitted && (
          <p className="mt-4 font-semibold">
            You have completed the quiz! Correct answers are highlighted in green, incorrect in red.
          </p>
        )}
      </form>
    </div>
  );
};

export default Experiment2;
