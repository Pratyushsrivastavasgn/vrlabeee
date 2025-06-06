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
      Kirchhoff’s Voltage Law (KVL) states that the algebraic sum of all voltages around any closed loop in an electrical circuit is zero. This principle is derived from the conservation of energy, meaning the total energy supplied by voltage sources equals the energy dissipated by passive components (e.g., resistors) in a closed path.
    </p>

    <h3 className="font-bold text-blue-600 mt-4">Materials Required:</h3>
    <table className="table-auto border border-collapse border-gray-400">
      <thead>
        <tr>
          <th className="border px-4 py-2">S.No.</th>
          <th className="border px-4 py-2">Component</th>
          <th className="border px-4 py-2">Specification</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border px-4 py-2">1</td>
          <td className="border px-4 py-2">DC Power Supply</td>
          <td className="border px-4 py-2">5V</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">2</td>
          <td className="border px-4 py-2">Resistors</td>
          <td className="border px-4 py-2">100Ω, 200Ω, 300Ω</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">3</td>
          <td className="border px-4 py-2">Digital Multimeter</td>
          <td className="border px-4 py-2">Standard</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">4</td>
          <td className="border px-4 py-2">Breadboard & Wires</td>
          <td className="border px-4 py-2">General Purpose</td>
        </tr>
      </tbody>
    </table>

    <h3 className="font-bold text-blue-600 mt-4">Key Concepts:</h3>
    <ol className="list-decimal ml-6">
      <li><strong>Closed Loop/Mesh:</strong> A path that starts and ends at the same node without retracing any component.</li>
      <li>
        <strong>Voltage Rise and Drop:</strong>
        <ul className="list-disc ml-6">
          <li>Rise: Occurs across a voltage source (from negative to positive terminal).</li>
          <li>Drop: Occurs across resistors (in the direction of current flow).</li>
        </ul>
      </li>
      <li>
        <strong>Sign Convention:</strong>
        <ul className="list-disc ml-6">
          <li>Assign polarities (+/−) to all components.</li>
          <li>Traverse the loop consistently (clockwise/counterclockwise) and sum voltages algebraically.</li>
        </ul>
      </li>
    </ol>

    <h3 className="font-bold text-blue-600 mt-4">Mathematical Representation:</h3>
    <p>∑V = 0</p>
    <p>Example: For a loop with a source Vs and resistors V1, V2, V3:</p>
    <p>−Vs + V1 + V2 + V3 = 0</p>
  </div>
);

const ProcedureContent = () => (
  <div className="prose max-w-none">
    <h2 className="font-bold text-blue-600">Procedure</h2>

    <h3 className="font-bold text-blue-600 mt-4">Objective:</h3>
    <p>To verify KVL by measuring voltages in a closed circuit and confirming their sum equals zero.</p>

    <h3 className="font-bold text-blue-600 mt-4">Steps:</h3>
    <ol className="list-decimal ml-6">
      <li>
        <strong>Circuit Construction:</strong>
        <ul className="list-disc ml-6">
          <li>Build a series circuit on a breadboard with resistors R1, R2, R3 and a DC voltage source.</li>
          <li>Ensure all components are connected in a single closed loop.</li>
        </ul>
      </li>
      <li>
        <strong>Assign Voltage Polarities:</strong>
        <ul className="list-disc ml-6">
          <li>Mark the positive terminal of the voltage source.</li>
          <li>For resistors, label the "+" side where current enters and "−" where it exits.</li>
        </ul>
      </li>
      <li>
        <strong>Measure Voltages:</strong>
        <ul className="list-disc ml-6">
          <li>Set the multimeter to DC voltage mode.</li>
          <li>Measure voltage across each component:
            <ul className="list-disc ml-6">
              <li>Source (Vs): Place probes on + and − terminals.</li>
              <li>Resistors (V1, V2, V3): Measure across each resistor.</li>
            </ul>
          </li>
          <li>Record all values with correct signs:
            <ul className="list-disc ml-6">
              <li>Source voltage: Enter as −Vs (rise).</li>
              <li>Resistor voltages: Enter as V1, +V2, +V3 (drops).</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <strong>Apply KVL:</strong>
        <ul className="list-disc ml-6">
          <li>Sum the voltages algebraically: −Vs + V1 + V2 + V3 = 0</li>
          <li>Example: If Vs = 5V, V1 = 1V, V2 = 2V, V3 = 2V: −5 + 1 + 2 + 2 = 0</li>
        </ul>
      </li>
      <li>
        <strong>Validation:</strong>
        <ul className="list-disc ml-6">
          <li>If the sum is approximately zero, KVL is verified.</li>
          <li>Account for minor errors due to instrument precision or resistor tolerances.</li>
        </ul>
      </li>
      <li>
        <strong>Repeat:</strong>
        <ul className="list-disc ml-6">
          <li>Test with different resistor values or supply voltages to ensure consistency.</li>
        </ul>
      </li>
    </ol>

    <h3 className="font-bold text-blue-600 mt-4">Precautions:</h3>
    <ul className="list-disc ml-6">
      <li>Ensure secure connections to avoid false readings.</li>
      <li>Verify multimeter accuracy before use.</li>
      <li>Double-check polarity assignments to avoid sign errors.</li>
    </ul>

    <h3 className="font-bold text-blue-600 mt-4">Conclusion</h3>
    <p>
      The experiment confirms KVL by demonstrating that the sum of voltages in a closed loop equals zero. Practical applications include circuit analysis, troubleshooting, and design validation.
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
