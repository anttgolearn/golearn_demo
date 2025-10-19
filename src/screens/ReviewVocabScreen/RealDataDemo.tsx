import React, { useState } from "react";
import ReviewVocabScreen from "./ReviewVocabScreen";

// Demo component to showcase the real lesson data integration
export const RealDataDemo: React.FC = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState('01_01_1-discover');

  const handleContinue = () => {
    console.log("Continue to next lesson");
    setShowDemo(false);
  };

  const handleBack = () => {
    console.log("Go back to quiz result");
    setShowDemo(false);
  };

  const availableLessons = [
    { id: '01_01_1-discover', name: 'Lesson 1: Greetings (Discover)' },
    // Add more lessons as they become available
  ];

  if (!showDemo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">Real Lesson Data Demo</h1>
            <p className="text-lg text-gray-600">
              Test the review screen with actual lesson data from HARDCODED_QUIZZES
            </p>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-500">📚 Available Lessons:</p>
              <select 
                value={selectedLesson}
                onChange={(e) => setSelectedLesson(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {availableLessons.map(lesson => (
                  <option key={lesson.id} value={lesson.id}>
                    {lesson.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-500">✨ Features:</p>
              <ul className="text-sm text-gray-500 space-y-1 text-left">
                <li>• Real data from HARDCODED_QUIZZES</li>
                <li>• Extract videos from 3 sources</li>
                <li>• Content questions (1a category)</li>
                <li>• Answer options with media</li>
                <li>• Question parts with videos</li>
                <li>• Correct/incorrect tracking</li>
                <li>• Bottom sheet modal</li>
                <li>• Speed control button</li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-lg border border-orange-200">
              <p className="text-sm text-gray-600">
                <strong>Lesson Data:</strong> {selectedLesson}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                This will show vocabulary from the actual lesson questions
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowDemo(true)}
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Show Real Data Review
          </button>
        </div>
      </div>
    );
  }

  return (
    <ReviewVocabScreen
      lessonId={selectedLesson}
      onContinue={handleContinue}
      onBack={handleBack}
    />
  );
};

export default RealDataDemo;
