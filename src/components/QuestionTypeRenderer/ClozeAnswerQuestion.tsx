import React, { useState, useRef, useEffect } from "react";
import { Question, QuestionTypeRendererProps } from "./QuestionTypeRenderer";

interface ClozeAnswerQuestionProps extends Omit<QuestionTypeRendererProps, 'question'> {
  question: Question;
}

export const ClozeAnswerQuestion: React.FC<ClozeAnswerQuestionProps> = ({
  question,
  selectedAnswers,
  showResult,
  onAnswerSelect,
  onSubmitAnswer,
  onNextQuestion,
  isLastQuestion,
  onRetry
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && !showResult) {
      inputRef.current.focus();
    }
  }, [showResult]);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmitAnswer = () => {
    if (inputValue.trim()) {
      // Find the correct answer
      const correctOption = question.answerOptions.find(option => option.isCorrect);
      const isCorrect = correctOption && 
        inputValue.toLowerCase().trim() === correctOption.answerText?.toLowerCase().trim();
      
      // Simulate selecting the correct answer
      if (isCorrect) {
        onAnswerSelect(correctOption.id);
      }
      
      onSubmitAnswer();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmitAnswer();
    }
  };

  const getCorrectAnswer = () => {
    return question.answerOptions.find(option => option.isCorrect)?.answerText || '';
  };

  const isCorrect = showResult && inputValue.toLowerCase().trim() === getCorrectAnswer().toLowerCase().trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
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
                      ref={videoRef}
                      className="w-full h-80 object-cover"
                      src={part.url}
                      playsInline
                      controls
                      onPlay={handleVideoPlay}
                      onPause={handleVideoPause}
                    />
                    {part.caption && (
                      <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-lg">
                        <div className="text-center">
                          <div className="text-lg font-medium">
                            {part.caption}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Video Status Indicator */}
                    {isVideoPlaying && (
                      <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Đang phát
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

          {/* Answer Input */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Điền từ vào chỗ trống:
            </h3>
            
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Nhập câu trả lời của bạn..."
                disabled={showResult}
                className={`w-full p-4 text-lg border-2 rounded-xl transition-all duration-200 focus:outline-none ${
                  showResult
                    ? isCorrect
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-red-500 bg-red-50 text-red-800'
                    : 'border-purple-300 focus:border-purple-500 focus:bg-purple-50'
                }`}
              />
              
              {/* Input Status Indicator */}
              {showResult && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl">
                  {isCorrect ? '✅' : '❌'}
                </div>
              )}
            </div>

            {/* Answer Options (Hints) */}
            {!showResult && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-600 mb-3">
                  Gợi ý (chọn một trong các từ sau):
                </h4>
                <div className="flex flex-wrap gap-2">
                  {question.answerOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setInputValue(option.answerText || '')}
                      className="px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                    >
                      {option.answerText}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Result Display */}
            {showResult && (
              <div className={`mt-6 p-4 rounded-lg border-2 ${
                isCorrect
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {isCorrect ? '🎉' : '😔'}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      {isCorrect ? 'Chính xác!' : 'Chưa đúng'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {isCorrect 
                        ? 'Bạn đã trả lời đúng!'
                        : `Đáp án đúng là: "${getCorrectAnswer()}"`
                      }
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Learning Tips */}
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <div className="flex items-start gap-3">
              <div className="text-purple-500 text-2xl">💡</div>
              <div>
                <h3 className="text-lg font-semibold text-purple-800 mb-2">
                  Mẹo học tập
                </h3>
                <p className="text-purple-700">
                  Hãy xem kỹ video và chú ý đến ngữ cảnh để tìm ra từ phù hợp. 
                  Sử dụng các gợi ý nếu cần thiết.
                </p>
              </div>
            </div>
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
                onClick={handleSubmitAnswer}
                disabled={!inputValue.trim()}
                className="px-8 py-3 bg-purple-500 text-white font-semibold rounded-xl hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

export default ClozeAnswerQuestion;
