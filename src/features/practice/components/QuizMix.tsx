import React, { useState, useEffect } from 'react';
import { Button } from '../../../shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/card';
import { Badge } from '../../../shared/ui/badge';
import { Play, Pause, RotateCcw, CheckCircle, X, Clock, Brain, Star, Volume2 } from 'lucide-react';

interface QuizMixProps {
  onComplete: (score: number, timeSpent: number) => void;
  onClose: () => void;
}

const QuizMix: React.FC<QuizMixProps> = ({ onComplete, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionType, setQuestionType] = useState<'multiple' | 'video' | 'fill'>('multiple');

  // Mixed quiz questions
  const questions = [
    {
      id: 1,
      type: 'multiple',
      question: 'Ký hiệu "Xin chào" được thực hiện như thế nào?',
      video: '/resources/videos/Chào.mp4',
      options: ['Vẫy tay', 'Gật đầu', 'Bắt tay', 'Cúi chào'],
      correct: 0
    },
    {
      id: 2,
      type: 'video',
      question: 'Xem video và chọn từ tương ứng:',
      video: '/resources/videos/bố mẹ.mp4',
      options: ['Gia đình', 'Bạn bè', 'Trường học', 'Công việc'],
      correct: 0
    },
    {
      id: 3,
      type: 'fill',
      question: 'Hoàn thành câu: "Tôi rất ... khi gặp bạn"',
      video: '/resources/videos/vui mừng - nam.mp4',
      options: ['Buồn', 'Vui mừng', 'Giận dữ', 'Lo lắng'],
      correct: 1
    },
    {
      id: 4,
      type: 'multiple',
      question: 'Số "một" trong ký hiệu được biểu thị bằng:',
      video: '/resources/videos/1.mp4',
      options: ['Một ngón tay', 'Hai ngón tay', 'Nắm tay', 'Cả bàn tay'],
      correct: 0
    },
    {
      id: 5,
      type: 'video',
      question: 'Ký hiệu này có nghĩa là gì?',
      video: '/resources/videos/xin lỗi.mp4',
      options: ['Cảm ơn', 'Xin lỗi', 'Tạm biệt', 'Chào hỏi'],
      correct: 1
    }
  ];

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    // Set question type based on current question
    setQuestionType(currentQuestion.type as 'multiple' | 'video' | 'fill');
  }, [currentQuestion]);

  const handleAnswer = (answer: string, answerIndex: number) => {
    const isCorrect = answerIndex === currentQuestion.correct;
    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsPlaying(false);
        setShowResult(true);
      }
    }, 2000);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setTimeSpent(0);
    setUserAnswers([]);
    setShowResult(false);
    setIsPlaying(false);
    setShowFeedback(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case 'multiple': return '📝';
      case 'video': return '🎥';
      case 'fill': return '✏️';
      default: return '❓';
    }
  };

  const getQuestionTypeText = (type: string) => {
    switch (type) {
      case 'multiple': return 'Trắc nghiệm';
      case 'video': return 'Nhận diện video';
      case 'fill': return 'Điền từ';
      default: return 'Câu hỏi';
    }
  };

  if (showResult) {
    const accuracy = Math.round((score / questions.length) * 100);
    const xpEarned = Math.round(score * 7 + (accuracy > 80 ? 18 : 0));

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Brain className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-800">Quiz hoàn thành!</CardTitle>
            <p className="text-muted-foreground">Kết quả tổng hợp của bạn</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{score}/{questions.length}</div>
                <div className="text-sm text-muted-foreground">Điểm số</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{accuracy}%</div>
                <div className="text-sm text-muted-foreground">Độ chính xác</div>
              </div>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{formatTime(timeSpent)}</div>
              <div className="text-sm text-muted-foreground">Thời gian hoàn thành</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-lg font-semibold text-orange-700">+{xpEarned} XP</span>
              </div>
              <div className="text-sm text-orange-600">Điểm kinh nghiệm kiếm được</div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Phân tích:</h4>
              <p className="text-sm text-green-700">
                {accuracy >= 80 ? 
                  "Tuyệt vời! Bạn đã nắm vững kiến thức." :
                  accuracy >= 60 ? 
                  "Tốt! Hãy tiếp tục luyện tập để cải thiện." :
                  "Cần luyện tập thêm để nắm vững kiến thức."
                }
              </p>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleRestart} variant="outline" className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                Làm lại
              </Button>
              <Button onClick={() => onComplete(score, timeSpent)} className="flex-1 bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Hoàn thành
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-3xl bg-white max-h-[90vh] flex flex-col">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Brain className="w-5 h-5 text-green-600" />
                Quiz tổng hợp
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Câu {currentIndex + 1} / {questions.length}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-100 text-green-700">
                {getQuestionTypeIcon(questionType)} {getQuestionTypeText(questionType)}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="w-4 h-4" />
                <span>{score} điểm</span>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 flex-1 overflow-y-auto">
          <div className="space-y-6">
            {/* Question */}
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">{currentQuestion.question}</h3>
              
              {/* Video if needed */}
              {(questionType === 'video' || questionType === 'fill') && (
                <div className="bg-gray-100 rounded-lg p-4">
                  <video 
                    className="w-full max-w-sm mx-auto rounded-lg"
                    src={currentQuestion.video}
                    controls
                    playsInline
                    autoPlay
                    muted
                  />
                </div>
              )}
            </div>

            {/* Answer options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option, index)}
                  variant="outline"
                  className="h-16 text-left justify-start hover:bg-blue-50 hover:border-blue-300"
                  disabled={showFeedback}
                >
                  <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                  <span>{option}</span>
                </Button>
              ))}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className={`p-4 rounded-lg ${
                userAnswers[userAnswers.length - 1] === currentQuestion.options[currentQuestion.correct] 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {userAnswers[userAnswers.length - 1] === currentQuestion.options[currentQuestion.correct] ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <X className="w-5 h-5 text-red-600" />
                  )}
                  <span className={`font-semibold ${
                    userAnswers[userAnswers.length - 1] === currentQuestion.options[currentQuestion.correct] 
                      ? 'text-green-800' 
                      : 'text-red-800'
                  }`}>
                    {userAnswers[userAnswers.length - 1] === currentQuestion.options[currentQuestion.correct] 
                      ? 'Chính xác!' 
                      : 'Sai rồi!'
                    }
                  </span>
                </div>
                <p className={`text-sm ${
                  userAnswers[userAnswers.length - 1] === currentQuestion.options[currentQuestion.correct] 
                    ? 'text-green-700' 
                    : 'text-red-700'
                }`}>
                  {userAnswers[userAnswers.length - 1] === currentQuestion.options[currentQuestion.correct] 
                    ? 'Bạn đã trả lời đúng!' 
                    : `Đáp án đúng là: ${currentQuestion.options[currentQuestion.correct]}`
                  }
                </p>
              </div>
            )}

            {/* Controls */}
            <div className="flex justify-center">
              <Button 
                onClick={() => setIsPlaying(!isPlaying)}
                variant="outline"
                className="gap-2"
                disabled={showFeedback}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Tạm dừng' : 'Bắt đầu'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizMix;
