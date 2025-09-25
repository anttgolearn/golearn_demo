import { useEffect, useRef, useState } from "react";
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
  onBackToDashboard?: () => void;
}

const LessonDetail = ({ onBackToDashboard }: LessonDetailProps) => {
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

  const lesson = {
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
  };

  const steps = [
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
  ];

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

  const vocabulary = [
    { id: "w1", term: "Xin chào", vi: "Xin chào" },
    { id: "w2", term: "Tạm biệt", vi: "Tạm biệt" },
    { id: "w3", term: "Khỏe không", vi: "Bạn khỏe không?" }
  ];

  const handleJumpToWord = (wordId: string) => {
    setSelectedWordId(wordId);
    // Placeholder: simulate seeking to the segment of the selected word
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 1200);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

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
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <div className="hidden md:flex items-center gap-2 bg-black bg-opacity-50 text-white rounded-full px-3 py-1">
                      <span className="text-xs">Vi</span>
                      <Switch checked={showViSubtitle} onCheckedChange={setShowViSubtitle} />
                      <span className="text-xs">Sign</span>
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
                      <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => setShowMirror(true)} title="Mirror practice">
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
                      <Select value={speed} onValueChange={(v) => setSpeed(v as typeof speed)}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Speed" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="slow">Slow</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
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
                      <p className="text-muted-foreground">Xin chào! Hôm nay chúng ta sẽ học cách chào hỏi và hỏi thăm sức khỏe.</p>
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                  <div className="bg-card rounded-xl shadow-xl w-full max-w-xl border border-border overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4" />
                        <span className="font-medium">Mirror practice</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setShowMirror(false)}>Đóng</Button>
                    </div>
                    <div className="p-4 space-y-4">
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
                  <CardTitle>Từ vựng trong video</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                    {vocabulary.map((w) => (
                      <button
                        key={w.id}
                        onClick={() => handleJumpToWord(w.id)}
                        className={`p-3 text-left rounded-lg border transition-colors ${
                          selectedWordId === w.id ? "border-primary bg-primary/10" : "border-border hover:bg-muted/40"
                        }`}
                      >
                        <div className="font-medium text-sm">{w.term}</div>
                        <div className="text-xs text-muted-foreground">{w.vi}</div>
                      </button>
                    ))}
                  </div>
                  {selectedWordId && (
                    <div className="rounded-lg border border-border p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Play className="w-4 h-4 text-primary" />
                        <span className="text-sm">Đang chuyển tới đoạn hướng dẫn từ: {vocabulary.find(v => v.id === selectedWordId)?.term}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">(Giả lập seek video; sẽ tích hợp thời gian thật khi có metadata)</div>
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
