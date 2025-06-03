import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Activity, Monitor, DownloadCloud } from 'lucide-react';

const ExperimentPage = () => {
  const [activeTab, setActiveTab] = useState('theory');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        {/* Breadcrumb */}
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-sm text-gray-600 hover:text-blue-700">Home</Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link to="/experiments" className="text-sm text-gray-600 hover:text-blue-700">Experiments</Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-sm text-blue-700 font-medium">Load Flow Analysis</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Experiment Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-800 to-blue-700 p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Load Flow Analysis</h1>
            <p className="mt-2 text-blue-100">
              Learn how to analyze power flow in electrical systems using numerical methods.
            </p>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex border-b">
            <TabButton 
              active={activeTab === 'theory'} 
              onClick={() => setActiveTab('theory')} 
              icon={<BookOpen className="w-4 h-4 mr-2" />}
              label="Theory"
            />
            <TabButton 
              active={activeTab === 'procedure'} 
              onClick={() => setActiveTab('procedure')} 
              icon={<Activity className="w-4 h-4 mr-2" />}
              label="Procedure"
            />
            <TabButton 
              active={activeTab === 'simulator'} 
              onClick={() => setActiveTab('simulator')} 
              icon={<Monitor className="w-4 h-4 mr-2" />}
              label="Simulator"
            />
            <TabButton 
              active={activeTab === 'resources'} 
              onClick={() => setActiveTab('resources')} 
              icon={<DownloadCloud className="w-4 h-4 mr-2" />}
              label="Resources"
            />
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'theory' && <TheoryContent />}
            {activeTab === 'procedure' && <ProcedureContent />}
            {activeTab === 'simulator' && <SimulatorContent />}
            {activeTab === 'resources' && <ResourcesContent />}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Link 
            to="/experiments" 
            className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Experiments
          </Link>
          <Link 
            to="/experiments/fault-analysis" 
            className="inline-flex items-center px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md transition-colors"
          >
            Next Experiment
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        {/* Related Experiments */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Related Experiments</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RelatedExperimentCard 
              title="Fault Analysis" 
              slug="fault-analysis"
              description="Understand symmetrical and unsymmetrical faults in power systems."
            />
            <RelatedExperimentCard 
              title="Stability Analysis" 
              slug="stability-analysis"
              description="Study the stability of power systems under various operating conditions."
            />
            <RelatedExperimentCard 
              title="Economic Load Dispatch" 
              slug="economic-load-dispatch"
              description="Learn optimal power distribution to minimize generation cost."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }) => (
  <button
    className={`flex items-center px-4 py-3 border-b-2 font-medium text-sm focus:outline-none transition-colors ${
      active
        ? 'border-blue-700 text-blue-700'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`}
    onClick={onClick}
  >
    {icon}
    {label}
  </button>
);

const RelatedExperimentCard = ({ title, description, slug }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
    <h4 className="text-lg font-semibold text-blue-800 mb-2">{title}</h4>
    <p className="text-gray-600 text-sm mb-3">{description}</p>
    <Link 
      to={`/experiments/${slug}`} 
      className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
    >
      View Experiment
      <ArrowRight className="ml-1 w-3 h-3" />
    </Link>
  </div>
);

