import React, { useState } from "react";
import ReviewVocabScreen from "./ReviewVocabScreen";

// Demo component to showcase the new video modal with speed control
export const VideoModalWithSpeedControlDemo: React.FC = () => {
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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">Video Modal với Speed Control</h1>
            <p className="text-lg text-gray-600">
              Click the button below to see the new video modal with speed control features
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">✨ Features:</p>
              <ul className="text-sm text-gray-500 space-y-1 text-left">
                <li>• Bottom sheet modal style</li>
                <li>• Video player with full controls</li>
                <li>• Speed control (0.7x / 1.0x)</li>
                <li>• Speed overlay animation</li>
                <li>• Cloud icon decoration</li>
                <li>• Error handling & fallback</li>
                <li>• Responsive design</li>
                <li>• Auto-play & loop</li>
              </ul>
            </div>
          </div>
          
          <button
            onClick={() => setShowDemo(true)}
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
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

export default VideoModalWithSpeedControlDemo;
