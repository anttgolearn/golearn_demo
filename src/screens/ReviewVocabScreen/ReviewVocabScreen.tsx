import React, { useState, useRef } from "react";
import "./ReviewVocabScreen.css";
import { useReviewWords, VocabVideo } from "../../hooks/useReviewWords";
import { getLessonNavigationInfo } from "../../lib/lesson-navigation";

// Use VocabVideo from useReviewWords hook
type VocabItem = VocabVideo & {
  id: string;
  meaning: string;
  example: string;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  isCorrect?: boolean;
};

type Props = {
  lessonId: string;
  onContinue: () => void;
  onBack?: () => void;
};

export const ReviewVocabScreen: React.FC<Props> = ({ 
  lessonId,
  onContinue, 
  onBack 
}) => {
  // Use useReviewWords hook to get videos from quiz data
  const { reviewWords, correctAnswers, incorrectAnswers } = useReviewWords(lessonId);
  const [selectedVideo, setSelectedVideo] = useState<VocabItem | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Helper functions for vocabulary data
  const getWordMeaning = (word: string): string => {
    const meanings: Record<string, string> = {
      'Chào': 'Lời chào cơ bản khi gặp ai đó',
      'Tạm biệt': 'Lời chào tạm biệt khi chia tay',
      'Xin lỗi': 'Lời xin lỗi khi mắc lỗi',
      'Cảm ơn': 'Lời cảm ơn khi nhận được sự giúp đỡ',
      'Không': 'Từ phủ định',
      'Có': 'Từ khẳng định',
      'Tôi': 'Đại từ nhân xưng ngôi thứ nhất',
      'Bạn': 'Đại từ nhân xưng ngôi thứ hai',
      'Gia đình': 'Những người thân trong nhà',
      'Bố': 'Người cha trong gia đình',
      'Mẹ': 'Người mẹ trong gia đình',
      'Anh': 'Anh trai hoặc anh lớn tuổi',
      'Chị': 'Chị gái hoặc chị lớn tuổi',
      'Em': 'Em trai hoặc em gái'
    };
    return meanings[word] || `Nghĩa của từ ${word}`;
  };

  const getWordExample = (word: string): string => {
    const examples: Record<string, string> = {
      'Chào': 'Xin chào! Mình là Minh.',
      'Tạm biệt': 'Tạm biệt, hẹn gặp lại!',
      'Xin lỗi': 'Xin lỗi, mình đến muộn.',
      'Cảm ơn': 'Cảm ơn bạn rất nhiều!',
      'Không': 'Không, mình không biết.',
      'Có': 'Có, mình hiểu rồi.',
      'Tôi': 'Tôi là học sinh.',
      'Bạn': 'Bạn có khỏe không?',
      'Gia đình': 'Gia đình mình có bốn người.',
      'Bố': 'Bố mình là giáo viên.',
      'Mẹ': 'Mẹ mình nấu ăn rất ngon.',
      'Anh': 'Anh trai mình học đại học.',
      'Chị': 'Chị gái mình làm bác sĩ.',
      'Em': 'Em trai mình còn nhỏ.'
    };
    return examples[word] || `Ví dụ với từ ${word}`;
  };

  const getWordDifficulty = (word: string): "Dễ" | "Trung bình" | "Khó" => {
    const easyWords = ['Chào', 'Tạm biệt', 'Cảm ơn', 'Không', 'Có', 'Tôi', 'Bạn'];
    const mediumWords = ['Gia đình', 'Bố', 'Mẹ', 'Anh', 'Chị', 'Em', 'Xin lỗi'];
    
    if (easyWords.includes(word)) return "Dễ";
    if (mediumWords.includes(word)) return "Trung bình";
    return "Dễ";
  };

  // Convert reviewWords Map to VocabItem array
  const vocabulary: VocabItem[] = Array.from(reviewWords.entries()).map(([title, video], index) => ({
    id: `vocab-${index}`,
    title: video.title,
    videoUrl: video.videoUrl,
    meaning: getWordMeaning(title),
    example: getWordExample(title),
    difficulty: getWordDifficulty(title),
    isCorrect: correctAnswers.some(correct => correct.title === title) ? true : 
               incorrectAnswers.some(incorrect => incorrect.title === title) ? false : undefined
  }));

  // Get navigation info for next lesson
  const navigationInfo = getLessonNavigationInfo(lessonId);

  const handleVideoClick = (item: VocabItem) => {
    console.log('🎬 Video clicked:', item); // Debug log
    console.log('🔗 Video URL:', item.videoUrl); // Debug video URL
    setSelectedVideo(item);
    setVideoLoading(true);
    setVideoError(false);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    setVideoLoading(false);
    setVideoError(false);
  };


  // Get theme colors - default orange theme
  const theme = {
    primary: 'bg-orange-500',
    primaryLight: 'bg-orange-100',
    primaryDark: 'bg-orange-600',
    background: 'from-orange-50 to-orange-100'
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background}`} data-testid="review-vocab-screen">
      <div className="w-full max-w-md mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-12">
          {onBack && (
            <button 
              onClick={onBack}
              className="absolute left-4 top-4 p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Quay lại
            </button>
          )}
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Tóm tắt bài học
          </h1>
          <p className="text-lg text-gray-600">
            Ôn lại các ký hiệu từ bài học này để tăng cường khả năng ghi nhớ.
          </p>
        </div>

        {/* Vocabulary List - Vertical List */}
        <div className="space-y-3 mb-12">
          {vocabulary.map((item, index) => (
            <button
              key={item.id}
              className="w-full h-16 bg-white border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] flex items-center justify-between px-6"
              style={{ 
                borderColor: theme.primaryLight,
                animationDelay: `${index * 100}ms` 
              }}
              onClick={() => handleVideoClick(item)}
            >
              {/* Word Text */}
              <span className="text-lg font-medium text-gray-800">
                {item.title.toUpperCase()}
              </span>
              
              {/* Play Icon */}
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: theme.primary }}
              >
                <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 5v10l8-5-8-5z"/>
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Next Lesson Button */}
        <div className="text-center">
          <button
            onClick={onContinue}
            className="w-full h-14 text-white font-bold text-xl rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            style={{ 
              backgroundColor: theme.primary,
              '--hover-color': theme.primaryDark
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.primaryDark;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.primary;
            }}
          >
            {navigationInfo.hasNextInChapter ? (
              <div className="text-center">
                <div className="text-lg font-bold">Bài học tiếp theo</div>
                <div className="text-sm opacity-90">{navigationInfo.nextLessonTitle}</div>
              </div>
            ) : navigationInfo.hasNextChapter ? (
              <div className="text-center">
                <div className="text-lg font-bold">Chương tiếp theo</div>
                <div className="text-sm opacity-90">{navigationInfo.nextLessonTitle}</div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-lg font-bold">Hoàn thành chương</div>
                <div className="text-sm opacity-90">Chúc mừng!</div>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Video Modal - Bottom Sheet Style */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/50"
          onClick={handleCloseVideo}
        >
          <div 
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl animate-slide-up-from-bottom"
            style={{ 
              height: '551px',
              paddingBottom: '85px',
              overflow: 'hidden',
              userSelect: 'none',
              touchAction: 'none'
            }}
            onClick={(e) => e.stopPropagation()}
            role="slider"
            aria-label="Bottom Sheet"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex-1"></div>
              <h3 className="text-2xl font-bold text-gray-800 text-center flex-1">{selectedVideo.title}</h3>
              <div className="flex-1 flex justify-end">
                <button
                  onClick={handleCloseVideo}
                  className="h-10 w-10 p-0 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center"
                  aria-label="Close Modal"
                  data-testid="modal-navigation-close"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    width="24" 
                    height="24"
                  >
                    <path 
                      stroke="#292F32" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="1.5" 
                      d="M20 4 4 20m16 0L4 4"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Video Content */}
            <div className="flex-1 flex flex-col p-6">
              {/* Debug Info */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
                <div className="font-medium mb-1">Debug Info:</div>
                <div>Title: {selectedVideo.title}</div>
                <div>URL: {selectedVideo.videoUrl}</div>
                <div>Loading: {videoLoading ? 'Yes' : 'No'}</div>
                <div>Error: {videoError ? 'Yes' : 'No'}</div>
                <div className="mt-2 pt-2 border-t border-gray-300">
                  <div className="font-medium">Navigation:</div>
                  <div>Current: {lessonId}</div>
                  <div>Next in Chapter: {navigationInfo.hasNextInChapter ? 'Yes' : 'No'}</div>
                  <div>Next Chapter: {navigationInfo.hasNextChapter ? 'Yes' : 'No'}</div>
                  <div>Next Lesson: {navigationInfo.nextLessonTitle || 'None'}</div>
                </div>
              </div>
              
              <div className="relative bg-gray-100 rounded-xl overflow-hidden shadow-lg flex-1">
                <video 
                  ref={videoRef}
                  key={selectedVideo.videoUrl}
                  className="absolute inset-0 w-full h-full object-contain" 
                  src={selectedVideo.videoUrl} 
                  playsInline 
                  autoPlay 
                  loop 
                  muted
                  controls
                  style={{
                    position: 'absolute',
                    inset: '0px',
                    objectFit: 'contain',
                    width: '100%',
                    height: '100%'
                  }}
                  onLoadStart={() => {
                    console.log('🎬 Video loading started:', selectedVideo.videoUrl);
                    console.log('📝 Selected video:', selectedVideo);
                    setVideoLoading(true);
                    setVideoError(false);
                  }}
                  onLoadedData={() => {
                    console.log('✅ Video data loaded:', selectedVideo.videoUrl);
                    setVideoLoading(false);
                  }}
                  onCanPlay={() => {
                    console.log('▶️ Video can play:', selectedVideo.videoUrl);
                    setVideoLoading(false);
                  }}
                  onPlay={() => {
                    console.log('🎥 Video started playing:', selectedVideo.videoUrl);
                    setVideoLoading(false);
                  }}
                  onError={(e) => {
                    console.error('❌ Video load error:', selectedVideo.videoUrl);
                    console.error('🔍 Error details:', e);
                    console.error('📊 Video element:', e.currentTarget);
                    setVideoLoading(false);
                    setVideoError(true);
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) {
                      fallback.style.display = 'flex';
                      console.log('🔄 Showing fallback UI');
                    }
                  }}
                >
                  <source src={selectedVideo.videoUrl} type="video/mp4" />
                  Video không khả dụng
                </video>
                
                {/* Video Loading Indicator */}
                {videoLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                      <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                      <div className="text-sm text-gray-600">Đang tải video...</div>
                    </div>
                  </div>
                )}

                {/* Video Error Fallback */}
                {videoError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
                    <div className="text-center p-4">
                      <div className="text-4xl mb-2">📹</div>
                      <div className="text-sm font-medium">Video không thể tải</div>
                      <div className="text-xs mt-1">Từ: {selectedVideo.title}</div>
                      <div className="text-xs mt-2 text-gray-400 break-all">
                        URL: {selectedVideo.videoUrl}
                      </div>
                      <button 
                        onClick={() => {
                          console.log('🔄 Retrying video load:', selectedVideo.videoUrl);
                          setVideoError(false);
                          setVideoLoading(true);
                          const video = videoRef.current;
                          if (video) {
                            video.load();
                            video.style.display = 'block';
                          }
                        }}
                        className="mt-3 px-3 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600 transition-colors"
                      >
                        Thử lại
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Speed Control Button - Bottom Right */}
                <button
                  className="absolute bottom-4 right-4 h-9 w-9 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                  aria-label="Change video speed"
                  data-testid="turtle-slower-active"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 36 36" 
                    fill="none" 
                    width="36" 
                    height="36"
                  >
                    <path 
                      fill="#C7CBCD" 
                      d="M6.555 18.953c.7-.257 1.37-.422 1.963-.488a10.828 10.828 0 0 1 7.478-2.99 10.8 10.8 0 0 1 6.111 1.887 5.703 5.703 0 0 0 5.187-4.716h.004c.346-1.893 1.82-3.327 3.61-3.355 2.072-.031 5.291 1.823 5.558 4.14.384 3.327-2.583 3.374-5.198 3.374a10.936 10.936 0 0 1-5.435 4.923 10.802 10.802 0 0 1 1.03 4.615 2.587 2.587 0 1 1-5.175 0 5.67 5.67 0 0 0-1.555-3.904c-1.602-.248-2.393-.863-2.63-1.584a5.675 5.675 0 0 0-1.507-.204 5.7 5.7 0 0 0-5.693 5.692 2.587 2.587 0 1 1-5.175 0c0-1.237.209-2.427.592-3.536-2.356-.378-5.138-1.495-5.216-2.468-.103-1.264 1.974.115 6.051-1.386Z"
                    />
                    <path 
                      fill="#EB6837" 
                      d="m7.93 15.54.045-.095c1.702-3.44 4.348-5.07 4.902-4.644.447.344-.432.428-1.325 3.838.883-.143 1.81-.244 2.77-.3.476-1.974 1.175-3.605 1.674-3.605.499 0 1.197 1.631 1.673 3.606.96.055 1.887.156 2.77.3-.893-3.412-1.772-3.495-1.325-3.84.554-.426 3.2 1.206 4.902 4.645l.046.095c3.043 1.07 4.998 2.733 4.998 4.6 0 3.23-5.85 5.848-13.064 5.848-7.215 0-13.064-2.619-13.064-5.848 0-1.867 1.954-3.53 4.998-4.6Z"
                    />
                    <path 
                      fill="#FFA46F" 
                      d="M15.901 8.013V8l.014.001L15.93 8v.003c.022 0 .044.004.066.004.022 0 .044-.004.066-.004V8l.014.001c.005 0 .015.012.015.012 4.982.109 11.261 4.655 11.261 10.687 0 .817-1.02 5.102-11.261 5.157v.005h-.029c-.023 0-.043-.003-.066-.003l-.066.002h-.03v-.004C5.66 23.802 4.638 19.517 4.638 18.7c0-6.032 6.28-10.578 11.262-10.687Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewVocabScreen;
