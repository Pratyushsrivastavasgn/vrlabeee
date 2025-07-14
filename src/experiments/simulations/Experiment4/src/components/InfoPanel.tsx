import React from 'react';
import { X, Lightbulb, Zap, AlertTriangle, BookOpen } from 'lucide-react';

interface InfoPanelProps {
  selectedCircuit: 'led' | 'fluorescent';
  darkMode: boolean;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ selectedCircuit, darkMode, onClose }) => {
  return (
    <div className={`rounded-xl border-2 p-6 ${
      darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
    } shadow-xl`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
          Circuit Information
        </h3>
        <button
          onClick={onClose}
          className={`p-1 rounded-lg ${
            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {selectedCircuit === 'led' ? (
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Lightbulb className="w-5 h-5 text-red-500 mt-1" />
            <div>
              <h4 className="font-medium">LED Circuit</h4>
              <p className="text-sm text-gray-600 mt-1">
                A simple circuit consisting of an AC supply, switch, and LED. The LED converts electrical energy directly into light through electroluminescence.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <h5 className="font-medium text-blue-600 mb-2">Advantages</h5>
              <ul className="text-sm space-y-1">
                <li>• Energy efficient</li>
                <li>• Long lifespan</li>
                <li>• Instant on/off</li>
                <li>• No mercury</li>
                <li>• Low heat generation</li>
              </ul>
            </div>

            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
              <h5 className="font-medium text-green-600 mb-2">Applications</h5>
              <ul className="text-sm space-y-1">
                <li>• Home lighting</li>
                <li>• Street lights</li>
                <li>• Display screens</li>
                <li>• Indicator lights</li>
                <li>• Automotive lighting</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Zap className="w-5 h-5 text-purple-500 mt-1" />
            <div>
              <h4 className="font-medium">Fluorescent Tube Circuit</h4>
              <p className="text-sm text-gray-600 mt-1">
                A circuit that uses a choke (ballast) to control current and optionally a starter to ignite mercury vapor in the tube, which produces UV light that is converted to visible light by phosphor coating.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="font-medium">How it works:</h5>
            <ol className="text-sm space-y-2 list-decimal list-inside">
              <li>When switched on, current flows through the choke</li>
              <li>If present, the starter creates a high voltage pulse to ionize the mercury vapor</li>
              <li>Modern circuits can operate without a starter using electronic ballasts</li>
              <li>The choke limits current once the tube is lit</li>
              <li>UV light from mercury vapor excites phosphor coating</li>
              <li>Phosphor coating converts UV to visible light</li>
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
              <h5 className="font-medium text-purple-600 mb-2">Components</h5>
              <ul className="text-sm space-y-1">
                <li>• Choke/Ballast (Required)</li>
                <li>• Starter (Optional)</li>
                <li>• Fluorescent tube</li>
                <li>• Mercury vapor</li>
                <li>• Phosphor coating</li>
              </ul>
            </div>

            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
              <h5 className="font-medium text-green-600 mb-2">Advantages</h5>
              <ul className="text-sm space-y-1">
                <li>• High efficiency</li>
                <li>• Even light distribution</li>
                <li>• Lower cost per lumen</li>
                <li>• Available in various colors</li>
                <li>• Can work without starter</li>
              </ul>
            </div>

            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-red-50'}`}>
              <h5 className="font-medium text-red-600 mb-2">
                <AlertTriangle className="w-4 h-4 inline mr-1" />
                Considerations
              </h5>
              <ul className="text-sm space-y-1">
                <li>• Contains mercury</li>
                <li>• May need warm-up time</li>
                <li>• Sensitive to temperature</li>
                <li>• Proper disposal required</li>
              </ul>
            </div>
          </div>

          <div className={`p-4 rounded-lg border ${
            darkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'
          }`}>
            <h5 className="font-medium text-blue-600 mb-2">
              💡 Starter Information
            </h5>
            <p className="text-sm text-blue-700">
              Traditional fluorescent circuits use a starter to provide the initial high voltage needed to ionize the gas. 
              Modern electronic ballasts can start the tube without a separate starter component, making the circuit simpler and more reliable.
            </p>
          </div>
        </div>
      )}

      <div className={`mt-6 p-4 rounded-lg border ${
        darkMode ? 'bg-gray-700 border-gray-600' : 'bg-yellow-50 border-yellow-200'
      }`}>
        <h5 className="font-medium text-yellow-600 mb-2">
          <AlertTriangle className="w-4 h-4 inline mr-1" />
          Safety Notes
        </h5>
        <ul className="text-sm space-y-1 text-yellow-700">
          <li>• Always turn off power before working on circuits</li>
          <li>• Use proper electrical safety equipment</li>
          <li>• Have qualified electricians install lighting circuits</li>
          <li>• Dispose of fluorescent tubes properly due to mercury content</li>
        </ul>
      </div>
    </div>
  );
};

export default InfoPanel;