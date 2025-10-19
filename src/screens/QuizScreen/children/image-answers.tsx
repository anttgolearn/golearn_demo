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

export const ImageAnswers: React.FC<ChoosePanelProps> = ({
  options,
  selectedAnswers,
  onSubmitAnswer,
  isAnswered,
  type,
}) => {
  const isSelected = (index: number) => selectedAnswers.includes(index);
  const isCorrect = (index: number) => options[index]?.isCorrect;

  return (
    <div className="w-full max-w-4xl mb-8" data-testid="question-type-image">
      <div className={`grid gap-4 ${options.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {options.map((option, index) => (
          <div
            key={index}
            tabIndex={0}
            className={`relative cursor-pointer transition-all duration-200 ${
              isAnswered ? 'cursor-not-allowed opacity-75' : ''
            }`}
            data-testid={`question-option-${index}`}
            style={{ transitionDuration: '0s' }}
            onClick={() => !isAnswered && onSubmitAnswer(index)}
          >
            {/* Image Answer Container */}
            <div 
              className="relative rounded-2xl border-2 overflow-hidden h-72 md:h-80 lg:h-[420px] bg-white"
              data-testid="atom-image-answer"
            >
              {/* Image Answer Border */}
              <div 
                className={`absolute inset-0 rounded-xl border-2 ${
                  isAnswered
                    ? (isCorrect(index)
                        ? 'border-green-500'
                        : (isSelected(index) ? 'border-red-500' : 'border-gray-300'))
                    : (isSelected(index) ? 'border-blue-500' : 'border-gray-300')
                }`}
                data-testid="image-answer-border"
              />
              
              {/* Image */}
              {option.url ? (
                <img
                  src={option.url}
                  alt={option.text}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-gray-500 text-lg">{option.text}</span>
                </div>
              )}
              
              {/* Radio/Checkbox Button */}
              <div className="absolute top-2 right-2">
                <div 
                  role={type === 'multiple' ? 'checkbox' : 'radio'}
                  tabIndex={0}
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                    isAnswered
                      ? (isCorrect(index)
                          ? 'border-green-500 bg-green-500'
                          : (isSelected(index) ? 'border-red-500 bg-red-500' : 'border-gray-400 bg-white'))
                      : (isSelected(index) ? 'border-blue-500 bg-blue-500' : 'border-gray-400 bg-white')
                  }`}
                  data-testid={isSelected(index) ? "radio-circle-selected" : "radio-correct-option"}
                >
                  {isSelected(index) && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  )}
                </div>
              </div>
            </div>
            
            {/* Option Number */}
            <span 
              className="absolute bottom-1 right-1 inline-flex items-center justify-center w-6 h-6 rounded bg-gray-200 text-gray-700 text-sm font-bold"
              data-testid={`keyboard-button-${index + 1}`}
              style={{ bottom: '4px', right: '4px' }}
            >
              {index + 1}
            </span>
            
            {/* Option Label */}
            {option.label && (
              <div className="mt-2 text-center">
                <span className="text-sm text-gray-600">{option.label}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
