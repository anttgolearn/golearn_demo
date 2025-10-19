import React, { useRef } from "react";
import { AnswerOption, AnswerOptionsProps } from "./AnswerOptions";

interface VideoAnswersProps extends Omit<AnswerOptionsProps, 'options'> {
  options: AnswerOption[];
  playingVideo?: number | null;
  onVideoPlay?: (index: number) => void;
  onVideoPause?: () => void;
  videoRefs?: React.MutableRefObject<(HTMLVideoElement | null)[]>;
}

export const VideoAnswers: React.FC<VideoAnswersProps> = ({
  options,
  selectedAnswers,
  showResult,
  onAnswerSelect,
  questionType,
  theme = 'blue',
  disabled = false,
  playingVideo,
  onVideoPlay,
  onVideoPause,
  videoRefs
}) => {
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
        selected: 'border-blue-500 bg-blue-50',
        correct: 'border-green-500 bg-green-50',
        incorrect: 'border-red-500 bg-red-50',
        indicator: 'border-blue-500 bg-blue-500'
      },
      green: {
        selected: 'border-green-500 bg-green-50',
        correct: 'border-green-500 bg-green-50',
        incorrect: 'border-red-500 bg-red-50',
        indicator: 'border-green-500 bg-green-500'
      },
      orange: {
        selected: 'border-orange-500 bg-orange-50',
        correct: 'border-green-500 bg-green-50',
        incorrect: 'border-red-500 bg-red-50',
        indicator: 'border-orange-500 bg-orange-500'
      },
      purple: {
        selected: 'border-purple-500 bg-purple-50',
        correct: 'border-green-500 bg-green-50',
        incorrect: 'border-red-500 bg-red-50',
        indicator: 'border-purple-500 bg-purple-500'
      },
      indigo: {
        selected: 'border-indigo-500 bg-indigo-50',
        correct: 'border-green-500 bg-green-50',
        incorrect: 'border-red-500 bg-red-50',
        indicator: 'border-indigo-500 bg-indigo-500'
      }
    };
    
    return themes[theme as keyof typeof themes] || themes.blue;
  };

  const themeClasses = getThemeClasses(theme);

  return (
    <div className="video-answers-container">
      <div className="video-answers-grid">
        {options.map((option, index) => {
          const status = getAnswerStatus(option);
          const isSelected = selectedAnswers.includes(option.id);
          const isPlaying = playingVideo === index;
          
          return (
            <button
              key={option.id}
              onClick={() => onAnswerSelect(option.id)}
              disabled={disabled || showResult}
              className={`video-answer-option ${themeClasses.selected} ${
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
              <div className="video-answer-content">
                {/* Video */}
                {option.media?.url && (
                  <div className="video-container">
                    <video
                      ref={el => videoRefs && (videoRefs.current[index] = el)}
                      className="answer-video"
                      src={option.media.url}
                      playsInline
                      muted
                      onPlay={() => onVideoPlay?.(index)}
                      onPause={onVideoPause}
                    />
                    
                    {/* Video Overlay */}
                    <div className="video-overlay">
                      {/* Play Button */}
                      {!isPlaying && (
                        <div className="video-play-button">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 5v10l8-5-8-5z"/>
                          </svg>
                        </div>
                      )}

                      {/* Playing Indicator */}
                      {isPlaying && (
                        <div className="video-playing-indicator">
                          <div className="playing-dot"></div>
                          <span>Đang phát</span>
                        </div>
                      )}

                      {/* Selection Indicator */}
                      {isSelected && (
                        <div className="video-selection-indicator">
                          <div className={`video-selection-badge ${themeClasses.indicator}`}>
                            {questionType === 'single' ? (
                              <div className="radio-dot" />
                            ) : questionType === 'multiple' ? (
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : null}
                          </div>
                        </div>
                      )}

                      {/* Result Indicator */}
                      {showResult && (
                        <div className="video-result-indicator">
                          <div className="video-result-badge">
                            {status === 'correct' ? '✅' : status === 'incorrect' ? '❌' : ''}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Text Content */}
                <div className="video-answer-text">
                  {option.answerText && (
                    <div className="video-answer-label">
                      {option.answerText}
                    </div>
                  )}
                  {option.media?.caption && (
                    <div className="video-answer-caption">
                      {option.media.caption}
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VideoAnswers;
