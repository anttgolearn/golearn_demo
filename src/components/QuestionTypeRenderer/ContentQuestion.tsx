import React, { useState, useRef } from "react";
import { Question, QuestionTypeRendererProps } from "./QuestionTypeRenderer";

interface ContentQuestionProps extends Omit<QuestionTypeRendererProps, 'question'> {
  question: Question;
}

export const ContentQuestion: React.FC<ContentQuestionProps> = ({
  question,
  onNextQuestion,
  isLastQuestion,
  onRetry
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-4xl mx-auto p-4">
        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {question.title}
          </h2>

          {/* Content Parts */}
          <div className="space-y-6">
            {question.questionParts.map((part, index) => (
              <div key={index} className="content-part">
                {part.type === 'video' && part.url && (
                  <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-4">
                    <video 
                      ref={videoRef}
                      className="w-full h-80 object-cover"
                      src={part.url}
                      playsInline
                      controls
                      onPlay={handleVideoPlay}
                      onPause={handleVideoPause}
                      onEnded={handleVideoEnd}
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
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Đang phát
                      </div>
                    )}
                  </div>
                )}
                
                {part.type === 'image' && part.url && (
                  <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-4">
                    <img 
                      className="w-full h-80 object-cover"
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
                    className="text-lg text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: part.content }}
                  />
                )}

                {part.type === 'table' && part.content && (
                  <div 
                    className="overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: part.content }}
                  />
                )}

                {part.type === 'popup' && part.content && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-blue-500 text-xl">ℹ️</div>
                      <div 
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{ __html: part.content }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Learning Tips */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="text-blue-500 text-2xl">💡</div>
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  Mẹo học tập
                </h3>
                <p className="text-blue-700">
                  Hãy xem kỹ video và chú ý đến các cử chỉ, biểu cảm. 
                  Thực hành theo video để ghi nhớ tốt hơn.
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
            Xem lại
          </button>

          <button
            onClick={onNextQuestion}
            className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors"
          >
            {isLastQuestion ? 'Hoàn thành' : 'Tiếp theo'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentQuestion;
