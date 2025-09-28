import React, { useState, useEffect } from 'react';
import { Button } from '../../../shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/card';
import { Badge } from '../../../shared/ui/badge';
import { Play, Pause, RotateCcw, CheckCircle, X, Clock, Star, Trophy, Flame, Target } from 'lucide-react';

interface DailyChallengeProps {
  onComplete: (score: number, timeSpent: number) => void;
  onClose: () => void;
}

const DailyChallenge: React.FC<DailyChallengeProps> = ({ onComplete, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);

  // Daily challenge - mixed difficulty questions
  const challenges = [
    {
      id: 1,
      type: 'speed',
      question: 'Trong 10 giây, hãy thực hiện ký hiệu "Xin chào"',
      video: '/resources/videos/Chào.mp4',
      timeLimit: 10,
      points: 20
    },
    {
      id: 2,
      type: 'memory',
      question: 'Nhớ và lặp lại chuỗi ký hiệu: Chào → Cảm ơn → Gia đình',
      videos: ['/resources/videos/Chào.mp4', '/resources/videos/xin lỗi.mp4', '/resources/videos/bố mẹ.mp4'],
      timeLimit: 30,
      points: 30
    },
    {
      id: 3,
      type: 'emotion',
      question: 'Thể hiện cảm xúc "Vui mừng" trong 3 cách khác nhau',
      video: '/resources/videos/vui mừng - nam.mp4',
      timeLimit: 20,
      points: 25
    },
    {
      id: 4,
      type: 'conversation',
      question: 'Tạo một câu chuyện ngắn sử dụng 5 ký hiệu đã học',
      videos: ['/resources/videos/Chào.mp4', '/resources/videos/bố mẹ.mp4', '/resources/videos/vui mừng - nam.mp4', '/resources/videos/1.mp4', '/resources/videos/xin lỗi.mp4'],
      timeLimit: 60,
      points: 50
    },
    {
      id: 5,
      type: 'creative',
      question: 'Sáng tạo một ký hiệu mới cho từ "Học tập"',
      video: '/resources/videos/Chào.mp4',
      timeLimit: 30,
      points: 40
    }
  ];

  const currentChallenge = challenges[currentIndex];
  const [timeLeft, setTimeLeft] = useState(currentChallenge.timeLimit);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        setTimeSpent(prev => prev + 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      // Time's up, move to next challenge
      handleNext();
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    setTimeLeft(currentChallenge.timeLimit);
  }, [currentChallenge]);

  const handleNext = () => {
    const newAnswers = [...userAnswers, 'completed'];
    setUserAnswers(newAnswers);
    setScore(prev => prev + currentChallenge.points);
    
    if (currentIndex < challenges.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsPlaying(false);
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setTimeSpent(0);
    setUserAnswers([]);
    setShowResult(false);
    setIsPlaying(false);
    setShowInstructions(true);
    setTimeLeft(challenges[0].timeLimit);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getChallengeTypeIcon = (type: string) => {
    switch (type) {
      case 'speed': return '⚡';
      case 'memory': return '🧠';
      case 'emotion': return '😊';
      case 'conversation': return '💬';
      case 'creative': return '🎨';
      default: return '⭐';
    }
  };

  const getChallengeTypeText = (type: string) => {
    switch (type) {
      case 'speed': return 'Thử thách tốc độ';
      case 'memory': return 'Thử thách trí nhớ';
      case 'emotion': return 'Thử thách cảm xúc';
      case 'conversation': return 'Thử thách hội thoại';
      case 'creative': return 'Thử thách sáng tạo';
      default: return 'Thử thách';
    }
  };

  if (showResult) {
    const accuracy = Math.round((score / challenges.reduce((sum, c) => sum + c.points, 0)) * 100);
    const xpEarned = Math.round(score * 2 + (accuracy > 80 ? 50 : 0));
    const newStreak = streak + 1;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-yellow-600" />
            </div>
            <CardTitle className="text-2xl text-yellow-800">Thử thách hoàn thành!</CardTitle>
            <p className="text-muted-foreground">Bạn đã vượt qua thử thách hàng ngày</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{score}</div>
                <div className="text-sm text-muted-foreground">Điểm số</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{formatTime(timeSpent)}</div>
                <div className="text-sm text-muted-foreground">Thời gian</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="text-2xl font-bold text-orange-600">{newStreak}</span>
                </div>
                <div className="text-sm text-muted-foreground">Ngày liên tiếp</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
                <div className="text-sm text-muted-foreground">Hiệu suất</div>
              </div>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-lg font-semibold text-orange-700">+{xpEarned} XP</span>
              </div>
              <div className="text-sm text-orange-600">Điểm kinh nghiệm kiếm được</div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Thành tích:</h4>
              <p className="text-sm text-yellow-700">
                {newStreak >= 7 ? 
                  "🔥 Tuyệt vời! Bạn đã duy trì streak 7 ngày!" :
                  newStreak >= 3 ? 
                  "👍 Tốt! Hãy tiếp tục duy trì streak!" :
                  "💪 Bắt đầu streak mới của bạn!"
                }
              </p>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleRestart} variant="outline" className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                Thử lại
              </Button>
              <Button onClick={() => onComplete(score, timeSpent)} className="flex-1 bg-yellow-600 hover:bg-yellow-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Hoàn thành
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showInstructions) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-yellow-600" />
            </div>
            <CardTitle className="text-2xl text-yellow-800">Thử thách hàng ngày</CardTitle>
            <p className="text-muted-foreground">Thử thách đặc biệt hôm nay</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-yellow-600">1</span>
                </div>
                <p>Hoàn thành 5 thử thách khác nhau</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-yellow-600">2</span>
                </div>
                <p>Mỗi thử thách có giới hạn thời gian</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-yellow-600">3</span>
                </div>
                <p>Kiếm điểm và duy trì streak</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-yellow-600">4</span>
                </div>
                <p>Thử thách mới mỗi ngày</p>
              </div>
            </div>

            <div className="p-3 bg-yellow-100 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="font-semibold text-yellow-800">Streak hiện tại: {streak} ngày</span>
              </div>
              <p className="text-xs text-yellow-700">Duy trì streak để nhận bonus XP!</p>
            </div>

            <div className="flex gap-3">
              <Button onClick={onClose} variant="outline" className="flex-1">
                <X className="w-4 h-4 mr-2" />
                Thoát
              </Button>
              <Button onClick={() => setShowInstructions(false)} className="flex-1 bg-yellow-600 hover:bg-yellow-700">
                <Play className="w-4 h-4 mr-2" />
                Bắt đầu
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
        <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Thử thách hàng ngày
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Thử thách {currentIndex + 1} / {challenges.length}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-yellow-500" />
                <Badge className="bg-yellow-100 text-yellow-700">
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
          <div className="space-y-6">
            {/* Challenge info */}
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">{getChallengeTypeIcon(currentChallenge.type)}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {getChallengeTypeText(currentChallenge.type)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Điểm số: {currentChallenge.points} | Thời gian: {currentChallenge.timeLimit}s
                </p>
              </div>
            </div>

            {/* Challenge content */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-800">{currentChallenge.question}</h4>
              
              {/* Video content */}
              <div className="bg-gray-100 rounded-lg p-4">
                {currentChallenge.videos ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentChallenge.videos.map((video, index) => (
                      <video 
                        key={index}
                        className="w-full rounded-lg"
                        src={video}
                        controls
                        playsInline
                        muted
                      />
                    ))}
                  </div>
                ) : (
                  <video 
                    className="w-full max-w-sm mx-auto rounded-lg"
                    src={currentChallenge.video}
                    controls
                    playsInline
                    autoPlay
                    muted
                  />
                )}
              </div>

              {/* Practice area */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h5 className="font-semibold text-gray-800 mb-3">Khu vực thực hành:</h5>
                <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <Target className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Thực hiện thử thách của bạn</p>
                    <p className="text-gray-400 text-xs mt-1">Sử dụng camera để ghi lại</p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <Button 
                  onClick={handleNext}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Hoàn thành thử thách
                </Button>
                <Button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  variant="outline"
                  className="gap-2"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? 'Tạm dừng' : 'Bắt đầu'}
                </Button>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Tiến độ thử thách</span>
                <span>{currentIndex + 1} / {challenges.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / challenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyChallenge;
