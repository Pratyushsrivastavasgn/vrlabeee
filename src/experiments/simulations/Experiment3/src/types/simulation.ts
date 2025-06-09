export interface BulbState {
  id: string;
  name: string;
  isOn: boolean;
  wattage: number;
}

export interface SimulationState {
  isRunning: boolean;
  currentCycle: number;
  totalCycles: number;
  currentPower: number;
  totalEnergyUsed: number;
  cycleStartTime: number;
  elapsedTime: number;
}