import React, { useState } from "react";
import ReviewVocabScreen from "./ReviewVocabScreen";
import { getLessonNavigationInfo } from "../../lib/lesson-navigation";

// Demo component to test lesson navigation logic
export const NavigationDemo: React.FC = () => {
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

  // Test different lesson IDs to see navigation behavior
  const testLessons = [
    { id: '01_01_1-discover', name: 'Lesson 1: Discover (First in Chapter)' },
    { id: '01_01_1-vokabel', name: 'Lesson 2: Vokabel' },
    { id: '01_01_1-develop', name: 'Lesson 3: Develop' },
    { id: '01_01_1-training', name: 'Lesson 4: Training' },
    { id: '01_01_1-quiz', name: 'Lesson 5: Quiz (Last in Chapter)' },
    { id: '01_02_1-discover', name: 'Chapter 2: Discover (First in Next Chapter)' },
  ];

  const navigationInfo = getLessonNavigationInfo(selectedLesson);

  if (!showDemo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-2xl">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">Lesson Navigation Demo</h1>
            <p className="text-lg text-gray-600">
              Test the smart navigation logic for "Bài học tiếp theo"
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Lesson to Test:
                </label>
                <select 
                  value={selectedLesson}
                  onChange={(e) => setSelectedLesson(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  {testLessons.map(lesson => (
                    <option key={lesson.id} value={lesson.id}>
                      {lesson.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-4 bg-white rounded-lg border border-orange-200">
                <h3 className="font-medium text-gray-800 mb-2">Navigation Info:</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div><strong>Current:</strong> {selectedLesson}</div>
                  <div><strong>Next in Chapter:</strong> {navigationInfo.hasNextInChapter ? 'Yes' : 'No'}</div>
                  <div><strong>Next Chapter:</strong> {navigationInfo.hasNextChapter ? 'Yes' : 'No'}</div>
                  <div><strong>Next Lesson ID:</strong> {navigationInfo.nextLessonId || 'None'}</div>
                  <div><strong>Next Lesson Title:</strong> {navigationInfo.nextLessonTitle || 'None'}</div>
                  <div><strong>Next Lesson Type:</strong> {navigationInfo.nextLessonType || 'None'}</div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-800 mb-2">Expected Button Text:</h3>
                <div className="text-sm text-blue-600">
                  {navigationInfo.hasNextInChapter ? (
                    <div>
                      <div className="font-bold">"Bài học tiếp theo"</div>
                      <div className="opacity-75">{navigationInfo.nextLessonTitle}</div>
                    </div>
                  ) : navigationInfo.hasNextChapter ? (
                    <div>
                      <div className="font-bold">"Chương tiếp theo"</div>
                      <div className="opacity-75">{navigationInfo.nextLessonTitle}</div>
                    </div>
                  ) : (
                    <div>
                      <div className="font-bold">"Hoàn thành chương"</div>
                      <div className="opacity-75">Chúc mừng!</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowDemo(true)}
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Test Navigation in Review Screen
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

export default NavigationDemo;
