import React from 'react';
import { Circuit, ComponentType } from '../utils/circuitUtils';

interface CircuitDiagramProps {
  circuit: Circuit;
}

const CircuitDiagram: React.FC<CircuitDiagramProps> = ({ circuit }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white h-full">
      <div className="relative w-full h-[400px] flex items-center justify-center">
        {/* Main circuit container with grid background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UyZThlYiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

        {/* Voltage Source */}
        <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 -translate-x-1/2">
          <div className="w-16 h-24 border-2 border-red-500 rounded-md bg-white flex flex-col items-center justify-center gap-1 shadow-lg">
            <div className="text-sm font-bold">V1</div>
            <div className="text-xs text-gray-600">{circuit.components[0].value}V</div>
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <div className="w-0.5 h-4 bg-red-500" />
              <div className="w-4 h-0.5 bg-red-500" />
              <div className="w-0.5 h-4 bg-red-500" />
              <div className="w-2 h-2 bg-red-500 rounded-full" />
            </div>
          </div>
        </div>

        {/* Resistors */}
        {circuit.components
          .filter(comp => comp.type === ComponentType.Resistor)
          .map((resistor, index) => (
            <div
              key={resistor.id}
              className={`absolute ${
                index === 0
                  ? 'top-1/4 left-1/2'
                  : index === 1
                  ? 'top-1/2 right-1/4'
                  : 'top-3/4 left-1/2'
              } transform -translate-x-1/2 -translate-y-1/2`}
            >
              <div className="w-24 h-12 border-2 border-blue-500 rounded-md bg-white flex flex-col items-center justify-center gap-1 shadow-lg">
                <div className="text-sm font-bold">{resistor.label}</div>
                <div className="text-xs text-gray-600">{resistor.value}Ω</div>
              </div>
            </div>
          ))}

        {/* Connection Wires */}
        <div className="absolute top-1/4 left-1/3 w-1/6 h-0.5 bg-gray-800" />
        <div className="absolute top-1/4 right-1/3 w-1/6 h-0.5 bg-gray-800" />
        <div className="absolute top-3/4 left-1/3 w-1/6 h-0.5 bg-gray-800" />
        <div className="absolute top-3/4 right-1/3 w-1/6 h-0.5 bg-gray-800" />
        <div className="absolute top-1/4 left-1/3 w-0.5 h-1/2 bg-gray-800" />
        <div className="absolute top-1/4 right-1/3 w-0.5 h-1/2 bg-gray-800" />

        {/* Load Terminals */}
        <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <div className="w-4 h-4 border-2 border-green-500 bg-green-100 rounded-full animate-pulse" />
            <div className="text-xs font-medium text-green-600">Load +</div>
          </div>
        </div>
        <div className="absolute top-1/2 right-1/4 transform translate-y-1/2 translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <div className="w-4 h-4 border-2 border-green-500 bg-green-100 rounded-full animate-pulse" />
            <div className="text-xs font-medium text-green-600">Load -</div>
          </div>
        </div>

        {/* Interactive Elements */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <div className="text-xs text-gray-500">
            • Click components to view details
          </div>
          <div className="text-xs text-gray-500">
            • Green dots indicate load terminals
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircuitDiagram;