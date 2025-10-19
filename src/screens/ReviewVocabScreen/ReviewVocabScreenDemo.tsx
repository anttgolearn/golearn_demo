import React from "react";
import ReviewVocabScreen from "./ReviewVocabScreen";

// Demo component to showcase the new design
export const ReviewVocabScreenDemo: React.FC = () => {
  const handleContinue = () => {
    console.log("Continue to next lesson");
  };

  const handleBack = () => {
    console.log("Go back to quiz result");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <ReviewVocabScreen
        lessonId="demo-lesson"
        onContinue={handleContinue}
        onBack={handleBack}
      />
    </div>
  );
};

export default ReviewVocabScreenDemo;
