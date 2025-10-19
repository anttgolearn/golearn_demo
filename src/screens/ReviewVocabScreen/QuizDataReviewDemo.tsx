import React, { useState } from "react";
import ReviewVocabScreen from "./ReviewVocabScreen";

// Demo component to showcase the new quiz data review system
export const QuizDataReviewDemo: React.FC = () => {
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">Quiz Data Review System</h1>
            <p className="text-lg text-gray-600">
              Click the button below to see the new review system using real quiz data
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">✨ Features:</p>
              <ul className="text-sm text-gray-500 space-y-1 text-left">
                <li>• Extract videos from quiz questions</li>
                <li>• 3 data sources: Content, Answer Options, Question Parts</li>
                <li>• Deduplication and sorting</li>
                <li>• Correct/Incorrect tracking</li>
                <li>• Real video URLs from quiz data</li>
                <li>• Center modal with video player</li>
                <li>• Cloud icon decoration</li>
                <li>• Error handling & fallback</li>
              </ul>
            </div>
          </div>
          
          <button
            onClick={() => setShowDemo(true)}
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Show Quiz Data Review
          </button>
        </div>
      </div>
    );
  }

  return (
    <ReviewVocabScreen
      onContinue={handleContinue}
      onBack={handleBack}
    />
  );
};

export default QuizDataReviewDemo;
