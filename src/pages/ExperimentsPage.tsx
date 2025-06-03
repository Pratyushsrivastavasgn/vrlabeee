import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { experiments } from '../data/experiments';

const ExperimentsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">Virtual Experiments</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiments.map((experiment) => (
          <ExperimentCard key={experiment.id} {...experiment} />
        ))}
      </div>
    </div>
  );
};

const ExperimentCard = ({ id, title, description, imageUrl }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div className="h-48 bg-blue-200 bg-opacity-30">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-3 text-blue-900">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        to={`/experiments/${id}`}
        className="inline-flex items-center text-blue-700 hover:text-blue-900 font-medium"
      >
        Start Experiment
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  </div>
);

export default ExperimentsPage;