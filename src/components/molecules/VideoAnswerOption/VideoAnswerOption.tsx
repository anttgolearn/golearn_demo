import React, { useRef, useEffect } from 'react';

interface VideoAnswerOptionProps {
  videoSrc: string;
  label: string;
  isSelected: boolean;
  isCorrect: boolean | null; // null = not answered yet, true = correct, false = incorrect
  onClick: () => void;
  disabled?: boolean;
}

export const VideoAnswerOption: React.FC<VideoAnswerOptionProps> = ({
  videoSrc,
  label,
  isSelected,
  isCorrect,
  onClick,
  disabled = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoSrc]);

  const getBorderColor = () => {
    if (disabled && isCorrect !== null) {
      if (isSelected) {
        return isCorrect ? 'border-green-500' : 'border-red-500';
      }
      return 'border-gray-300';
    }
    return isSelected ? 'border-blue-500' : 'border-gray-300';
  };

  const getBackgroundColor = () => {
    if (disabled && isCorrect !== null) {
      if (isSelected) {
        return isCorrect ? 'bg-green-50' : 'bg-red-50';
      }
      return 'bg-gray-50';
    }
    return isSelected ? 'bg-blue-50' : 'bg-white';
  };

  const getRadioIcon = () => {
    if (disabled && isCorrect !== null && isSelected) {
      if (isCorrect) {
        // Green circle with checkmark
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            width="24" 
            height="24" 
            className="absolute top-2 right-2 z-10"
            role="radio"
            data-testid="radio-correct-border-icon"
          >
            <circle cx="12" cy="12" r="11" fill="#287E1A" stroke="#fff" strokeWidth="2" />
            <path 
              stroke="#fff" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="m8.182 12.39 2.291 2.337 5.345-5.455" 
            />
          </svg>
        );
      } else {
        // Red circle with X
        return (
          <div 
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center z-10"
            role="radio"
            data-testid="radio-incorrect-option"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              width="16" 
              height="16"
            >
              <path 
                stroke="#fff" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="m6 6 12 12m0-12L6 18" 
              />
            </svg>
          </div>
        );
      }
    }
    
    // Default radio button when not answered
    if (isSelected) {
      return (
        <div 
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center z-10"
          role="radio"
          data-testid="radio-selected-option"
        >
          <div className="w-2 h-2 rounded-full bg-white" />
        </div>
      );
    }
    
    return (
      <div 
        className="absolute top-2 right-2 w-6 h-6 rounded-full border-2 border-gray-300 z-10"
        role="radio"
        data-testid="radio-unselected-option"
      />
    );
  };

  return (
    <div 
      className={`
        relative w-full h-64 rounded-xl border-2 transition-all duration-200 cursor-pointer
        ${getBorderColor()} ${getBackgroundColor()}
        ${disabled ? 'cursor-not-allowed opacity-75' : 'hover:scale-[1.02] active:scale-[0.98]'}
      `}
      onClick={disabled ? undefined : onClick}
      data-testid="atom-video-answer"
    >
      {/* Video Border */}
      <div 
        className={`
          absolute inset-0 rounded-xl border-2 pointer-events-none
          ${disabled && isCorrect !== null && isSelected 
            ? (isCorrect ? 'border-green-500' : 'border-red-500')
            : 'border-transparent'
          }
        `}
        data-testid="video-answer-border"
      />
      
      {/* Video */}
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-contain"
        />
        
        {/* Radio Icon */}
        {getRadioIcon()}
      </div>
      
      {/* Label */}
      <div 
        className="absolute bottom-3 left-3 right-3 bg-black bg-opacity-80 rounded-lg px-3 py-2"
        data-testid="video-label"
      >
        <div className="text-white font-semibold text-sm text-center">
          {label}
        </div>
      </div>
    </div>
  );
};

export default VideoAnswerOption;
