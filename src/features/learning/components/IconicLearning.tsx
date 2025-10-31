import React, { useState, useEffect } from 'react';
import { Button } from '../../../shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/card';
// Icons removed as they are not used in this simplified version
import { iconicVocabularyByChapter } from '../../../lib/qa-library/iconic';
import LessonPlaceholder from '../../../components/illustrations/LessonPlaceholder';
import CorrectIcon from '../../../components/atoms/Icon/CorrectIcon';
import IncorrectIcon from '../../../components/atoms/Icon/IncorrectIcon';
import QuizButton from '../../../components/atoms/Button/QuizButton';
import { getAnswerStatus } from '../../../lib/answer-evaluation';

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
  const [showResult, setShowResult] = useState(false);
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
      handleTimeUp();
    }
  }, [timeLeft, isAnswered]);

  // Reset timer when word changes
  useEffect(() => {
    setTimeLeft(currentWord?.timeLimit || 15);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsAnswered(false);
    setIsCorrect(false);
  }, [currentIndex, currentWord]);

  const handleSelectAnswer = (answerId: number) => {
    setSelectedAnswer(answerId);
  };

  const handleCheck = () => {
    if (isAnswered) return;
    const correctOption = currentWord.options.find((opt: any) => opt.isCorrect);
    const isCorrectAnswer = selectedAnswer != null && correctOption && correctOption.id === selectedAnswer;

    setIsCorrect(Boolean(isCorrectAnswer));
    setIsAnswered(true);
    setShowResult(true);

    // Update score only once per question when first answered correctly
    if (isCorrectAnswer) {
      if (userAnswers[currentIndex] !== 'correct') {
        setScore(score + (currentWord.points || 10));
      }
    }

    const newAnswers = [...userAnswers];
    newAnswers[currentIndex] = isCorrectAnswer ? 'correct' : (selectedAnswer != null ? selectedAnswer.toString() : 'none');
    setUserAnswers(newAnswers);
  };

  const handleTimeUp = () => {
    if (isAnswered) return;
    setSelectedAnswer(-1);
    setIsCorrect(false);
    setIsAnswered(true);
    setShowResult(true);

    const newAnswers = [...userAnswers];
    if (newAnswers[currentIndex] !== 'correct') {
      newAnswers[currentIndex] = 'incorrect';
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
                const showCorrect = showResult && isCorrectOption;
                const showIncorrect = showResult && isSelected && !isCorrectOption;
                const status = getAnswerStatus(
                  { id: option.id, isCorrect: isCorrectOption },
                  selectedAnswer !== null ? [Number(selectedAnswer)] : [],
                  showResult
                );

            return (
                  <button
                    key={option.id}
                    onClick={() => !isAnswered && handleSelectAnswer(option.id)}
                    className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
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

                    {/* Result Indicator (styled similar to AnswerOptions) */}
                    {showResult && (
                      <div className="absolute top-2 right-2 result-indicator text-xl">
                        {status === 'Chính xác' ? '✅' : status === 'Không chính xác' ? '❌' : ''}
                      </div>
                    )}
                  </button>
            );
          })}
      </div>

        
            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              {!isAnswered && (
                <QuizButton
                  onClick={handleCheck}
                  disabled={selectedAnswer === null}
                  variant={selectedAnswer === null ? 'disabled' : 'primary'}
                  size="lg"
                >
                  Kiểm tra
                </QuizButton>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Bottom Result Panel */}
      {isAnswered && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50"
          data-testid={isCorrect ? 'lesson-panel-correct' : 'lesson-panel-incorrect'}
        >
          <div className={`w-full py-6 px-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
            <div className="max-w-md mx-auto">
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center justify-center ">
                    {isCorrect ? (
                      <svg width="32" height="32" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="22" cy="22" r="22" fill="#22c55e"></circle>
                        <path stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" d="M15 22.714 19.2 27 29 17"></path>
                      </svg>
                    ) : (
                      <svg width="32" height="32" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="22" cy="22" r="22" fill="#ef4444"></circle>
                        <path stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m15.75 8.25-7.5 7.5m7.5 0-7.5-7.5"></path>
                      </svg>
                    )}
                  </div>
                  <div className={`text-xl font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? 'Chính xác!' : 'Không chính xác!'}
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  className={`
                px-8 py-3 rounded-lg text-white font-semibold text-base

                transition-all duration-200 hover:opacity-90 active:scale-95

                ${isCorrect ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}

              `}
                  data-testid="lesson-button"
                  onClick={handleNext}
                >
                  {currentIndex < iconicVocabulary.length - 1 ? 'Tiếp theo' : 'Hoàn thành'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IconicLearning;