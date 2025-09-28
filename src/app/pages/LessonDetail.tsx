import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui/card";
import { Badge } from "../../shared/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../shared/ui/select";
import { Switch } from "../../shared/ui/switch";
import { Progress } from "../../shared/ui/progress";
// removed unused Tabs imports
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  CheckCircle,
  ArrowLeft,
  Clock,
  Star,
  BookOpen,
  Target,
  Trophy,
  Camera
} from "lucide-react";
import Header from "../../shared/components/Header";

interface LessonDetailProps {
  lessonId: string;
  onBackToDashboard?: () => void;
}

const LessonDetail = ({ lessonId, onBackToDashboard }: LessonDetailProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState<"slow" | "medium" | "normal">("normal");
  const [showTranscript, setShowTranscript] = useState(true);
  const [showViSubtitle, setShowViSubtitle] = useState(true);
  const [showSignSubtitle, setShowSignSubtitle] = useState(true);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([0, 1]);
  const [showMirror, setShowMirror] = useState(false);
  const [mirrorFeedback, setMirrorFeedback] = useState<"neutral" | "correct" | "incorrect">("neutral");
  const mirrorVideoRef = useRef<HTMLVideoElement | null>(null);
  const mirrorStreamRef = useRef<MediaStream | null>(null);
  const feedbackTimerRef = useRef<number | null>(null);
  
  // State for video sequence
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoSequence, setVideoSequence] = useState<string[]>([]);
  const [isSequencePlaying, setIsSequencePlaying] = useState(false);

  const lessonsData = {
    "1": {
      id: "1",
      title: "Chào hỏi cơ bản",
      description: "Học cách chào hỏi và giới thiệu bản thân bằng ngôn ngữ ký hiệu Việt Nam",
      difficulty: "Cơ bản",
      duration: "10 phút",
      xp: 50,
      progress: 60,
      thumbnail: "https://via.placeholder.com/400x300?text=Greetings+Lesson",
      instructor: "Cô Nguyễn Thị Lan",
      rating: 4.8,
      studentsCount: 1250
    },
    "4": {
      id: "4",
      title: "Cảm xúc",
      description: "Học cách biểu đạt 20 loại cảm xúc khác nhau từ cơ bản đến phức tạp bằng ngôn ngữ ký hiệu Việt Nam",
      difficulty: "Trung cấp",
      duration: "20 phút",
      xp: 120,
      progress: 0,
      thumbnail: "/public/images/lesson-emotions-CLtOmn_z.jpg",
      instructor: "Thầy Phạm Văn Minh",
      rating: 4.9,
      studentsCount: 980
    }
  };
  
  const lesson = lessonsData[lessonId as keyof typeof lessonsData] || lessonsData["1"];

  const stepsData = {
    "1": [
      {
        id: 1,
        title: "Chào hỏi cơ bản",
        description: "Học cách nói 'Xin chào' và 'Tạm biệt'",
        duration: "2 phút",
        type: "video",
        content: "Video hướng dẫn chào hỏi cơ bản",
        completed: true
      },
      {
        id: 2,
        title: "Giới thiệu bản thân",
        description: "Cách nói tên và tuổi của bạn",
        duration: "3 phút",
        type: "interactive",
        content: "Bài tập tương tác giới thiệu bản thân",
        completed: true
      },
      {
        id: 3,
        title: "Hỏi thăm sức khỏe",
        description: "Cách hỏi 'Bạn có khỏe không?'",
        duration: "2 phút",
        type: "video",
        content: "Video hướng dẫn hỏi thăm sức khỏe",
        completed: false
      },
      {
        id: 4,
        title: "Luyện tập tổng hợp",
        description: "Thực hành tất cả các ký hiệu đã học",
        duration: "3 phút",
        type: "practice",
        content: "Bài tập luyện tập tổng hợp",
        completed: false
      }
    ],
    "4": [
      {
        id: 1,
        title: "Cảm xúc cơ bản",
        description: "Học cách biểu đạt vui mừng, buồn, giận, sợ hãi",
        duration: "5 phút",
        type: "video",
        content: "Video hướng dẫn 4 cảm xúc cơ bản",
        completed: false
      },
      {
        id: 2,
        title: "Cảm xúc tích cực",
        description: "Hạnh phúc, tự tin, thích thú, hào hứng, hài lòng",
        duration: "5 phút",
        type: "video",
        content: "Video hướng dẫn cảm xúc tích cực",
        completed: false
      },
      {
        id: 3,
        title: "Cảm xúc tiêu cực",
        description: "Thất vọng, chán nản, khó chịu, cô đơn, hối hận",
        duration: "5 phút",
        type: "video",
        content: "Video hướng dẫn cảm xúc tiêu cực",
        completed: false
      },
      {
        id: 4,
        title: "Cảm xúc xã hội",
        description: "Xấu hổ, ghen tị, ghen tuông, thương yêu, biết ơn",
        duration: "5 phút",
        type: "video",
        content: "Video hướng dẫn cảm xúc xã hội",
        completed: false
      },
      {
        id: 5,
        title: "Cảm xúc phức tạp",
        description: "Bối rối, hồi hộp, tự hào, hy vọng, bình tĩnh",
        duration: "5 phút",
        type: "video",
        content: "Video hướng dẫn cảm xúc phức tạp",
        completed: false
      }
    ]
  };
  
  const steps = stepsData[lessonId as keyof typeof stepsData] || stepsData["1"];

  const relatedLessons = [
    {
      id: "2",
      title: "Gia đình",
      description: "Từ vựng về các thành viên trong gia đình",
      thumbnail: "/placeholder.jpg",
      difficulty: "Cơ bản",
      duration: "15 phút",
      xp: 75
    },
    {
      id: "3",
      title: "Số đếm 1-20",
      description: "Học cách biểu đạt các con số",
      thumbnail: "/placeholder-user.jpg",
      difficulty: "Cơ bản",
      duration: "12 phút",
      xp: 60
    }
  ];

  const vocabularyData = {
    "1": [
      { id: "w1", term: "Xin chào", vi: "Xin chào", videoUrl: "/resources/videos/Chào.mp4" },
      { id: "w2", term: "Tạm biệt", vi: "Tạm biệt", videoUrl: "/resources/videos/tạm biệt.mp4" },
      { id: "w3", term: "Khỏe không", vi: "Bạn khỏe không?", videoUrl: "/resources/videos/Chào.mp4" }
    ],
    "4": [
      { id: "w1", term: "Vui mừng", vi: "Tôi cảm thấy vui mừng", videoUrl: "/resources/videos/vui mừng - nam.mp4" },
      { id: "w2", term: "Buồn thảm", vi: "Tôi cảm thấy buồn thảm", videoUrl: "/resources/videos/buồn thảm.mp4" },
      { id: "w3", term: "Giận dữ", vi: "Tôi cảm thấy giận dữ", videoUrl: "/resources/videos/giận_dữ.mp4" },
      { id: "w4", term: "Hoảng sợ", vi: "Tôi cảm thấy hoảng sợ", videoUrl: "/resources/videos/hoảng_sợ.mp4" },
      { id: "w5", term: "Lo sợ", vi: "Tôi cảm thấy lo sợ", videoUrl: "/resources/videos/lo_sợ.mp4" },
      { id: "w6", term: "Tuyệt vọng", vi: "Tôi cảm thấy tuyệt vọng", videoUrl: "/resources/videos/tuyệt_vọng.mp4" },
      { id: "w7", term: "Ngạc nhiên", vi: "Tôi cảm thấy ngạc nhiên", videoUrl: "/resources/videos/Ngạc_nhiên.mp4" },
      { id: "w8", term: "Cô đơn", vi: "Tôi cảm thấy cô đơn", videoUrl: "/resources/videos/cô_đơn.mp4" },
      { id: "w9", term: "Hồi hộp", vi: "Tôi cảm thấy hồi hộp", videoUrl: "/resources/videos/hồi_hộp.mp4" },
      { id: "w10", term: "Tự tin", vi: "Tôi cảm thấy tự tin", videoUrl: "/resources/videos/tự_tin.mp4" },
      { id: "w11", term: "Thích thú", vi: "Tôi cảm thấy thích thú", videoUrl: "/resources/videos/thích_thú.mp4" },
      { id: "w12", term: "Ghen tị", vi: "Tôi cảm thấy ghen tị", videoUrl: "/resources/videos/ghen_tị.mp4" },
      { id: "w13", term: "Xin lỗi", vi: "Tôi xin lỗi", videoUrl: "/resources/videos/xin lỗi.mp4" },
      { id: "w14", term: "Bối rối", vi: "Tôi cảm thấy bối rối", videoUrl: "/resources/videos/bối_rối.mp4" },
      { id: "w15", term: "Giận dỗi", vi: "Tôi giận dỗi", videoUrl: "/resources/videos/giận_dỗi.mp4" },
      { id: "w16", term: "Nghẹn ngào", vi: "Tôi cảm thấy nghẹn ngào", videoUrl: "/resources/videos/nghẹn_ngào.mp4" },
      { id: "w17", term: "Nổi giận", vi: "Tôi nổi giận", videoUrl: "/resources/videos/nổi_giận.mp4" },
      { id: "w18", term: "Hạnh phúc", vi: "Tôi cảm thấy hạnh phúc", videoUrl: "/resources/videos/vui_mừng.mp4" },
      { id: "w19", term: "Thất vọng", vi: "Tôi cảm thấy thất vọng", videoUrl: "/resources/videos/tuyệt_vọng.mp4" },
      { id: "w20", term: "Tức giận", vi: "Tôi cảm thấy tức giận", videoUrl: "/resources/videos/nổi_giận.mp4" }
    ]
  };
  
  const vocabulary = vocabularyData[lessonId as keyof typeof vocabularyData] || vocabularyData["1"];

  // Create video sequence for lesson 4 (emotions)
  React.useEffect(() => {
    if (lessonId === "4") {
      const emotionVideos = vocabulary.map(item => item.videoUrl);
      setVideoSequence(emotionVideos);
    } else {
      setVideoSequence([]);
    }
  }, [lessonId, vocabulary]);

  const transcriptData = {
    "1": "Xin chào! Hôm nay chúng ta sẽ học cách chào hỏi và hỏi thăm sức khỏe.",
    "4": "Chào các bạn! Hôm nay chúng ta sẽ học cách biểu đạt 20 loại cảm xúc khác nhau bằng ngôn ngữ ký hiệu Việt Nam. Chúng ta sẽ học từ những cảm xúc cơ bản như vui mừng, buồn thảm, giận dữ, hoảng sợ, lo sợ, tuyệt vọng, ngạc nhiên, cô đơn, hồi hộp, tự tin, thích thú, ghen tị, xin lỗi, bối rối, giận dỗi, nghẹn ngào, nổi giận, hạnh phúc, thất vọng và tức giận. Mỗi cảm xúc đều có cách biểu đạt riêng trong ngôn ngữ ký hiệu."
  };
  
  const transcript = transcriptData[lessonId as keyof typeof transcriptData] || transcriptData["1"];

  const handleJumpToWord = (wordId: string) => {
    setSelectedWordId(wordId);
    // Placeholder: simulate seeking to the segment of the selected word
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 1200);
  };

  const handlePlayPause = () => {
    if (lessonId === "4" && videoSequence.length > 0) {
      setIsSequencePlaying(!isSequencePlaying);
      setIsPlaying(!isSequencePlaying);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Handle video sequence playback
  React.useEffect(() => {
    if (lessonId === "4" && isSequencePlaying && videoSequence.length > 0) {
      // Auto-play the current video when sequence starts
      const videoElement = document.querySelector('video');
      if (videoElement) {
        videoElement.play().catch(console.error);
      }
    }
  }, [currentVideoIndex, isSequencePlaying, videoSequence.length, lessonId]);

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  // Mirror modal lifecycle
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        mirrorStreamRef.current = stream;
        if (mirrorVideoRef.current) {
          mirrorVideoRef.current.srcObject = stream;
          await mirrorVideoRef.current.play();
        }
        // Simulate recognition feedback loop
        feedbackTimerRef.current = window.setInterval(() => {
          const pool: Array<"correct" | "incorrect"> = ["correct", "incorrect", "correct"];
          setMirrorFeedback(pool[Math.floor(Math.random() * pool.length)]);
        }, 2000);
      } catch {
        setMirrorFeedback("incorrect");
      }
    };

    const stopCamera = () => {
      if (mirrorStreamRef.current) {
        mirrorStreamRef.current.getTracks().forEach((t) => t.stop());
        mirrorStreamRef.current = null;
      }
      if (feedbackTimerRef.current) {
        window.clearInterval(feedbackTimerRef.current);
        feedbackTimerRef.current = null;
      }
      setMirrorFeedback("neutral");
    };

    if (showMirror) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [showMirror]);

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" className="mb-6" onClick={onBackToDashboard}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Player */}
              <Card>
                <div className="relative">
                  {lessonId === "4" && videoSequence.length > 0 ? (
                    // Video sequence for emotions lesson
                    <div className="relative">
                      <video 
                        key={currentVideoIndex}
                        className="w-full h-64 object-contain bg-black rounded-t-lg"
                        src={videoSequence[currentVideoIndex]}
                        controls
                        playsInline
                        autoPlay={isSequencePlaying}
                        muted={isMuted}
                        onEnded={() => {
                          if (currentVideoIndex < videoSequence.length - 1) {
                            setCurrentVideoIndex(prev => prev + 1);
                          } else {
                            setIsSequencePlaying(false);
                            setIsPlaying(false);
                            setCurrentVideoIndex(0);
                          }
                        }}
                      />
                      <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                        {currentVideoIndex + 1} / {videoSequence.length}
                      </div>
                      <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                        {vocabulary[currentVideoIndex]?.term}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2">
                        <Button 
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            if (currentVideoIndex > 0) {
                              setCurrentVideoIndex(prev => prev - 1);
                            }
                          }}
                          disabled={currentVideoIndex === 0}
                          className="bg-black bg-opacity-70 text-white hover:bg-opacity-90"
                        >
                          ← Trước
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={handlePlayPause}
                        >
                          {isSequencePlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button 
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            if (currentVideoIndex < videoSequence.length - 1) {
                              setCurrentVideoIndex(prev => prev + 1);
                            }
                          }}
                          disabled={currentVideoIndex === videoSequence.length - 1}
                          className="bg-black bg-opacity-70 text-white hover:bg-opacity-90"
                        >
                          Sau →
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // Regular thumbnail for other lessons
                    <>
                      <img 
                        src={lesson.thumbnail} 
                        alt={lesson.title}
                        className="w-full h-64 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <Button 
                          size="lg" 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={handlePlayPause}
                        >
                          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                        </Button>
                      </div>
                    </>
                  )}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <div className="hidden md:flex items-center gap-2 bg-black bg-opacity-50 text-white rounded-full px-3 py-1">
                      <span className="text-xs">Tiếng Việt</span>
                      <Switch checked={showViSubtitle} onCheckedChange={setShowViSubtitle} />
                      <span className="text-xs">Ký hiệu</span>
                      <Switch checked={showSignSubtitle} onCheckedChange={setShowSignSubtitle} />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                      onClick={handleMute}
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h1 className="text-2xl font-bold">{lesson.title}</h1>
                      <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => setShowMirror(true)} title="Luyện tập gương">
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    <Badge className="bg-blue-600 text-white">{lesson.difficulty}</Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{lesson.description}</p>
                  {/* Playback + transcript controls */}
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Tốc độ</span>
                      <Select value={speed} onValueChange={(v: string) => setSpeed(v as typeof speed)}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Tốc độ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="slow">Chậm</SelectItem>
                          <SelectItem value="medium">Trung bình</SelectItem>
                          <SelectItem value="normal">Bình thường</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Transcript (Tiếng Việt)</span>
                      <Switch checked={showTranscript} onCheckedChange={setShowTranscript} />
                    </div>
                  </div>

                  {showTranscript && (
                    <div className="bg-muted/30 rounded-xl p-4 border border-border text-sm leading-6 mb-4">
                      <p className="text-muted-foreground">{transcript}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {lesson.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      {lesson.xp} XP
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      {lesson.rating}
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      {lesson.studentsCount} học viên
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mirror Practice Modal */}
              {showMirror && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                  <div className="bg-card rounded-xl shadow-xl w-full max-w-xl max-h-[90vh] border border-border overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4" />
                        <span className="font-medium">Luyện tập gương</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setShowMirror(false)}>Đóng</Button>
                    </div>
                    <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                      <div className={`relative rounded-lg overflow-hidden border ${
                        mirrorFeedback === "correct" ? "border-green-500" : mirrorFeedback === "incorrect" ? "border-red-500" : "border-border"
                      }`}>
                        <video ref={mirrorVideoRef} className="w-full aspect-video object-cover" muted playsInline />
                        {mirrorFeedback !== "neutral" && (
                          <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-medium ${
                            mirrorFeedback === "correct" ? "bg-green-600 text-white" : "bg-red-600 text-white"
                          }`}>
                            {mirrorFeedback === "correct" ? "Đúng động tác" : "Sai động tác"}
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Hãy làm theo động tác trong video như một chiếc gương. Hệ thống đang nhận diện và sẽ phản hồi nếu sai.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Vocabulary list (click to jump) */}
              <Card>
                <CardHeader>
                  <CardTitle>Từ vựng trong video ({vocabulary.length} từ)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                        {vocabulary.map((w) => (
                          <button
                            key={w.id}
                            onClick={() => handleJumpToWord(w.id)}
                            className={`p-3 text-left rounded-lg border transition-colors ${
                              selectedWordId === w.id ? "border-primary bg-primary/10" : "border-border hover:bg-muted/40"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <div className="font-medium text-sm">{w.term}</div>
                              {w.videoUrl && <Play className="w-3 h-3 text-muted-foreground" />}
                            </div>
                            <div className="text-xs text-muted-foreground">{w.vi}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    {vocabulary.length > 9 && (
                      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                    )}
                  </div>
                  {selectedWordId && (
                    <div 
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                      onClick={() => setSelectedWordId(null)}
                    >
                      <div 
                        className="bg-card rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] border border-border overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
                          <div className="flex items-center gap-2">
                            <Play className="w-4 h-4 text-primary" />
                            <span className="font-medium">Ký hiệu cho từ: {vocabulary.find(v => v.id === selectedWordId)?.term}</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setSelectedWordId(null)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            ✕
                          </Button>
                        </div>
                        <div className="p-4 flex-1 overflow-auto">
                      {vocabulary.find(v => v.id === selectedWordId)?.videoUrl && (
                        <div className="rounded-lg overflow-hidden border">
                          <video 
                            className="w-full aspect-video object-contain bg-black" 
                            src={vocabulary.find(v => v.id === selectedWordId)?.videoUrl}
                            controls
                            playsInline
                            autoPlay
                            loop
                            muted
                          />
                        </div>
                      )}
                          <div className="text-xs text-muted-foreground mt-2">
                            {vocabulary.find(v => v.id === selectedWordId)?.vi}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Lesson Steps */}
              <Card>
                <CardHeader>
                  <CardTitle>Nội dung bài học</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {steps.map((step, index) => (
                      <div 
                        key={step.id}
                        className={`p-4 rounded-lg border-2 ${
                          step.completed 
                            ? 'border-green-200 bg-green-50' 
                            : index === currentStep
                              ? 'border-blue-200 bg-blue-50'
                              : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.completed 
                              ? 'bg-green-600 text-white' 
                              : index === currentStep
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-400 text-white'
                          }`}>
                            {step.completed ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <span>{index + 1}</span>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-semibold">{step.title}</h3>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-muted-foreground">{step.duration}</span>
                              <Badge variant="outline">{step.type}</Badge>
                            </div>
                          </div>
                          
                          {!step.completed && index === currentStep && (
                            <Button 
                              size="sm" 
                              className="bg-blue-600 hover:bg-blue-700"
                              onClick={() => handleStepComplete(step.id)}
                            >
                              Bắt đầu
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <Button 
                      variant="outline" 
                      onClick={handlePrevStep}
                      disabled={currentStep === 0}
                    >
                      Bước trước
                    </Button>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={handleNextStep}
                      disabled={currentStep === steps.length - 1}
                    >
                      Bước tiếp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    Tiến độ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Hoàn thành</span>
                        <span>{lesson.progress}%</span>
                      </div>
                      <Progress value={lesson.progress} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Bước hoàn thành</span>
                        <span>{completedSteps.length}/{steps.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Thời gian còn lại</span>
                        <span>4 phút</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Instructor */}
              <Card>
                <CardHeader>
                  <CardTitle>Giảng viên</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {lesson.instructor.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{lesson.instructor}</h3>
                      <p className="text-sm text-muted-foreground">Chuyên gia ngôn ngữ ký hiệu</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Lessons */}
              <Card>
                <CardHeader>
                  <CardTitle>Bài học liên quan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {relatedLessons.map((relatedLesson) => (
                      <div key={relatedLesson.id} className="flex gap-3">
                        <img 
                          src={relatedLesson.thumbnail} 
                          alt={relatedLesson.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{relatedLesson.title}</h4>
                          <p className="text-xs text-muted-foreground">{relatedLesson.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{relatedLesson.difficulty}</Badge>
                            <span className="text-xs text-muted-foreground">{relatedLesson.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LessonDetail;
