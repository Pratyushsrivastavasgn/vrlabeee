import React from 'react';
import ExperimentLayout from './layout/ExperimentLayout';

const Experiment11 = () => {
  return (
    <ExperimentLayout
      title="Experiment 1"
      description="This experiment demonstrates the fundamentals of power flow analysis in electrical systems."
      experiment={{
        theory: <TheoryContent />,
        procedure: <ProcedureContent />,
        simulation: <SimulationContent />,
        quiz: <QuizContent />
      }}
    />
  );
};

const TheoryContent = () => (
  <div className="prose max-w-none">
    {/* Add the theory content for Experiment 1 here */}
    <h2>Theory</h2>
    <p>Explanation of concepts related to Experiment 1.</p>
  </div>
);

const ProcedureContent = () => (
  <div>
    {/* Add the procedure content for Experiment 1 here */}
    <h2>Procedure</h2>
    <p>Step-by-step guide for performing Experiment 1.</p>
  </div>
);

const SimulationContent = () => (
  <div>
    {/* Add the simulation content for Experiment 1 here */}
    <h2>Simulation</h2>
    <p>Interactive simulation or instructions will go here.</p>
  </div>
);

const QuizContent = () => (
  <div>
    {/* Add the quiz content for Experiment 1 here */}
    <h2>Quiz</h2>
    <p>Quiz questions to test understanding of Experiment 1.</p>
  </div>
);

export default Experiment11;
