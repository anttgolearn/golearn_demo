import React from 'react';

type OptionProps = {
  text: string;
  url?: string | null;
  isCorrect?: boolean;
  label?: string | null;
};

type ChoosePanelProps = {
  options: OptionProps[];
  selectedAnswers: number[];
  onSubmitAnswer: (index: number) => void;
  isAnswered: boolean;
  type: 'single' | 'multiple';
};

export const TextAnswers: React.FC<ChoosePanelProps> = ({
  options,
  selectedAnswers,
  onSubmitAnswer,
  isAnswered,
  type,
}) => {
  const isSelected = (index: number) => selectedAnswers.includes(index);
  const isCorrect = (index: number) => options[index]?.isCorrect;

  return (
    <div className="w-full max-w-4xl mb-8" data-testid="question-type-text">
      <div className="flex flex-col gap-4">
        {options.map((option, index) => (
          <div
            key={index}
            tabIndex={0}
            className={`flex items-center justify-between rounded-xl border-2 px-6 py-4 text-left transition-all duration-200 cursor-pointer ${
              isAnswered
                ? (isCorrect(index)
                    ? 'border-green-500 bg-green-50'
                    : (isSelected(index) ? 'border-red-500 bg-red-50' : 'border-gray-300'))
                : (isSelected(index) ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400')
            } ${isAnswered ? 'cursor-not-allowed opacity-75' : ''}`}
            data-testid={`question-option-${index}`}
            style={{ transitionDuration: '0s' }}
            onClick={() => !isAnswered && onSubmitAnswer(index)}
          >
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">
                  <span className="font-mono">{option.text}</span>
                </div>
                {option.label && (
                  <div className="text-sm text-gray-600 mt-1">{option.label}</div>
                )}
              </div>
            </div>
            <span 
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm font-bold"
              data-testid={`keyboard-button-${index + 1}`}
            >
              {index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
