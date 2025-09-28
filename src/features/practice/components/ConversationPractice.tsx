import React, { useState, useEffect } from 'react';
import { Button } from '../../../shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/card';
import { Badge } from '../../../shared/ui/badge';
import { Play, RotateCcw, CheckCircle, X, Clock, MessageCircle, Mic, Star } from 'lucide-react';

interface ConversationPracticeProps {
  onComplete: (score: number, timeSpent: number) => void;
  onClose: () => void;
}

const ConversationPractice: React.FC<ConversationPracticeProps> = ({ onComplete, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  // Conversation scenarios
  const scenarios = [
    {
      id: 1,
      title: "Lần đầu gặp gỡ",
      context: "Bạn gặp một người bạn mới tại một sự kiện",
      conversation: [
        { speaker: "A", text: "Xin chào! Mình là Minh.", video: "/resources/videos/Chào.mp4" },
        { speaker: "B", text: "Chào bạn! Mình là Lan. Rất vui được gặp bạn.", video: "/resources/videos/vui mừng - nam.mp4" },
        { speaker: "A", text: "Bạn có học ngôn ngữ ký hiệu không?", video: "/resources/videos/Chào.mp4" },
        { speaker: "B", text: "Có, mình mới bắt đầu học. Còn bạn thì sao?", video: "/resources/videos/Chào.mp4" }
      ],
      userRole: "B"
    },
    {
      id: 2,
      title: "Thăm hỏi gia đình",
      context: "Bạn đang hỏi thăm về gia đình của một người bạn",
      conversation: [
        { speaker: "A", text: "Gia đình bạn có mấy người?", video: "/resources/videos/bố mẹ.mp4" },
        { speaker: "B", text: "Nhà mình có bốn người: bố, mẹ, anh trai và mình.", video: "/resources/videos/bố mẹ.mp4" },
        { speaker: "A", text: "Anh trai bạn bao nhiêu tuổi?", video: "/resources/videos/1.mp4" },
        { speaker: "B", text: "Anh ấy hai mươi lăm tuổi.", video: "/resources/videos/1.mp4" }
      ],
      userRole: "B"
    },
    {
      id: 3,
      title: "Chia sẻ cảm xúc",
      context: "Bạn đang chia sẻ cảm xúc với một người bạn thân",
      conversation: [
        { speaker: "A", text: "Hôm nay bạn cảm thấy thế nào?", video: "/resources/videos/vui mừng - nam.mp4" },
        { speaker: "B", text: "Mình rất vui mừng vì có bài kiểm tra ngày mai.", video: "/resources/videos/vui mừng - nam.mp4" },
        { speaker: "A", text: "Tại sao bạn lại vui mừng?", video: "/resources/videos/Chào.mp4" },
        { speaker: "B", text: "Vì mình đã chuẩn bị rất kỹ và tự tin sẽ làm tốt.", video: "/resources/videos/tự_tin.mp4" }
      ],
      userRole: "B"
    }
  ];

  const currentScenario = scenarios[currentIndex];
  const currentConversation = currentScenario.conversation;

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
    if (currentIndex < scenarios.length - 1) {
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
    const accuracy = Math.round((score / scenarios.length) * 100);
    const xpEarned = Math.round(score * 12 + (accuracy > 80 ? 25 : 0));

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="w-8 h-8 text-orange-600" />
            </div>
            <CardTitle className="text-2xl text-orange-800">Hội thoại hoàn thành!</CardTitle>
            <p className="text-muted-foreground">Bạn đã thực hành giao tiếp rất tốt</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{score}/{scenarios.length}</div>
                <div className="text-sm text-muted-foreground">Tình huống đã luyện</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{formatTime(timeSpent)}</div>
                <div className="text-sm text-muted-foreground">Thời gian luyện</div>
              </div>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-lg font-semibold text-orange-700">+{xpEarned} XP</span>
              </div>
              <div className="text-sm text-orange-600">Điểm kinh nghiệm kiếm được</div>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">Lời khuyên:</h4>
              <p className="text-sm text-orange-700">
                Tiếp tục luyện tập hội thoại để cải thiện kỹ năng giao tiếp thực tế!
              </p>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleRestart} variant="outline" className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                Luyện lại
              </Button>
              <Button onClick={() => onComplete(score, timeSpent)} className="flex-1 bg-orange-600 hover:bg-orange-700">
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
        <Card className="w-full max-w-md bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="w-8 h-8 text-orange-600" />
            </div>
            <CardTitle className="text-2xl text-orange-800">Luyện hội thoại</CardTitle>
            <p className="text-muted-foreground">Hướng dẫn thực hành giao tiếp</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-orange-600">1</span>
                </div>
                <p>Đọc tình huống và vai trò của bạn</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-orange-600">2</span>
                </div>
                <p>Xem video mẫu của đối tác</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-orange-600">3</span>
                </div>
                <p>Thực hiện ký hiệu phản hồi của bạn</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-orange-600">4</span>
                </div>
                <p>Ghi âm và so sánh với video mẫu</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={onClose} variant="outline" className="flex-1">
                <X className="w-4 h-4 mr-2" />
                Thoát
              </Button>
              <Button onClick={() => setShowInstructions(false)} className="flex-1 bg-orange-600 hover:bg-orange-700">
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
      <Card className="w-full max-w-4xl bg-white max-h-[90vh] flex flex-col">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-orange-600" />
                Luyện hội thoại
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Tình huống {currentIndex + 1} / {scenarios.length}: {currentScenario.title}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeSpent)}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 flex-1 overflow-y-auto">
          <div className="space-y-6">
            {/* Scenario context */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Tình huống:</h3>
              <p className="text-blue-700">{currentScenario.context}</p>
              <div className="mt-2">
                <Badge className="bg-blue-100 text-blue-700">
                  Vai trò của bạn: {currentScenario.userRole === 'A' ? 'Người A' : 'Người B'}
                </Badge>
              </div>
            </div>

            {/* Conversation flow */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Cuộc hội thoại:</h3>
              <div className="space-y-3">
                {currentConversation.map((message, index) => (
                  <div key={index} className={`flex ${message.speaker === currentScenario.userRole ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                      message.speaker === currentScenario.userRole 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium">
                          {message.speaker === 'A' ? 'Người A' : 'Người B'}
                        </span>
                        {message.speaker === currentScenario.userRole && (
                          <Badge className="bg-orange-200 text-orange-700 text-xs">Bạn</Badge>
                        )}
                      </div>
                      <p className="text-sm mb-2">{message.text}</p>
                      <video 
                        className="w-full rounded"
                        src={message.video}
                        controls
                        playsInline
                        muted
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Practice area */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">Khu vực thực hành của bạn:</h4>
              
              {/* Recording area */}
              <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center border-2 border-dashed border-gray-300 mb-4">
                <div className="text-center">
                  <Mic className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Ghi âm phản hồi của bạn</p>
                  <p className="text-gray-400 text-xs mt-1">Sử dụng ký hiệu phù hợp với vai trò</p>
                </div>
              </div>

              {/* Recording controls */}
              <div className="flex gap-3">
                <Button 
                  onClick={() => setIsRecording(!isRecording)}
                  className={`flex-1 ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  <Mic className="w-4 h-4 mr-2" />
                  {isRecording ? 'Dừng ghi âm' : 'Bắt đầu ghi âm'}
                </Button>
                <Button 
                  onClick={handleNext}
                  variant="outline"
                  className="flex-1"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Hoàn thành
                </Button>
              </div>
            </div>

            {/* Tips */}
            <div className="p-3 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Mẹo giao tiếp:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Chú ý đến ngữ cảnh và tình huống</li>
                <li>• Sử dụng ký hiệu phù hợp với vai trò</li>
                <li>• Thể hiện cảm xúc qua nét mặt</li>
                <li>• Thực hiện ký hiệu rõ ràng và chính xác</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationPractice;
