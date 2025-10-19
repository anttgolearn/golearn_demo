import React, { useState, useRef, useEffect } from "react";
import { Question, QuestionTypeRendererProps } from "./QuestionTypeRenderer";

interface DialogQuestionProps extends Omit<QuestionTypeRendererProps, 'question'> {
  question: Question;
}

export const DialogQuestion: React.FC<DialogQuestionProps> = ({
  question,
  selectedAnswers,
  showResult,
  onAnswerSelect,
  onSubmitAnswer,
  onNextQuestion,
  isLastQuestion,
  onRetry
}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoParts = question.questionParts.filter(part => part.type === 'video');
  const visibleVideosCount = Math.min(completedSteps + 1, videoParts.length);
  const currentVideo = videoParts[currentVideoIndex];

  // Reset video state when question changes
  useEffect(() => {
    setCurrentVideoIndex(0);
    setCompletedSteps(0);
  }, [question.id]);

  const handleVideoEnd = () => {
    if (currentVideoIndex < videoParts.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
      setCompletedSteps(prev => prev + 1);
    } else {
      setCompletedSteps(prev => prev + 1);
    }
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <div className="w-full max-w-6xl mx-auto p-4">
        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {question.title}
          </h2>

          {/* Dialog Videos */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Hội thoại
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSubtitle(!showSubtitle)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    showSubtitle 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {showSubtitle ? 'Ẩn phụ đề' : 'Hiện phụ đề'}
                </button>
              </div>
            </div>

            {/* Video Container */}
            <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-4">
              {currentVideo && (
                <div className="relative">
                  <video 
                    ref={videoRef}
                    className="w-full h-80 object-cover"
                    src={currentVideo.url}
                    playsInline
                    controls
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                    onEnded={handleVideoEnd}
                  />
                  
                  {/* Subtitle Overlay */}
                  {showSubtitle && currentVideo.caption && (
                    <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm font-medium mb-1">
                          {currentVideo.dialogPerson === 'a' ? 'Person A' : 'Person B'}
                        </div>
                        <div className="text-lg">
                          {currentVideo.caption}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Video Progress Indicator */}
                  <div className="absolute top-4 left-4 right-4">
                    <div className="flex gap-2">
                      {videoParts.map((_, index) => (
                        <div
                          key={index}
                          className={`h-1 flex-1 rounded ${
                            index <= currentVideoIndex 
                              ? 'bg-indigo-500' 
                              : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Video Status Indicator */}
                  {isVideoPlaying && (
                    <div className="absolute top-4 right-4 bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Đang phát
                    </div>
                  )}
                </div>
              )}

              {/* Next Video Indicator */}
              {currentVideoIndex < videoParts.length - 1 && (
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                  <div className="bg-white/90 text-indigo-600 px-3 py-2 rounded-lg shadow-lg">
                    <div className="text-sm font-medium">Tiếp theo</div>
                    <div className="text-xs">
                      {videoParts[currentVideoIndex + 1]?.dialogPerson === 'a' ? 'Person A' : 'Person B'}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dialog Participants */}
            <div className="flex justify-center gap-8">
              <div className={`text-center p-4 rounded-lg transition-all ${
                currentVideo?.dialogPerson === 'a' 
                  ? 'bg-indigo-100 border-2 border-indigo-500' 
                  : 'bg-gray-100'
              }`}>
                <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
                  A
                </div>
                <div className="text-sm font-medium text-gray-700">Person A</div>
              </div>
              
              <div className={`text-center p-4 rounded-lg transition-all ${
                currentVideo?.dialogPerson === 'b' 
                  ? 'bg-indigo-100 border-2 border-indigo-500' 
                  : 'bg-gray-100'
              }`}>
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
                  B
                </div>
                <div className="text-sm font-medium text-gray-700">Person B</div>
              </div>
            </div>
          </div>

          {/* Answer Options - Only show after all videos are watched */}
          {completedSteps >= videoParts.length && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Chọn câu trả lời đúng:
              </h3>
              
              {question.answerOptions.map((option, index) => {
                const status = getAnswerStatus(option);
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left answer-option ${
                      selectedAnswers.includes(option.id)
                        ? 'border-indigo-500 bg-indigo-50 selected'
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
                      {/* Selection Indicator */}
                      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center selection-indicator ${
                        selectedAnswers.includes(option.id)
                          ? 'border-indigo-500 bg-indigo-500 selected'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswers.includes(option.id) && (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>

                      {/* Answer Text */}
                      <div className="flex-1 font-medium text-gray-800">
                        {option.answerText}
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
          )}

          {/* Progress Indicator */}
          {completedSteps < videoParts.length && (
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <div className="flex items-center gap-3">
                <div className="text-indigo-500 text-xl">👀</div>
                <div className="text-sm text-indigo-700">
                  <strong>Xem hết video để tiếp tục:</strong> {completedSteps}/{videoParts.length} video đã xem
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
            {completedSteps < videoParts.length ? (
              <div className="px-6 py-3 text-gray-500">
                Xem hết video để tiếp tục
              </div>
            ) : !showResult ? (
              <button
                onClick={onSubmitAnswer}
                disabled={selectedAnswers.length === 0}
                className="px-8 py-3 bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

export default DialogQuestion;
