import React, { useState, useEffect } from "react";
import "./QuizResultScreen.css";

type Props = {
  correct: number;
  total: number;
  onRetry?: () => void;
  onContinue?: () => void;
};

export const QuizResultScreen: React.FC<Props> = ({ correct, total, onRetry, onContinue }) => {
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

  // Determine score category and styling
  const getScoreCategory = () => {
    if (percent >= 80) return { color: 'text-green-600', message: 'Excellent!', subMessage: 'You have completed the lesson.' };
    if (percent >= 70) return { color: 'text-orange-500', message: "You're so close!", subMessage: 'Repeat the lesson and get over 80% to complete it.' };
    return { color: 'text-red-500', message: 'Keep practicing!', subMessage: 'Don\'t give up! Practice makes perfect!' };
  };

  const scoreCategory = getScoreCategory();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4" data-testid="result-screen-container">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8" data-testid="quiz-result-header">
          {/* Animated Score Display */}
          <div className={`mb-6 ${isAnimating ? 'animate-score-count' : ''}`}>
            <div className={`score-display font-bold ${scoreCategory.color} mb-2`}>
              {displayScore}%
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800 mb-4 animate-fade-in-up">
            {scoreCategory.message}
          </h1>

          {/* Subtitle */}
          <p className="text-base text-gray-600 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {scoreCategory.subMessage}
          </p>
        </div>

        {/* Character Animation Area */}
        <div className="mb-8 flex justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="character-area bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
            {/* Simple hand character representation */}
            <div className="text-6xl animate-character-bounce">
              {percent >= 80 ? '🎉' : percent >= 70 ? '🤚' : '💪'}
            </div>
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-orange-300 rounded-full animate-pulse-dot"></div>
            <div className="absolute top-8 right-6 w-2 h-2 bg-yellow-300 rounded-full animate-pulse-dot" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-6 left-8 w-2 h-2 bg-red-300 rounded-full animate-pulse-dot" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          {/* Primary Button */}
          <button 
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
              percent < 80 
                ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg' 
                : 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
            }`}
            onClick={onRetry}
            data-testid="button-panel-primary-action"
          >
            {percent < 80 ? 'Retake lesson' : 'Try again'}
          </button>

          {/* Secondary Button */}
          <button 
            className="w-full py-4 px-6 rounded-xl font-semibold text-lg bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 transition-all duration-200 hover:scale-105 active:scale-95"
            onClick={onContinue}
            data-testid="button-panel-tertiary-action"
          >
            Continue
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default QuizResultScreen;


