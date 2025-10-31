import React, { useState, useEffect } from 'react';
import { Button } from '../../../shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/card';
// Icons removed as they are not used in this simplified version
import { iconicVocabularyByChapter } from '../data/iconic-vocabulary';
import LessonPlaceholder from '../../../components/illustrations/LessonPlaceholder';

interface IconicLearningProps {
  onComplete: (score: number, timeSpent: number) => void;
  onClose: () => void;
  chapterId?: string; // Optional chapter ID to determine which vocabulary set to use
}

const IconicLearning: React.FC<IconicLearningProps> = ({ onComplete, onClose, chapterId = "1_1" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  // Function to get chapter title
  const getChapterTitle = (chapterId: string) => {
    const chapterTitles: Record<string, string> = {
      "1_1": "Chào hỏi và lịch sự",
      "1_2": "Gia đình và mối quan hệ",
      "2_1": "Cảm xúc cơ bản",
      "2_2": "Cảm xúc nâng cao",
      "3_1": "Động vật thường gặp",
      "3_2": "Thời tiết và thời gian",
      "4_1": "Số đếm cơ bản",
      "4_2": "Hình dạng và màu sắc",
      "5_1": "Thức ăn và bữa ăn",
      "5_2": "Đồ vật trong nhà",
      "6_1": "Phương tiện giao thông",
      "6_2": "Hoạt động và sở thích",
      "7_1": "Cuộc sống học đường",
      "7_2": "Công việc và tiền bạc",
      "8_1": "Cảm xúc phức tạp",
      "8_2": "Cảm xúc đặc biệt",
      "9_1": "Đồ vật học tập",
      "9_2": "Đồ vật cá nhân",
      "10_1": "Thực vật",
      "10_2": "Môi trường sống"
    };
    return chapterTitles[chapterId] || "Chào hỏi và lịch sự";
  };

  // Debug logging
  console.log(`IconicLearning - chapterId: ${chapterId}, title: ${getChapterTitle(chapterId)}`);

  // Function to get iconic vocabulary based on chapter
  const getIconicVocabularyByChapter = (chapterId: string) => {
    return (iconicVocabularyByChapter as any)[chapterId] || (iconicVocabularyByChapter as any)["1_1"];
  };

  // Data is now imported from iconic-vocabulary.ts
  const iconicVocabulary = getIconicVocabularyByChapter(chapterId);
  const currentWord = iconicVocabulary[currentIndex];
  const [timeLeft, setTimeLeft] = useState(currentWord?.timeLimit || 15);

  // Timer effect
  useEffect(() => {
    if (!isAnswered && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      // Time's up - mark as incorrect
      handleAnswer(-1);
    }
  }, [timeLeft, isAnswered]);

  // Reset timer when word changes
  useEffect(() => {
    setTimeLeft(currentWord?.timeLimit || 15);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsAnswered(false);
    setIsCorrect(false);
  }, [currentIndex, currentWord]);

  const handleAnswer = (answerId: number) => {
    // Allow changing answer even after selection
    setSelectedAnswer(answerId);
    
    // Only mark as answered and show feedback if not already answered
    if (!isAnswered) {
      setIsAnswered(true);
      setShowFeedback(true);
    }
    
    const isCorrectAnswer = currentWord.options.find((opt: any) => opt.id === answerId)?.isCorrect || false;
    setIsCorrect(isCorrectAnswer);
    
    // Update score only if this is a new correct answer
    if (isCorrectAnswer && !userAnswers.includes(answerId.toString())) {
      setScore(score + (currentWord.points || 10));
    }
    
    // Update user answers array
    const newAnswers = [...userAnswers];
    if (newAnswers[currentIndex]) {
      newAnswers[currentIndex] = answerId.toString();
    } else {
      newAnswers.push(answerId.toString());
    }
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < iconicVocabulary.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Quiz completed
      const totalTime = Date.now() - Date.now(); // This should be calculated properly
      onComplete(score, totalTime);
    }
  };

  // Removed handleRestart as it's not used

  if (!currentWord) {
    return (
      <div className="min-h-screen bg-[#fef9f4] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy dữ liệu</h2>
          <p className="text-gray-600 mb-6">Chapter ID: {chapterId}</p>
          <Button onClick={onClose} variant="outline">
            Quay lại
              </Button>
            </div>
      </div>
    );
  }

    return (
    <div className="min-h-screen bg-[#fef9f4] flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800"
              >
                ← Quay lại
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">
                  {getChapterTitle(chapterId)}
                </h1>
                <p className="text-sm text-gray-600">
                  Câu {currentIndex + 1} / {iconicVocabulary.length}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Điểm số</div>
                <div className="text-lg font-semibold text-blue-600">{score}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Thời gian</div>
                <div className={`text-lg font-semibold ${timeLeft <= 5 ? 'text-red-600' : 'text-gray-800'}`}>
                  {timeLeft}s
              </div>
              </div>
            </div>
      </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-4xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
              {currentWord.word}
            </CardTitle>
            <p className="text-gray-600">{currentWord.description}</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Video/Image */}
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {currentWord.questionType === 'video_choice' ? (
          <video
            src={currentWord.video}
                      className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white">
                      <LessonPlaceholder width={400} height={400} />
                    </div>
                  )}
                </div>
        </div>
      </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentWord.options.map((option: any) => {
            const isSelected = selectedAnswer === option.id;
                const isCorrectOption = option.isCorrect;
                const showCorrect = showFeedback && isCorrectOption;
                const showIncorrect = showFeedback && isSelected && !isCorrectOption;

            return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(option.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      showCorrect
                        ? 'border-green-500 bg-green-50'
                        : showIncorrect
                        ? 'border-red-500 bg-red-50'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } cursor-pointer`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                        {option.type === 'video' ? (
                          <video
                            src={option.video}
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                        ) : (
                          <img
                            src={option.image}
                            alt={option.text}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <span className="text-lg font-medium">{option.text}</span>
                    </div>
                  </button>
            );
          })}
      </div>

            {/* Feedback */}
            {selectedAnswer !== null && (
              <div className={`text-center p-4 rounded-lg ${
                isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}>
                <p className="text-lg font-semibold">
                  {isCorrect ? 'Chính xác! 🎉' : 'Sai rồi! Hãy thử lại 💪'}
                </p>
                <p className="text-sm mt-2">
                  Bạn có thể thay đổi lựa chọn bất kỳ lúc nào
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              {isAnswered && (
          <Button
            onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
          >
            {currentIndex < iconicVocabulary.length - 1 ? 'Tiếp theo' : 'Hoàn thành'}
          </Button>
        )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IconicLearning;