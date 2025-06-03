import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';

const TheoryPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">Power System Analysis - Theoretical Foundations</h1>
      
      {/* Introduction */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Introduction</h2>
        <p className="text-gray-700 mb-4">
          Power system analysis is a fundamental discipline in electrical engineering that deals with the study of 
          electrical power systems in normal steady-state operation. This section provides theoretical background 
          for all the experiments available in this virtual lab.
        </p>
        <p className="text-gray-700">
          The major components of a power system include generators, transformers, transmission lines, 
          and loads. Understanding how these components interact with each other is essential for ensuring 
          the reliable, efficient, and safe operation of power systems.
        </p>
      </div>
      
      {/* Theory Topics List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {theoryTopics.map((topic, index) => (
          <TheoryTopicCard key={index} {...topic} />
        ))}
      </div>
      
      {/* Featured Topic */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-700 rounded-lg shadow-lg overflow-hidden mb-10">
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Featured Topic: Newton-Raphson Method</h2>
          <p className="text-blue-100 mb-6">
            The Newton-Raphson method is one of the most powerful and widely used numerical techniques for 
            solving load flow problems in power system analysis. It offers quadratic convergence, which means 
            the error is approximately squared with each iteration.
          </p>
          <Link 
            to="/theory/newton-raphson" 
            className="inline-flex items-center bg-white text-blue-800 font-medium px-5 py-2 rounded-md hover:bg-blue-50 transition-colors"
          >
            Read More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
      
      {/* Recommended Reading */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Recommended Reading</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedReading.map((book, index) => (
            <BookCard key={index} {...book} />
          ))}
        </div>
      </div>
    </div>
  );
};

const TheoryTopicCard = ({ title, description, icon, slug }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
    <div className="p-6">
      <div className="flex items-center mb-3">
        {icon}
        <h3 className="text-xl font-semibold text-blue-800 ml-2">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        to={`/theory/${slug}`}
        className="inline-flex items-center text-blue-700 hover:text-blue-900 font-medium"
      >
        Read More
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  </div>
);

const BookCard = ({ title, author, coverUrl }) => (
  <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <div className="h-48 bg-gray-200">
      <img src={coverUrl} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-blue-800 mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">by {author}</p>
    </div>
  </div>
);

// Theory Topics Data
const theoryTopics = [
  {
    title: "Load Flow Analysis",
    description: "Learn about the numerical analysis of power flow in electrical power systems under steady-state conditions.",
    icon: <BookOpen className="h-6 w-6 text-blue-700" />,
    slug: "load-flow-analysis"
  },
  {
    title: "Fault Analysis",
    description: "Understand how to analyze symmetrical and unsymmetrical faults in power systems.",
    icon: <BookOpen className="h-6 w-6 text-blue-700" />,
    slug: "fault-analysis"
  },
  {
    title: "Power System Stability",
    description: "Study the ability of a power system to maintain synchronism when subjected to disturbances.",
    icon: <BookOpen className="h-6 w-6 text-blue-700" />,
    slug: "stability-analysis"
  },
  {
    title: "Economic Operation",
    description: "Explore how to distribute generation among units to minimize total operating cost.",
    icon: <BookOpen className="h-6 w-6 text-blue-700" />,
    slug: "economic-operation"
  },
  {
    title: "Power System Protection",
    description: "Learn about protective relaying systems designed to detect and isolate faults.",
    icon: <BookOpen className="h-6 w-6 text-blue-700" />,
    slug: "protection-systems"
  },
  {
    title: "HVDC Transmission",
    description: "Understand the principles of high-voltage direct current transmission systems.",
    icon: <BookOpen className="h-6 w-6 text-blue-700" />,
    slug: "hvdc-transmission"
  }
];

// Recommended Reading Data
const recommendedReading = [
  {
    title: "Power System Analysis and Design",
    author: "J. Duncan Glover, Mulukutla S. Sarma, Thomas Overbye",
    coverUrl: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    title: "Power System Analysis",
    author: "Hadi Saadat",
    coverUrl: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    title: "Electric Power Systems: Analysis and Control",
    author: "Fabio Saccomanno",
    coverUrl: "https://images.pexels.com/photos/1106476/pexels-photo-1106476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

export default TheoryPage;