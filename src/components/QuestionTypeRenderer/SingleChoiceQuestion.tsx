import React, { useState, useRef } from "react";
import { Question, QuestionTypeRendererProps } from "./QuestionTypeRenderer";

interface SingleChoiceQuestionProps extends Omit<QuestionTypeRendererProps, 'question'> {
  question: Question;
}

export const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
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
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Chọn một đáp án đúng:
            </h3>
            
            {question.answerOptions.map((option, index) => {
              const status = getAnswerStatus(option);
              
              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left answer-option ${
                    selectedAnswers.includes(option.id)
                      ? 'border-green-500 bg-green-50 selected'
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
                    {/* Radio Button */}
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center selection-indicator ${
                      selectedAnswers.includes(option.id)
                        ? 'border-green-500 bg-green-500 selected'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswers.includes(option.id) && (
                        <div className="w-3 h-3 bg-white rounded-full" />
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
                className="px-8 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

export default SingleChoiceQuestion;
