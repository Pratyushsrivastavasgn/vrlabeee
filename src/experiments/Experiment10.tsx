import React, { useState } from 'react';
import ExperimentLayout from './layout/ExperimentLayout';

const Experiment10 = () => {
  return (
    <ExperimentLayout
      title="Experiment 10"
      description="This experiment demonstrates the design and construction of RC Phase Shift Oscillator to obtain sinusoidal output and verify practical frequency with theoretical calculations."
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
      <li><strong>Design of RC Phase Shift Oscillator</strong></li>
      <li><strong>To design and construct RC phase shift oscillator and obtain a sinusoidal output</strong></li>
      <li><strong>To verify the practical frequency with calculated theoretical frequency</strong></li>
    </ul>
  <br />
    <h2 className="font-bold text-blue-600">Apparatus Required</h2>
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">S. No.</th>
              <th className="border border-gray-300 px-4 py-2">Component/Equipment</th>
              <th className="border border-gray-300 px-4 py-2">Specification</th>
              <th className="border border-gray-300 px-4 py-2">Qty</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">NPN Transistor</td>
              <td className="border border-gray-300 px-4 py-2">BC107/2N2222</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">2</td>
              <td className="border border-gray-300 px-4 py-2">Resistors</td>
              <td className="border border-gray-300 px-4 py-2">4.2kΩ, 470Ω</td>
              <td className="border border-gray-300 px-4 py-2">As required</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">3</td>
              <td className="border border-gray-300 px-4 py-2">Capacitors</td>
              <td className="border border-gray-300 px-4 py-2">0.01µF, 100µF</td>
              <td className="border border-gray-300 px-4 py-2">As required</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">4</td>
              <td className="border border-gray-300 px-4 py-2">DC Power Supply</td>
              <td className="border border-gray-300 px-4 py-2">0-15V Variable</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">5</td>
              <td className="border border-gray-300 px-4 py-2">Oscilloscope</td>
              <td className="border border-gray-300 px-4 py-2">Digital/Analog</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">6</td>
              <td className="border border-gray-300 px-4 py-2">Function Generator</td>
              <td className="border border-gray-300 px-4 py-2">1MHz</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">7</td>
              <td className="border border-gray-300 px-4 py-2">Bread Board</td>
              <td className="border border-gray-300 px-4 py-2">Standard</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">8</td>
              <td className="border border-gray-300 px-4 py-2">MATLAB Simulink Software</td>
              <td className="border border-gray-300 px-4 py-2">Latest Version</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  
    <h2 className="font-bold text-blue-600">Theory</h2>
    
    <h3 className="font-bold text-blue-600 mt-4">Phase Shift Oscillator:</h3>
    <ul className="list-disc ml-6">
      <li><strong>Circuit Configuration:</strong> Uses NPN transistor in Common Emitter (CE) configuration</li>
      <li><strong>Bias Network:</strong> Voltage divider R₁-R₂ provides necessary bias for stable operation</li>
      <li><strong>Temperature Stability:</strong> RE and CE combination provides temperature stability</li>
      <li><strong>Collector Control:</strong> Collector resistor RC controls the collector voltage</li>
      <li><strong>Output Coupling:</strong> Oscillator output voltage is capacitively coupled to load by CC</li>
    </ul>

    <h3 className="font-bold text-blue-600 mt-4">Oscillation Principle:</h3>
    <ul className="list-disc ml-6">
      <li><strong>Trigger Mechanism:</strong> Circuit oscillations are initiated by random variations in base current</li>
      <li><strong>Noise Sources:</strong> Variations may be due to:
        <ul className="list-disc ml-6">
          <li>Inherent noise in the transistor</li>
          <li>Minor variations in DC power supply voltage</li>
        </ul>
      </li>
      <li><strong>Amplification:</strong> Base current variation is amplified in the collector circuit</li>
      <li><strong>Feedback Network:</strong> Amplifier output is supplied to RC feedback network</li>
      <li><strong>Phase Shift:</strong> RC network produces 180° phase shift between output and input voltages</li>
      <li><strong>Total Phase Shift:</strong> CE amplifier produces additional 180° phase reversal</li>
      <li><strong>Regeneration:</strong> Total phase shift becomes 360° (or 0°) which is essential for sustained oscillations</li>
    </ul>

    <h3 className="font-bold text-blue-600 mt-4">Oscillation Process:</h3>
    <ul className="list-disc ml-6">
      <li><strong>Feedback Loop:</strong> Network output is applied to base terminal of transistor</li>
      <li><strong>Sustained Oscillation:</strong> Continuous variation in collector current between saturation and cutoff</li>
      <li><strong>Frequency Determination:</strong> RC phase shift network determines the oscillation frequency</li>
      <li><strong>Self-Sustaining:</strong> Once started, oscillations continue without external input signal</li>
    </ul>

    <h3 className="font-bold text-blue-600 mt-4">Design Specifications:</h3>
    <div className="bg-gray-100 p-4 rounded-lg space-y-2">
      <div className="font-mono text-center text-lg">
        <strong>f = 1/(2πRC√(6 + 4(RC/R)))</strong>
      </div>
    </div>

    <h3 className="font-bold text-blue-600 mt-4">Component Values:</h3>
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-md">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Parameter</th>
              <th className="border border-gray-300 px-4 py-2">Symbol</th>
              <th className="border border-gray-300 px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr>
              <td className="border border-gray-300 px-4 py-2">Capacitor</td>
              <td className="border border-gray-300 px-4 py-2">C</td>
              <td className="border border-gray-300 px-4 py-2">0.01 µF</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Collector Resistor</td>
              <td className="border border-gray-300 px-4 py-2">RC</td>
              <td className="border border-gray-300 px-4 py-2">4.2 kΩ</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Emitter Capacitor</td>
              <td className="border border-gray-300 px-4 py-2">CE</td>
              <td className="border border-gray-300 px-4 py-2">100 µF</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Emitter Resistor</td>
              <td className="border border-gray-300 px-4 py-2">RE</td>
              <td className="border border-gray-300 px-4 py-2">470 Ω</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Collector-Emitter Voltage</td>
              <td className="border border-gray-300 px-4 py-2">VCE</td>
              <td className="border border-gray-300 px-4 py-2">4 V</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <h3 className="font-bold text-blue-600 mt-4">Key Features:</h3>
    <ul className="list-disc ml-6">
      <li><strong>Simple Design:</strong> Uses basic RC components for phase shifting</li>
      <li><strong>Fixed Frequency:</strong> Oscillation frequency determined by RC values</li>
      <li><strong>Sinusoidal Output:</strong> Produces clean sine wave output</li>
      <li><strong>Low Distortion:</strong> Good quality output when properly designed</li>
      <li><strong>Self-Starting:</strong> No external trigger required for oscillation</li>
    </ul>
  </div>
);

const ProcedureContent = () => (
  <div>
    <h2 className="font-bold text-blue-600">Circuit Diagram</h2>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-7xl w-full">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
          RC Phase Shift Oscillator Circuit
        </h1>
        
        <div className="flex justify-center">
          <svg 
            width="900" 
            height="600" 
            viewBox="0 0 900 600" 
            className="border border-gray-300 rounded bg-white"
          >
            {/* Circuit Diagram Title */}
            <text x="20" y="30" className="text-lg font-bold">Circuit Diagram:</text>
            
            {/* 5V Power Supply */}
            <g>
              <line x1="250" y1="60" x2="250" y2="80" stroke="blue" strokeWidth="2"/>
              <text x="260" y="55" className="text-sm font-semibold fill-blue-600">5 Volts</text>
              <circle cx="250" cy="80" r="3" fill="blue"/>
            </g>

            {/* Main horizontal power line */}
            <line x1="120" y1="120" x2="450" y2="120" stroke="blue" strokeWidth="2"/>
            
            {/* Vertical connections from power line */}
            <line x1="120" y1="120" x2="120" y2="150" stroke="blue" strokeWidth="2"/>
            <line x1="180" y1="120" x2="180" y2="150" stroke="blue" strokeWidth="2"/>
            <line x1="250" y1="80" x2="250" y2="120" stroke="blue" strokeWidth="2"/>
            <line x1="250" y1="120" x2="250" y2="150" stroke="blue" strokeWidth="2"/>
            <line x1="320" y1="120" x2="320" y2="150" stroke="blue" strokeWidth="2"/>
            <line x1="450" y1="120" x2="450" y2="150" stroke="blue" strokeWidth="2"/>

            {/* Resistor 56k */}
            <g>
              <rect x="110" y="150" width="20" height="40" fill="none" stroke="black" strokeWidth="2"/>
              <path d="M 115 160 L 120 150 L 125 170 L 115 190 L 120 170 L 125 160" 
                    fill="none" stroke="black" strokeWidth="1.5"/>
              <text x="95" y="175" className="text-sm font-semibold">56k</text>
              <line x1="120" y1="190" x2="120" y2="220" stroke="blue" strokeWidth="2"/>
            </g>

            {/* Resistor 10k1 */}
            <g>
              <rect x="170" y="150" width="20" height="40" fill="none" stroke="black" strokeWidth="2"/>
              <path d="M 175 160 L 180 150 L 185 170 L 175 190 L 180 170 L 185 160" 
                    fill="none" stroke="black" strokeWidth="1.5"/>
              <text x="155" y="175" className="text-sm font-semibold">10k1</text>
              <line x1="180" y1="190" x2="180" y2="220" stroke="blue" strokeWidth="2"/>
            </g>

            {/* Resistor 10k */}
            <g>
              <rect x="240" y="150" width="20" height="40" fill="none" stroke="black" strokeWidth="2"/>
              <path d="M 245 160 L 250 150 L 255 170 L 245 190 L 250 170 L 255 160" 
                    fill="none" stroke="black" strokeWidth="1.5"/>
              <text x="230" y="175" className="text-sm font-semibold">10k</text>
              <line x1="250" y1="190" x2="250" y2="220" stroke="blue" strokeWidth="2"/>
            </g>

            {/* Resistor 4.2k */}
            <g>
              <rect x="310" y="150" width="20" height="40" fill="none" stroke="black" strokeWidth="2"/>
              <path d="M 315 160 L 320 150 L 325 170 L 315 190 L 320 170 L 325 160" 
                    fill="none" stroke="black" strokeWidth="1.5"/>
              <text x="295" y="175" className="text-sm font-semibold">4.2k</text>
              <line x1="320" y1="190" x2="320" y2="220" stroke="blue" strokeWidth="2"/>
            </g>

            {/* Horizontal line connecting resistors */}
            <line x1="120" y1="220" x2="450" y2="220" stroke="blue" strokeWidth="2"/>

            {/* Capacitor 0.1MF2 */}
            <g>
              <line x1="140" y1="210" x2="140" y2="230" stroke="black" strokeWidth="3"/>
              <line x1="145" y1="210" x2="145" y2="230" stroke="black" strokeWidth="3"/>
              <text x="110" y="250" className="text-sm font-semibold">0.1MF2</text>
            </g>

            {/* Capacitor 0.1MF1 */}
            <g>
              <line x1="200" y1="210" x2="200" y2="230" stroke="black" strokeWidth="3"/>
              <line x1="205" y1="210" x2="205" y2="230" stroke="black" strokeWidth="3"/>
              <text x="170" y="250" className="text-sm font-semibold">0.1MF1</text>
            </g>

            {/* Capacitor 0.1 MF */}
            <g>
              <line x1="270" y1="210" x2="270" y2="230" stroke="black" strokeWidth="3"/>
              <line x1="275" y1="210" x2="275" y2="230" stroke="black" strokeWidth="3"/>
              <text x="245" y="250" className="text-sm font-semibold">0.1 MF</text>
            </g>

            {/* Capacitor 100 MF1 */}
            <g>
              <line x1="400" y1="210" x2="400" y2="230" stroke="black" strokeWidth="3"/>
              <line x1="405" y1="210" x2="405" y2="230" stroke="black" strokeWidth="3"/>
              <text x="375" y="250" className="text-sm font-semibold">100 MF1</text>
            </g>

            {/* Transistor */}
            <g transform="translate(370, 280)">
              <circle cx="0" cy="0" r="15" fill="none" stroke="black" strokeWidth="2"/>
              <line x1="-10" y1="-5" x2="10" y2="-5" stroke="black" strokeWidth="2"/>
              <line x1="0" y1="-5" x2="0" y2="-15" stroke="black" strokeWidth="2"/>
              <line x1="0" y1="5" x2="0" y2="15" stroke="black" strokeWidth="2"/>
              <polygon points="0,5 -5,10 5,10" fill="black"/>
              <line x1="-15" y1="0" x2="-10" y2="0" stroke="black" strokeWidth="2"/>
            </g>

            {/* Connection from capacitor to transistor */}
            <line x1="370" y1="220" x2="370" y2="265" stroke="blue" strokeWidth="2"/>

            {/* Resistor 10k2 (bottom left) */}
            <g>
              <rect x="50" y="330" width="20" height="40" fill="none" stroke="black" strokeWidth="2"/>
              <path d="M 55 340 L 60 330 L 65 350 L 55 370 L 60 350 L 65 340" 
                    fill="none" stroke="black" strokeWidth="1.5"/>
              <text x="25" y="355" className="text-sm font-semibold">10k2</text>
              <line x1="60" y1="370" x2="60" y2="400" stroke="blue" strokeWidth="2"/>
              <line x1="120" y1="220" x2="120" y2="350" stroke="blue" strokeWidth="2"/>
              <line x1="120" y1="350" x2="70" y2="350" stroke="blue" strokeWidth="2"/>
            </g>

            {/* Op-Amp */}
            <g transform="translate(200, 380)">
              <polygon points="0,0 40,20 0,40" fill="none" stroke="black" strokeWidth="2"/>
              <text x="15" y="25" className="text-sm font-bold">+</text>
              <text x="15" y="35" className="text-sm font-bold">-</text>
              <line x1="-20" y1="10" x2="0" y2="10" stroke="blue" strokeWidth="2"/>
              <line x1="-20" y1="30" x2="0" y2="30" stroke="blue" strokeWidth="2"/>
              <line x1="40" y1="20" x2="60" y2="20" stroke="blue" strokeWidth="2"/>
              <text x="-40" y="450" className="text-sm font-semibold">f(x) = 0</text>
              <rect x="-50" y="435" width="40" height="20" fill="none" stroke="black" strokeWidth="1"/>
            </g>

            {/* GND connection */}
            <g transform="translate(200, 450)">
              <line x1="0" y1="0" x2="0" y2="15" stroke="black" strokeWidth="2"/>
              <text x="-15" y="35" className="text-sm font-semibold">GND</text>
              <line x1="-10" y1="15" x2="10" y2="15" stroke="black" strokeWidth="2"/>
              <line x1="-7" y1="20" x2="7" y2="20" stroke="black" strokeWidth="2"/>
              <line x1="-4" y1="25" x2="4" y2="25" stroke="black" strokeWidth="2"/>
            </g>

            {/* Connection from op-amp to ground */}
            <line x1="180" y1="410" x2="180" y2="430" stroke="blue" strokeWidth="2"/>
            <line x1="180" y1="430" x2="200" y2="430" stroke="blue" strokeWidth="2"/>
            <line x1="200" y1="430" x2="200" y2="450" stroke="blue" strokeWidth="2"/>

            {/* Resistor 470 */}
            <g>
              <rect x="340" y="350" width="20" height="40" fill="none" stroke="black" strokeWidth="2"/>
              <path d="M 345 360 L 350 350 L 355 370 L 345 390 L 350 370 L 355 360" 
                    fill="none" stroke="black" strokeWidth="1.5"/>
              <text x="325" y="375" className="text-sm font-semibold">470</text>
              <line x1="350" y1="390" x2="350" y2="420" stroke="blue" strokeWidth="2"/>
            </g>

            {/* Capacitor 100MF */}
            <g>
              <line x1="380" y1="410" x2="380" y2="430" stroke="black" strokeWidth="3"/>
              <line x1="385" y1="410" x2="385" y2="430" stroke="black" strokeWidth="3"/>
              <text x="395" y="425" className="text-sm font-semibold">100MF</text>
              <line x1="350" y1="420" x2="380" y2="420" stroke="blue" strokeWidth="2"/>
              <line x1="385" y1="420" x2="450" y2="420" stroke="blue" strokeWidth="2"/>
            </g>

            {/* Connection from transistor to resistor 470 */}
            <line x1="370" y1="295" x2="370" y2="320" stroke="blue" strokeWidth="2"/>
            <line x1="370" y1="320" x2="350" y2="320" stroke="blue" strokeWidth="2"/>
            <line x1="350" y1="320" x2="350" y2="350" stroke="blue" strokeWidth="2"/>

            {/* Connection from op-amp output */}
            <line x1="260" y1="400" x2="290" y2="400" stroke="blue" strokeWidth="2"/>
            <line x1="290" y1="400" x2="290" y2="320" stroke="blue" strokeWidth="2"/>
            <line x1="290" y1="320" x2="355" y2="320" stroke="blue" strokeWidth="2"/>

            {/* Connection from bottom line to op-amp input */}
            <line x1="60" y1="400" x2="180" y2="400" stroke="blue" strokeWidth="2"/>
            <line x1="180" y1="400" x2="180" y2="390" stroke="blue" strokeWidth="2"/>

            {/* Connection back to top from right side */}
            <line x1="450" y1="220" x2="450" y2="420" stroke="blue" strokeWidth="2"/>

            {/* Power Supply PS-S */}
            <g transform="translate(550, 120)">
              <rect x="0" y="0" width="60" height="40" fill="none" stroke="black" strokeWidth="2"/>
              <circle cx="20" cy="20" r="8" fill="none" stroke="black" strokeWidth="1"/>
              <text x="5" y="15" className="text-xs">~</text>
              <text x="5" y="30" className="text-xs">Y</text>
              <text x="75" y="15" className="text-sm font-semibold">PS-S</text>
              
              {/* Arrow pointing right */}
              <line x1="60" y1="20" x2="80" y2="20" stroke="black" strokeWidth="2"/>
              <polygon points="75,15 85,20 75,25" fill="black"/>
              
              {/* Output box */}
              <rect x="90" y="10" width="40" height="20" fill="none" stroke="black" strokeWidth="2"/>
              <text x="105" y="25" className="text-sm font-semibold">Output</text>
            </g>

            {/* Connection from main circuit to PS-S */}
            <line x1="450" y1="140" x2="550" y2="140" stroke="blue" strokeWidth="2"/>

            {/* Additional circuit connections */}
            <line x1="450" y1="220" x2="500" y2="220" stroke="blue" strokeWidth="2"/>
            <line x1="500" y1="220" x2="500" y2="140" stroke="blue" strokeWidth="2"/>
            <line x1="500" y1="140" x2="550" y2="140" stroke="blue" strokeWidth="2"/>

            {/* Connection points (dots) */}
            <circle cx="120" cy="120" r="2" fill="blue"/>
            <circle cx="180" cy="120" r="2" fill="blue"/>
            <circle cx="250" cy="120" r="2" fill="blue"/>
            <circle cx="320" cy="120" r="2" fill="blue"/>
            <circle cx="450" cy="120" r="2" fill="blue"/>
            <circle cx="120" cy="220" r="2" fill="blue"/>
            <circle cx="180" cy="220" r="2" fill="blue"/>
            <circle cx="250" cy="220" r="2" fill="blue"/>
            <circle cx="320" cy="220" r="2" fill="blue"/>
            <circle cx="370" cy="220" r="2" fill="blue"/>
            <circle cx="450" cy="220" r="2" fill="blue"/>
            <circle cx="350" cy="320" r="2" fill="blue"/>
            <circle cx="350" cy="420" r="2" fill="blue"/>
            <circle cx="450" cy="420" r="2" fill="blue"/>
          </svg>
        </div>
        
        <div className="mt-8 text-center">
          <h2 className="text-lg font-semibold mb-4">Circuit Components</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-blue-50 p-3 rounded">
              <strong>Power Supply:</strong> 5V DC
            </div>
            <div className="bg-green-50 p-3 rounded">
              <strong>Resistors:</strong> 56kΩ, 10.1kΩ, 10kΩ, 4.2kΩ, 10.2kΩ, 470Ω
            </div>
            <div className="bg-yellow-50 p-3 rounded">
              <strong>Capacitors:</strong> 0.1μF (x3), 100μF (x2)
            </div>
            <div className="bg-red-50 p-3 rounded">
              <strong>Active Components:</strong> Op-Amp, Transistor
            </div>
            <div className="bg-purple-50 p-3 rounded">
              <strong>Function Gen:</strong> f(x) = 0
            </div>
            <div className="bg-indigo-50 p-3 rounded">
              <strong>Ground:</strong> GND Reference
            </div>
            <div className="bg-pink-50 p-3 rounded">
              <strong>Power Supply:</strong> PS-S Module
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <strong>Output:</strong> Oscillator Signal
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p><strong>Circuit Type:</strong> RC Phase Shift Oscillator</p>
          <p><strong>Function:</strong> Generates sinusoidal oscillations using RC phase shift network</p>
        </div>
      </div>
    </div>

    <h2 className="font-bold text-blue-600">Experimental Procedure</h2>
    
    <h3 className="font-bold text-blue-600 mt-4">Circuit Construction:</h3>
    <ol className="list-decimal ml-6">
      <li>Assemble the circuit on breadboard as per the circuit diagram</li>
      <li>Connect the NPN transistor in Common Emitter configuration</li>
      <li>Set up the voltage divider bias network using R1 and R2</li>
      <li>Connect the collector resistor RC to +VCC supply</li>
      <li>Connect the emitter resistor RE with bypass capacitor CE</li>
      <li>Implement the three-stage RC phase shift network</li>
      <li>Connect the feedback path from third RC stage to base</li>
      <li>Add output coupling capacitor CC for AC output</li>
    </ol>

    <h3 className="font-bold text-blue-600 mt-4">Testing and Measurements:</h3>
    <ol className="list-decimal ml-6">
      <li>Apply appropriate DC supply voltage (+VCC = 12V typically)</li>
      <li>Check DC bias conditions using multimeter</li>
      <li>Connect oscilloscope to output terminal</li>
      <li>Observe the oscilloscope for sinusoidal output</li>
      <li>Measure the oscillation frequency using oscilloscope</li>
      <li>Record the peak-to-peak amplitude of output waveform</li>
      <li>Compare practical frequency with theoretical calculations</li>
    </ol>

    <h3 className="font-bold text-blue-600 mt-4">Frequency Calculation:</h3>
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="font-mono">
        <strong>Theoretical Frequency:</strong><br/>
        f = 1/(2πRC√(6 + 4(RC/R)))<br/>
        Where RC = Collector resistance, R = Feedback resistance
      </div>
    </div>

    <h3 className="font-bold text-blue-600 mt-4">Safety Precautions:</h3>
    <ul className="list-disc ml-6">
      <li>Handle electronic components with care to prevent damage</li>
      <li>Ensure correct polarity for electrolytic capacitors</li>
      <li>Check transistor pin configuration before connecting</li>
      <li>Use appropriate voltage levels as per component ratings</li>
      <li>Verify connections before applying power</li>
      <li>Handle oscilloscope probes carefully to avoid short circuits</li>
    </ul>

    <h3 className="font-bold text-blue-600 mt-4">Expected Results:</h3>
    <ul className="list-disc ml-6">
      <li><strong>Output Waveform:</strong> Clean sinusoidal waveform should be observed</li>
      <li><strong>Frequency Match:</strong> Practical frequency should closely match theoretical value</li>
      <li><strong>Amplitude:</strong> Output amplitude should be stable and sufficient for measurement</li>
      <li><strong>Stability:</strong> Oscillations should be self-sustaining without external input</li>
    </ul>
  </div>
);

const SimulationContent = () => (
  <div>
    <h2 >Coming Soon!!!</h2>
    {/* Simulation content will be added here */}
  </div>
);


  const QuizContent = () => {
  const questions = [
    {
      question: 'What is the aim of the RC Phase Shift Oscillator experiment?',
      options: [
        'To study zener diode breakdown',
        'To design and construct RC phase shift oscillator and verify theoretical frequency',
        'To build a JFET amplifier',
        'To measure transistor gain'
      ],
      answer: 1
    },
    {
      question: 'Which configuration is used in the transistor for this oscillator?',
      options: ['CB Configuration', 'CC Configuration', 'CE Configuration', 'Differential pair'],
      answer: 2
    },
    {
      question: 'How much total phase shift is required for sustained oscillations?',
      options: ['90°', '180°', '360° or 0°', '270°'],
      answer: 2
    },
    {
      question: 'What causes the initial oscillation in the circuit?',
      options: [
        'Thermal runaway',
        'Manual triggering',
        'Noise or variation in base current',
        'Short circuit in transistor'
      ],
      answer: 2
    },
    {
      question: 'What is the role of the RC network in the oscillator?',
      options: [
        'Biasing the base',
        'Amplifying the signal',
        'Stabilizing the collector current',
        'Providing 180° phase shift for feedback'
      ],
      answer: 3
    },
    {
      question: 'What software is used to simulate this experiment?',
      options: ['Proteus', 'MATLAB Simulink', 'TinkerCAD', 'LTspice'],
      answer: 1
    },
    {
      question: 'Which formula is used to calculate the frequency of the oscillator?',
      options: [
        'F = 1 / (2πRC)',
        'F = 1 / (2πRC√3)',
        'F = 1 / (2πRC√(6 + 4RC/R))',
        'F = 1 / (RC)'
      ],
      answer: 2
    }
  ];

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



export default Experiment10;