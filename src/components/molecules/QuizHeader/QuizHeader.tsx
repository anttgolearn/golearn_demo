import React from "react";

type QuizHeaderProps = {
  currentIndex: number;
  totalQuestions: number;
  onMenuClick?: () => void;
  onSpeedClick?: () => void;
};

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  currentIndex,
  totalQuestions,
  onMenuClick,
  onSpeedClick,
}) => {
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-5xl mx-auto" data-testid="quiz-header-wrapper">
      <div className="flex items-center justify-between">
        <button 
          aria-label="Open Quiz navigation" 
          className="p-2 rounded hover:bg-gray-200"
          onClick={onMenuClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="24" height="24">
            <g stroke="#292F32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
              <path d="M2 12h20M2 6h20M2 18h20"/>
            </g>
          </svg>
        </button>
        
        <div className="flex-1 mx-4">
          {/* Progress bar */}
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-2 bg-blue-500 transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }} 
            />
          </div>
        </div>
        
        <button 
          aria-label="Change video speed" 
          className="p-2 rounded hover:bg-gray-200"
          onClick={onSpeedClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none" width="28" height="28">
            <circle cx="18" cy="18" r="14" fill="#C7CBCD"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default QuizHeader;
