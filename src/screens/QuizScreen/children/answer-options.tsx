import React, { useEffect } from "react";
import { OptionsCloze } from "./options-cloze";
import { OptionsSingleMultiple } from "./options-single-multiple";

type Option = {
  label: string;
  videoSrc?: string;
};

type AnswerOptionsProps = {
  isDialog?: boolean;
  prompt?: string;
  options?: string[];
  videoOptions?: Option[];
  selected?: string | string[] | null;
  onSelect: (label: string) => void;
  showResult?: boolean;
  correctAnswer?: string;
  // multiple-select support
  multiSelect?: boolean;
  correctAnswers?: string[];
  onSelectMulti?: (labels: string[]) => void;
  // cloze answer support
  type?: "single" | "multiple" | "cloze_answer" | "CONTENT" | "MULTIPLE_CHOICE";
  question?: {
    id: string;
    prompt: string;
    mediaUrl?: string;
    gapParts?: string[];
    options?: string[];
    correctAnswer?: string | string[];
    isTyping?: boolean;
    isAnswered?: boolean;
  };
  buttonText?: string;
  onButtonClick?: () => void;
  buttonDisabled?: boolean;
  onMirrorClick?: () => void;
  // Advanced features
  onSubmitAnswer?: (answers: Array<string> | Array<number>, isFinalAnswer?: boolean) => void;
  selectedAnswers?: Array<string> | Array<number>;
};

