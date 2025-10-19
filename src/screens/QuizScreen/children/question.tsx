import React, { useEffect, useRef, useState } from "react";
import AnswerOptions, { useKeyboardAnswerShortcuts } from "./answer-options";
import { LessonPanel } from "../../../components/molecules/LessonPanel/LessonPanel";
import CorrectIcon from "../../../components/atoms/Icon/CorrectIcon";
import IncorrectIcon from "../../../components/atoms/Icon/IncorrectIcon";
import QuizButton from "../../../components/atoms/Button/QuizButton";

type QuestionPart = {
  type: 'video' | 'image' | 'html' | 'table';
  url?: string;
  content?: string;
};

type QuestionProps = {
  // Core question data
  prompt: string;
  type?: "CONTENT" | "SINGLE" | "MULTIPLE" | "CLOZE_ANSWER" | "MULTIPLE_CHOICE" | "ICONIC_LEARNING" | string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  questionParts?: QuestionPart[];
  // Choice-based
  options?: string[];
  videoOptions?: Array<{ label: string; videoSrc?: string }>;
  selected?: string | string[] | null;
  onSelect: (o: string) => void;
  showResult?: boolean;
  correctAnswer?: string;
  // multiple-select support
  multiSelect?: boolean;
  correctAnswers?: string[];
  onSelectMulti?: (labels: string[]) => void;
  // Cloze support (minimal)
  isTyping?: boolean;
  gapParts?: string[];
  // Button behavior
  buttonText?: string;
  onButtonClick?: () => void;
  buttonDisabled?: boolean;
  // Mirror support
  onMirrorClick?: (videoSrc: string) => void;
  // Advanced features
  isLastQuestion?: boolean;
  isQuizDialog?: boolean;
  onQuestionConfirmed?: () => void;
  // Answer handling
  onSubmitAnswer?: (answers: Array<string> | Array<number>, isFinalAnswer?: boolean) => void;
  selectedAnswers?: Array<string> | Array<number>;
  // Iconic Learning specific props
  iconicOptions?: Array<{
    id: number;
    image: string;
    text: string;
    isCorrect: boolean;
    type?: "image" | "video";
  }>;
  currentIndex?: number;
  totalQuestions?: number;
  onIconicAnswer?: (answerId: number) => void;
};

