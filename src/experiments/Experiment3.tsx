import React from 'react';
import ExperimentLayout from './layout/ExperimentLayout';

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
    {/* Add the simulation content for Experiment 1 here */}
    <h2>Simulation</h2>
    <p>Interactive simulation or instructions will go here.</p>
  </div>
);

const QuizContent = () => (
  <div>
    {/* Add the quiz content for Experiment 1 here */}
    <h2>Quiz</h2>
    <p>Quiz questions to test understanding of Experiment 1.</p>
  </div>
);

export default Experiment3;