const TheoryContent = () => (
  <div className="prose max-w-none">
    <h2 className="text-2xl font-bold text-blue-900 mb-4">Introduction to Load Flow Analysis</h2>
    <p>
      Load flow analysis (also known as power flow analysis) is a numerical analysis of the flow of electric power 
      in an interconnected system. It is an important tool involving numerical analysis applied to a power system.
    </p>
    <p>
      In normal operating conditions, power systems operate in a balanced condition. The aim of power flow analysis is to:
    </p>
    <ul className="list-disc pl-6 space-y-2 my-4">
      <li>Determine the voltage at each bus</li>
      <li>Calculate real and reactive power flows in lines</li>
      <li>Identify line losses in the system</li>
      <li>Find the optimal economic operation point</li>
    </ul>
    
    <h3 className="text-xl font-bold text-blue-900 mt-6 mb-3">Mathematical Formulation</h3>
    <p>
      For each bus i in an N-bus system, we can write the complex power injection as:
    </p>
    <div className="bg-gray-50 p-4 rounded-md my-4 font-mono text-sm">
      S<sub>i</sub> = P<sub>i</sub> + jQ<sub>i</sub> = V<sub>i</sub> ∑<sub>k=1</sub><sup>N</sup> Y<sub>ik</sub>* V<sub>k</sub>*
    </div>
    <p>
      Where:
    </p>
    <ul className="list-disc pl-6 space-y-1 my-3">
      <li>S<sub>i</sub> is the complex power injection at bus i</li>
      <li>P<sub>i</sub> is the real power injection at bus i</li>
      <li>Q<sub>i</sub> is the reactive power injection at bus i</li>
      <li>V<sub>i</sub> is the complex voltage at bus i</li>
      <li>Y<sub>ik</sub> is the element of the bus admittance matrix</li>
    </ul>
    
    <h3 className="text-xl font-bold text-blue-900 mt-6 mb-3">Numerical Methods</h3>
    <p>
      Several numerical methods are used to solve the load flow problem:
    </p>
    <ul className="list-disc pl-6 space-y-2 my-4">
      <li><strong>Gauss-Seidel Method:</strong> An iterative method that is simple but may have slow convergence for large systems.</li>
      <li><strong>Newton-Raphson Method:</strong> A powerful iterative method with quadratic convergence. It's widely used for its reliability and speed.</li>
      <li><strong>Fast Decoupled Load Flow:</strong> A simplified version of Newton-Raphson that takes advantage of the weak coupling between real power and voltage magnitude.</li>
    </ul>
    
    <h3 className="text-xl font-bold text-blue-900 mt-6 mb-3">Bus Classification</h3>
    <p>
      Power system buses are classified into three types:
    </p>
    <ul className="list-disc pl-6 space-y-2 my-4">
      <li><strong>Slack Bus (Swing Bus):</strong> Voltage magnitude and angle are specified. It balances the power in the system.</li>
      <li><strong>PV Bus (Generator Bus):</strong> Real power and voltage magnitude are specified.</li>
      <li><strong>PQ Bus (Load Bus):</strong> Real and reactive powers are specified.</li>
    </ul>
    
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
      <h4 className="text-lg font-semibold text-blue-800 mb-2">Key Takeaways</h4>
      <p className="text-gray-700">
        Load flow analysis is essential for power system planning, operation, and control. It helps engineers 
        ensure that the system operates within acceptable voltage limits and that transmission lines are not overloaded.
      </p>
    </div>
  </div>
);

const ProcedureContent = () => (
  <div>
    <h2 className="text-2xl font-bold text-blue-900 mb-4">Experimental Procedure</h2>
    
    <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <h3 className="text-lg font-semibold text-yellow-800 mb-1">Objectives</h3>
      <p className="text-gray-700">
        In this experiment, you will learn how to perform a load flow analysis on a simple power system using the Newton-Raphson method.
      </p>
    </div>
    
    <ol className="space-y-6 mb-8">
      <li className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-start">
          <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold mr-3">1</span>
          <div>
            <h4 className="text-lg font-medium text-blue-900">Setup the Power System Model</h4>
            <p className="mt-1 text-gray-600">
              Begin by configuring the system parameters:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
              <li>Enter the number of buses in the system</li>
              <li>Specify the bus types (PQ, PV, Slack)</li>
              <li>Input line impedance data</li>
              <li>Define generation and load values</li>
            </ul>
          </div>
        </div>
      </li>
      
      <li className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-start">
          <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold mr-3">2</span>
          <div>
            <h4 className="text-lg font-medium text-blue-900">Form the Bus Admittance Matrix</h4>
            <p className="mt-1 text-gray-600">
              The simulator will automatically construct the Y-bus matrix from the line data you provided.
              The matrix shows the admittance relationships between buses in the network.
            </p>
          </div>
        </div>
      </li>
      
      <li className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-start">
          <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold mr-3">3</span>
          <div>
            <h4 className="text-lg font-medium text-blue-900">Initialize Variables</h4>
            <p className="mt-1 text-gray-600">
              Set initial values for the voltage magnitudes and angles at each bus. Typically:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
              <li>All voltage magnitudes = 1.0 p.u. (except specified buses)</li>
              <li>All voltage angles = 0.0 radians (except for the slack bus)</li>
            </ul>
          </div>
        </div>
      </li>
      
      <li className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-start">
          <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold mr-3">4</span>
          <div>
            <h4 className="text-lg font-medium text-blue-900">Run the Newton-Raphson Algorithm</h4>
            <p className="mt-1 text-gray-600">
              Click the "Run Simulation" button to start the iterative Newton-Raphson process:
            </p>
            <ol className="list-decimal pl-6 mt-2 space-y-1 text-gray-600">
              <li>Calculate power mismatches</li>
              <li>Construct the Jacobian matrix</li>
              <li>Solve for voltage corrections</li>
              <li>Update voltage values</li>
              <li>Check for convergence</li>
            </ol>
          </div>
        </div>
      </li>
      
      <li className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-start">
          <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold mr-3">5</span>
          <div>
            <h4 className="text-lg font-medium text-blue-900">Analyze the Results</h4>
            <p className="mt-1 text-gray-600">
              After convergence, examine:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
              <li>Voltage profile at each bus</li>
              <li>Real and reactive power flows in all lines</li>
              <li>System losses</li>
              <li>Generation and load balance</li>
            </ul>
          </div>
        </div>
      </li>
    </ol>
    
    <div className="bg-green-50 border-l-4 border-green-400 p-4 my-6">
      <h3 className="text-lg font-semibold text-green-800 mb-2">Expected Outcomes</h3>
      <p className="text-gray-700">
        By the end of this experiment, you should be able to:
      </p>
      <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
        <li>Understand the process of load flow analysis</li>
        <li>Interpret voltage profiles and power flows</li>
        <li>Analyze system performance under different loading conditions</li>
        <li>Identify potential voltage violations or line overloads</li>
      </ul>
    </div>
  </div>
);

