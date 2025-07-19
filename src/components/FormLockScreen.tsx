import React, { useState } from 'react';
import { ExternalLink, Lock, CheckCircle } from 'lucide-react';

interface FormLockScreenProps {
  onUnlock: () => void;
}

const FormLockScreen: React.FC<FormLockScreenProps> = ({ onUnlock }) => {
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleFormCompletion = () => {
    setIsFormCompleted(true);
    setShowConfirmation(true);
    setTimeout(() => {
      onUnlock();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-center">
          <Lock className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">
            Welcome to SRM EEE Virtual Lab
          </h1>
          <p className="text-blue-100">
            Please complete the registration form to access the lab
          </p>
        </div>

        <div className="p-6">
          {!showConfirmation ? (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Before You Begin
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  To ensure the best learning experience and to help us improve our virtual lab, 
                  please fill out our quick registration form. This will only take a few minutes.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Basic information collection
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Learning preferences
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Academic background
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <a
                  href="https://forms.gle/F5jQGLykVc6y25Gg9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  Open Registration Form
                </a>

                <button
                  onClick={handleFormCompletion}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  I've Completed the Form
                </button>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> After completing the form, click "I've Completed the Form" 
                  button to access the virtual lab.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Thank You!
              </h3>
              <p className="text-gray-600 mb-4">
                Registration completed successfully. Redirecting to the virtual lab...
              </p>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormLockScreen;