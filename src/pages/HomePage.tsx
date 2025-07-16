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
              Electrical & Electronics Lab
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Enhance your learning experience with interactive simulations and virtual experiments in the field of Electrical and Electronics Engineering.
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
            Explore our collection of virtual experiments covering fundamental circuit theorems and practical wiring systems.
          </p>

          {/* We only show the first 3 experiments on the home page for a preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiments.slice(0, 3).map((experiment) => (
              <ExperimentCard key={experiment.slug} {...experiment} />
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
      <p className="text-gray-600 mb-4 h-24 overflow-hidden">{description}</p>
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

// Updated experiment data
const experiments = [
  {
    slug: 'experiment1',
    title: 'Verification of Kirchhoff’s Voltage Law (KVL)',
    description: 'This experiment verifies Kirchhoff’s Voltage Law by measuring and summing voltages in a closed loop. It confirms that the algebraic sum of all voltages in a closed circuit is zero, validating the principle of energy conservation.',
    imageUrl: 'https://m.media-amazon.com/images/I/51-nl0ic6NL.jpg'
  },
  {
    slug: 'experiment2',
    title: 'Verification of Thevenin’s Theorem',
    description: 'This experiment validates Thevenin’s Theorem by replacing a complex linear circuit with an equivalent voltage source and series resistance. It simplifies circuit analysis and confirms the equivalence of original and reduced circuits.',
    imageUrl: 'https://i.ytimg.com/vi/ts9iU65k_1E/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGHIgRCgxMA8=&rs=AOn4CLDclAyrnNY4L2ugIPJIzzzRnixhcQ'
  },
  {
    slug: 'experiment3',
    title: 'House Wiring Demonstration',
    description: 'This experiment demonstrates the layout and working of typical domestic wiring systems. It includes the connection of switches, sockets, bulbs, and distribution boards, emphasizing safety, phase-neutral wiring, and load control.',
    imageUrl: 'https://i.ytimg.com/vi/ztiHeYosl30/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCSx3sAvFhiijuwVb4TROi1ptrrIw'
  },
  {
    slug: 'experiment4',
    title: 'Fluorescent Lamp Wiring',
    description: 'This experiment illustrates the operation and wiring of a fluorescent lamp circuit. It explains the roles of choke, starter, and tube light in initiating and sustaining illumination through gas discharge.',
    imageUrl: 'https://en.pimg.jp/071/394/227/1/71394227.jpg'
  },
  {
    slug: 'experiment5',
    title: 'Staircase Wiring System',
    description: 'This experiment simulates staircase wiring used to control a single light from two different locations using two-way switches. It helps understand parallel control in household circuits.',
    imageUrl: 'https://i0.wp.com/industrialgyan.com/wp-content/uploads/2023/06/image_xu5f99Z.png?fit=628%2C402&ssl=1'
  },
];

export default HomePage;