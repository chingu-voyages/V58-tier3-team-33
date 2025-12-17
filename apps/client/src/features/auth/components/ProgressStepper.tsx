import React from "react";

interface ProgressStepperProps {
  progress1: number; // Progress for step 1 (0-100)
  progress2: number; // Progress for step 2 (0-100)
  currentStep: 1 | 2;
  step1Label: string;
  step2Label: string;
}

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="w-full bg-gray-700 rounded-full h-2.5">
    <div
      className="bg-accent-gold h-2.5 rounded-full transition-all duration-300"
      style={{ width: `${progress}%` }}
    />
  </div>
);

const ProgressStepper: React.FC<ProgressStepperProps> = ({
  progress1,
  progress2,
  currentStep,
}) => {
  return (
    <div className="flex items-center space-x-4 my-4 md:my-6 w-full">
      {" "}
      {/* Added w-full */}
      <div className="flex-1 flex space-x-2 items-center">
        {" "}
        {/* Changed space-y-2 to flex space-x-2 and added items-center */}
        <ProgressBar progress={progress1} />
        <ProgressBar progress={progress2} />
      </div>
      <div className="text-sm text-gray-light whitespace-nowrap min-w-max">
        {" "}
        {/* Added min-w-max */}
        Step {currentStep} of 2
      </div>
    </div>
  );
};

export default ProgressStepper;
