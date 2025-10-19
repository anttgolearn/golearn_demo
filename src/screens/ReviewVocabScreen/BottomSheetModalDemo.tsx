import React, { useState } from "react";
import ReviewVocabScreen from "./ReviewVocabScreen";

// Demo component to showcase the new bottom sheet modal
export const BottomSheetModalDemo: React.FC = () => {
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
            <h1 className="text-3xl font-bold text-gray-800">Bottom Sheet Modal Demo</h1>
            <p className="text-lg text-gray-600">
              Click the button below to see the new bottom sheet modal design
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">✨ Features:</p>
              <ul className="text-sm text-gray-500 space-y-1 text-left">
                <li>• Bottom sheet slides up from bottom</li>
                <li>• Fixed height: 551px with 85px padding</li>
                <li>• Video player with object-contain</li>
                <li>• Speed control button (turtle icon)</li>
                <li>• Close button with X icon</li>
                <li>• Touch-friendly interactions</li>
                <li>• Smooth animations</li>
                <li>• Real quiz data integration</li>
              </ul>
            </div>
          </div>
          
          <button
            onClick={() => setShowDemo(true)}
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Show Bottom Sheet Modal
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

export default BottomSheetModalDemo;
