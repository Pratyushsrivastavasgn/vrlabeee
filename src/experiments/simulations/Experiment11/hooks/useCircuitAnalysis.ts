import { useState, useCallback } from 'react';
import { Component } from '../types/circuit';

interface AnalysisResult {
  inputVoltage: number;
  outputVoltage: number;
  inputCurrent: number;
  outputCurrent: number;
  inputPower: number;
  outputPower: number;
  voltageGain: number;
  currentGain: number;
  powerGain: number;
  efficiency: number;
  quiescentPoint: {
    vce: number;
    ic: number;
    ib: number;
  };
}

interface FrequencyPoint {
  frequency: number;
  gain: number;
  phase: number;
}

export const useCircuitAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [measurements, setMeasurements] = useState<AnalysisResult>({
    inputVoltage: 0,
    outputVoltage: 0,
    inputCurrent: 0,
    outputCurrent: 0,
    inputPower: 0,
    outputPower: 0,
    voltageGain: 0,
    currentGain: 0,
    powerGain: 0,
    efficiency: 0,
    quiescentPoint: {
      vce: 0,
      ic: 0,
      ib: 0,
    },
  });
  const [frequencyResponse, setFrequencyResponse] = useState<FrequencyPoint[]>([]);

  const analyzeCircuit = useCallback(async (components: Component[]) => {
    setIsAnalyzing(true);

    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // Find circuit components
      const transistor = components.find(c => c.type === 'transistor');
      const vcc = components.find(c => c.type === 'voltage_source');
      const rb = components.find(c => c.label === 'RB' || (c.type === 'resistor' && c.value > 100000));
      const rc = components.find(c => c.label === 'RC' || (c.type === 'resistor' && c.value > 1000 && c.value < 10000));
      const re = components.find(c => c.label === 'RE' || (c.type === 'resistor' && c.value < 5000 && c.value > 100));
      const rl = components.find(c => c.type === 'load');

      if (!transistor || !vcc || !rb || !rc) {
        throw new Error('Incomplete circuit - missing essential components');
      }

      // Circuit parameters
      const VCC = vcc.value;
      const RB = rb.value;
      const RC = rc.value;
      const RE = re?.value || 0;
      const RL = rl?.value || 8;
      const beta = transistor.properties?.beta || 100;
      const VBE = transistor.properties?.vbe || 0.7;

      // DC Analysis (Q-Point calculation)
      const IB = (VCC - VBE) / RB;
      const IC = beta * IB;
      const IE = IC + IB;
      const VCE = VCC - IC * (RC + RE);

      // AC Analysis
      const r_e = 0.026 / IE; // Dynamic emitter resistance at room temperature
      const Rin = RB; // Input resistance (simplified)
      const Rout = RC; // Output resistance (simplified)
      
      // Load line analysis
      const RCeff = (RC * RL) / (RC + RL); // Effective collector resistance with load
      
      // Gain calculations
      const Av = -RCeff / (r_e + RE); // Voltage gain
      const Ai = beta * RB / (RB + beta * (r_e + RE)); // Current gain
      const Ap = Math.abs(Av * Ai); // Power gain

      // Signal analysis (assuming 10mV input)
      const Vin = 0.01; // 10mV input signal
      const Vout = Math.abs(Av * Vin);
      const Iin = Vin / Rin;
      const Iout = Vout / RL;

      // Power calculations
      const Pin = Vin * Iin;
      const Pout = Vout * Iout;
      const PDC = VCC * IC;
      const efficiency = (Pout / PDC) * 100;

      // Generate frequency response
      const frequencies = [];
      for (let f = 10; f <= 1000000; f *= 1.5) {
        const omega = 2 * Math.PI * f;
        
        // Simplified frequency response (assuming coupling capacitors)
        const gainMagnitude = Math.abs(Av) / Math.sqrt(1 + Math.pow(100 / f, 2)); // High-pass effect
        const gainDb = 20 * Math.log10(gainMagnitude);
        const phase = -Math.atan(100 / f) * 180 / Math.PI; // Phase shift
        
        frequencies.push({
          frequency: f,
          gain: gainDb,
          phase: phase,
        });
      }

      const result: AnalysisResult = {
        inputVoltage: Vin,
        outputVoltage: Vout,
        inputCurrent: Iin,
        outputCurrent: Iout,
        inputPower: Pin,
        outputPower: Pout,
        voltageGain: Av,
        currentGain: Ai,
        powerGain: Ap,
        efficiency: efficiency,
        quiescentPoint: {
          vce: VCE,
          ic: IC,
          ib: IB,
        },
      };

      setMeasurements(result);
      setFrequencyResponse(frequencies);

    } catch (error) {
      console.error('Circuit analysis error:', error);
      // Set default values on error
      setMeasurements({
        inputVoltage: 0,
        outputVoltage: 0,
        inputCurrent: 0,
        outputCurrent: 0,
        inputPower: 0,
        outputPower: 0,
        voltageGain: 0,
        currentGain: 0,
        powerGain: 0,
        efficiency: 0,
        quiescentPoint: { vce: 0, ic: 0, ib: 0 },
      });
      setFrequencyResponse([]);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  return {
    measurements,
    frequencyResponse,
    isAnalyzing,
    analyzeCircuit,
  };
};