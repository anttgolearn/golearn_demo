import React, { useState, useEffect } from 'react';
import { Button } from '../../../shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/card';
import { Badge } from '../../../shared/ui/badge';
import { Play, Pause, RotateCcw, CheckCircle, X, Zap, Target, Star } from 'lucide-react';

interface SpeedChallengeProps {
  onComplete: (score: number, timeSpent: number) => void;
  onClose: () => void;
}

const SpeedChallenge: React.FC<SpeedChallengeProps> = ({ onComplete, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [showFeedback, setShowFeedback] = useState(false);

  // Speed challenge vocabulary
  const vocabulary = [
    { word: "Xin chào", video: "/resources/videos/Chào.mp4", options: ["Chào", "Tạm biệt", "Cảm ơn", "Xin lỗi"] },
    { word: "Gia đình", video: "/resources/videos/bố mẹ.mp4", options: ["Bạn bè", "Gia đình", "Trường học", "Công việc"] },
    { word: "Vui mừng", video: "/resources/videos/vui mừng - nam.mp4", options: ["Buồn", "Vui mừng", "Giận dữ", "Lo lắng"] },
    { word: "Số một", video: "/resources/videos/1.mp4", options: ["Một", "Hai", "Ba", "Bốn"] },
    { word: "Cảm ơn", video: "/resources/videos/xin lỗi.mp4", options: ["Xin lỗi", "Cảm ơn", "Không có gì", "Tạm biệt"] }
  ];

  const currentWord = vocabulary[currentIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        setTimeSpent(prev => prev + 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      // Time's up, move to next question
      handleAnswer("");
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === currentWord.word;
    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      if (currentIndex < vocabulary.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setTimeLeft(30);
      } else {
        setIsPlaying(false);
        setShowResult(true);
      }
    }, 1500);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setTimeSpent(0);
    setUserAnswers([]);
    setShowResult(false);
    setIsPlaying(false);
    setTimeLeft(30);
    setShowFeedback(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResult) {
    const accuracy = Math.round((score / vocabulary.length) * 100);
    const xpEarned = Math.round(score * 6 + (accuracy > 80 ? 15 : 0));
    const avgTime = Math.round(timeSpent / vocabulary.length);

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-red-800">Thử thách hoàn thành!</CardTitle>
            <p className="text-muted-foreground">Kết quả tốc độ của bạn</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{score}/{vocabulary.length}</div>
                <div className="text-sm text-muted-foreground">Điểm số</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{accuracy}%</div>
                <div className="text-sm text-muted-foreground">Độ chính xác</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-green-600">{formatTime(timeSpent)}</div>
                <div className="text-sm text-muted-foreground">Tổng thời gian</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{avgTime}s</div>
                <div className="text-sm text-muted-foreground">Trung bình/câu</div>
              </div>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-lg font-semibold text-orange-700">+{xpEarned} XP</span>
              </div>
              <div className="text-sm text-orange-600">Điểm kinh nghiệm kiếm được</div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleRestart} variant="outline" className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                Thử lại
              </Button>
              <Button onClick={() => onComplete(score, timeSpent)} className="flex-1 bg-red-600 hover:bg-red-700">
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
      <Card className="w-full max-w-2xl bg-white max-h-[90vh] flex flex-col">
        <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Zap className="w-5 h-5 text-red-600" />
                Thử thách tốc độ
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Câu {currentIndex + 1} / {vocabulary.length}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-red-500" />
                <Badge className="bg-red-100 text-red-700">
                  {timeLeft}s
                </Badge>
              </div>
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
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg p-4">
                <video 
                  className="w-full max-w-sm mx-auto rounded-lg"
                  src={currentWord.video}
                  controls
                  playsInline
                  autoPlay
                  muted
                />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-gray-600">Ký hiệu này có nghĩa là gì?</p>
              <div className="grid grid-cols-2 gap-3">
                {currentWord.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    variant="outline"
                    className="h-12 text-sm hover:bg-blue-50 hover:border-blue-300"
                    disabled={showFeedback}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            {showFeedback && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {userAnswers[userAnswers.length - 1] === currentWord.word ? 
                    "✅ Chính xác!" : 
                    `❌ Sai rồi! Đáp án đúng là: ${currentWord.word}`
                  }
                </p>
              </div>
            )}

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

export default SpeedChallenge;