export const AnswerOptions: React.FC<AnswerOptionsProps> = ({
  options,
  videoOptions,
  selected,
  onSelect,
  showResult,
  correctAnswer,
  multiSelect,
  correctAnswers,
  onSelectMulti,
  type,
  question,
  onSubmitAnswer,
}) => {
  // Handle cloze answer type
  if (type === 'cloze_answer' && question) {
    console.log('Rendering cloze question:', { type, question, options, correctAnswer });
    return (
      <OptionsCloze
        question={{
          ...question,
          correctFills: question.correctAnswer ? String(question.correctAnswer) : undefined,
          // Keep options as they are - OptionsCloze will use question.options for hints
        }}
        selected={selected}
        onSelect={(value) => {
          console.log('AnswerOptions onSelect called with:', value);
          // Always call the parent onSelect to update selected state
          onSelect(value);
          // Also call onSubmitAnswer if available
          if (onSubmitAnswer) {
            onSubmitAnswer([value], false); // Don't submit immediately, just update selection
          }
        }}
        correctAnswer={correctAnswer}
        showResult={showResult}
      />
    );
  }

  // Handle single/multiple answer types with new OptionsSingleMultiple
  if ((type === 'single' || type === 'multiple') && options) {
    // Convert current format to OptionsSingleMultiple format
    const answerOptions = options.map((option, index) => ({
      answerText: option,
      media: videoOptions?.[index] ? {
        url: videoOptions[index].videoSrc,
        label: videoOptions[index].label,
      } : undefined,
      isCorrect: Array.isArray(correctAnswers) ? correctAnswers.includes(option) : option === correctAnswer,
    }));

    const selectedAnswers = Array.isArray(selected) 
      ? selected.map(s => options.indexOf(s)).filter(i => i !== -1)
      : selected ? [options.indexOf(selected)].filter(i => i !== -1) : [];

    return (
      <OptionsSingleMultiple
        question={{
          answerOptions,
          type: type === 'single' ? 'single' : 'multiple',
          isAnswered: showResult,
        }}
        selectedAnswers={selectedAnswers}
        onSubmitAnswer={(answers) => {
          if (onSubmitAnswer) {
            onSubmitAnswer(answers, true);
          } else if (type === 'single') {
            onSelect(options[answers[0]] || '');
          } else {
            onSelectMulti?.(answers.map(i => options[i]).filter(Boolean));
          }
        }}
      />
    );
  }

  const isSelected = (label: string) => {
    return Array.isArray(selected) ? selected.includes(label) : selected === label;
  };
  const toggleSelect = (label: string) => {
    if (!multiSelect) {
      onSelect(label);
      return;
    }
    const current = Array.isArray(selected) ? selected : [];
    const next = current.includes(label) ? current.filter(l => l !== label) : [...current, label];
    onSelectMulti?.(next);
  };

  if (videoOptions && videoOptions.length) {
    return (
      <div className="w-full max-w-5xl mb-8" data-testid="question-type-single">
        <div className={`grid gap-4 ${videoOptions.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
          {videoOptions.map((option, index) => (
            <div
              key={index}
              tabIndex={0}
              className={`relative cursor-pointer transition-all duration-200 ${
                showResult ? 'cursor-not-allowed opacity-75' : ''
              }`}
              data-testid={`question-option-${index}`}
              style={{ transitionDuration: '0s' }}
              onClick={() => !showResult && toggleSelect(option.label)}
            >
              {/* Video Answer Container */}
              <div 
                className="relative rounded-2xl border-2 overflow-hidden h-72 md:h-80 lg:h-[420px] bg-white"
                data-testid="atom-video-answer"
              >
                {/* Video Answer Border */}
                <div 
                  className={`absolute inset-0 rounded-xl border-2 ${
                    isSelected(option.label)
                      ? 'border-orange-500' 
                      : 'border-gray-300'
                  }`}
                  data-testid="video-answer-border"
                />
                
                {/* Video */}
                <video
                  src={option.videoSrc || ""}
                  autoPlay
                  loop
                  playsInline
                  style={{
                    position: 'absolute',
                    inset: '0px',
                    objectFit: 'contain',
                    width: '100%',
                    height: '100%'
                  }}
                />
                
                {/* Radio Button */}
                <div className="absolute top-2 right-2">
                  <div 
                    role="radio" 
                    tabIndex={0}
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                      isSelected(option.label)
                        ? 'border-orange-500 bg-orange-500'
                        : 'border-gray-400 bg-white'
                    }`}
                    data-testid={isSelected(option.label) ? "radio-circle-selected" : "radio-correct-option"}
                  >
                    {isSelected(option.label) && (
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
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mb-8" data-testid="question-type-single">
      <div className="flex flex-col gap-4">
        {(options || []).map((o, i) => (
          <div
            key={o}
            tabIndex={0}
            className={`flex items-center justify-between rounded-xl border-2 px-6 py-4 text-left transition-all duration-200 cursor-pointer ${
              showResult 
                ? (Array.isArray(correctAnswers)
                    ? (correctAnswers.includes(o) ? 'border-green-500 bg-green-50' : (isSelected(o) ? 'border-red-500 bg-red-50' : 'border-gray-300'))
                    : (o === correctAnswer ? 'border-green-500 bg-green-50' : (isSelected(o) ? 'border-red-500 bg-red-50' : 'border-gray-300')))
                : (isSelected(o) ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400')
            } ${showResult ? 'cursor-not-allowed opacity-75' : ''}`}
            data-testid={`question-option-${i}`}
            style={{ transitionDuration: '0s' }}
            onClick={() => !showResult && (multiSelect ? toggleSelect(o) : onSelect(o))}
          >
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">
                  <span className="font-mono">{o}</span>
                </div>
              </div>
            </div>
            <span 
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm font-bold"
              data-testid={`keyboard-button-${i + 1}`}
            >
              {i + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Keyboard support: 1-4 to select/toggle answers when visible
export const useKeyboardAnswerShortcuts = (
  enabled: boolean,
  count: number,
  onPress: (index: number) => void
) => {
  useEffect(() => {
    if (!enabled || count <= 0) return;
    const handler = (evt: KeyboardEvent) => {
      if (/^[1-4]$/.test(evt.key)) {
        const idx = Number(evt.key) - 1;
        if (idx < count) onPress(idx);
      }
    };
    window.addEventListener('keyup', handler);
    return () => window.removeEventListener('keyup', handler);
  }, [enabled, count, onPress]);
};

export default AnswerOptions;


