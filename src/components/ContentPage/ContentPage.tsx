import React, { useState, useRef, useEffect } from "react";
import "./ContentPage.css";

// Types
export interface Question {
  id: number;
  category: string;
  title: string;
  type: 'content';
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
  order?: number;
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

export interface ContentPageProps {
  question: Question;
  isLastQuestion: boolean;
  onQuestionConfirmed: () => void;
  onBack?: () => void;
  onRetry?: () => void;
  theme?: 'blue' | 'green' | 'orange' | 'purple' | 'indigo';
  showProgress?: boolean;
  progress?: number;
  totalQuestions?: number;
  currentQuestion?: number;
}

export const ContentPage: React.FC<ContentPageProps> = ({
  question,
  isLastQuestion,
  onQuestionConfirmed,
  onBack,
  onRetry,
  theme = 'blue',
  showProgress = true,
  progress = 0,
  totalQuestions = 1,
  currentQuestion = 1
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [completedVideos, setCompletedVideos] = useState<number[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const videoParts = question.questionParts.filter(part => part.type === 'video');
  const currentVideo = videoParts[currentVideoIndex];

  useEffect(() => {
    setCurrentVideoIndex(0);
    setCompletedVideos([]);
  }, [question.id]);

  const handleVideoPlay = (index: number) => {
    setIsVideoPlaying(true);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  const handleVideoEnd = (index: number) => {
    setIsVideoPlaying(false);
    if (!completedVideos.includes(index)) {
      setCompletedVideos(prev => [...prev, index]);
    }
    
    // Auto-advance to next video if available
    if (index < videoParts.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
    }
  };

  const handleVideoClick = (index: number) => {
    setCurrentVideoIndex(index);
  };

  const getThemeClasses = (theme: string) => {
    const themes = {
      blue: {
        primary: 'bg-blue-500 hover:bg-blue-600',
        secondary: 'bg-blue-100 text-blue-800',
        accent: 'border-blue-500',
        background: 'from-blue-50 to-indigo-100'
      },
      green: {
        primary: 'bg-green-500 hover:bg-green-600',
        secondary: 'bg-green-100 text-green-800',
        accent: 'border-green-500',
        background: 'from-green-50 to-emerald-100'
      },
      orange: {
        primary: 'bg-orange-500 hover:bg-orange-600',
        secondary: 'bg-orange-100 text-orange-800',
        accent: 'border-orange-500',
        background: 'from-orange-50 to-amber-100'
      },
      purple: {
        primary: 'bg-purple-500 hover:bg-purple-600',
        secondary: 'bg-purple-100 text-purple-800',
        accent: 'border-purple-500',
        background: 'from-purple-50 to-pink-100'
      },
      indigo: {
        primary: 'bg-indigo-500 hover:bg-indigo-600',
        secondary: 'bg-indigo-100 text-indigo-800',
        accent: 'border-indigo-500',
        background: 'from-indigo-50 to-purple-100'
      }
    };
    
    return themes[theme as keyof typeof themes] || themes.blue;
  };

  const themeClasses = getThemeClasses(theme);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeClasses.background}`}>
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
          
          {showProgress && (
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Câu {currentQuestion} / {totalQuestions}
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className={`${themeClasses.primary} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {question.title}
          </h2>

          {/* Content Parts */}
          <div className="space-y-8">
            {question.questionParts.map((part, index) => (
              <div key={index} className="content-part">
                {part.type === 'video' && part.url && (
                  <div className="relative bg-gray-100 rounded-xl overflow-hidden">
                    <video 
                      ref={el => videoRefs.current[index] = el}
                      className="w-full h-96 object-cover"
                      src={part.url}
                      playsInline
                      controls
                      onPlay={() => handleVideoPlay(index)}
                      onPause={handleVideoPause}
                      onEnded={() => handleVideoEnd(index)}
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
                    {isVideoPlaying && currentVideoIndex === index && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Đang phát
                      </div>
                    )}
                  </div>
                )}
                
                {part.type === 'image' && part.url && (
                  <div className="relative bg-gray-100 rounded-xl overflow-hidden">
                    <img 
                      className="w-full h-96 object-cover"
                      src={part.url}
                      alt={part.caption || 'Question image'}
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
                  </div>
                )}
                
                {part.type === 'html' && part.content && (
                  <div 
                    className="text-lg text-gray-700 leading-relaxed content-html"
                    dangerouslySetInnerHTML={{ __html: part.content }}
                  />
                )}

                {part.type === 'table' && part.content && (
                  <div 
                    className="overflow-x-auto content-table"
                    dangerouslySetInnerHTML={{ __html: part.content }}
                  />
                )}

                {part.type === 'popup' && part.content && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 content-popup">
                    <div className="flex items-start gap-4">
                      <div className="text-blue-500 text-2xl">ℹ️</div>
                      <div 
                        className="text-gray-700 content-popup-text"
                        dangerouslySetInnerHTML={{ __html: part.content }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Video Navigation (if multiple videos) */}
          {videoParts.length > 1 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Video khác:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {videoParts.map((video, index) => (
                  <button
                    key={index}
                    onClick={() => handleVideoClick(index)}
                    className={`video-thumbnail ${
                      currentVideoIndex === index ? 'active' : ''
                    } ${completedVideos.includes(index) ? 'completed' : ''}`}
                  >
                    <video
                      className="w-full h-20 object-cover rounded-lg"
                      src={video.url}
                      muted
                    />
                    <div className="video-thumbnail-overlay">
                      {completedVideos.includes(index) && (
                        <div className="completed-checkmark">✓</div>
                      )}
                      {currentVideoIndex === index && (
                        <div className="current-indicator">▶</div>
                      )}
                    </div>
                    <div className="video-thumbnail-label">
                      Video {index + 1}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Learning Tips */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="flex items-start gap-4">
              <div className="text-blue-500 text-2xl">💡</div>
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  Mẹo học tập
                </h3>
                <p className="text-blue-700">
                  Hãy xem kỹ video và chú ý đến các cử chỉ, biểu cảm. 
                  Thực hành theo video để ghi nhớ tốt hơn.
                  {videoParts.length > 1 && ' Bạn có thể xem lại các video khác nếu cần.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Xem lại
              </button>
            )}
          </div>

          <button
            onClick={onQuestionConfirmed}
            className={`px-8 py-3 ${themeClasses.primary} text-white font-semibold rounded-xl transition-colors`}
          >
            {isLastQuestion ? 'Hoàn thành' : 'Tiếp theo'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
