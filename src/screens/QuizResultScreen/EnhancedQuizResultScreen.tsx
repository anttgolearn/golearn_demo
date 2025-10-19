import React, { useState, useEffect } from "react";
import "./QuizResultScreen.css";

type Props = {
  correct: number;
  total: number;
  onRetry?: () => void;
  onContinue?: () => void;
  variant?: "default" | "milestone" | "trainer";
  lessonTitle?: string;
  showStreak?: boolean;
  currentStreak?: number;
};

export const EnhancedQuizResultScreen: React.FC<Props> = ({ 
  correct, 
  total, 
  onRetry, 
  onContinue, 
  variant = "default",
  lessonTitle,
  showStreak = false,
  currentStreak = 0
}) => {
  const percent = total ? Math.round((correct / total) * 100) : 0;
  const [displayScore, setDisplayScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);

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
        
        // Show celebration for high scores
        if (percent >= 80) {
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 3000);
        }
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [percent]);

  // Determine score category and styling
  const getScoreCategory = () => {
    if (percent >= 90) return { 
      color: 'text-green-600', 
      bgColor: 'bg-green-50',
      message: 'Outstanding!', 
      subMessage: 'You\'re mastering sign language!',
      emoji: '🏆',
      buttonColor: 'bg-green-500 hover:bg-green-600'
    };
    if (percent >= 80) return { 
      color: 'text-green-500', 
      bgColor: 'bg-green-50',
      message: 'Excellent!', 
      subMessage: 'You have completed the lesson successfully!',
      emoji: '🎉',
      buttonColor: 'bg-green-500 hover:bg-green-600'
    };
    if (percent >= 70) return { 
      color: 'text-orange-500', 
      bgColor: 'bg-orange-50',
      message: "You're so close!", 
      subMessage: 'Repeat the lesson and get over 80% to complete it.',
      emoji: '🤚',
      buttonColor: 'bg-orange-500 hover:bg-orange-600'
    };
    if (percent >= 50) return { 
      color: 'text-yellow-600', 
      bgColor: 'bg-yellow-50',
      message: 'Good effort!', 
      subMessage: 'Keep practicing to improve your score!',
      emoji: '💪',
      buttonColor: 'bg-yellow-500 hover:bg-yellow-600'
    };
    return { 
      color: 'text-red-500', 
      bgColor: 'bg-red-50',
      message: 'Keep trying!', 
      subMessage: 'Don\'t give up! Practice makes perfect!',
      emoji: '🔥',
      buttonColor: 'bg-red-500 hover:bg-red-600'
    };
  };

  const scoreCategory = getScoreCategory();

  // Get character animation based on variant
  const getCharacterAnimation = () => {
    if (variant === "milestone") {
      return percent >= 80 ? '⭐' : '🌟';
    }
    if (variant === "trainer") {
      return '📚';
    }
    return scoreCategory.emoji;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4" data-testid="result-screen-container">
      <div className="w-full max-w-sm mx-auto text-center">
        {/* Header with Streak */}
        {showStreak && currentStreak > 0 && (
          <div className="text-center mb-6 animate-fade-in-up">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-sm font-medium">
              🔥 {currentStreak} day streak
            </div>
          </div>
        )}

        {/* Lesson Title */}
        {lessonTitle && (
          <div className="text-center mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-lg font-semibold text-gray-600">{lessonTitle}</h2>
          </div>
        )}

        {/* Score Display */}
        <div className="text-center mb-8" data-testid="quiz-result-header">
          <div className={`mb-4 ${isAnimating ? 'animate-score-count' : ''}`}>
            <div className="text-7xl font-bold text-orange-500 mb-2">
              {displayScore}%
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800 mb-3 animate-fade-in-up">
            {scoreCategory.message}
          </h1>

          {/* Subtitle */}
          <p className="text-base text-gray-600 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {scoreCategory.subMessage}
          </p>
        </div>

        {/* Character Animation Area */}
        <div className="mb-8 flex justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="relative w-80 h-60">
            {/* Background with cloud-like shapes */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl opacity-30"></div>
            
            {/* Rock formations */}
            <div className="absolute bottom-4 left-8 w-16 h-12 bg-amber-200 rounded-lg transform rotate-12"></div>
            <div className="absolute bottom-6 right-12 w-20 h-16 bg-amber-300 rounded-lg transform -rotate-6"></div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-amber-400 rounded-lg"></div>
            
            {/* Hand character climbing */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-6xl animate-climbing">
              {percent >= 80 ? '🎉' : percent >= 70 ? '🤚' : '💪'}
            </div>
            
            {/* Celebration effect */}
            {showCelebration && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl animate-ping">🎊</div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          {/* Primary Button */}
          <button 
            className="w-full py-4 px-8 rounded-2xl font-semibold text-lg text-white bg-orange-500 hover:bg-orange-600 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            onClick={onRetry}
            data-testid="button-panel-primary-action"
          >
            Retake lesson
          </button>

          {/* Secondary Button */}
          <div className="text-center">
            <button 
              className="text-gray-600 hover:text-gray-800 font-medium text-base transition-colors duration-200"
              onClick={onContinue}
              data-testid="button-panel-tertiary-action"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedQuizResultScreen;
