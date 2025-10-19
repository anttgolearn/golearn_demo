import React, { useState, useEffect } from 'react';
import { Button } from '../../../shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/card';
import { Play, RotateCcw, CheckCircle, X, Clock, Camera, Video, Star } from 'lucide-react';

interface MirrorPracticeProps {
  onComplete: (score: number, timeSpent: number) => void;
  onClose: () => void;
}

const MirrorPractice: React.FC<MirrorPracticeProps> = ({ onComplete, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  // Mirror practice vocabulary
  const vocabulary = [
    { word: "Xin chào", video: "/resources/videos/Chào.mp4", instruction: "Chào hỏi với nụ cười thân thiện" },
    { word: "Cảm ơn", video: "/resources/videos/xin lỗi.mp4", instruction: "Thể hiện lòng biết ơn chân thành" },
    { word: "Gia đình", video: "/resources/videos/bố mẹ.mp4", instruction: "Mô tả về những người thân yêu" },
    { word: "Vui mừng", video: "/resources/videos/vui mừng - nam.mp4", instruction: "Thể hiện niềm vui và hạnh phúc" },
    { word: "Số một", video: "/resources/videos/1.mp4", instruction: "Đếm số một với ngón tay" }
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

  const handleNext = () => {
    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setScore(prev => prev + 1); // Assume user practiced correctly
    } else {
      setIsPlaying(false);
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setTimeSpent(0);
    setShowResult(false);
    setIsPlaying(false);
    setIsRecording(false);
    setShowInstructions(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResult) {
    const accuracy = Math.round((score / vocabulary.length) * 100);
    const xpEarned = Math.round(score * 8 + (accuracy > 80 ? 20 : 0));

    return (
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
        <Card className="w-full max-w-[95vw] sm:max-w-md max-h-[95vh] overflow-y-auto overscroll-contain bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 mx-auto">
          <CardHeader className="text-center flex-shrink-0">
            <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
            <CardTitle className="text-xl sm:text-2xl text-purple-800">Luyện gương hoàn thành!</CardTitle>
            <p className="text-sm text-muted-foreground">Bạn đã thực hành rất tốt</p>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-4 bg-white rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">{score}/{vocabulary.length}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Ký hiệu đã luyện</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-purple-600">{formatTime(timeSpent)}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Thời gian luyện</div>
              </div>
            </div>

            <div className="text-center p-3 sm:p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                <span className="text-base sm:text-lg font-semibold text-orange-700">+{xpEarned} XP</span>
              </div>
              <div className="text-xs sm:text-sm text-orange-600">Điểm kinh nghiệm kiếm được</div>
            </div>

            <div className="p-3 sm:p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-sm sm:text-base text-purple-800 mb-1 sm:mb-2">Lời khuyên:</h4>
              <p className="text-xs sm:text-sm text-purple-700">
                Tiếp tục luyện tập trước gương để cải thiện kỹ thuật và sự tự tin của bạn!
              </p>
            </div>

            <div className="flex gap-2 sm:gap-3">
              <Button onClick={handleRestart} variant="outline" className="flex-1 text-xs sm:text-sm">
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Luyện lại
              </Button>
              <Button onClick={() => onComplete(score, timeSpent)} className="flex-1 bg-purple-600 hover:bg-purple-700 text-xs sm:text-sm">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
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
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
        <Card className="w-full max-w-[95vw] sm:max-w-md max-h-[95vh] overflow-y-auto overscroll-contain bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 mx-auto">
          <CardHeader className="text-center flex-shrink-0">
            <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
            <CardTitle className="text-xl sm:text-2xl text-purple-800">Luyện gương</CardTitle>
            <p className="text-sm text-muted-foreground">Hướng dẫn luyện tập</p>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[10px] sm:text-xs font-bold text-purple-600">1</span>
                </div>
                <p className="leading-relaxed">Đặt camera hoặc gương trước mặt bạn</p>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[10px] sm:text-xs font-bold text-purple-600">2</span>
                </div>
                <p className="leading-relaxed">Xem video mẫu và quan sát kỹ thuật</p>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[10px] sm:text-xs font-bold text-purple-600">3</span>
                </div>
                <p className="leading-relaxed">Lặp lại ký hiệu trước gương</p>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[10px] sm:text-xs font-bold text-purple-600">4</span>
                </div>
                <p className="leading-relaxed">So sánh với video mẫu và điều chỉnh</p>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3 pt-2">
              <Button onClick={onClose} variant="outline" className="flex-1 text-xs sm:text-sm">
                <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Thoát
              </Button>
              <Button onClick={() => setShowInstructions(false)} className="flex-1 bg-purple-600 hover:bg-purple-700 text-xs sm:text-sm">
                <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Bắt đầu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
      <Card className="w-full max-w-[98vw] sm:max-w-4xl bg-white max-h-[95vh] sm:max-h-[90vh] flex flex-col mx-auto">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 flex-shrink-0 p-3 sm:p-6">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base sm:text-xl flex items-center gap-1.5 sm:gap-2">
                <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
                <span className="truncate">Luyện gương</span>
              </CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1 truncate">
                Ký hiệu {currentIndex + 1} / {vocabulary.length}: {currentWord.word}
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{formatTime(timeSpent)}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} className="h-7 w-7 sm:h-8 sm:w-8 p-0">
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-3 sm:p-6 flex-1 overflow-y-auto overscroll-contain">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Video mẫu */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Video mẫu</h3>
              <div className="bg-gray-100 rounded-lg p-2 sm:p-4">
                <video 
                  className="w-full rounded-lg"
                  src={currentWord.video}
                  controls
                  playsInline
                  autoPlay
                  muted
                />
              </div>
              <div className="p-2.5 sm:p-3 bg-blue-50 rounded-lg">
                <p className="text-xs sm:text-sm text-blue-800">
                  <strong>Hướng dẫn:</strong> {currentWord.instruction}
                </p>
              </div>
            </div>

            {/* Khu vực luyện tập */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Khu vực luyện tập của bạn</h3>
              
              {/* Camera placeholder */}
              <div className="bg-gray-200 rounded-lg h-48 sm:h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center px-4">
                  <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-1 sm:mb-2" />
                  <p className="text-gray-500 text-xs sm:text-sm">Camera của bạn sẽ hiển thị ở đây</p>
                  <p className="text-gray-400 text-[10px] sm:text-xs mt-0.5 sm:mt-1">Đảm bảo ánh sáng đủ và vị trí rõ ràng</p>
                </div>
              </div>

              {/* Recording controls */}
              <div className="flex gap-2 sm:gap-3">
                <Button 
                  onClick={() => setIsRecording(!isRecording)}
                  className={`flex-1 text-xs sm:text-sm ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  <Video className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  {isRecording ? 'Dừng ghi' : 'Bắt đầu ghi'}
                </Button>
                <Button 
                  onClick={handleNext}
                  variant="outline"
                  className="flex-1 text-xs sm:text-sm"
                >
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Hoàn thành
                </Button>
              </div>

              {/* Tips */}
              <div className="p-2.5 sm:p-3 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-xs sm:text-sm text-yellow-800 mb-1.5 sm:mb-2">Mẹo luyện tập:</h4>
                <ul className="text-[10px] sm:text-sm text-yellow-700 space-y-0.5 sm:space-y-1">
                  <li>• Giữ tay ở vị trí thoải mái</li>
                  <li>• Thực hiện chậm rãi và chính xác</li>
                  <li>• Quan sát phản chiếu trong gương</li>
                  <li>• Lặp lại nhiều lần để thành thạo</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MirrorPractice;
