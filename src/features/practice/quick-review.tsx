import React, { useState, useEffect } from 'react';
import { Button } from '../../shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../shared/ui/card';
import { Badge } from '../../shared/ui/badge';
import { Play, Pause, RotateCcw, CheckCircle, X, Clock, Star } from 'lucide-react';

interface QuickReviewProps {
  onComplete: (score: number, timeSpent: number) => void;
  onClose: () => void;
}

const QuickReview: React.FC<QuickReviewProps> = ({ onComplete, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]);

  // Sample vocabulary for quick review
  const vocabulary = [
    { word: "Xin chào", video: "/resources/videos/Chào.mp4", meaning: "Lời chào cơ bản" },
    { word: "Cảm ơn", video: "/resources/videos/xin lỗi.mp4", meaning: "Lời cảm ơn" },
    { word: "Vui mừng", video: "/resources/videos/vui mừng - nam.mp4", meaning: "Cảm xúc vui vẻ" },
    { word: "Gia đình", video: "/resources/videos/bố mẹ.mp4", meaning: "Thành viên trong nhà" },
    { word: "Một", video: "/resources/videos/1.mp4", meaning: "Số đếm 1" }
  ];

  const [currentWord, setCurrentWord] = useState(vocabulary[0]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleAnswer = (isCorrect: boolean) => {
    const newAnswers = [...userAnswers, isCorrect];
    setUserAnswers(newAnswers);
    setScore(prev => prev + (isCorrect ? 1 : 0));
    
    if (currentIndex < vocabulary.length - 1) {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setCurrentWord(vocabulary[currentIndex + 1]);
      }, 1000);
    } else {
      setTimeout(() => {
        setShowResult(true);
        setIsPlaying(false);
      }, 1000);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setCurrentWord(vocabulary[0]);
    setScore(0);
    setTimeSpent(0);
    setUserAnswers([]);
    setShowResult(false);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResult) {
    const percentage = Math.round((score / vocabulary.length) * 100);
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Hoàn thành!</CardTitle>
            <p className="text-muted-foreground">Kết quả ôn nhanh của bạn</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{score}/{vocabulary.length}</div>
                <div className="text-sm text-muted-foreground">Điểm số</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{percentage}%</div>
                <div className="text-sm text-muted-foreground">Độ chính xác</div>
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold">{formatTime(timeSpent)}</div>
              <div className="text-sm text-muted-foreground">Thời gian hoàn thành</div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleRestart} variant="outline" className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                Làm lại
              </Button>
              <Button onClick={() => onComplete(score, timeSpent)} className="flex-1">
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
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Ôn nhanh
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Câu {currentIndex + 1} / {vocabulary.length}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {formatTime(timeSpent)}
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / vocabulary.length) * 100}%` }}
            />
          </div>

          {/* Video Display */}
          <div className="text-center">
            <video
              className="w-full max-w-md mx-auto rounded-lg border"
              src={currentWord.video}
              controls
              playsInline
              autoPlay={isPlaying}
              muted
            />
            <p className="mt-2 text-sm text-muted-foreground">{currentWord.meaning}</p>
          </div>

          {/* Question */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">
              Bạn có nhớ ký hiệu cho từ "<span className="text-blue-600">{currentWord.word}</span>" không?
            </h3>
          </div>

          {/* Answer Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => handleAnswer(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Có, tôi nhớ
            </Button>
            <Button
              onClick={() => handleAnswer(false)}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50 px-8 py-3 text-lg"
            >
              <X className="w-5 h-5 mr-2" />
              Chưa chắc
            </Button>
          </div>

          {/* Play/Pause Controls */}
          <div className="flex justify-center gap-2">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              variant="outline"
              size="sm"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Tạm dừng' : 'Phát lại'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickReview;
