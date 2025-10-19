import React, { useState, useRef, useEffect } from "react";
import "./PracticeLessonScreen.css";

// Types
export interface PracticeQuestion {
  id: number;
  category: string;
  title: string;
  type: 'content' | 'single' | 'multiple' | 'cloze_answer';
  questionParts: QuestionPart[];
  answerOptions: AnswerOption[];
  submittedAnswer?: Answer;
}

export interface QuestionPart {
  type: 'video' | 'image' | 'html' | 'table' | 'popup';
  url?: string;
  content?: string;
  caption?: string;
  dialogPerson?: 'a' | 'b' | null;
}

export interface AnswerOption {
  id: number;
  answerText?: string;
  isCorrect?: boolean;
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

export const PracticeLessonScreen: React.FC<Props> = ({ 
  lessonId,
  onComplete, 
  onBack 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mock practice questions
  const practiceQuestions: PracticeQuestion[] = [
    {
      id: 1,
      category: '2a',
      title: 'Chọn ký hiệu đúng cho "Chào"',
      type: 'single',
      questionParts: [
        {
          type: 'html',
          content: '<p>Chọn video đúng cho từ "Chào"</p>'
        }
      ],
      answerOptions: [
        {
          id: 1,
          answerText: 'Vẫy tay',
          isCorrect: true,
          media: {
            type: 'video',
            url: '/resources/videos/hello-wave.mp4',
            label: 'Vẫy tay',
            caption: 'Cử chỉ vẫy tay chào'
          }
        },
        {
          id: 2,
          answerText: 'Nhảy',
          isCorrect: false,
          media: {
            type: 'video',
            url: '/resources/videos/jump.mp4',
            label: 'Nhảy',
            caption: 'Cử chỉ nhảy'
          }
        },
        {
          id: 3,
          answerText: 'Cúi đầu',
          isCorrect: false,
          media: {
            type: 'video',
            url: '/resources/videos/bow.mp4',
            label: 'Cúi đầu',
            caption: 'Cử chỉ cúi đầu'
          }
        }
      ]
    },
    {
      id: 2,
      category: '3a',
      title: 'Chọn tất cả ký hiệu về gia đình',
      type: 'multiple',
      questionParts: [
        {
          type: 'html',
          content: '<p>Chọn tất cả ký hiệu liên quan đến gia đình</p>'
        }
      ],
      answerOptions: [
        {
          id: 1,
          answerText: 'Bố',
          isCorrect: true,
          media: {
            type: 'video',
            url: '/resources/videos/father.mp4',
            label: 'Bố',
            caption: 'Người cha'
          }
        },
        {
          id: 2,
          answerText: 'Mẹ',
          isCorrect: true,
          media: {
            type: 'video',
            url: '/resources/videos/mother.mp4',
            label: 'Mẹ',
            caption: 'Người mẹ'
          }
        },
        {
          id: 3,
          answerText: 'Bạn',
          isCorrect: false,
          media: {
            type: 'video',
            url: '/resources/videos/friend.mp4',
            label: 'Bạn',
            caption: 'Bạn bè'
          }
        },
        {
          id: 4,
          answerText: 'Anh',
          isCorrect: true,
          media: {
            type: 'video',
            url: '/resources/videos/brother.mp4',
            label: 'Anh',
            caption: 'Anh trai'
          }
        }
      ]
    },
    {
      id: 3,
      category: '4a',
      title: 'Điền từ vào chỗ trống',
      type: 'cloze_answer',
      questionParts: [
        {
          type: 'video',
          url: '/resources/videos/hello-sign-demo.mp4',
          content: 'Chào',
          caption: 'Ký hiệu này có nghĩa là gì?'
        }
      ],
      answerOptions: [
        {
          id: 1,
          answerText: 'chào',
          isCorrect: true
        },
        {
          id: 2,
          answerText: 'tạm biệt',
          isCorrect: false
        },
        {
          id: 3,
          answerText: 'xin lỗi',
          isCorrect: false
        },
        {
          id: 4,
          answerText: 'cảm ơn',
          isCorrect: false
        }
      ]
    }
  ];

  const currentQuestion = practiceQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / practiceQuestions.length) * 100;

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswerSelect = (optionId: number) => {
    if (currentQuestion.type === 'single') {
      setSelectedAnswers([optionId]);
    } else if (currentQuestion.type === 'multiple') {
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
    if (currentQuestionIndex < practiceQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswers([]);
      setShowResult(false);
    } else {
      onComplete(score, practiceQuestions.length);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setScore(0);
    setTimeSpent(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-4xl mx-auto p-4">
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
              Điểm: {score}/{practiceQuestions.length}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Câu {currentQuestionIndex + 1} / {practiceQuestions.length}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {currentQuestion.title}
          </h2>

          {/* Question Content */}
          <div className="mb-8">
            {currentQuestion.questionParts.map((part, index) => (
              <div key={index} className="mb-4">
                {part.type === 'video' && part.url && (
                  <div className="relative bg-gray-100 rounded-xl overflow-hidden">
                    <video 
                      ref={videoRef}
                      className="w-full h-64 object-cover"
                      src={part.url}
                      playsInline
                      controls
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
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
            {currentQuestion.answerOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  selectedAnswers.includes(option.id)
                    ? 'border-blue-500 bg-blue-50'
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
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    currentQuestion.type === 'single' 
                      ? 'rounded-full' 
                      : 'rounded'
                  } ${
                    selectedAnswers.includes(option.id)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswers.includes(option.id) && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        {currentQuestion.type === 'single' ? (
                          <circle cx="10" cy="10" r="3" />
                        ) : (
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        )}
                      </svg>
                    )}
                  </div>

                  {/* Answer Content */}
                  <div className="flex-1">
                    {option.media && (
                      <div className="mb-2">
                        <video 
                          className="w-32 h-20 object-cover rounded-lg"
                          src={option.media.url}
                          playsInline
                          muted
                        />
                      </div>
                    )}
                    <div className="font-medium text-gray-800">
                      {option.answerText}
                    </div>
                    {option.media?.caption && (
                      <div className="text-sm text-gray-500">
                        {option.media.caption}
                      </div>
                    )}
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
            {!showResult ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswers.length === 0}
                className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Kiểm tra
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-8 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
              >
                {currentQuestionIndex < practiceQuestions.length - 1 ? 'Tiếp theo' : 'Hoàn thành'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeLessonScreen;
