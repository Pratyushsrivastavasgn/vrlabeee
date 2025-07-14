import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TestTube, BookOpen, Award } from 'lucide-react';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Analog Electronics Lab
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Enhance your learning experience with interactive simulations and virtual experiments
              in the field of Electrical and Electronics Engineering.
            </p>
            <Link 
              to="/experiments" 
              className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold px-6 py-3 rounded-md transition-colors"
            >
              Start Experimenting
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
            Learning Made Interactive
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-md transition-transform hover:transform hover:scale-105">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-800 rounded-full mb-6 mx-auto">
                <TestTube className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Virtual Experiments</h3>
              <p className="text-gray-600 text-center">
                Conduct experiments virtually with realistic simulations that mirror real-world electrical systems.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-md transition-transform hover:transform hover:scale-105">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-800 rounded-full mb-6 mx-auto">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Comprehensive Theory</h3>
              <p className="text-gray-600 text-center">
                Access detailed theoretical content to understand the underlying principles before performing experiments.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-md transition-transform hover:transform hover:scale-105">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-800 rounded-full mb-6 mx-auto">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Self-Assessment</h3>
              <p className="text-gray-600 text-center">
                Test your understanding with quizzes and self-assessment tools integrated with each experiment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experiments Preview */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-900">
            Available Experiments
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Explore our collection of virtual experiments designed to enhance your understanding of Power System Analysis
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiments.map((experiment, index) => (
              <ExperimentCard key={index} {...experiment} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/experiments"
              className="inline-flex items-center text-blue-700 hover:text-blue-900 font-semibold"
            >
              View All Experiments
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

interface ExperimentCardProps {
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
}

const ExperimentCard: React.FC<ExperimentCardProps> = ({ title, description, imageUrl, slug }) => (
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
        to={`/experiments/${slug}`}
        className="inline-flex items-center text-blue-700 hover:text-blue-900 font-medium"
      >
        Start Experiment
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  </div>
);

// Sample experiment data
const experiments = [
  {
    title: "Load Flow Analysis",
    description: "Learn how to analyze power flow in electrical systems using numerical methods.",
    imageUrl: "https://images.pexels.com/photos/577514/pexels-photo-577514.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    slug: "load-flow-analysis"
  },
  {
    title: "Fault Analysis",
    description: "Understand symmetrical and unsymmetrical faults in power systems.",
    imageUrl: "https://images.pexels.com/photos/247763/pexels-photo-247763.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    slug: "fault-analysis"
  },
  {
    title: "Stability Analysis",
    description: "Study the stability of power systems under various operating conditions.",
    imageUrl: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    slug: "stability-analysis"
  }
];

export default HomePage;