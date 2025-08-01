import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Award, Users, BookOpen, GraduationCap } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">About Electrical Electronics Virtual Lab</h1>
      
      {/* Lab Overview */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-6">
          <h2 className="text-2xl font-bold text-white">Lab Overview</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            The Virtual Laboratory for Electrical Circuits is a state-of-the-art learning platform developed to simulate real-world circuit experiments in a virtual environment. Designed to complement conventional lab training, this lab enables students to explore, analyse, and visualize the behaviour of electrical circuits and electronic components in a safe, flexible, and interactive manner.
          </p>
          <p className="text-gray-700 mb-4">
            With a focus on amplifiers and oscillators, the virtual lab introduces learners to key concepts such as biasing techniques, small-signal analysis, frequency response, feedback mechanisms, and the principles of waveform generation. Through a structured set of experiments, students gain hands-on experience with common emitter amplifiers, operational amplifier configurations, RC and LC oscillators, and more.
          </p>
          <p className="text-gray-700">
            Each module includes theoretical explanations, guided simulation exercises, procedural steps, and self-evaluation tools to enhance conceptual clarity and skill development. The virtual lab is particularly useful for remote learners and institutions aiming to provide quality practical exposure without the constraints of physical infrastructure.
            By integrating modern educational technologies, this virtual lab promotes inquiry-based learning and helps students develop analytical thinking and circuit design capabilities essential for their academic and professional growth in electronics.
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
                <span className="text-gray-700">Provide remote access to Electrical and Electornics experiments</span>
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
                <span className="text-gray-700">Postgraduate students </span>
              </li>
              <li className="flex">
                <Users className="h-6 w-6 text-blue-700 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Faculty members for teaching and demonstration</span>
              </li>
              <li className="flex">
                <Users className="h-6 w-6 text-blue-700 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Research scholars </span>
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

      {/* Student Team */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-6">
          <h2 className="text-2xl font-bold text-white">Student Team</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentTeam.map((student, index) => (
              <StudentCard key={index} {...student} />
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
            <div className="rounded-md overflow-hidden h-64 mb-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d8559.874655568208!2d80.04405437902429!3d12.821674459565466!3m2!1i1024!2i768!4f13.1!2m1!1sSRM%20University%20Kattankulathur%2C%20Tamil%20Nadu%20603203!5e1!3m2!1sen!2sin!4v1749248362848!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
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
                <span>+91 9791005919</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-700 mr-3" />
                <span>thamizht@srmist.edu.in</span>
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

const StudentCard = ({ name, registrationNumber, email, branch, imageUrl }) => (
  <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
    <div className="h-48 bg-gray-200">
      <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-blue-800 text-lg">{name}</h3>
      <p className="text-gray-600 text-sm mb-1"><strong>Reg. No.:</strong> {registrationNumber}</p>
      <p className="text-gray-600 text-sm mb-1"><strong>Email:</strong> {email}</p>
      <p className="text-gray-600 text-sm"><strong>Branch:</strong> {branch}</p>
    </div>
  </div>
);


const facultyMembers = [
  {
    name: "DR. Thamizh Thentral T M",
    designation: "Associate Professor",
    expertise: "Power Electronics and drives.",
    imageUrl: "assets/images/Members/Faculties/Thamizh.png"
  },
  {
    name: "Dr. Palanisamy R",
    designation: "Associate Professor",
    expertise: "Power Electronics and Drives",
    imageUrl: "assets/images/Members/Faculties/Palanisamy.png"
  }
];

const studentTeam = [
  {
    name: "Shambhavi Mishra",
    registrationNumber: "RA2411003011211",
    email: "sm7845@srmist.edu.in",
    branch: "CSE(Core)",
    imageUrl: "assets/images/Members/Students/Shambhavi_Mishra.jpg"
  },
  {
    name: "Pratyush Srivastava",
    registrationNumber: "RA2411003011239",
    email: "ps8540@srmist.edu.in",
    branch: "CSE(Core)",
    imageUrl: "assets/images/Members/Students/Pratyush.png"
  },
  {
    name: "Anwesh Dash",
    registrationNumber: "RA2411003011219",
    email: "ad1526@srmist.edu.in",
    branch: "CSE(Core)",
    imageUrl: "assets/images/Members/Students/Anwesh_Dash.jpg"
  },
  {
    name: "Yatharth Gupta",
    registrationNumber: "RA2411003011179",
    email: "yg6222@srmist.edu.in",
    branch: "CSE(Core)",
    imageUrl: "assets/images/Members/Students/Yatharth_Gupta.jpg"
  }
];


export default AboutPage;
