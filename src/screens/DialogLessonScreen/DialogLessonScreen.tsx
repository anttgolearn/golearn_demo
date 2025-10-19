import React, { useState, useRef, useEffect } from "react";
import "./DialogLessonScreen.css";

// Types
export interface DialogQuestion {
  id: number;
  category: string;
  title: string;
  type: 'dialog';
  questionParts: DialogQuestionPart[];
  answerOptions: AnswerOption[];
  submittedAnswer?: Answer;
}

export interface DialogQuestionPart {
  type: 'video';
  url: string;
  content: string;
  caption: string;
  dialogPerson: 'a' | 'b';
  order: number;
}

export interface AnswerOption {
  id: number;
  answerText: string;
  isCorrect: boolean;
  media?: {
    type: 'video' | 'image';
    url: string;
    label: string;
    caption: string;
  };
}

export interface Answer {
  answerText?: string;
  isCorrect: boolean;
  selectedOptions?: number[];
}

type Props = {
  lessonId: string;
  onComplete: (score: number, totalQuestions: number) => void;
  onBack?: () => void;
};

export const DialogLessonScreen: React.FC<Props> = ({ 
  lessonId,
  onComplete, 
  onBack 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mock dialog questions
  const dialogQuestions: DialogQuestion[] = [
    {
      id: 1,
      category: 'dialog',
      title: 'Hội thoại chào hỏi',
      type: 'dialog',
      questionParts: [
        {
          type: 'video',
          url: '/resources/videos/dialog-hello-a.mp4',
          content: 'Xin chào!',
          caption: 'Person A: Xin chào!',
          dialogPerson: 'a',
          order: 1
        },
        {
          type: 'video',
          url: '/resources/videos/dialog-hello-b.mp4',
          content: 'Chào bạn!',
          caption: 'Person B: Chào bạn!',
          dialogPerson: 'b',
          order: 2
        },
        {
          type: 'video',
          url: '/resources/videos/dialog-hello-a2.mp4',
          content: 'Bạn có khỏe không?',
          caption: 'Person A: Bạn có khỏe không?',
          dialogPerson: 'a',
          order: 3
        },
        {
          type: 'video',
          url: '/resources/videos/dialog-hello-b2.mp4',
          content: 'Tôi khỏe, cảm ơn!',
          caption: 'Person B: Tôi khỏe, cảm ơn!',
          dialogPerson: 'b',
          order: 4
        }
      ],
      answerOptions: [
        {
          id: 1,
          answerText: 'Xin chào!',
          isCorrect: true
        },
        {
          id: 2,
          answerText: 'Tạm biệt!',
          isCorrect: false
        },
        {
          id: 3,
          answerText: 'Cảm ơn!',
          isCorrect: false
        },
        {
          id: 4,
          answerText: 'Xin lỗi!',
          isCorrect: false
        }
      ]
    },
    {
      id: 2,
      category: 'dialog',
      title: 'Hội thoại gia đình',
      type: 'dialog',
      questionParts: [
        {
          type: 'video',
          url: '/resources/videos/dialog-family-a.mp4',
          content: 'Gia đình bạn có bao nhiêu người?',
          caption: 'Person A: Gia đình bạn có bao nhiêu người?',
          dialogPerson: 'a',
          order: 1
        },
        {
          type: 'video',
          url: '/resources/videos/dialog-family-b.mp4',
          content: 'Gia đình tôi có 4 người.',
          caption: 'Person B: Gia đình tôi có 4 người.',
          dialogPerson: 'b',
          order: 2
        },
        {
          type: 'video',
          url: '/resources/videos/dialog-family-a2.mp4',
          content: 'Bạn có anh chị em không?',
          caption: 'Person A: Bạn có anh chị em không?',
          dialogPerson: 'a',
          order: 3
        },
        {
          type: 'video',
          url: '/resources/videos/dialog-family-b2.mp4',
          content: 'Tôi có một em gái.',
          caption: 'Person B: Tôi có một em gái.',
          dialogPerson: 'b',
          order: 4
        }
      ],
      answerOptions: [
        {
          id: 1,
          answerText: 'Gia đình tôi có 4 người.',
          isCorrect: true
        },
        {
          id: 2,
          answerText: 'Gia đình tôi có 2 người.',
          isCorrect: false
        },
        {
          id: 3,
          answerText: 'Tôi có một em gái.',
          isCorrect: true
        },
        {
          id: 4,
          answerText: 'Tôi có một anh trai.',
          isCorrect: false
        }
      ]
    }
  ];

  const currentQuestion = dialogQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / dialogQuestions.length) * 100;
  const videoParts = currentQuestion.questionParts.filter(part => part.type === 'video');
  const visibleVideosCount = Math.min(completedSteps + 1, videoParts.length);
  const currentVideo = videoParts[currentVideoIndex];

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Reset video state when question changes
  useEffect(() => {
    setCurrentVideoIndex(0);
    setCompletedSteps(0);
    setSelectedAnswers([]);
    setShowResult(false);
  }, [currentQuestionIndex]);

  const handleVideoEnd = () => {
    if (currentVideoIndex < videoParts.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
      setCompletedSteps(prev => prev + 1);
    } else {
      setCompletedSteps(prev => prev + 1);
    }
  };

  const handleAnswerSelect = (optionId: number) => {
    if (currentQuestion.type === 'dialog') {
      setSelectedAnswers(prev => 
        prev.includes(optionId) 
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswers.length === 0) return;

    const isCorrect = selectedAnswers.every(answerId => {
      const option = currentQuestion.answerOptions.find(opt => opt.id === answerId);
      return option?.isCorrect;
    });

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < dialogQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswers([]);
      setShowResult(false);
    } else {
      onComplete(score, dialogQuestions.length);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setScore(0);
    setTimeSpent(0);
    setCurrentVideoIndex(0);
    setCompletedSteps(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="w-full max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {onBack && (
            <button 
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Quay lại
            </button>
          )}
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Thời gian: {formatTime(timeSpent)}
            </div>
            <div className="text-sm text-gray-600">
              Điểm: {score}/{dialogQuestions.length}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Câu {currentQuestionIndex + 1} / {dialogQuestions.length}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Dialog Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {currentQuestion.title}
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
                      ? 'bg-purple-500 text-white' 
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
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
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
                              ? 'bg-purple-500' 
                              : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Next Video Indicator */}
              {currentVideoIndex < videoParts.length - 1 && (
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                  <div className="bg-white/90 text-purple-600 px-3 py-2 rounded-lg shadow-lg">
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
                  ? 'bg-purple-100 border-2 border-purple-500' 
                  : 'bg-gray-100'
              }`}>
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
                  A
                </div>
                <div className="text-sm font-medium text-gray-700">Person A</div>
              </div>
              
              <div className={`text-center p-4 rounded-lg transition-all ${
                currentVideo?.dialogPerson === 'b' 
                  ? 'bg-purple-100 border-2 border-purple-500' 
                  : 'bg-gray-100'
              }`}>
                <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
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
              
              {currentQuestion.answerOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedAnswers.includes(option.id)
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  } ${
                    showResult 
                      ? option.isCorrect 
                        ? 'border-green-500 bg-green-50' 
                        : selectedAnswers.includes(option.id) && !option.isCorrect
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200'
                      : ''
                  }`}
                  disabled={showResult}
                >
                  <div className="flex items-center gap-4">
                    {/* Selection Indicator */}
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                      selectedAnswers.includes(option.id)
                        ? 'border-purple-500 bg-purple-500'
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
                      <div className="text-2xl">
                        {option.isCorrect ? '✅' : selectedAnswers.includes(option.id) ? '❌' : ''}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleRetry}
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
                onClick={handleSubmitAnswer}
                disabled={selectedAnswers.length === 0}
                className="px-8 py-3 bg-purple-500 text-white font-semibold rounded-xl hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Kiểm tra
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-8 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
              >
                {currentQuestionIndex < dialogQuestions.length - 1 ? 'Tiếp theo' : 'Hoàn thành'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogLessonScreen;
