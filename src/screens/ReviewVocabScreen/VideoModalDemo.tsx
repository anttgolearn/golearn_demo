import React, { useState } from "react";
import ReviewVocabScreen from "./ReviewVocabScreen";

// Demo component to showcase the new bottom sheet video modal
export const VideoModalDemo: React.FC = () => {
  const [showDemo, setShowDemo] = useState(false);

  const handleContinue = () => {
    console.log("Continue to next lesson");
    setShowDemo(false);
  };

  const handleBack = () => {
    console.log("Go back to quiz result");
    setShowDemo(false);
  };

  if (!showDemo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Video Modal Demo</h1>
          <p className="text-lg text-gray-600">
            Click the button below to see the new bottom sheet video modal
          </p>
          <button
            onClick={() => setShowDemo(true)}
            className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg rounded-xl transition-all duration-200 hover:scale-105"
          >
            Show Video Modal Demo
          </button>
        </div>
      </div>
    );
  }

  return (
    <ReviewVocabScreen
      lessonId="01_01_1-discover"
      onContinue={handleContinue}
      onBack={handleBack}
    />
  );
};

export default VideoModalDemo;
