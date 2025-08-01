import React, { useState, useEffect } from 'react';
import { ExternalLink, Lock, CheckCircle } from 'lucide-react';

interface FormLockScreenProps {
  onUnlock: () => void;
}

const FormLockScreen: React.FC<FormLockScreenProps> = ({ onUnlock }) => {
  // State to track if the user is allowed to proceed.
  // This will be true only after they've opened the form and returned to the app.
  const [canProceed, setCanProceed] = useState(false);
  
  // State to track if the link to the form has been clicked.
  const [formLinkOpened, setFormLinkOpened] = useState(false);

  // State to show the final confirmation/loading screen.
  const [showConfirmation, setShowConfirmation] = useState(false);

  // This effect listens for when the user returns to this browser tab.
  // If they had previously clicked the form link, we enable the proceed button.
  useEffect(() => {
    const handleFocus = () => {
      if (formLinkOpened) {
        setCanProceed(true);
      }
    };

    // Add event listener for when the window gains focus
    window.addEventListener('focus', handleFocus);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [formLinkOpened]); // This effect depends on `formLinkOpened`

  // This function is called when the user confirms they have completed the form.
  const handleFormCompletion = () => {
    setShowConfirmation(true);
    // Wait for 2 seconds on the confirmation screen before calling the unlock function.
    setTimeout(() => {
      onUnlock();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 text-center">
          <Lock className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">
            Welcome to SRM Electrical Electronics Lab
          </h1>
          <p className="text-indigo-100">
            Please complete the registration form to access the lab.
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
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Basic information collection</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Learning preferences</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Academic background</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScjdlb9ef7IdfSABCOBU5fTYAZU-QKkMAVh4Kr_43qNzgnDCw/viewform?usp=header"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setFormLinkOpened(true)} // Set that the link was clicked
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <ExternalLink className="w-5 h-5" />
                  Open Registration Form
                </a>

                <button
                  onClick={handleFormCompletion}
                  disabled={!canProceed} // Button is disabled until user can proceed
                  className="w-full font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center shadow-md disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700 text-white hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  I've Completed the Form
                </button>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> After completing the form in the new tab, return here and click the "I've Completed the Form" button to access the virtual lab.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Thank You!
              </h3>
              <p className="text-gray-600 mb-4">
                Registration verified. Redirecting to the virtual lab...
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
