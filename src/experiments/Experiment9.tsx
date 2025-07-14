import React, { useState } from 'react';
import ExperimentLayout from './layout/ExperimentLayout';

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
    <h2 className="font-bold text-blue-600">Aim</h2>
    <ul className="list-disc ml-6">
      <li><strong>Transistor Series Voltage Regulator</strong></li>
      <li><strong>To operate a transistor series voltage regulator and obtain a constant output voltage</strong></li>
    </ul>
<br />
    <h2 className="font-bold text-blue-600">Apparatus & Components Required</h2>
    
    <h3 className="font-bold text-blue-600 mt-4">Apparatus Required:</h3>
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">S. No.</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Range</th>
              <th className="border border-gray-300 px-4 py-2">Qty</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">Transformer</td>
              <td className="border border-gray-300 px-4 py-2">230/12V</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">2</td>
              <td className="border border-gray-300 px-4 py-2">R.P.S</td>
              <td className="border border-gray-300 px-4 py-2">(0-30)V</td>
              <td className="border border-gray-300 px-4 py-2">2</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">3</td>
              <td className="border border-gray-300 px-4 py-2">Ammeter</td>
              <td className="border border-gray-300 px-4 py-2">(0–250)µA</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">4</td>
              <td className="border border-gray-300 px-4 py-2">Voltmeter</td>
              <td className="border border-gray-300 px-4 py-2">(0–30)V</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">5</td>
              <td className="border border-gray-300 px-4 py-2">Bread Board</td>
              <td className="border border-gray-300 px-4 py-2">Standard</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <h3 className="font-bold text-blue-600 mt-4">Components Required:</h3>
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">S. No.</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Range</th>
              <th className="border border-gray-300 px-4 py-2">Qty</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">Transistor</td>
              <td className="border border-gray-300 px-4 py-2">BC107</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">2</td>
              <td className="border border-gray-300 px-4 py-2">Zener Diode</td>
              <td className="border border-gray-300 px-4 py-2">FZ5.1</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">3</td>
              <td className="border border-gray-300 px-4 py-2">Resistor</td>
              <td className="border border-gray-300 px-4 py-2">795Ω</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">4</td>
              <td className="border border-gray-300 px-4 py-2">Capacitor</td>
              <td className="border border-gray-300 px-4 py-2">100µf</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">5</td>
              <td className="border border-gray-300 px-4 py-2">Connecting Wires</td>
              <td className="border border-gray-300 px-4 py-2">As required</td>
              <td className="border border-gray-300 px-4 py-2">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <br />

    <h2 className="font-bold text-blue-600">Theory</h2>
    <ul className="list-disc ml-6">
      <li><strong>Circuit Configuration:</strong> A simple series voltage regulator consists of an NPN transistor and a Zener diode</li>
      <li><strong>Series Connection:</strong> Called a series regulator because collector and emitter terminals of the transistor are in series with the load</li>
      <li><strong>Input:</strong> The unregulated DC supply (or filtered output from the rectifier) is fed to the input terminals</li>
      <li><strong>Output:</strong> Regulated output V<sub>out</sub> is obtained across the load resistor R<sub>L</sub></li>
      <li><strong>Reference Voltage:</strong> Zener diode provides the reference voltage</li>
      <li><strong>Variable Resistance:</strong> The transistor acts as a variable resistor whose resistance varies with the operating conditions</li>
      <li><strong>Operating Principle:</strong> Based on the fact that a large proportion of the change in supply voltage appears across the transistor and therefore output voltage tends to remain constant</li>
    </ul>

    <br />

    <h3 className="font-bold text-blue-600 mt-4">Voltage Relationship:</h3>
    <div className="bg-gray-100 p-4 rounded-lg font-mono text-center">
      V<sub>out</sub> = V<sub>Z</sub> - V<sub>BE</sub>
    </div>
    <ul className="list-disc ml-6">
      <li>The base voltage of the transistor remains almost constant being equal to that across the Zener diode V<sub>Z</sub></li>
    </ul>
  <br />
    <h3 className="font-bold text-blue-600 mt-4">Operation Analysis:</h3>
    <ol className="list-decimal ml-6">
      <li><strong>Supply Voltage Increase:</strong>
        <ul className="list-disc ml-6">
          <li>Supply voltage increase causes output voltage V<sub>out</sub> to increase</li>
          <li>Increase in output voltage results in decrease in V<sub>BE</sub></li>
          <li>This reduces the level of conduction</li>
          <li>Leads to increase in collector-emitter resistance</li>
          <li>Results in increase in collector to emitter voltage</li>
          <li>Output voltage is reduced, maintaining constant output</li>
        </ul>
      </li>
      <li><strong>Load Current Change:</strong>
        <ul className="list-disc ml-6">
          <li>Current increased by decrease in R<sub>L</sub></li>
          <li>Output voltage V<sub>out</sub> tends to fall</li>
          <li>V<sub>BE</sub> tends to increase</li>
          <li>Conduction level of transistor increases</li>
          <li>Collector emitter resistance decreases</li>
          <li>Slight increase in input current compensates for decrease in R<sub>L</sub></li>
          <li>Output voltage remains almost constant</li>
        </ul>
      </li>
    </ol>

    <h3 className="font-bold text-blue-600 mt-4">Design Calculations:</h3>
    <ul className="list-disc ml-6">
      <li><strong>Load Resistor:</strong> R<sub>L</sub> = V<sub>OUT</sub> / I<sub>L</sub></li>
      <li><strong>Base Current:</strong> I<sub>B</sub> = I<sub>C</sub> / β</li>
      <li><strong>Zener Voltage:</strong> V<sub>Z</sub> = V<sub>OUT</sub> + V<sub>BE</sub></li>
      <li><strong>Series Resistor:</strong> R = (V<sub>IN</sub> - V<sub>Z</sub>) / (I<sub>B</sub> + I<sub>Z</sub>)</li>
    </ul>
  </div>
);

const ProcedureContent = () => (
  <div>
    <h2 className="font-bold text-blue-600">Circuit Diagram</h2>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-6xl w-full">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Transistor Voltage Regulator Circuit
        </h1>
        
        <div className="flex justify-center">
          <svg 
            width="800" 
            height="500" 
            viewBox="0 0 800 500" 
            className="border border-gray-300 rounded bg-white"
          >
            {/* AC Supply */}
            <g>
              <rect x="50" y="150" width="80" height="120" fill="none" stroke="black" strokeWidth="2"/>
              <text x="90" y="190" textAnchor="middle" className="text-sm font-semibold">230V</text>
              <text x="90" y="210" textAnchor="middle" className="text-sm font-semibold">AC</text>
              <text x="90" y="230" textAnchor="middle" className="text-sm font-semibold">SUPPLY</text>
              
              {/* AC Supply connections */}
              <line x1="90" y1="120" x2="90" y2="150" stroke="black" strokeWidth="2"/>
              <line x1="90" y1="270" x2="90" y2="300" stroke="black" strokeWidth="2"/>
              <text x="85" y="320" className="text-sm font-semibold">N</text>
              
              {/* AC Supply symbol */}
              <circle cx="90" cy="135" r="3" fill="black"/>
              <path d="M 80 120 Q 90 110 100 120" fill="none" stroke="black" strokeWidth="2"/>
              <path d="M 80 130 Q 90 140 100 130" fill="none" stroke="black" strokeWidth="2"/>
            </g>

            {/* Bridge Rectifier */}
            <g>
              <rect x="180" y="160" width="120" height="100" fill="none" stroke="black" strokeWidth="2"/>
              <text x="240" y="180" textAnchor="middle" className="text-sm font-semibold">IN4007</text>
              
              {/* Bridge rectifier diodes */}
              <g transform="translate(240, 210)">
                {/* Top diode */}
                <polygon points="-15,-15 -5,-15 -5,-25 5,-20 5,-10 -5,-15" fill="none" stroke="black" strokeWidth="1.5"/>
                <line x1="5" y1="-25" x2="5" y2="-5" stroke="black" strokeWidth="2"/>
                
                {/* Bottom diode */}
                <polygon points="-15,15 -5,15 -5,25 5,20 5,10 -5,15" fill="none" stroke="black" strokeWidth="1.5"/>
                <line x1="5" y1="25" x2="5" y2="5" stroke="black" strokeWidth="2"/>
                
                {/* Left diode */}
                <polygon points="-25,-5 -25,5 -15,5 -20,-5 -10,-5 -15,5" fill="none" stroke="black" strokeWidth="1.5"/>
                <line x1="-25" y1="-5" x2="-5" y2="-5" stroke="black" strokeWidth="2"/>
                
                {/* Right diode */}
                <polygon points="25,-5 25,5 15,5 20,-5 10,-5 15,5" fill="none" stroke="black" strokeWidth="1.5"/>
                <line x1="25" y1="-5" x2="5" y2="-5" stroke="black" strokeWidth="2"/>
              </g>
              
              {/* Bridge connections */}
              <line x1="130" y1="180" x2="180" y2="180" stroke="black" strokeWidth="2"/>
              <line x1="130" y1="240" x2="180" y2="240" stroke="black" strokeWidth="2"/>
              <line x1="300" y1="190" x2="340" y2="190" stroke="black" strokeWidth="2"/>
              <line x1="300" y1="230" x2="340" y2="230" stroke="black" strokeWidth="2"/>
              <line x1="340" y1="190" x2="340" y2="230" stroke="black" strokeWidth="2"/>
            </g>

            {/* Filter Capacitor */}
            <g>
              <line x1="340" y1="190" x2="380" y2="190" stroke="black" strokeWidth="2"/>
              <line x1="340" y1="230" x2="380" y2="230" stroke="black" strokeWidth="2"/>
              
              {/* Capacitor symbol */}
              <line x1="380" y1="180" x2="380" y2="200" stroke="black" strokeWidth="3"/>
              <line x1="385" y1="180" x2="385" y2="200" stroke="black" strokeWidth="3"/>
              <line x1="380" y1="220" x2="380" y2="240" stroke="black" strokeWidth="3"/>
              <line x1="385" y1="220" x2="385" y2="240" stroke="black" strokeWidth="3"/>
              
              <text x="395" y="215" className="text-sm font-semibold">C=100μF</text>
            </g>

            {/* Transistor BC107 */}
            <g>
              <circle cx="520" cy="210" r="25" fill="none" stroke="black" strokeWidth="2"/>
              <text x="520" y="160" textAnchor="middle" className="text-sm font-semibold">BC107</text>
              
              {/* Transistor connections */}
              <line x1="520" y1="185" x2="520" y2="170" stroke="black" strokeWidth="2"/> {/* Collector */}
              <line x1="520" y1="235" x2="520" y2="250" stroke="black" strokeWidth="2"/> {/* Emitter */}
              <line x1="495" y1="210" x2="480" y2="210" stroke="black" strokeWidth="2"/> {/* Base */}
              
              {/* Transistor symbol inside circle */}
              <line x1="510" y1="195" x2="510" y2="225" stroke="black" strokeWidth="2"/>
              <polygon points="510,210 525,200 525,220" fill="black"/>
              <text x="500" y="205" className="text-xs">C</text>
              <text x="500" y="225" className="text-xs">E</text>
              <text x="460" y="215" className="text-xs">B</text>
              
              {/* Arrow on collector */}
              <circle cx="535" cy="175" r="3" fill="black"/>
            </g>

            {/* Resistor R=39.5Ω */}
            <g>
              <line x1="480" y1="210" x2="450" y2="210" stroke="black" strokeWidth="2"/>
              <rect x="430" y="205" width="30" height="10" fill="none" stroke="black" strokeWidth="2"/>
              <text x="445" y="195" textAnchor="middle" className="text-sm font-semibold">R=39.5Ω</text>
              
              {/* Zigzag resistor pattern */}
              <path d="M 435 210 L 440 205 L 445 215 L 450 205 L 455 215 L 460 210" 
                    fill="none" stroke="black" strokeWidth="1.5"/>
            </g>

            {/* Zener Diode FZ5.1 */}
            <g>
              <line x1="430" y1="210" x2="430" y2="280" stroke="black" strokeWidth="2"/>
              <line x1="430" y1="280" x2="380" y2="280" stroke="black" strokeWidth="2"/>
              
              {/* Zener diode symbol */}
              <polygon points="420,270 430,270 425,280" fill="black"/>
              <line x1="420" y1="280" x2="430" y2="280" stroke="black" strokeWidth="2"/>
              <line x1="420" y1="275" x2="420" y2="285" stroke="black" strokeWidth="2"/>
              <line x1="430" y1="275" x2="430" y2="285" stroke="black" strokeWidth="2"/>
              
              <text x="405" y="290" className="text-sm font-semibold">FZ5.1</text>
            </g>

            {/* Ammeter */}
            <g>
              <circle cx="580" cy="210" r="20" fill="none" stroke="black" strokeWidth="2"/>
              <text x="580" y="215" textAnchor="middle" className="text-sm font-bold">A</text>
              <text x="580" y="245" textAnchor="middle" className="text-xs">(0-50)mA</text>
              
              <line x1="545" y1="210" x2="560" y2="210" stroke="black" strokeWidth="2"/>
              <line x1="600" y1="210" x2="620" y2="210" stroke="black" strokeWidth="2"/>
            </g>

            {/* Voltmeter */}
            <g>
              <circle cx="580" cy="280" r="20" fill="none" stroke="black" strokeWidth="2"/>
              <text x="580" y="285" textAnchor="middle" className="text-sm font-bold">V</text>
              <text x="580" y="315" textAnchor="middle" className="text-xs">(0-10)V</text>
              
              <line x1="620" y1="210" x2="620" y2="280" stroke="black" strokeWidth="2"/>
              <line x1="600" y1="280" x2="620" y2="280" stroke="black" strokeWidth="2"/>
              <line x1="560" y1="280" x2="380" y2="280" stroke="black" strokeWidth="2"/>
            </g>

            {/* Load Resistor RL */}
            <g>
              <line x1="620" y1="210" x2="650" y2="210" stroke="black" strokeWidth="2"/>
              <line x1="650" y1="210" x2="650" y2="280" stroke="black" strokeWidth="2"/>
              <line x1="620" y1="280" x2="650" y2="280" stroke="black" strokeWidth="2"/>
              
              {/* Load resistor symbol */}
              <rect x="645" y="235" width="10" height="30" fill="none" stroke="black" strokeWidth="2"/>
              <text x="665" y="252" className="text-sm font-semibold">RL</text>
              
              {/* Zigzag pattern for load resistor */}
              <path d="M 650 240 L 655 235 L 645 245 L 655 255 L 645 265 L 650 260" 
                    fill="none" stroke="black" strokeWidth="1.5"/>
            </g>

            {/* Power supply connections */}
            <line x1="90" y1="120" x2="90" y2="100" stroke="black" strokeWidth="2"/>
            <line x1="90" y1="100" x2="380" y2="100" stroke="black" strokeWidth="2"/>
            <line x1="380" y1="100" x2="380" y2="190" stroke="black" strokeWidth="2"/>
            <line x1="90" y1="300" x2="90" y2="320" stroke="black" strokeWidth="2"/>
            <line x1="90" y1="320" x2="380" y2="320" stroke="black" strokeWidth="2"/>
            <line x1="380" y1="320" x2="380" y2="280" stroke="black" strokeWidth="2"/>

            {/* Additional circuit connections */}
            <line x1="380" y1="190" x2="430" y2="190" stroke="black" strokeWidth="2"/>
            <line x1="430" y1="190" x2="430" y2="210" stroke="black" strokeWidth="2"/>
            <line x1="520" y1="170" x2="520" y2="150" stroke="black" strokeWidth="2"/>
            <line x1="520" y1="150" x2="380" y2="150" stroke="black" strokeWidth="2"/>
            <line x1="380" y1="150" x2="380" y2="190" stroke="black" strokeWidth="2"/>
            <line x1="520" y1="250" x2="520" y2="280" stroke="black" strokeWidth="2"/>
            <line x1="520" y1="280" x2="560" y2="280" stroke="black" strokeWidth="2"/>

            {/* Ground symbol */}
            <g transform="translate(380, 320)">
              <line x1="0" y1="0" x2="0" y2="10" stroke="black" strokeWidth="2"/>
              <line x1="-8" y1="10" x2="8" y2="10" stroke="black" strokeWidth="2"/>
              <line x1="-5" y1="15" x2="5" y2="15" stroke="black" strokeWidth="2"/>
              <line x1="-2" y1="20" x2="2" y2="20" stroke="black" strokeWidth="2"/>
            </g>
          </svg>
        </div>
        
        <div className="mt-8 text-center">
          <h2 className="text-lg font-semibold mb-4">Circuit Components</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-blue-50 p-3 rounded">
              <strong>AC Supply:</strong> 230V AC
            </div>
            <div className="bg-green-50 p-3 rounded">
              <strong>Rectifier:</strong> IN4007 Bridge
            </div>
            <div className="bg-yellow-50 p-3 rounded">
              <strong>Filter:</strong> C = 100μF
            </div>
            <div className="bg-red-50 p-3 rounded">
              <strong>Transistor:</strong> BC107
            </div>
            <div className="bg-purple-50 p-3 rounded">
              <strong>Resistor:</strong> R = 39.5Ω
            </div>
            <div className="bg-indigo-50 p-3 rounded">
              <strong>Zener:</strong> FZ5.1 (5.1V)
            </div>
            <div className="bg-pink-50 p-3 rounded">
              <strong>Ammeter:</strong> 0-50mA
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <strong>Voltmeter:</strong> 0-10V
            </div>
          </div>
        </div>
      </div>
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
    <h2 >Coming Soon!!</h2>
    {/* Simulation content will be added here */}
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


export default Experiment9;