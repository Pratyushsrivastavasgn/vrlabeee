// Define component types
export enum ComponentType {
  Resistor = 'resistor',
  VoltageSource = 'voltageSource',
  CurrentSource = 'currentSource',
}

// Component interface
export interface Component {
  id: string;
  type: ComponentType;
  value: number;
  label: string;
}

// Connection between components
export interface Connection {
  id: string;
  from: string; // Component ID
  to: string; // Component ID
}

// Circuit interface
export interface Circuit {
  components: Component[];
  connections: Connection[];
  loadTerminals: string[]; // IDs of components where the load is connected
}

// Thévenin equivalent circuit
export interface TheveninEquivalent {
  voltage: number;
  resistance: number;
}

// Calculate Thévenin equivalent circuit
// Note: This is a simplified implementation for demonstration purposes
// A real implementation would need to use matrix-based circuit analysis techniques
export function calculateThevenin(circuit: Circuit): TheveninEquivalent {
  // For this demo, we'll use a simplified voltage divider calculation
  // In a real implementation, you would:
  // 1. Use nodal analysis or mesh analysis to solve the circuit
  // 2. Calculate open-circuit voltage for Vth
  // 3. Calculate equivalent resistance by replacing voltage sources with shorts
  
  // Assume a voltage divider with R1 and R2
  const voltageSources = circuit.components.filter(c => c.type === ComponentType.VoltageSource);
  const resistors = circuit.components.filter(c => c.type === ComponentType.Resistor);
  
  // For simplicity, we'll just use the first voltage source
  const sourceVoltage = voltageSources.length > 0 ? voltageSources[0].value : 0;
  
  // And calculate a simple voltage divider between the first two resistors
  const r1 = resistors.length > 0 ? resistors[0].value : 1000;
  const r2 = resistors.length > 1 ? resistors[1].value : 1000;
  const r3 = resistors.length > 2 ? resistors[2].value : 0;
  
  // Calculate parallel combination of R2 and R3 (if R3 exists)
  let r2Parallel = r2;
  if (r3 > 0) {
    r2Parallel = (r2 * r3) / (r2 + r3);
  }
  
  // Voltage divider formula for Thévenin voltage
  const theveninVoltage = sourceVoltage * (r2Parallel / (r1 + r2Parallel));
  
  // Thévenin resistance is the equivalent resistance looking back into the circuit
  const theveninResistance = (r1 * r2Parallel) / (r1 + r2Parallel);
  
  return {
    voltage: theveninVoltage,
    resistance: theveninResistance
  };
}

// Calculate current through a load connected to a Thévenin equivalent circuit
export function calculateLoadCurrent(
  theveninVoltage: number,
  theveninResistance: number,
  loadResistance: number
): number {
  return theveninVoltage / (theveninResistance + loadResistance);
}

// Calculate voltage across a load connected to a Thévenin equivalent circuit
export function calculateLoadVoltage(
  theveninVoltage: number,
  theveninResistance: number,
  loadResistance: number
): number {
  const current = calculateLoadCurrent(theveninVoltage, theveninResistance, loadResistance);
  return current * loadResistance;
}