export const Question: React.FC<QuestionProps> = ({
  prompt,
  type,
  mediaUrl,
  mediaType,
  options,
  videoOptions,
  selected,
  onSelect,
  showResult,
  correctAnswer,
  multiSelect,
  correctAnswers,
  onSelectMulti,
  isTyping,
  gapParts: _gapParts,
  buttonText = "Kiểm tra",
  onButtonClick,
  buttonDisabled = false,
  onSubmitAnswer,
  selectedAnswers = [],
  // Iconic Learning props
  iconicOptions = [],
  currentIndex = 0,
  totalQuestions = 1,
  onIconicAnswer,
}) => {
  // Advanced features state
  const [shouldScrollUp, setShouldScrollUp] = useState(true);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset state when question changes
  useEffect(() => {
    setShouldScrollUp(true);
    setIsCorrect(null);
    setIsAnswered(false);
  }, [prompt]);

  // Reset isAnswered when showResult becomes false (allowing re-selection)
  useEffect(() => {
    if (!showResult) {
      setIsAnswered(false);
    }
  }, [showResult]);

  // For ICONIC_LEARNING, allow re-selection until showResult is true
  const canSelect = type === 'ICONIC_LEARNING' ? !showResult : !isAnswered;

  // Keyboard support for Enter key
  useEffect(() => {
    const handler = (evt: KeyboardEvent) => {
      if (evt.key === 'Enter' && onSubmitAnswer) {
        onSubmitAnswer(selectedAnswers, true);
      }
    };
    window.addEventListener('keyup', handler);
    return () => window.removeEventListener('keyup', handler);
  }, [onSubmitAnswer, selectedAnswers]);

  // Auto scroll to top when question changes
  useEffect(() => {
    if (shouldScrollUp && scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      setShouldScrollUp(false);
    }
  }, [shouldScrollUp]);

  // Helper function to check answer correctness
  const isAnswerCorrect = (userAnswer: string, correctAnswer: string): boolean => {
    const normalize = (str: string) => str.toLowerCase().trim();
    return normalize(userAnswer) === normalize(correctAnswer);
  };

  // Enhanced answer handling with advanced logic
  const handleAnswerSubmitted = (
    _answers: Array<number> | Array<string>,
    isFinalAnswer = false,
  ) => {
    if (!isFinalAnswer && type !== 'CONTENT') {
      // Update selected answers but don't submit yet
      if (onSubmitAnswer) {
        onSubmitAnswer(_answers, false);
      }
    } else if (!isAnswered || type === 'ICONIC_LEARNING') {
      // Submit final answer and check correctness
      let correct = false;
      
      switch (type) {
        case 'CONTENT':
          correct = true;
          break;
        case 'SINGLE':
          const index = _answers[0] as number;
          correct = Boolean(options?.[index] === correctAnswer);
          break;
        case 'MULTIPLE':
          const indices = _answers as Array<number>;
          const correctIndices = options?.map((opt) => 
            Array.isArray(correctAnswers) ? correctAnswers.includes(opt) : opt === correctAnswer
          ) || [];
          correct = correctIndices.every((isCorrectOption, index) => 
            isCorrectOption === indices.includes(index)
          );
          break;
        case 'CLOZE_ANSWER':
          const fills = _answers as Array<string>;
          const correctFills = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer || ''];
          if (isTyping) {
            // For typing mode, use fuzzy matching
            correct = correctFills.some(correctFill => 
              isAnswerCorrect(fills[0] || '', correctFill)
            );
          } else {
            // For click-to-select mode, check exact match
            correct = correctFills.every((f, i) => f.includes(fills[i] || ''));
          }
          break;
        case 'ICONIC_LEARNING':
          // For iconic learning, the answer is handled by onIconicAnswer
          correct = true; // This will be determined by the parent component
          break;
        default:
          correct = false;
      }

      // Update state
      setIsCorrect(correct);
      setIsAnswered(true);
      
      // Update state and trigger callbacks
      if (onSubmitAnswer) {
        onSubmitAnswer(_answers, true);
      }
      
      // Handle correct answer feedback
      if (correct && onButtonClick) {
        onButtonClick();
      }
    } else {
      // Question already answered, proceed to next
      if (onButtonClick) {
        onButtonClick();
      }
    }
  };

  if (type === 'CONTENT') {
    // Content slides are rendered by parent via ContentPage. Do nothing here.
    return null;
  }

  if (type === 'CLOZE_ANSWER') {
    return (
      <div 
        ref={scrollRef}
        className="w-full max-w-4xl mx-auto px-4 overflow-y-auto"
        style={{ maxHeight: '80vh' }}
      >
        <AnswerOptions
          type={type === 'CLOZE_ANSWER' ? 'cloze_answer' : type}
          question={{
            id: 'cloze-question',
            prompt: prompt,
            mediaUrl: mediaUrl,
            gapParts: _gapParts,
            options: options,
            correctAnswer: correctAnswer,
            isTyping: isTyping,
            isAnswered: showResult
          }}
          selected={selected}
          onSelect={onSelect}
          showResult={showResult}
          correctAnswer={correctAnswer}
          buttonText={buttonText}
          onButtonClick={onButtonClick}
          buttonDisabled={buttonDisabled}
        />
        
        {/* Lesson Panel for cloze questions */}
        <LessonPanel
          buttonText={buttonText}
          onButtonClick={onButtonClick || (() => {})}
          disabled={buttonDisabled}
        />
      </div>
    );
  }

  if (type === 'ICONIC_LEARNING') {
    const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;
    
    return (
      <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6">
        {/* Progress bar trên cùng */}
        <div className="flex items-center justify-between">
        <button 
          aria-label="Open Quiz navigation" 
          className="p-2 rounded hover:bg-gray-200"
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
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none" width="28" height="28">
            <circle cx="18" cy="18" r="14" fill="#C7CBCD"/>
          </svg>
        </button>
      </div>

        {/* Tiêu đề */}
        <h2 className="text-lg font-medium text-gray-800 mt-8 mb-4 text-center">
          {prompt}
        </h2>

        {/* Video/Image trung tâm */}
        <div className="w-full max-w-md mb-6">
          <div className="rounded-xl overflow-hidden bg-gray-100">
            {mediaType === "image" ? (
              <img
                src={mediaUrl}
                alt="Question image"
                className="w-full aspect-square object-cover"
              />
            ) : (
              <video
                src={mediaUrl}
                className="w-full aspect-square object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            )}
          </div>
        </div>

        {/* Hai hình ảnh/video lựa chọn - Style tương tự Discover */}
        <div className="w-full max-w-5xl mb-8">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {iconicOptions.map((option, index) => {
              const isSelected = selected === option.id.toString();
              const isCorrectAnswer = option.isCorrect;
              const showCorrect = showResult && isCorrectAnswer;
              const showIncorrect = showResult && isSelected && !isCorrectAnswer;

              return (
                <div
                  key={option.id}
                  tabIndex={0}
                  className={`relative cursor-pointer transition-all duration-200 ${
                    !canSelect ? 'cursor-not-allowed opacity-75' : ''
                  }`}
                  onClick={() => canSelect && onIconicAnswer?.(option.id)}
                >
                  {/* Container - Style tương tự Discover */}
                  <div 
                    className={`relative rounded-2xl border-2 overflow-hidden h-72 md:h-80 lg:h-[420px] bg-white ${
                      isSelected
                        ? showCorrect
                          ? 'border-green-500'
                          : showIncorrect
                          ? 'border-red-500'
                          : 'border-blue-500'
                        : 'border-gray-300 hover:border-orange-200'
                    }`}
                  >
                    {/* Ảnh hoặc Video */}
                    {option.type === "video" ? (
                      <video
                        src={option.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                          position: 'absolute',
                          inset: '0px',
                          objectFit: 'contain',
                          width: '100%',
                          height: '100%'
                        }}
                      />
                    ) : (
                      <img
                        src={option.image}
                        alt={option.text}
                        style={{
                          position: 'absolute',
                          inset: '0px',
                          objectFit: 'contain',
                          width: '100%',
                          height: '100%'
                        }}
                      />
                    )}

                    {/* Radio Button - Style tương tự Discover */}
                    <div className="absolute top-2 right-2">
                      <div 
                        role="radio" 
                        tabIndex={0}
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? 'border-orange-500 bg-blue-500'
                            : 'border-gray-400 bg-white'
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2.5 h-2.5 bg-white rounded-full" />
                        )}
                      </div>
                    </div>

                    {/* Option Number - Style tương tự Discover */}
                    <span 
                      className="absolute bottom-1 right-1 inline-flex items-center justify-center w-6 h-6 rounded bg-gray-200 text-gray-700 text-sm font-bold"
                      style={{ bottom: '4px', right: '4px' }}
                    >
                      {index + 1}
                    </span>

                    {/* Feedback overlay */}
                    {showResult && (
                      <div
                        className={`absolute inset-0 flex items-center justify-center ${
                          showCorrect
                            ? 'bg-green-500/20'
                            : showIncorrect
                            ? 'bg-red-500/20'
                            : ''
                        }`}
                      >
                        {showCorrect && <CorrectIcon size={40} />}
                        {showIncorrect && <IncorrectIcon size={40} />}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feedback message */}
        {showResult && (
          <div
            className={`text-center mt-6 px-4 py-2 rounded-md ${
              isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}
          >
            <p className="font-medium text-base">
              {isCorrect ? 'Chính xác! 🎉' : 'Sai rồi! Hãy thử lại 💪'}
            </p>
          </div>
        )}

        {/* Button - Using QuizButton component */}
        <div className="flex justify-center mt-8">
          <QuizButton
            onClick={onButtonClick}
            disabled={buttonDisabled}
            variant={buttonDisabled ? 'disabled' : 'primary'}
            size="lg"
            testId="iconic-quiz-button"
          >
            {buttonText || "Kiểm tra"}
          </QuizButton>
        </div>
      </div>
    );
  }
  

  return (
    <div 
      ref={scrollRef}
      className="w-full max-w-4xl mx-auto px-4 overflow-y-auto"
      style={{ maxHeight: '80vh' }}
    >
      {/* Question Title */}
      <div className="text-center text-xl font-bold mb-8 w-full">{prompt}</div>
      
      {/* Video Display: only show when there are no videoOptions (e.g., cloze or text options) */}
      {mediaUrl && !(videoOptions && videoOptions.length) && (
        <div className="w-full max-w-4xl mb-8">
          <div className="relative rounded-xl border bg-white overflow-hidden h-64" data-testid="atom-video">
            <video
              src={mediaUrl}
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
          </div>
        </div>
      )}

      {/* Answer Options */}
      {(() => { useKeyboardAnswerShortcuts(
        !showResult,
        (options?.length || videoOptions?.length || 0),
        (idx) => {
          const label = options ? options[idx] : videoOptions?.[idx]?.label;
          if (!label) return;
          if (Array.isArray(correctAnswers)) {
            onSelectMulti?.(
              Array.isArray(selected)
                ? (selected.includes(label) ? (selected as string[]).filter(l => l !== label) : [...(selected as string[]), label])
                : [label]
            );
          } else {
            onSelect(label);
          }
        }
      ); return null; })()}
      <AnswerOptions
        options={options}
        videoOptions={videoOptions}
        selected={selected}
        onSelect={onSelect}
        showResult={isAnswered}
        correctAnswer={correctAnswer}
        multiSelect={multiSelect}
        correctAnswers={correctAnswers}
        onSelectMulti={onSelectMulti}
        onSubmitAnswer={handleAnswerSubmitted}
        selectedAnswers={selectedAnswers}
      />

      {/* Answer Feedback */}
      {isAnswered && isCorrect !== null && (
        <div className={`w-full max-w-4xl mx-auto px-4 py-4 rounded-lg text-center ${
          isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {isCorrect ? '✅ Đúng rồi!' : '❌ Sai rồi!'}
        </div>
      )}

      {/* Lesson Panel - only show if not showing result feedback */}
      {!isAnswered && (
        <LessonPanel
          buttonText={buttonText}
          onButtonClick={onButtonClick || (() => {})}
          disabled={buttonDisabled}
        />
      )}
    </div>
  );
};

export default Question;


