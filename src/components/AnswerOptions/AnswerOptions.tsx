import React, { useState, useRef } from "react";
import TextAnswers from "./TextAnswers";
import ImageAnswers from "./ImageAnswers";
import VideoAnswers from "./VideoAnswers";
import "./AnswerOptions.css";

// Types
export interface AnswerOption {
  id: number;
  answerText?: string;
  isCorrect?: boolean;
  media?: {
    type: 'video' | 'image';
    url: string;
    label: string;
    caption: string;
  };
}

export interface AnswerOptionsProps {
  options: AnswerOption[];
  selectedAnswers: number[];
  showResult: boolean;
  onAnswerSelect: (optionId: number) => void;
  questionType: 'single' | 'multiple' | 'cloze_answer';
  theme?: 'blue' | 'green' | 'orange' | 'purple' | 'indigo';
  disabled?: boolean;
}

/**
 * Universal Answer Options Component
 * Renders different answer types based on media type
 */
export const AnswerOptions: React.FC<AnswerOptionsProps> = ({
  options,
  selectedAnswers,
  showResult,
  onAnswerSelect,
  questionType,
  theme = 'blue',
  disabled = false
}) => {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleVideoPlay = (index: number) => {
    setPlayingVideo(index);
  };

  const handleVideoPause = () => {
    setPlayingVideo(null);
  };

  const getAnswerStatus = (option: AnswerOption) => {
    if (!showResult) return '';
    
    if (option.isCorrect) {
      return 'correct';
    } else if (selectedAnswers.includes(option.id)) {
      return 'incorrect';
    }
    return '';
  };

  const getThemeClasses = (theme: string) => {
    const themes = {
      blue: {
        primary: 'border-blue-500 bg-blue-50',
        selected: 'border-blue-500 bg-blue-50',
        correct: 'border-green-500 bg-green-50',
        incorrect: 'border-red-500 bg-red-50',
        button: 'bg-blue-500 hover:bg-blue-600',
        indicator: 'border-blue-500 bg-blue-500'
      },
      green: {
        primary: 'border-green-500 bg-green-50',
        selected: 'border-green-500 bg-green-50',
        correct: 'border-green-500 bg-green-50',
        incorrect: 'border-red-500 bg-red-50',
        button: 'bg-green-500 hover:bg-green-600',
        indicator: 'border-green-500 bg-green-500'
      },
      orange: {
        primary: 'border-orange-500 bg-orange-50',
        selected: 'border-orange-500 bg-orange-50',
        correct: 'border-green-500 bg-green-50',
        incorrect: 'border-red-500 bg-red-50',
        button: 'bg-orange-500 hover:bg-orange-600',
        indicator: 'border-orange-500 bg-orange-500'
      },
      purple: {
        primary: 'border-purple-500 bg-purple-50',
        selected: 'border-purple-500 bg-purple-50',
        correct: 'border-green-500 bg-green-50',
        incorrect: 'border-red-500 bg-red-50',
        button: 'bg-purple-500 hover:bg-purple-600',
        indicator: 'border-purple-500 bg-purple-500'
      },
      indigo: {
        primary: 'border-indigo-500 bg-indigo-50',
        selected: 'border-indigo-500 bg-indigo-50',
        correct: 'border-green-500 bg-green-50',
        incorrect: 'border-red-500 bg-red-50',
        button: 'bg-indigo-500 hover:bg-indigo-600',
        indicator: 'border-indigo-500 bg-indigo-500'
      }
    };
    
    return themes[theme as keyof typeof themes] || themes.blue;
  };

  const themeClasses = getThemeClasses(theme);

  // Group options by media type
  const textOptions = options.filter(option => !option.media);
  const imageOptions = options.filter(option => option.media?.type === 'image');
  const videoOptions = options.filter(option => option.media?.type === 'video');

  // If all options have the same media type, render that specific component
  if (imageOptions.length === options.length) {
    return (
      <ImageAnswers
        options={options}
        selectedAnswers={selectedAnswers}
        showResult={showResult}
        onAnswerSelect={onAnswerSelect}
        questionType={questionType}
        theme={theme}
        disabled={disabled}
      />
    );
  }

  if (videoOptions.length === options.length) {
    return (
      <VideoAnswers
        options={options}
        selectedAnswers={selectedAnswers}
        showResult={showResult}
        onAnswerSelect={onAnswerSelect}
        questionType={questionType}
        theme={theme}
        disabled={disabled}
        playingVideo={playingVideo}
        onVideoPlay={handleVideoPlay}
        onVideoPause={handleVideoPause}
        videoRefs={videoRefs}
      />
    );
  }

  // Mixed media types - render universal component
  return (
    <div className="answer-options-container">
      <div className="space-y-3">
        {options.map((option, index) => {
          const status = getAnswerStatus(option);
          const isSelected = selectedAnswers.includes(option.id);
          
          return (
            <button
              key={option.id}
              onClick={() => onAnswerSelect(option.id)}
              disabled={disabled || showResult}
              className={`answer-option ${themeClasses.selected} ${
                isSelected ? 'selected' : ''
              } ${
                showResult 
                  ? status === 'correct'
                    ? themeClasses.correct
                    : status === 'incorrect'
                      ? themeClasses.incorrect
                      : ''
                  : ''
              } ${disabled ? 'disabled' : ''}`}
            >
              <div className="answer-option-content">
                {/* Selection Indicator */}
                <div className={`selection-indicator ${themeClasses.indicator} ${
                  isSelected ? 'selected' : ''
                }`}>
                  {questionType === 'single' ? (
                    // Radio button
                    isSelected && <div className="radio-dot" />
                  ) : questionType === 'multiple' ? (
                    // Checkbox
                    isSelected && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )
                  ) : (
                    // Cloze answer - no indicator
                    null
                  )}
                </div>

                {/* Media Content */}
                {option.media && (
                  <div className="answer-media">
                    {option.media.type === 'image' && (
                      <img
                        src={option.media.url}
                        alt={option.media.label}
                        className="answer-image"
                      />
                    )}
                    {option.media.type === 'video' && (
                      <div className="answer-video-container">
                        <video
                          ref={el => videoRefs.current[index] = el}
                          className="answer-video"
                          src={option.media.url}
                          playsInline
                          muted
                          onPlay={() => handleVideoPlay(index)}
                          onPause={handleVideoPause}
                        />
                        {playingVideo === index && (
                          <div className="video-playing-indicator">
                            <div className="playing-dot"></div>
                            <span>Đang phát</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Text Content */}
                <div className="answer-text-content">
                  {option.answerText && (
                    <div className="answer-text">
                      {option.answerText}
                    </div>
                  )}
                  {option.media?.caption && (
                    <div className="answer-caption">
                      {option.media.caption}
                    </div>
                  )}
                </div>

                {/* Result Indicator */}
                {showResult && (
                  <div className="result-indicator">
                    {status === 'correct' ? '✅' : status === 'incorrect' ? '❌' : ''}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AnswerOptions;
