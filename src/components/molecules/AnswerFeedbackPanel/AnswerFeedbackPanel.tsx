import React from 'react';
import CorrectIcon from '../../atoms/Icon/CorrectIcon';
import IncorrectIcon from '../../atoms/Icon/IncorrectIcon';

interface AnswerFeedbackPanelProps {
  isCorrect: boolean;
  onNext: () => void;
  onRetry?: () => void;
}

export const AnswerFeedbackPanel: React.FC<AnswerFeedbackPanelProps> = ({ 
  isCorrect, 
  onNext,
  onRetry
}) => {
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50"
      data-testid={`lesson-panel-${isCorrect ? 'correct' : 'incorrect'}`}
    >
      <div 
        className={`w-full py-6 px-4 ${
          isCorrect ? 'bg-green-100' : 'bg-red-100'
        }`}
      >
        <div className="max-w-md mx-auto">
          {/* Feedback Icon and Text - Centered */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              {isCorrect ? (
                <CorrectIcon size={32} />
              ) : (
                <IncorrectIcon size={32} />
              )}
              <div 
                className={`text-xl font-bold ${
                  isCorrect ? 'text-green-800' : 'text-red-800'
                }`}
              >
                {isCorrect ? 'Chính xác!' : 'Không chính xác!'}
              </div>
            </div>
          </div>

          {/* Action Buttons - Centered */}
          <div className="flex justify-center gap-3">
            {!isCorrect && onRetry && (
              <button
                onClick={onRetry}
                className="px-6 py-3 rounded-lg font-semibold text-base border border-gray-300 text-gray-800 bg-white hover:bg-gray-50 transition-all duration-200 active:scale-95"
              >
                Thử lại
              </button>
            )}
            <button
              onClick={onNext}
              className={`
                px-8 py-3 rounded-lg text-white font-semibold text-base
                transition-all duration-200 hover:opacity-90 active:scale-95
                ${isCorrect 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-red-600 hover:bg-red-700'
                }
              `}
              data-testid="lesson-button"
            >
              Tiếp theo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerFeedbackPanel;