const SimulatorContent = () => (
  <div>
    <h2 className="text-2xl font-bold text-blue-900 mb-6">Interactive Simulator</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Input Panel */}
      <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">System Parameters</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Buses
            </label>
            <input 
              type="number" 
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              defaultValue="3"
              min="2"
              max="10"
            />
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-md font-medium text-gray-800 mb-3">Bus Data</h4>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bus</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">V (p.u.)</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">θ (deg)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">1</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm">
                        <option>Slack</option>
                        <option>PV</option>
                        <option>PQ</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      <input type="number" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm" defaultValue="1.0" step="0.01" />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      <input type="number" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm" defaultValue="0" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">2</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm">
                        <option>Slack</option>
                        <option selected>PV</option>
                        <option>PQ</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      <input type="number" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm" defaultValue="1.05" step="0.01" />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      <input type="number" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm" defaultValue="0" disabled />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">3</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm">
                        <option>Slack</option>
                        <option>PV</option>
                        <option selected>PQ</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      <input type="number" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm" defaultValue="1.0" step="0.01" disabled />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      <input type="number" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm" defaultValue="0" disabled />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-md font-medium text-gray-800 mb-3">Line Data</h4>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">R (p.u.)</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">X (p.u.)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      <input type="number" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm" defaultValue="1" min="1" max="3" />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      <input type="number" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm" defaultValue="2" min="1" max="3" />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      <input type="number" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm" defaultValue="0.05" step="0.01" />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      <input type="number" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm" defaultValue="0.25" step="0.01" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      <input type="number" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm" defaultValue="1" min="1" max="3" />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      <input type="number" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm" defaultValue="3" min="1" max="3" />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      <input type="number" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm" defaultValue="0.08" step="0.01" />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      <input type="number" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm" defaultValue="0.40" step="0.01" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      <input type="number" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm" defaultValue="2" min="1" max="3" />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      <input type="number" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm" defaultValue="3" min="1" max="3" />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      <input type="number" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm" defaultValue="0.10" step="0.01" />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      <input type="number" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm" defaultValue="0.30" step="0.01" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="flex justify-center pt-4">
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Run Simulation
            </button>
          </div>
        </div>
      </div>
      
      {/* Results Panel */}
      <div className="lg:col-span-2 space-y-6">
        {/* Network Diagram */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Network Diagram</h3>
          <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-md flex items-center justify-center">
            <div className="text-gray-400 text-sm">
              Network diagram will be displayed here
            </div>
          </div>
        </div>
        
        {/* Results Tables */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Simulation Results</h3>
          
          <div className="mb-4">
            <h4 className="text-md font-medium text-gray-800 mb-2">Bus Voltages</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bus</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">V (p.u.)</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">θ (deg)</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P (MW)</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Q (MVAR)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">1</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">Slack</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">1.000</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">0.00</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">2.566</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">1.246</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">2</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">PV</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">1.050</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">-2.81</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">0.500</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">0.334</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">3</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">PQ</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">0.984</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">-4.93</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">-2.000</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">-1.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-gray-800 mb-2">Line Flows</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P (MW)</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Q (MVAR)</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loss (MW)</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loading (%)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">1</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">2</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">0.886</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">0.453</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">0.009</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">34.2</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">1</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">3</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">1.680</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">0.793</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">0.057</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">62.1</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">2</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">3</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">0.377</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">0.123</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">0.003</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">12.8</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ResourcesContent = () => (
  <div>
    <h2 className="text-2xl font-bold text-blue-900 mb-6">Additional Resources</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Reference Materials */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Reference Materials</h3>
        <ul className="space-y-3">
          <li>
            <a href="#" className="flex items-start p-3 hover:bg-gray-50 rounded-md transition-colors">
              <DownloadCloud className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <span className="block font-medium text-blue-700">Load Flow Analysis - Lecture Notes</span>
                <span className="text-sm text-gray-500">PDF, 2.3 MB</span>
              </div>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-start p-3 hover:bg-gray-50 rounded-md transition-colors">
              <DownloadCloud className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <span className="block font-medium text-blue-700">Newton-Raphson Method - Detailed Guide</span>
                <span className="text-sm text-gray-500">PDF, 1.7 MB</span>
              </div>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-start p-3 hover:bg-gray-50 rounded-md transition-colors">
              <DownloadCloud className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <span className="block font-medium text-blue-700">IEEE 14-Bus Test System Data</span>
                <span className="text-sm text-gray-500">Excel, 156 KB</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
      
      {/* Video Tutorials */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Video Tutorials</h3>
        <ul className="space-y-3">
          <li>
            <a href="#" className="flex items-start p-3 hover:bg-gray-50 rounded-md transition-colors">
              <div className="h-12 w-20 bg-gray-100 flex-shrink-0 rounded mr-3">
                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded">
                  <span className="text-xs text-gray-500">Video</span>
                </div>
              </div>
              <div>
                <span className="block font-medium text-blue-700">Introduction to Power Flow Analysis</span>
                <span className="text-sm text-gray-500">Duration: 12:34</span>
              </div>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-start p-3 hover:bg-gray-50 rounded-md transition-colors">
              <div className="h-12 w-20 bg-gray-100 flex-shrink-0 rounded mr-3">
                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded">
                  <span className="text-xs text-gray-500">Video</span>
                </div>
              </div>
              <div>
                <span className="block font-medium text-blue-700">Solving Load Flow Using Newton-Raphson Method</span>
                <span className="text-sm text-gray-500">Duration: 18:45</span>
              </div>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-start p-3 hover:bg-gray-50 rounded-md transition-colors">
              <div className="h-12 w-20 bg-gray-100 flex-shrink-0 rounded mr-3">
                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded">
                  <span className="text-xs text-gray-500">Video</span>
                </div>
              </div>
              <div>
                <span className="block font-medium text-blue-700">Analyzing Power System Stability</span>
                <span className="text-sm text-gray-500">Duration: 22:10</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
      
      {/* Quiz Section */}
      <div className="md:col-span-2 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Self-Assessment Quiz</h3>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-md">
            <p className="font-medium text-gray-800 mb-3">1. Which of the following is NOT a type of bus in power system analysis?</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="radio" id="q1a" name="q1" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                <label htmlFor="q1a" className="ml-2 block text-sm text-gray-700">Slack Bus (Swing Bus)</label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="q1b" name="q1" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                <label htmlFor="q1b" className="ml-2 block text-sm text-gray-700">PV Bus (Generator Bus)</label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="q1c" name="q1" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                <label htmlFor="q1c" className="ml-2 block text-sm text-gray-700">PQ Bus (Load Bus)</label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="q1d" name="q1" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                <label htmlFor="q1d" className="ml-2 block text-sm text-gray-700">QV Bus (Reactive Bus)</label>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-md">
            <p className="font-medium text-gray-800 mb-3">2. Which method has quadratic convergence characteristics for load flow analysis?</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="radio" id="q2a" name="q2" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                <label htmlFor="q2a" className="ml-2 block text-sm text-gray-700">Gauss-Seidel method</label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="q2b" name="q2" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                <label htmlFor="q2b" className="ml-2 block text-sm text-gray-700">Newton-Raphson method</label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="q2c" name="q2" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                <label htmlFor="q2c" className="ml-2 block text-sm text-gray-700">Fast Decoupled method</label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="q2d" name="q2" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                <label htmlFor="q2d" className="ml-2 block text-sm text-gray-700">Jacobi method</label>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-md">
            <p className="font-medium text-gray-800 mb-3">3. What is specified at a PV bus?</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="radio" id="q3a" name="q3" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                <label htmlFor="q3a" className="ml-2 block text-sm text-gray-700">Voltage magnitude and angle</label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="q3b" name="q3" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                <label htmlFor="q3b" className="ml-2 block text-sm text-gray-700">Real and reactive power</label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="q3c" name="q3" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                <label htmlFor="q3c" className="ml-2 block text-sm text-gray-700">Real power and voltage magnitude</label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="q3d" name="q3" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                <label htmlFor="q3d" className="ml-2 block text-sm text-gray-700">Reactive power and voltage angle</label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Submit Answers
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ExperimentPage;