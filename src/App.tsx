import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import FormLockScreen from './components/FormLockScreen';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Check if user has already completed the form (stored in localStorage)
    const hasCompletedForm = localStorage.getItem('srmlab_form_completed');
    if (hasCompletedForm === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = () => {
    localStorage.setItem('srmlab_form_completed', 'true');
    setIsUnlocked(true);
  };

  if (!isUnlocked) {
    return <FormLockScreen onUnlock={handleUnlock} />;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </Router>
  );
}

export default App;