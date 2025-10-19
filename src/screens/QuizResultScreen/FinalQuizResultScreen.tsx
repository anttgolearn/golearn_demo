import React, { useState, useEffect } from "react";
import "./QuizResultScreen.css";

type Props = {
  correct: number;
  total: number;
  onRetry?: () => void;
  onContinue?: () => void;
  lessonId?: string;
};

export const FinalQuizResultScreen: React.FC<Props> = ({ 
  correct, 
  total, 
  onRetry, 
  onContinue,
  lessonId = "1"
}) => {
  const percent = total ? Math.round((correct / total) * 100) : 0;
  const [displayScore, setDisplayScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  // Score animation effect
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60fps
    const increment = percent / steps;
    
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= percent) {
        setDisplayScore(percent);
        setIsAnimating(false);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [percent]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4" data-testid="result-screen-container">
      <div className="w-full max-w-sm mx-auto text-center">
        {/* Score Display - Large orange percentage */}
        <div className="text-center mb-8" data-testid="quiz-result-header">
          <div className={`mb-4 ${isAnimating ? 'animate-score-count' : ''}`}>
            <div className="text-8xl font-bold text-orange-500 mb-2">
              {displayScore}%
            </div>
          </div>

          {/* Title - "Bạn gần đạt rồi!" */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in-up">
            Bạn gần đạt rồi!
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Làm lại bài học và đạt trên 80% để hoàn thành.
          </p>
        </div>

        {/* Character Animation Area - Hand climbing rocks */}
        <div className="mb-8 flex justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="relative w-80 h-60">
            {/* Background with subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl"></div>
            
            {/* Rock formations - exactly positioned like in the image */}
            <div className="absolute bottom-4 left-8 w-16 h-12 bg-amber-200 rounded-lg transform rotate-12 shadow-sm"></div>
            <div className="absolute bottom-6 right-12 w-20 h-16 bg-amber-300 rounded-lg transform -rotate-6 shadow-sm"></div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-amber-400 rounded-lg shadow-sm"></div>
            
            {/* Hand character climbing - using hand emoji */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-7xl animate-climbing">
              🤚
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          {/* Primary Button - Orange "Retake lesson" */}
          <button 
            className="w-full py-4 px-8 rounded-2xl font-semibold text-lg text-white bg-orange-500 hover:bg-orange-600 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            onClick={onRetry}
            data-testid="button-panel-primary-action"
          >
            Làm lại bài
          </button>

          {/* Secondary Button - Simple "Continue" text */}
          <div className="text-center">
            <button 
              className="text-gray-600 hover:text-gray-800 font-medium text-lg transition-colors duration-200"
              onClick={onContinue}
              data-testid="button-panel-tertiary-action"
            >
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalQuizResultScreen;
