import React, { useState, useRef } from "react";
import { Question, QuestionTypeRendererProps } from "./QuestionTypeRenderer";

interface MultipleChoiceQuestionProps extends Omit<QuestionTypeRendererProps, 'question'> {
  question: Question;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  selectedAnswers,
  showResult,
  onAnswerSelect,
  onSubmitAnswer,
  onNextQuestion,
  isLastQuestion,
  onRetry
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleVideoPlay = (index: number) => {
    setIsVideoPlaying(index);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(null);
  };

  const handleAnswerSelect = (optionId: number) => {
    onAnswerSelect(optionId);
  };

  const getAnswerStatus = (option: any) => {
    if (!showResult) return '';
    
    if (option.isCorrect) {
      return 'correct';
    } else if (selectedAnswers.includes(option.id)) {
      return 'incorrect';
    }
    return '';
  };

  const getCorrectAnswersCount = () => {
    return question.answerOptions.filter(option => option.isCorrect).length;
  };

  const getSelectedCorrectCount = () => {
    return selectedAnswers.filter(answerId => {
      const option = question.answerOptions.find(opt => opt.id === answerId);
      return option?.isCorrect;
    }).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100">
      <div className="w-full max-w-4xl mx-auto p-4">
        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {question.title}
          </h2>

          {/* Question Content */}
          <div className="mb-8">
            {question.questionParts.map((part, index) => (
              <div key={index} className="mb-4">
                {part.type === 'video' && part.url && (
                  <div className="relative bg-gray-100 rounded-xl overflow-hidden">
                    <video 
                      ref={el => videoRefs.current[index] = el}
                      className="w-full h-64 object-cover"
                      src={part.url}
                      playsInline
                      controls
                      onPlay={() => handleVideoPlay(index)}
                      onPause={handleVideoPause}
                    />
                    {part.caption && (
                      <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-3 rounded-lg">
                        {part.caption}
                      </div>
                    )}
                  </div>
                )}
                
                {part.type === 'html' && part.content && (
                  <div 
                    className="text-lg text-gray-700"
                    dangerouslySetInnerHTML={{ __html: part.content }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Chọn tất cả đáp án đúng:
              </h3>
              <div className="text-sm text-gray-500">
                {selectedAnswers.length} đã chọn / {getCorrectAnswersCount()} đáp án đúng
              </div>
            </div>
            
            {question.answerOptions.map((option, index) => {
              const status = getAnswerStatus(option);
              
              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left answer-option ${
                    selectedAnswers.includes(option.id)
                      ? 'border-orange-500 bg-orange-50 selected'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  } ${
                    showResult 
                      ? status === 'correct'
                        ? 'border-green-500 bg-green-50 correct'
                        : status === 'incorrect'
                          ? 'border-red-500 bg-red-50 incorrect'
                          : 'border-gray-200'
                      : ''
                  }`}
                  disabled={showResult}
                >
                  <div className="flex items-center gap-4">
                    {/* Checkbox */}
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center selection-indicator ${
                      selectedAnswers.includes(option.id)
                        ? 'border-orange-500 bg-orange-500 selected'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswers.includes(option.id) && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>

                    {/* Answer Content */}
                    <div className="flex-1">
                      {option.media && (
                        <div className="mb-3">
                          <video 
                            ref={el => videoRefs.current[question.questionParts.length + index] = el}
                            className="w-32 h-20 object-cover rounded-lg"
                            src={option.media.url}
                            playsInline
                            muted
                            onPlay={() => handleVideoPlay(question.questionParts.length + index)}
                            onPause={handleVideoPause}
                          />
                        </div>
                      )}
                      
                      <div className="font-medium text-gray-800">
                        {option.answerText}
                      </div>
                      
                      {option.media?.caption && (
                        <div className="text-sm text-gray-500 mt-1">
                          {option.media.caption}
                        </div>
                      )}
                    </div>

                    {/* Result Indicator */}
                    {showResult && (
                      <div className="text-2xl result-indicator">
                        {status === 'correct' ? '✅' : status === 'incorrect' ? '❌' : ''}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Progress Indicator */}
          {!showResult && (
            <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center gap-3">
                <div className="text-orange-500 text-xl">💡</div>
                <div className="text-sm text-orange-700">
                  <strong>Mẹo:</strong> Có thể có nhiều đáp án đúng. Hãy chọn tất cả các đáp án bạn cho là đúng.
                </div>
              </div>
            </div>
          )}

          {/* Result Summary */}
          {showResult && (
            <div className="mt-6 p-4 rounded-lg border-2 ${
              getSelectedCorrectCount() === getCorrectAnswersCount() && selectedAnswers.length === getCorrectAnswersCount()
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }">
              <div className="flex items-center gap-3">
                <div className="text-2xl">
                  {getSelectedCorrectCount() === getCorrectAnswersCount() && selectedAnswers.length === getCorrectAnswersCount()
                    ? '🎉'
                    : '😔'
                  }
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    {getSelectedCorrectCount() === getCorrectAnswersCount() && selectedAnswers.length === getCorrectAnswersCount()
                      ? 'Chính xác!'
                      : 'Chưa hoàn toàn đúng'
                    }
                  </div>
                  <div className="text-sm text-gray-600">
                    Bạn đã chọn đúng {getSelectedCorrectCount()}/{getCorrectAnswersCount()} đáp án đúng
                    {selectedAnswers.length > getCorrectAnswersCount() && 
                      ` (${selectedAnswers.length - getCorrectAnswersCount()} đáp án sai)`
                    }
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={onRetry}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Làm lại
          </button>

          <div className="flex gap-4">
            {!showResult ? (
              <button
                onClick={onSubmitAnswer}
                disabled={selectedAnswers.length === 0}
                className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Kiểm tra
              </button>
            ) : (
              <button
                onClick={onNextQuestion}
                className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors"
              >
                {isLastQuestion ? 'Hoàn thành' : 'Tiếp theo'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
