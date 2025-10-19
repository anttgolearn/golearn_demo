import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../../../shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/card';
import { Play, RotateCcw, CheckCircle, X, Clock, Star, Volume2, Shuffle, RotateCcw as Restart, ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import './Flashcard.css';

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
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyMode, setStudyMode] = useState<'normal' | 'shuffle' | 'repeat'>('normal');
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sample vocabulary for flashcard review
  const vocabulary = [
    { 
      word: "Xin chào", 
      video: "/resources/videos/Chào.mp4", 
      meaning: "Lời chào cơ bản khi gặp ai đó",
      example: "Xin chào! Mình là Minh.",
      difficulty: "Dễ"
    },
    { 
      word: "Cảm ơn", 
      video: "/resources/videos/xin lỗi.mp4", 
      meaning: "Lời cảm ơn khi nhận được sự giúp đỡ",
      example: "Cảm ơn bạn rất nhiều!",
      difficulty: "Dễ"
    },
    { 
      word: "Gia đình", 
      video: "/resources/videos/bố mẹ.mp4", 
      meaning: "Những người thân trong nhà",
      example: "Gia đình mình có bốn người.",
      difficulty: "Trung bình"
    },
    { 
      word: "Vui mừng", 
      video: "/resources/videos/vui mừng - nam.mp4", 
      meaning: "Cảm xúc hạnh phúc, vui vẻ",
      example: "Mình rất vui mừng khi gặp bạn.",
      difficulty: "Trung bình"
    },
    { 
      word: "Số một", 
      video: "/resources/videos/1.mp4", 
      meaning: "Số đếm đầu tiên",
      example: "Mình có một người anh trai.",
      difficulty: "Dễ"
    }
  ];

  const currentWord = vocabulary[currentIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Reset video state when current word changes
  useEffect(() => {
    setIsFlipped(false);
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentIndex]);

  const handleAnswer = (isCorrect: boolean) => {
    const newAnswers = [...userAnswers, isCorrect];
    setUserAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Auto advance after showing answer
    setTimeout(() => {
      if (currentIndex < vocabulary.length - 1) {
        setCurrentIndex(prev => prev + 1);
        // Don't auto-flip card - let user control when to flip
      } else {
        setIsPlaying(false);
        setShowResult(true);
      }
    }, 2000);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    
    // Start video when flipping to back side
    if (!isFlipped && videoRef.current) {
      setTimeout(() => {
        videoRef.current?.play().catch(error => {
          console.log('Video autoplay prevented:', error);
          // This is expected behavior in many browsers
        });
      }, 700); // Wait for flip animation to complete
    }
  };

  const handleNext = () => {
    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false); // Reset flip state
    } else {
      setIsPlaying(false);
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false); // Reset flip state
    }
  };

  const handleShuffle = () => {
    setStudyMode('shuffle');
    // Reset to first card
    setCurrentIndex(0);
    // Don't auto-flip card - let user control when to flip
  };

  const handleRestart = () => {
    setCurrentIndex(0);
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
    const accuracy = Math.round((score / vocabulary.length) * 100);
    const xpEarned = Math.round(score * 4 + (accuracy > 80 ? 10 : 0));

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-800">Hoàn thành!</CardTitle>
            <p className="text-muted-foreground">Kết quả luyện tập của bạn</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{score}/{vocabulary.length}</div>
                <div className="text-sm text-muted-foreground">Điểm số</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">{accuracy}%</div>
                <div className="text-sm text-muted-foreground">Độ chính xác</div>
              </div>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{formatTime(timeSpent)}</div>
              <div className="text-sm text-muted-foreground">Thời gian</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 text-blue-500" />
                <span className="text-lg font-semibold text-blue-700">+{xpEarned} XP</span>
              </div>
              <div className="text-sm text-blue-600">Điểm kinh nghiệm kiếm được</div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleRestart} variant="outline" className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                Làm lại
              </Button>
              <Button onClick={() => onComplete(score, timeSpent)} className="flex-1 bg-green-600">
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
      <Card className="w-full max-w-4xl bg-white max-h-[90vh] flex flex-col">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Play className="w-5 h-5 text-blue-600" />
                Flashcard Ôn nhanh
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Thẻ {currentIndex + 1} / {vocabulary.length}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeSpent)}</span>
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
            {/* Study Mode Controls */}
            <div className="flex justify-center gap-2">
              <Button
                onClick={() => setStudyMode('normal')}
                className={`flashcard-button ${studyMode === 'normal' ? 'study-mode-active' : 'study-mode-inactive'}`}
                size="sm"
              >
                Thứ tự
              </Button>
              <Button
                onClick={handleShuffle}
                className={`flashcard-button ${studyMode === 'shuffle' ? 'study-mode-active' : 'study-mode-inactive'}`}
                size="sm"
              >
                <Shuffle className="w-4 h-4 mr-1" />
                Xáo trộn
              </Button>
              <Button
                onClick={() => setStudyMode('repeat')}
                className={`flashcard-button ${studyMode === 'repeat' ? 'study-mode-active' : 'study-mode-inactive'}`}
                size="sm"
              >
                <Restart className="w-4 h-4 mr-1" />
                Lặp lại
              </Button>
            </div>

            {/* Flashcard */}
            <div className="flex justify-center">
              <div 
                className="relative w-full max-w-2xl h-96 flashcard-container"
              >
                <div 
                  className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d flip-card ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Front of card */}
                  <div 
                    className="absolute inset-0 w-full h-full backface-hidden cursor-pointer"
                    onClick={!isFlipped ? handleFlip : undefined}
                  >
                    <Card className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 flashcard-front">
                      <CardContent className="p-8 h-full flex flex-col items-center justify-center text-center">
                        <div className="space-y-6">
                          <div className="text-4xl font-bold text-blue-800">
                            {currentWord.word}
                          </div>
                          <div className="text-lg text-gray-600">
                            {currentWord.difficulty}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Click để xem video ký hiệu
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Back of card */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                    <Card className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 flashcard-back">
                      <CardContent className="p-8 h-full flex flex-col items-center justify-center text-center">
                        <div className="space-y-6">
                          <div className="text-2xl font-bold text-green-800 mb-4">
                            {currentWord.word}
                          </div>
                          <div 
                            className="bg-black rounded-lg p-2 w-full max-w-md mx-auto"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <video 
                              ref={videoRef}
                              className="w-full h-64 rounded-lg object-contain"
                              src={currentWord.video}
                              controls
                              playsInline
                              autoPlay
                              loop
                              muted={isMuted}
                              style={{ display: 'block' }}
                              onClick={(e) => e.stopPropagation()}
                              onError={(e) => {
                                console.error('Video load error:', currentWord.video);
                                console.error('Full error:', e);
                              }}
                              onLoadStart={() => {
                                console.log('Loading video:', currentWord.video);
                              }}
                              onCanPlay={() => {
                                console.log('Video can play:', currentWord.video);
                              }}
                            >
                              <source src={currentWord.video} type="video/mp4" />
                              Video của bạn không thể phát. Trình duyệt không hỗ trợ định dạng video này.
                            </video>
                          </div>
                          <div className="text-sm text-gray-600">
                            Video ký hiệu cho từ "{currentWord.word}"
                          </div>
                          <div className="mt-4">
                            <Button
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent card flip
                                setIsFlipped(false);
                              }}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                            >
                              Quay lại mặt trước
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center items-center gap-4">
              <Button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                variant="outline"
                size="sm"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Trước
              </Button>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsMuted(!isMuted)}
                  variant="outline"
                  size="sm"
                >
                  {isMuted ? <Volume2 className="w-4 h-4" /> : <X className="w-4 h-4" />}
                </Button>
              </div>

              <Button
                onClick={handleNext}
                disabled={currentIndex === vocabulary.length - 1}
                variant="outline"
                size="sm"
              >
                Sau
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {/* Answer Buttons (only show when video is visible) */}
            {isFlipped && (
              <div className="flex justify-center gap-4">
                <Button 
                  onClick={() => handleAnswer(true)}
                  className="bg-green-600 text-white px-8 py-3"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Đã nhớ ký hiệu
                </Button>
                <Button 
                  onClick={() => handleAnswer(false)}
                  variant="outline"
                  className="border-red-300 text-red-600 px-8 py-3"
                >
                  <X className="w-5 h-5 mr-2" />
                  Chưa nhớ ký hiệu
                </Button>
              </div>
            )}

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full progress-bar"
                style={{ width: `${((currentIndex + 1) / vocabulary.length) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickReview;
