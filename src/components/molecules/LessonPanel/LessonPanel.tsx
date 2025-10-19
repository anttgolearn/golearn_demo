import React from "react";
import QuizButton from "../../atoms/Button/QuizButton";

type LessonPanelProps = {
  buttonText: string;
  onButtonClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'error';
  showResult?: boolean;
  isCorrect?: boolean;
  resultText?: string;
};

export const LessonPanel: React.FC<LessonPanelProps> = ({
  buttonText,
  onButtonClick,
  disabled = false,
  variant = 'primary',
  showResult = false,
  isCorrect = false,
  resultText,
}) => {
  // Determine button variant based on result
  const getButtonVariant = () => {
    if (disabled) return 'disabled';
    if (showResult && isCorrect) return 'success';
    if (showResult && !isCorrect) return 'error';
    return variant;
  };

  return (
    <div className="fixed inset-x-0 bottom-0 pb-6">
      <div className="w-full max-w-4xl mx-auto px-4 flex flex-col items-center gap-4">
        {/* Result display */}
        {showResult && resultText && (
          <div className={`px-6 py-3 rounded-xl text-center font-medium text-base ${
            isCorrect 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {resultText}
          </div>
        )}
        
        {/* Button */}
        <QuizButton
          variant={getButtonVariant()}
          onClick={onButtonClick}
          disabled={disabled}
          size="lg"
          testId="lesson-button"
          className="w-full"
        >
          {buttonText}
        </QuizButton>
      </div>
    </div>
  );
};

export default LessonPanel;
