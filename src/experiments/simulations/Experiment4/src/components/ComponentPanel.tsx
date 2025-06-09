import React from 'react';
import { Activity, AlertCircle, CheckCircle, Zap } from 'lucide-react';

interface ComponentPanelProps {
  selectedCircuit: 'led' | 'fluorescent';
  currentFlow: string[];
  darkMode: boolean;
  circuitState: {
    acSupply: boolean;
    starter: boolean;
    choke: boolean;
    led: boolean;
    tube: boolean;
    switch: boolean;
  };
}

const ComponentPanel: React.FC<ComponentPanelProps> = ({
  selectedCircuit,
  currentFlow,
  darkMode,
  circuitState
}) => {
  const ComponentStatus: React.FC<{
    name: string;
    id: string;
    description: string;
    status: 'active' | 'inactive' | 'required' | 'optional';
  }> = ({ name, id, description, status }) => {
    const isActive = currentFlow.includes(id);
    const isOptional = status === 'optional';
    
    return (
      <div className={`p-4 rounded-lg border-2 transition-all ${
        isActive
          ? 'bg-green-50 border-green-200'
          : status === 'required'
            ? 'bg-yellow-50 border-yellow-200'
            : isOptional
              ? 'bg-blue-50 border-blue-200'
              : darkMode
                ? 'bg-gray-700 border-gray-600'
                : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium">{name}</h4>
          {isActive ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : status === 'required' ? (
            <AlertCircle className="w-5 h-5 text-yellow-600" />
          ) : isOptional ? (
            <div className="w-5 h-5 rounded-full border-2 border-blue-400 bg-blue-100" />
          ) : (
            <div className={`w-5 h-5 rounded-full border-2 ${
              darkMode ? 'border-gray-500' : 'border-gray-300'
            }`} />
          )}
        </div>
        <p className={`text-sm ${
          isActive ? 'text-green-700' : darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {description}
        </p>
        {isActive && (
          <div className="mt-2 flex items-center text-xs text-green-600">
            <Activity className="w-3 h-3 mr-1 animate-pulse" />
            Current flowing
          </div>
        )}
        {isOptional && !isActive && (
          <div className="mt-2 flex items-center text-xs text-blue-600">
            <span>Optional component</span>
          </div>
        )}
      </div>
    );
  };

  const ledComponents = [
    {
      name: 'AC Supply',
      id: 'ac-supply',
      description: 'Provides 230V alternating current to power the circuit.',
      status: 'required' as const
    },
    {
      name: 'Switch',
      id: 'switch',
      description: 'Controls the flow of current through the circuit.',
      status: 'required' as const
    },
    {
      name: 'LED',
      id: 'led',
      description: 'Light Emitting Diode - converts electrical energy to light.',
      status: 'required' as const
    }
  ];

  const fluorescentComponents = [
    {
      name: 'AC Supply',
      id: 'ac-supply',
      description: 'Provides 230V alternating current to power the circuit.',
      status: 'required' as const
    },
    {
      name: 'Switch',
      id: 'switch',
      description: 'Controls the flow of current through the circuit.',
      status: 'required' as const
    },
    {
      name: 'Choke/Ballast',
      id: 'choke',
      description: 'Limits current and provides high voltage for tube ignition.',
      status: 'required' as const
    },
    {
      name: 'Starter',
      id: 'starter',
      description: 'Provides initial high voltage to ionize gas in the tube. Can be bypassed in modern circuits.',
      status: circuitState.starter ? 'required' as const : 'optional' as const
    },
    {
      name: 'Fluorescent Tube',
      id: 'tube',
      description: 'Contains mercury vapor that produces UV light, converted to visible light by phosphor coating.',
      status: 'required' as const
    }
  ];

  const components = selectedCircuit === 'led' ? ledComponents : fluorescentComponents;

  return (
    <div className={`rounded-xl border-2 p-6 ${
      darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
    } shadow-xl`}>
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Zap className="w-5 h-5 mr-2 text-blue-600" />
        Component Status
      </h3>

      <div className="space-y-4">
        {components.map((component) => (
          <ComponentStatus
            key={component.id}
            name={component.name}
            id={component.id}
            description={component.description}
            status={component.status}
          />
        ))}
      </div>

      {/* Circuit Analysis */}
      <div className={`mt-6 p-4 rounded-lg ${
        darkMode ? 'bg-gray-700' : 'bg-blue-50'
      } border border-blue-200`}>
        <h4 className="font-medium mb-2 flex items-center">
          <Activity className="w-4 h-4 mr-2 text-blue-600" />
          Circuit Analysis
        </h4>
        
        {currentFlow.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm text-green-600 font-medium">
              ✓ Circuit is complete and functional
            </p>
            <p className="text-xs text-gray-600">
              Current path: {currentFlow.map(id => {
                const component = components.find(c => c.id === id);
                return component?.name;
              }).filter(Boolean).join(' → ')}
            </p>
            {selectedCircuit === 'fluorescent' && !circuitState.starter && (
              <p className="text-xs text-blue-600">
                ℹ️ Operating without starter (modern configuration)
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-red-600 font-medium">
              ✗ Circuit is incomplete
            </p>
            <p className="text-xs text-gray-600">
              {selectedCircuit === 'fluorescent' 
                ? 'Ensure AC supply, switch, choke, and tube are connected. Starter is optional.'
                : 'Ensure all components are connected and powered on.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentPanel;