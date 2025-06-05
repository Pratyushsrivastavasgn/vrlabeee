import React from 'react';
import ExperimentLayout from './layout/ExperimentLayout';

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
    <h2 className="font-bold text-blue-600">Theory</h2>
    <p>
      Staircase wiring allows convenient control of lighting from two different locations,
      enhancing safety and accessibility on staircases.
    </p>

    <h3 className="font-bold text-blue-600 mt-4">Key Concepts:</h3>
    <ol className="list-decimal ml-6">
      <li><strong>Installation of Switches:</strong>
        <ul className="list-disc ml-6">
          <li>One two-way switch is installed at the bottom of the stairs.</li>
          <li>Another is installed at the top of the stairs.</li>
        </ul>
      </li>
      <li><strong>Lamp Position:</strong>
        <ul className="list-disc ml-6">
          <li>The lamp is placed midway or where its light can illuminate the staircase.</li>
        </ul>
      </li>
      <li><strong>Convenience:</strong>
        <ul className="list-disc ml-6">
          <li>The light can be switched ON/OFF from either end without moving back.</li>
        </ul>
      </li>
      <li><strong>Two-Way Switch Operation:</strong>
        <ul className="list-disc ml-6">
          <li>SPDT (Single Pole Double Throw) switches are used.</li>
          <li>Power is supplied to switch 1 and goes through switch 2 to the lamp.</li>
          <li>The lamp toggles ON/OFF depending on the switch positions.</li>
        </ul>
      </li>
    </ol>

    <h3 className="font-bold text-blue-600 mt-4">Working Principle:</h3>
    <ul className="list-disc ml-6">
      <li>The circuit creates or breaks a loop between the common and throw terminals.</li>
      <li>Changing the position of any one switch toggles the lamp.</li>
      <li>Phase (P) wire connects to switch 1 terminal 1.</li>
      <li>Switch 1 terminals 2 and 3 connect to switch 2 terminals 2’ and 3’.</li>
      <li>Switch 2 common terminal (1’) connects to the lamp.</li>
      <li>Neutral (N) completes the circuit to the lamp.</li>
    </ul>

    <h3 className="font-bold text-blue-600 mt-4">Apparatus Required:</h3>
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <p className="text-gray-700 mb-4">The following equipment is needed:</p>
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
            <tr><td className="border px-4 py-2">1</td><td className="border px-4 py-2">Incandescent Lamp</td><td className="border px-4 py-2">1 (230V, 40W)</td></tr>
            <tr><td className="border px-4 py-2">2</td><td className="border px-4 py-2">Lamp holder</td><td className="border px-4 py-2">1</td></tr>
            <tr><td className="border px-4 py-2">3</td><td className="border px-4 py-2">Two way switches</td><td className="border px-4 py-2">2 (230V, 5A)</td></tr>
            <tr><td className="border px-4 py-2">4</td><td className="border px-4 py-2">Connecting Wires</td><td className="border px-4 py-2">As required</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <h3 className="font-bold text-blue-600 mt-4">Tools Required:</h3>
    <ul className="list-disc ml-6">
      <li>Wireman's Tool Kit – 1 No. (Includes screwdrivers, pliers, strippers, etc.)</li>
    </ul>
  </div>
);

const ProcedureContent = () => (
  <div className="prose max-w-none">
    <h2 className="font-bold text-blue-600">Procedure</h2>
    <p>Follow these steps to conduct the experiment:</p>

    <h3 className="font-bold text-blue-600 mt-4">Objective:</h3>
    <p>To construct a staircase wiring circuit using two-way switches and a lamp, and demonstrate control from two locations.</p>

    <h3 className="font-bold text-blue-600 mt-4">Steps:</h3>
    <ol className="list-decimal ml-6">
      <li><strong>Make connections as per the circuit diagram.</strong>
        <img src="https://d10lpgp6xz60nq.cloudfront.net/question-thumbnail/en_644441603.png" alt="exp5 diagram" />
        <p>heelo</p>
        <ul className="list-disc ml-6">
          <li>Assemble the lamp, two-way switches, and wires.</li>
          <li>Connect the phase (live) to common terminal of switch 1.</li>
          <li>Connect switch 1 terminals 2 & 3 to switch 2 terminals 2′ & 3′.</li>
          <li>Connect switch 2 common terminal to the lamp.</li>
          <li>Connect neutral wire from lamp to AC supply to complete the circuit.</li>
        </ul>
      </li>
      <li>Verify the connections for safety and correctness.</li>
      <li>Switch ON the power supply.</li>
      <li>Operate the switches in various combinations to observe lamp behavior.</li>
      <li>Record the ON/OFF states for each switch position combination.</li>
    </ol>
  </div>
);

// Placeholder components for Simulation and Quiz
const SimulationContent = () => <div>Simulation Coming Soon...</div>;
const QuizContent = () => <div>Quiz Coming Soon...</div>;

export default Experiment5;
