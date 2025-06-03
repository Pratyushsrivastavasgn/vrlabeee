import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Award, Users, BookOpen, GraduationCap } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">About Power System Analysis Virtual Lab</h1>
      
      {/* Lab Overview */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-6">
          <h2 className="text-2xl font-bold text-white">Lab Overview</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            The Power System Analysis Virtual Lab at SRM Institute of Science and Technology is designed to provide 
            hands-on experience in understanding complex power system concepts through interactive simulations and 
            virtual experiments.
          </p>
          <p className="text-gray-700 mb-4">
            This virtual lab enables students to perform experiments remotely, providing flexibility in learning 
            and helping them develop practical skills in power system analysis. Through these virtual experiments, 
            students can better understand the theoretical concepts and their practical applications.
          </p>
          <p className="text-gray-700">
            The lab covers a wide range of topics including load flow analysis, fault analysis, stability studies, 
            economic operation, and more. Each experiment is designed with detailed theory, procedure, and 
            self-assessment components to ensure comprehensive learning.
          </p>
        </div>
      </div>
      
      {/* Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-800 p-5">
            <h2 className="text-xl font-bold text-white">Objectives</h2>
          </div>
          <div className="p-5">
            <ul className="space-y-3">
              <li className="flex">
                <Award className="h-6 w-6 text-blue-700 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Provide remote access to power system experiments</span>
              </li>
              <li className="flex">
                <Award className="h-6 w-6 text-blue-700 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Enhance understanding of theoretical concepts through practical applications</span>
              </li>
              <li className="flex">
                <Award className="h-6 w-6 text-blue-700 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Enable self-paced learning with interactive simulations</span>
              </li>
              <li className="flex">
                <Award className="h-6 w-6 text-blue-700 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Supplement traditional laboratory experiences</span>
              </li>
              <li className="flex">
                <Award className="h-6 w-6 text-blue-700 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Develop problem-solving and analytical skills</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-800 p-5">
            <h2 className="text-xl font-bold text-white">Target Audience</h2>
          </div>
          <div className="p-5">
            <ul className="space-y-3">
              <li className="flex">
                <Users className="h-6 w-6 text-blue-700 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Undergraduate students in Electrical Engineering</span>
              </li>
              <li className="flex">
                <Users className="h-6 w-6 text-blue-700 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Postgraduate students specializing in Power Systems</span>
              </li>
              <li className="flex">
                <Users className="h-6 w-6 text-blue-700 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Faculty members for teaching and demonstration</span>
              </li>
              <li className="flex">
                <Users className="h-6 w-6 text-blue-700 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Research scholars working on power system projects</span>
              </li>
              <li className="flex">
                <Users className="h-6 w-6 text-blue-700 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Industry professionals looking for refresher training</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Faculty Team */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-6">
          <h2 className="text-2xl font-bold text-white">Faculty Team</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facultyMembers.map((faculty, index) => (
              <FacultyCard key={index} {...faculty} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Contact and Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-800 p-5">
            <h2 className="text-xl font-bold text-white">Contact Us</h2>
          </div>
          <div className="p-5">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input 
                  type="text" 
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  placeholder="Message subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  rows={4}
                  placeholder="Your message"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
        
        {/* Location */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-800 p-5">
            <h2 className="text-xl font-bold text-white">Our Location</h2>
          </div>
          <div className="p-5">
            <div className="bg-gray-200 h-64 rounded-md mb-4 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Map will be displayed here</span>
            </div>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-700 mr-3 mt-0.5" />
                <div>
                  <strong className="block text-blue-900">Department of Electrical and Electronics Engineering</strong>
                  SRM Institute of Science and Technology<br />
                  Kattankulathur, Chennai - 603203<br />
                  Tamil Nadu, India
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-700 mr-3" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-700 mr-3" />
                <span>eee.virtuallab@srm.edu.in</span>
              </div>
              <div className="flex items-center">
                <ExternalLink className="h-5 w-5 text-blue-700 mr-3" />
                <a href="#" className="text-blue-700 hover:underline">www.srmist.edu.in</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FacultyCard = ({ name, designation, expertise, imageUrl }) => (
  <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
    <div className="h-48 bg-gray-200">
      <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-blue-800 text-lg">{name}</h3>
      <p className="text-gray-600 text-sm mb-2">{designation}</p>
      <div className="flex items-start">
        <GraduationCap className="h-4 w-4 text-blue-700 mr-2 mt-0.5" />
        <p className="text-gray-600 text-sm">{expertise}</p>
      </div>
    </div>
  </div>
);

// Faculty Members Data
const facultyMembers = [
  {
    name: "Dr. Ramesh Kumar",
    designation: "Professor and Head of Department",
    expertise: "Power Systems, HVDC Transmission",
    imageUrl: "https://images.pexels.com/photos/5212665/pexels-photo-5212665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    name: "Dr. Priya Sharma",
    designation: "Associate Professor",
    expertise: "Power System Protection, Smart Grid",
    imageUrl: "https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    name: "Dr. Anand Raj",
    designation: "Assistant Professor",
    expertise: "Power Electronics, Renewable Energy",
    imageUrl: "https://images.pexels.com/photos/5905446/pexels-photo-5905446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

export default AboutPage;