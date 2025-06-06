import React from 'react';
import { Lightbulb, Book, PenTool, Zap } from 'lucide-react';

const TheoryExplanation: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <Book className="mr-2 h-6 w-6 text-blue-600" />
          Thévenin's Theorem Explained
        </h2>
        <p className="text-gray-600">
          Thévenin's theorem is a fundamental concept in electrical engineering that simplifies 
          complex linear circuits for easier analysis. It was formulated by French engineer 
          Léon Charles Thévenin in 1883.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
          <Lightbulb className="mr-2 h-5 w-5 text-amber-500" />
          The Theorem Statement
        </h3>
        <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 mb-4">
          <p className="italic text-gray-700">
            "Any linear electrical network containing voltage sources and resistors can be replaced
            by an equivalent circuit consisting of a voltage source V<sub>th</sub> in series with a resistor R<sub>th</sub>,
            where V<sub>th</sub> is the open-circuit voltage at the terminals, and R<sub>th</sub> is the equivalent
            resistance looking back into the network with all sources replaced by their internal resistances."
          </p>
        </div>
        <p className="text-gray-600">
          In simpler terms, no matter how complex a circuit is, as long as it's linear, you can simplify
          it to just one voltage source and one resistor in series when analyzing from any two terminals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <PenTool className="mr-2 h-5 w-5 text-blue-500" />
            Finding Thévenin Voltage (V<sub>th</sub>)
          </h3>
          <ol className="space-y-4 text-gray-600 list-decimal pl-5">
            <li>
              Remove the load from the original circuit (open circuit the terminals).
            </li>
            <li>
              Measure or calculate the voltage across the open terminals. This is V<sub>th</sub>.
            </li>
          </ol>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              The Thévenin voltage is the potential difference that appears across the terminals when 
              they are open-circuited.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <Zap className="mr-2 h-5 w-5 text-teal-500" />
            Finding Thévenin Resistance (R<sub>th</sub>)
          </h3>
          <ol className="space-y-4 text-gray-600 list-decimal pl-5">
            <li>
              Replace all independent voltage sources with short circuits and all independent current 
              sources with open circuits.
            </li>
            <li>
              Calculate the equivalent resistance between the load terminals. This is R<sub>th</sub>.
            </li>
          </ol>
          <div className="mt-4 p-3 bg-teal-50 rounded-lg">
            <p className="text-sm text-teal-700">
              Alternatively, you can find R<sub>th</sub> by applying a test voltage V<sub>test</sub> at the terminals 
              and measuring the resulting current I<sub>test</sub>. Then R<sub>th</sub> = V<sub>test</sub> / I<sub>test</sub>.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Applications of Thévenin's Theorem</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-800 mb-2">Circuit Analysis</h4>
            <p className="text-sm text-gray-600">
              Simplifies complex networks for easier analysis of load behavior and circuit response.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-800 mb-2">Maximum Power Transfer</h4>
            <p className="text-sm text-gray-600">
              Helps determine the load resistance needed to achieve maximum power transfer.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-800 mb-2">Network Modeling</h4>
            <p className="text-sm text-gray-600">
              Creates equivalent models of complex power distribution networks and electronic circuits.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
        <h3 className="text-lg font-medium text-blue-800 mb-4">Limitations</h3>
        <ul className="space-y-2 text-blue-700 list-disc pl-5">
          <li>Applies only to linear circuits (resistors, capacitors, inductors, linear sources).</li>
          <li>Cannot be used directly with circuits containing non-linear elements like diodes or transistors.</li>
          <li>Time-varying components require more advanced analysis techniques.</li>
        </ul>
      </div>
    </div>
  );
};

export default TheoryExplanation;