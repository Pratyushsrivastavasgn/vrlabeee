import React from 'react';
import ExperimentLayout from './layout/ExperimentLayout';

const Experiment4 = () => {
  return (
    <ExperimentLayout
      title="Experiment 4"
      description="This experiment illustrates the wiring and operation of a Fluorescent lamp using a choke, starter, and tube light to study its working principle."
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
    <p><strong>Fluorescent lamps work by ionizing mercury vapor in a glass tube which emits UV light. This UV light then excites the phosphor coating on the inside of the tube to emit visible light.</strong></p>
    <ol className="list-disc ml-6">
      <li>The electrode of the starter, which is enclosed in a gas bulb filled with Argon gas, causes discharge in the Argon gas with consequent heating.</li>
      <li>Due to heating, the bi-metallic strip bends and causes in the starter to close. After this, the choke, the filaments (tube ends) to tube and starter become connected in series.</li>
      <li>When the current flows through the tube end filaments, the heat is produced. During the process the discharge in the starter tube disappears and the contacts in the starter move apart.</li>
      <li>When sudden breaks in the circuit occur due to moving apart of starter terminals, this causes a high value of electromagnetic force (emf) to be induced in the choke.</li>
      <li>According to Lenz’s law, the direction of the induced emf in the choke will try to oppose the fall of current in the circuit.</li>
      <li>The voltage thus acting across the tube ends will be high enough to cause a discharge to occur in the gas inside the tube. Thus, the tube starts giving light.</li>
      <li>The fluorescent lamp is a low-pressure mercury lamp and is a long-evacuated tube. It contains a small amount of mercury and argon gas at 2.5 mm pressure. At the time of switching in the tube, mercury is in the form of small drops. Therefore, to start the tube, filling up of argon gas is necessary. So, in the beginning, argon gas starts burning at the ends of the tube; the mercury is heated and controls the current and the tube starts giving light. At each end of the tube, there is a tungsten electrode which is coated with fast electron emitting material. Inside of the tube is coated with phosphor according to the type of light.</li>
      <li>A starter helps to start the tube and break the circuit.</li>
      <li>The Choke coil is also called Blast. It has a laminated core over which enameled wire is wound. The function of the choke is to increase the voltage to almost 1000V at the time of switching on the tube and when the tube starts working, it reduces the voltage across the tube and keeps the current constant.</li>
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
          <td className="border border-gray-300 px-2 py-1">Fluorescent Tube Light/Lamp</td>
          <td className="border border-gray-300 px-2 py-1">40 W</td>
          <td className="border border-gray-300 px-2 py-1 text-center">1</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-2 py-1 text-center">2</td>
          <td className="border border-gray-300 px-2 py-1">Fluorescent Lamp fixture</td>
          <td className="border border-gray-300 px-2 py-1">4 ft</td>
          <td className="border border-gray-300 px-2 py-1 text-center">1</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-2 py-1 text-center">3</td>
          <td className="border border-gray-300 px-2 py-1">Choke (Blast)</td>
          <td className="border border-gray-300 px-2 py-1">40 W, 230 V</td>
          <td className="border border-gray-300 px-2 py-1 text-center">1</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-2 py-1 text-center">4</td>
          <td className="border border-gray-300 px-2 py-1">Switch</td>
          <td className="border border-gray-300 px-2 py-1">-</td>
          <td className="border border-gray-300 px-2 py-1 text-center">1</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-2 py-1 text-center">5</td>
          <td className="border border-gray-300 px-2 py-1">Starter</td>
          <td className="border border-gray-300 px-2 py-1">-</td>
          <td className="border border-gray-300 px-2 py-1 text-center">1</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-2 py-1 text-center">6</td>
          <td className="border border-gray-300 px-2 py-1">Connecting Wires and Board Setup</td>
          <td className="border border-gray-300 px-2 py-1">-</td>
          <td className="border border-gray-300 px-2 py-1 text-center">As required</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-2 py-1 text-center">7</td>
          <td className="border border-gray-300 px-2 py-1">Wire man’s tool Kit</td>
          <td className="border border-gray-300 px-2 py-1">-</td>
          <td className="border border-gray-300 px-2 py-1 text-center">1 No.</td>
        </tr>
      </tbody>
    </table>
    <h2 className="font-bold text-blue-600 mt-4">Circuit Diagram:</h2>
    <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Felectricallab.in%2Felectrical-workshop%2Fwiring-of-fluorescent-lamps-and-sockets-6-16-amps%2F&psig=AOvVaw3Xx96PumR3SCVFimavsWu0&ust=1749199907199000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNDCqcrz2Y0DFQAAAAAdAAAAABAE" alt="Circuit Diagram for Fluorescent lamp wiring"/>
  </div>
);

const ProcedureContent = () => (
  <div>
    {/* Add the procedure content for Experiment 1 here */}
    <h2 className="font-bold text-blue-600">Procedure:</h2>
    <p>This experiment involves connecting the fluorescent lamp circuit by wiring the choke, starter, and tube light with the AC supply to observe its starting and operating behavior.</p>
    <p><strong>It include the following steps:</strong></p>
    <ol className="list-disc ml-6">
      <li>Give the connections as per the circuit diagram.</li>
      <li>Fix the tube holder and the choke in the tube.</li>
      <li>The phase wire is connected to the choke and neutral directly to the tube.</li>
      <li>Connect the starter in series with the tube.</li>
      <li>Ensure connections are tight and properly insulated.</li>
      <li>Turn ON the power supply using the switch.</li>
      <li>Observe:
        <ul className="list-disc ml-6">
          <li>The lamp flickers briefly and then lights up.</li>
          <li>If not, recheck the starter and choke connections.</li>
        </ul>
      </li>
    </ol>
    <br></br>
    <h2 className="font-bold text-blue-600">Precautions:</h2>
    <p><strong>Here are some important precautions to be kept in mind while performing this experiment:</strong></p>
    <ol className="list-disc ml-6">
      <li>Ensure the power supply is switched off before making or altering any connections.</li>
      <li>Use properly rated components like the choke, starter, and tube light to avoid damage or malfunction.</li>
      <li>Handle the fluorescent tube with care to prevent breakage and potential injury.</li>
      <li>Avoid touching live wires to prevent electric shock.</li>
      <li>Double-check all wiring connections before switching on the power supply.</li>
      <li>Ensure proper earthing of the circuit to avoid electrical hazards.</li>
      <li>Do not operate with a faulty choke or starter as it may damage the lamp or pose safety risks.</li>
    </ol>
    <br></br>
    <h2 className="font-bold text-blue-600">Conclusion:</h2>
    <p>Fluorescent lamp wiring was successfully completed. The lamp glowed as expected after initial flickering, confirming correct operation of choke and starter in the circuit.</p>
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

export default Experiment4;