import React, { useState } from "react";

type QuizHeaderProps = {
  currentIndex: number;
  totalQuestions: number;
  onMenuClick?: () => void;
  onSpeedClick?: () => void;
  onExitLesson?: () => void;
};

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  currentIndex,
  totalQuestions,
  onMenuClick,
  onSpeedClick,
  onExitLesson,
}) => {
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
    if (onMenuClick) onMenuClick();
  };

  return (
    <div className="w-full max-w-5xl mx-auto" data-testid="quiz-header-wrapper">
      <div className="flex items-center justify-between">
        <button 
          aria-label="Mở menu bài kiểm tra" 
          className="p-2 rounded hover:bg-gray-200"
          onClick={handleOpenMenu}
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
          aria-label="Thay đổi tốc độ video" 
          className="p-2 rounded hover:bg-gray-200"
          onClick={onSpeedClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none" width="28" height="28">
            <circle cx="18" cy="18" r="14" fill="#C7CBCD"/>
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-[9998]"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Bottom Sheet Modal */}
          <div className="fixed inset-0 z-[9999] flex items-end" role="dialog" aria-modal="true">
            <div className="w-full bg-white rounded-t-3xl shadow-2xl animate-slide-up-from-bottom" style={{ paddingBottom: "24px" }}>
              {/* Header with close */}
              <div className="flex items-center justify-end p-4">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="h-10 w-10 p-0 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center"
                  aria-label="Đóng cửa sổ"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="24" height="24">
                    <path stroke="#292F32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 4 4 20m16 0L4 4" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="px-6 pb-2">
                <div className="space-y-4">
                  <button
                    className="w-full h-12 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Tiếp tục học
                  </button>
                  <button
                    className="w-full h-12 rounded-full border border-blue-500 text-blue-600 font-semibold bg-white hover:bg-blue-50 transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onExitLesson?.();
                    }}
                  >
                    Thoát bài học
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QuizHeader;
