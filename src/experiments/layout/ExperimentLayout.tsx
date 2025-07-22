import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Activity, Monitor, HelpCircle, ExternalLink } from 'lucide-react';
interface ExperimentLayoutProps {
  title: string;
  description: string;
  experiment: {
    theory: React.ReactNode;
    procedure: React.ReactNode;
    simulation: React.ReactNode;
    quiz: React.ReactNode;
  };
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon, label }) => (
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

const ExperimentLayout: React.FC<ExperimentLayoutProps> = ({ title, description, experiment }) => {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-800 to-blue-700 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white">{title}</h1>
          <p className="mt-2 text-blue-100">{description}</p>
        </div>
        {/* Tab Navigation */}
        <div className="overflow-x-auto whitespace-nowrap border-b scrollbar-hide">
          <div className="flex w-max">
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
              active={activeTab === 'simulation'} 
              onClick={() => setActiveTab('simulation')} 
              icon={<Monitor className="w-4 h-4 mr-2" />}
              label="Simulation"
            />
            <TabButton 
              active={activeTab === 'quiz'} 
              onClick={() => setActiveTab('quiz')} 
              icon={<HelpCircle className="w-4 h-4 mr-2" />}
              label="Quiz"
            />
          </div>
        </div>
        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'theory' && experiment.theory}
          {activeTab === 'procedure' && experiment.procedure}
          {activeTab === 'simulation' && (
            <div className="relative">
              {experiment.simulation}
            </div>
          )}
          {activeTab === 'quiz' && experiment.quiz}
        </div>
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 p-6 pt-0">
          <Link 
            to="/experiments" 
            className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Experiments
          </Link>
          <a 
            href="https://your-google-form-link-goes-here" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            Provide Feedback
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExperimentLayout;
