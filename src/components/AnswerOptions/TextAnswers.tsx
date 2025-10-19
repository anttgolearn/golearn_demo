import React from "react";
import { AnswerOption, AnswerOptionsProps } from "./AnswerOptions";

interface TextAnswersProps extends Omit<AnswerOptionsProps, 'options'> {
  options: AnswerOption[];
}

export const TextAnswers: React.FC<TextAnswersProps> = ({
  options,
  selectedAnswers,
  showResult,
  onAnswerSelect,
  questionType,
  theme = 'blue',
  disabled = false
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
    <div className="text-answers-container">
      <div className="space-y-3">
        {options.map((option) => {
          const status = getAnswerStatus(option);
          const isSelected = selectedAnswers.includes(option.id);
          
          return (
            <button
              key={option.id}
              onClick={() => onAnswerSelect(option.id)}
              disabled={disabled || showResult}
              className={`text-answer-option ${themeClasses.selected} ${
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
              <div className="text-answer-content">
                {/* Selection Indicator */}
                <div className={`text-selection-indicator ${themeClasses.indicator} ${
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

                {/* Text Content */}
                <div className="text-answer-text">
                  {option.answerText}
                </div>

                {/* Result Indicator */}
                {showResult && (
                  <div className="text-result-indicator">
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

export default TextAnswers;
