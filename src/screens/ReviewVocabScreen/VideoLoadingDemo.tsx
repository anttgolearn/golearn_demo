import React, { useState } from "react";
import ReviewVocabScreen from "./ReviewVocabScreen";

// Demo component to test video loading in bottom sheet modal
export const VideoLoadingDemo: React.FC = () => {
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
            <h1 className="text-3xl font-bold text-gray-800">Video Loading Demo</h1>
            <p className="text-lg text-gray-600">
              Test video loading with enhanced debugging and error handling
            </p>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-500">🎬 Video Features:</p>
              <ul className="text-sm text-gray-500 space-y-1 text-left">
                <li>• Real video URLs from lesson data</li>
                <li>• Loading indicator with spinner</li>
                <li>• Error handling with retry button</li>
                <li>• Debug panel with video info</li>
                <li>• Console logs for troubleshooting</li>
                <li>• Auto-play with muted attribute</li>
                <li>• Object-contain for proper scaling</li>
                <li>• Bottom sheet modal design</li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-lg border border-orange-200">
              <p className="text-sm text-gray-600">
                <strong>Lesson:</strong> 01_01_1-discover
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Videos: Chào, Tạm biệt, Xin lỗi
              </p>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-600">
                <strong>💡 Tip:</strong> Open browser console to see detailed video loading logs
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowDemo(true)}
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Test Video Loading
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

export default VideoLoadingDemo;
