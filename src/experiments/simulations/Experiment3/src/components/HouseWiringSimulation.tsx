import React, { useState, useEffect, useCallback } from 'react';
import CircuitDiagram from './CircuitDiagram';
import PowerMeter from './PowerMeter';
import ControlPanel from './ControlPanel';
import { BulbState, SimulationState } from '../types/simulation';

const BULB_WATTAGE = 60; // watts per bulb
const VOLTAGE = 120; // volts
const CYCLE_DURATION = 10000; // 10 seconds per cycle

const HouseWiringSimulation: React.FC = () => {
  const [bulbs, setBulbs] = useState<BulbState[]>([
    { id: 'living-room', name: 'Living Room', isOn: false, wattage: BULB_WATTAGE },
    { id: 'kitchen', name: 'Kitchen', isOn: false, wattage: BULB_WATTAGE },
    { id: 'bedroom1', name: 'Bedroom 1', isOn: false, wattage: BULB_WATTAGE },
    { id: 'bedroom2', name: 'Bedroom 2', isOn: false, wattage: BULB_WATTAGE },
    { id: 'bathroom', name: 'Bathroom', isOn: false, wattage: BULB_WATTAGE },
  ]);

  const [simulationState, setSimulationState] = useState<SimulationState>({
    isRunning: false,
    currentCycle: 0,
    totalCycles: 1,
    currentPower: 0,
    totalEnergyUsed: 0,
    cycleStartTime: 0,
    elapsedTime: 0,
  });

  const calculateCurrentPower = useCallback(() => {
    return bulbs.reduce((total, bulb) => total + (bulb.isOn ? bulb.wattage : 0), 0);
  }, [bulbs]);

  const toggleBulb = (bulbId: string) => {
    setBulbs(prev => prev.map(bulb => 
      bulb.id === bulbId ? { ...bulb, isOn: !bulb.isOn } : bulb
    ));
  };

  const startSimulation = () => {
    setSimulationState(prev => ({
      ...prev,
      isRunning: true,
      currentCycle: 1,
      totalEnergyUsed: 0,
      cycleStartTime: Date.now(),
      elapsedTime: 0,
    }));
  };

  const stopSimulation = () => {
    setSimulationState(prev => ({
      ...prev,
      isRunning: false,
      currentCycle: 0,
      elapsedTime: 0,
    }));
  };

  const resetSimulation = () => {
    setSimulationState({
      isRunning: false,
      currentCycle: 0,
      totalCycles: 1,
      currentPower: 0,
      totalEnergyUsed: 0,
      cycleStartTime: 0,
      elapsedTime: 0,
    });
    setBulbs(prev => prev.map(bulb => ({ ...bulb, isOn: false })));
  };

  // Update current power and handle cycle completion
  useEffect(() => {
    const currentPower = calculateCurrentPower();
    setSimulationState(prev => ({ ...prev, currentPower }));

    if (simulationState.isRunning) {
      const interval = setInterval(() => {
        const now = Date.now();
        const elapsed = now - simulationState.cycleStartTime;
        const elapsedSeconds = elapsed / 1000;
        
        // Calculate energy used (watt-hours)
        const energyIncrement = (currentPower * (1/3600)); // Convert to watt-hours per second
        
        setSimulationState(prev => ({
          ...prev,
          elapsedTime: elapsed,
          totalEnergyUsed: prev.totalEnergyUsed + energyIncrement,
        }));

        // Check if cycle is complete
        if (elapsed >= CYCLE_DURATION) {
          setSimulationState(prev => ({
            ...prev,
            isRunning: false,
            currentCycle: 0,
            elapsedTime: 0,
          }));
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [calculateCurrentPower, simulationState.isRunning, simulationState.cycleStartTime]);

  const progressPercentage = simulationState.isRunning 
    ? (simulationState.elapsedTime / CYCLE_DURATION) * 100 
    : 0;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Circuit Diagram */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Circuit Diagram</h2>
            <CircuitDiagram 
              bulbs={bulbs} 
              isRunning={simulationState.isRunning}
              onBulbToggle={toggleBulb}
            />
          </div>
        </div>

        {/* Control Panel and Power Meter */}
        <div className="space-y-6">
          <PowerMeter 
            currentPower={simulationState.currentPower}
            totalEnergyUsed={simulationState.totalEnergyUsed}
            voltage={VOLTAGE}
            isRunning={simulationState.isRunning}
            progressPercentage={progressPercentage}
            elapsedTime={simulationState.elapsedTime}
            cycleDuration={CYCLE_DURATION}
          />
          
          <ControlPanel
            bulbs={bulbs}
            simulationState={simulationState}
            onBulbToggle={toggleBulb}
            onStart={startSimulation}
            onStop={stopSimulation}
            onReset={resetSimulation}
          />
        </div>
      </div>
    </div>
  );
};

export default HouseWiringSimulation;