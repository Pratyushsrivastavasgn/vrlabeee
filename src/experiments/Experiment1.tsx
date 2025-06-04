import React from 'react';
import ExperimentLayout from './layout/ExperimentLayout';
import KirchhoffLab from './simulations/Experiment1/KirchhoffLab';

const Experiment1 = () => {
  return (
    <ExperimentLayout
      title="Experiment 1"
      description="Verification of Kirchhoff’s Voltage Law (KVL) by measuring voltages in a closed electrical circuit."
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
      Kirchhoff’s Voltage Law (KVL) states that the algebraic sum of all voltages around any closed loop in an electrical circuit is zero. This principle is derived from the conservation of energy, meaning the total energy supplied by voltage sources equals the energy dissipated by passive components (e.g., resistors) in a closed path.
    </p>

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
    <p>
      This experiment involves constructing a simple series circuit with a DC voltage source and resistors, measuring the voltages across each component, and verifying Kirchhoff’s Voltage Law (KVL) by ensuring the sum of the voltages equals zero.
    </p>
    <h3 className="font-bold text-blue-600 mt-4">Objective:</h3>
    <p>To verify KVL by measuring voltages in a closed circuit and confirming their sum equals zero.</p>

    <h3 className="font-bold text-blue-600 mt-4">Materials Required:</h3>
    <ul className="list-disc ml-6">
      <li>DC power supply (e.g., 5V battery or power supply).</li>
      <li>Resistors (e.g., 100Ω, 200Ω, 300Ω).</li>
      <li>Digital multimeter.</li>
      <li>Breadboard and connecting wires.</li>
    </ul>

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
    </ul>q

    <h3 className="font-bold text-blue-600 mt-4">Conclusion</h3>
    <p>
      The experiment confirms KVL by demonstrating that the sum of voltages in a closed loop equals zero. Practical applications include circuit analysis, troubleshooting, and design validation.
    </p>
  </div>
);

const SimulationContent = () => (
  <div>
    {/* Add the simulation content for Experiment 1 here */}
    <KirchhoffLab />
  </div>
);

const QuizContent = () => (
  <div>
    {/* Add the quiz content for Experiment 1 here */}
    <h2>Quiz</h2>
    <p>Quiz questions to test understanding of Experiment 1.</p>
  </div>
);

export default Experiment1;