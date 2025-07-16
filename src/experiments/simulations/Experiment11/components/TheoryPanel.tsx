import React from 'react';
import { BookOpen, Lightbulb, Calculator, Target } from 'lucide-react';

const TheoryPanel: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-2xl">
      <h2 className="text-2xl font-semibold mb-6 text-white flex items-center">
        <BookOpen className="mr-2 text-blue-400" />
        Class-A Power Amplifier Theory
      </h2>

      <div className="space-y-6">
        {/* Operating Principle */}
        <div className="bg-gray-900 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-green-400 flex items-center">
            <Lightbulb className="mr-2" size={18} />
            Operating Principle
          </h3>
          <div className="text-gray-300 text-sm space-y-2">
            <p>
              A Class-A power amplifier operates with the transistor conducting for the entire 360° of the input signal cycle. 
              The Q-point is set at the center of the load line to ensure linear operation.
            </p>
            <p>
              <strong>Key Characteristics:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Transistor conducts for full input cycle (360°)</li>
              <li>No crossover distortion</li>
              <li>High linearity but low efficiency (~25-50%)</li>
              <li>Suitable for low-power applications requiring high fidelity</li>
            </ul>
          </div>
        </div>

        {/* Circuit Analysis */}
        <div className="bg-gray-900 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-yellow-400 flex items-center">
            <Calculator className="mr-2" size={18} />
            Circuit Analysis Formulas
          </h3>
          <div className="text-gray-300 text-sm space-y-3">
            <div>
              <h4 className="font-semibold text-white mb-2">DC Analysis (Q-Point):</h4>
              <div className="font-mono text-xs space-y-1 bg-gray-800 p-2 rounded">
                <div>IB = (VCC - VBE) / RB</div>
                <div>IC = β × IB</div>
                <div>VCE = VCC - IC × (RC + RE)</div>
                <div>IE = IC + IB ≈ IC</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-2">AC Analysis (Small Signal):</h4>
              <div className="font-mono text-xs space-y-1 bg-gray-800 p-2 rounded">
                <div>re = 26mV / IE (at room temperature)</div>
                <div>Av = -RC / (re + RE)</div>
                <div>Ai = β × RB / (RB + β × (re + RE))</div>
                <div>Ap = Av × Ai</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-2">Power Analysis:</h4>
              <div className="font-mono text-xs space-y-1 bg-gray-800 p-2 rounded">
                <div>Pin = Vin² / Rin</div>
                <div>Pout = Vout² / RL</div>
                <div>η = (Pout / PDC) × 100%</div>
                <div>PDC = VCC × IC</div>
              </div>
            </div>
          </div>
        </div>

        {/* Design Guidelines */}
        <div className="bg-gray-900 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-purple-400 flex items-center">
            <Target className="mr-2" size={18} />
            Design Guidelines
          </h3>
          <div className="text-gray-300 text-sm space-y-2">
            <p><strong>Q-Point Selection:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Set VCE ≈ VCC/2 for maximum output swing</li>
              <li>Choose IC for desired power output</li>
              <li>Ensure transistor operates in active region</li>
            </ul>
            
            <p className="mt-3"><strong>Component Selection:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>RB: Sets base bias current (typically 10-100 kΩ)</li>
              <li>RC: Collector load resistor (affects gain and Q-point)</li>
              <li>RE: Emitter resistor (provides stability)</li>
              <li>RL: Load resistance (typically 4-16 Ω for speakers)</li>
            </ul>

            <p className="mt-3"><strong>Performance Trade-offs:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Higher gain vs. stability</li>
              <li>Bandwidth vs. gain</li>
              <li>Power output vs. efficiency</li>
              <li>Linearity vs. power consumption</li>
            </ul>
          </div>
        </div>

        {/* Experimental Procedure */}
        <div className="bg-gray-900 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-cyan-400">Experimental Procedure</h3>
          <div className="text-gray-300 text-sm">
            <ol className="list-decimal list-inside space-y-2">
              <li>Build the circuit using the component library</li>
              <li>Set appropriate component values for desired Q-point</li>
              <li>Run DC analysis to verify operating point</li>
              <li>Apply AC input signal and measure output</li>
              <li>Calculate voltage, current, and power gains</li>
              <li>Analyze frequency response characteristics</li>
              <li>Determine amplifier efficiency</li>
              <li>Compare theoretical vs. measured values</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheoryPanel;