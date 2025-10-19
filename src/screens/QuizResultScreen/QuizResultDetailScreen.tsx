import React, { useState, useEffect } from "react";
import "./QuizResultScreen.css";

type QuestionResult = {
  id: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation?: string;
  videoUrl?: string;
};

type Props = {
  correct: number;
  total: number;
  onRetry?: () => void;
  onContinue?: () => void;
  lessonId?: string;
};

export const QuizResultDetailScreen: React.FC<Props> = ({ 
  correct, 
  total, 
  onRetry, 
  onContinue,
  lessonId = "1"
}) => {
  const percent = total ? Math.round((correct / total) * 100) : 0;
  const [displayScore, setDisplayScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  // Mock question results data
  const questionResults: QuestionResult[] = [
    {
      id: "1",
      question: "Ký hiệu nào có nghĩa là 'Xin chào'?",
      userAnswer: "Vẫy tay",
      correctAnswer: "Vẫy tay",
      isCorrect: true,
      explanation: "Đúng! Vẫy tay là cách chào hỏi cơ bản trong NNKH.",
      videoUrl: "/resources/videos/Chào.mp4"
    },
    {
      id: "2", 
      question: "Ký hiệu 'Cảm ơn' được thực hiện như thế nào?",
      userAnswer: "Gật đầu",
      correctAnswer: "Đưa tay lên ngực",
      isCorrect: false,
      explanation: "Sai rồi! Ký hiệu 'Cảm ơn' là đưa tay lên ngực, không phải gật đầu.",
      videoUrl: "/resources/videos/xin lỗi.mp4"
    },
    {
      id: "3",
      question: "Ký hiệu 'Gia đình' được thể hiện bằng cách nào?",
      userAnswer: "Chỉ vào người khác",
      correctAnswer: "Chỉ vào người khác",
      isCorrect: true,
      explanation: "Chính xác! Chỉ vào người khác là ký hiệu cho 'gia đình'.",
      videoUrl: "/resources/videos/bố mẹ.mp4"
    },
    {
      id: "4",
      question: "Ký hiệu 'Vui mừng' có đặc điểm gì?",
      userAnswer: "Nụ cười",
      correctAnswer: "Nụ cười và vỗ tay",
      isCorrect: false,
      explanation: "Gần đúng! 'Vui mừng' bao gồm cả nụ cười và vỗ tay.",
      videoUrl: "/resources/videos/vui mừng - nam.mp4"
    },
    {
      id: "5",
      question: "Ký hiệu số '1' được thể hiện bằng ngón tay nào?",
      userAnswer: "Ngón trỏ",
      correctAnswer: "Ngón trỏ",
      isCorrect: true,
      explanation: "Đúng! Số 1 được thể hiện bằng ngón trỏ.",
      videoUrl: "/resources/videos/1.mp4"
    }
  ];

  // Score animation effect
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = percent / steps;
    
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= percent) {
        setDisplayScore(percent);
        setIsAnimating(false);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [percent]);

  const getScoreMessage = () => {
    if (percent >= 90) return "Xuất sắc! Bạn đã thành thạo!";
    if (percent >= 70) return "Tốt lắm! Bạn đang tiến bộ!";
    if (percent >= 50) return "Khá tốt! Hãy tiếp tục cố gắng!";
    return "Đừng bỏ cuộc! Luyện tập sẽ làm nên hoàn hảo!";
  };

  const getScoreColor = () => {
    if (percent >= 90) return "text-green-600";
    if (percent >= 70) return "text-blue-600";
    if (percent >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white" data-testid="quiz-result-detail-screen">
      <div className="w-full max-w-4xl mx-auto p-4">
        {/* Header with Score */}
        <div className="text-center mb-8">
          <div className={`mb-4 ${isAnimating ? 'animate-score-count' : ''}`}>
            <div className={`text-6xl font-bold mb-2 ${getScoreColor()}`}>
              {displayScore}%
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {getScoreMessage()}
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Bạn đã trả lời đúng {correct}/{total} câu hỏi
          </p>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105"
          >
            {showDetails ? "Ẩn chi tiết" : "Xem chi tiết từng câu"}
          </button>
        </div>

        {/* Question Results Detail */}
        {showDetails && (
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Chi tiết từng câu hỏi
            </h2>
            
            {questionResults.map((result, index) => (
              <div
                key={result.id}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  result.isCorrect
                    ? "border-green-200 bg-green-50 hover:bg-green-100"
                    : "border-red-200 bg-red-50 hover:bg-red-100"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Câu {result.id}: {result.question}
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-600">Câu trả lời của bạn:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          result.isCorrect 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {result.userAnswer}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-600">Đáp án đúng:</span>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {result.correctAnswer}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <span className="text-3xl">
                      {result.isCorrect ? "✅" : "❌"}
                    </span>
                    <span className={`text-sm font-medium ${
                      result.isCorrect ? "text-green-600" : "text-red-600"
                    }`}>
                      {result.isCorrect ? "Đúng" : "Sai"}
                    </span>
                  </div>
                </div>

                {result.explanation && (
                  <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-700 mb-2">Giải thích:</h4>
                    <p className="text-gray-600">{result.explanation}</p>
                  </div>
                )}

                {result.videoUrl && (
                  <div className="mt-4">
                    <video
                      controls
                      className="w-full h-48 bg-gray-100 rounded-lg"
                      poster="/placeholder-video.jpg"
                    >
                      <source src={result.videoUrl} type="video/mp4" />
                      Trình duyệt của bạn không hỗ trợ video.
                    </video>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRetry}
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
          >
            Làm lại bài
          </button>
          
          <button
            onClick={onContinue}
            className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResultDetailScreen;
