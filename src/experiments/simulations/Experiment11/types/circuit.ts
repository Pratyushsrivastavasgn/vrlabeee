export interface Component {
  id: string;
  type: 'transistor' | 'resistor' | 'capacitor' | 'inductor' | 'voltage_source' | 'ground' | 'load';
  label: string;
  value: number;
  unit: string;
  position: { x: number; y: number };
  connections: string[];
  properties?: {
    model?: string;
    beta?: number;
    vbe?: number;
    vce_sat?: number;
  };
}

export interface Connection {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

export interface CircuitState {
  components: Component[];
  connections: Connection[];
  isComplete: boolean;
  measurements: {
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
  };
}