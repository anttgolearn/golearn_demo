import { Button } from "../../shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../shared/ui/tabs";
import { Badge } from "../../shared/ui/badge";
import { BookOpen, Users, Trophy, Play, CheckCircle, Lock, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dictionary } from "../../shared/components/dictionary";
import { useMemo, useState } from "react";
import { cn } from "../../lib/utils";
import Header from "../../shared/components/Header";
// Dictionary UI is rendered via shared/components/dictionary

// Images will be loaded from API


// Demo thumbnails (no API)
const lessonGreetings = "/images/lesson-greetings-BdV20h0N.jpg";
const lessonFamily = "/images/lesson-family-Be3SmyDt.jpg";
const lessonNumbers = "/images/lesson-numbers-DJNsYzix.jpg";
const lessonEmotions = "/images/lesson-emotions-CLtOmn_z.jpg";

// Progress Stats Component
const ProgressStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">XP hiện tại</p>
              <p className="text-2xl font-bold text-blue-600">1,250</p>
            </div>
            <Trophy className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Chuỗi ngày</p>
              <p className="text-2xl font-bold text-blue-600">7</p>
            </div>
            <div className="text-2xl">🔥</div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Bài học hoàn thành</p>
              <p className="text-2xl font-bold text-blue-600">12</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Thứ hạng</p>
              <p className="text-2xl font-bold text-blue-600">#3</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Lesson Card Component
interface LessonCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  difficulty: "Cơ bản" | "Trung cấp" | "Nâng cao";
  duration: string;
  xp: number;
  completed: boolean;
  locked: boolean;
  progress?: number;
  onGoToLessonDetail?: () => void;
}

const LessonCard = ({
  title,
  description,
  thumbnail,
  difficulty,
  duration,
  xp,
  completed,
  locked,
  progress = 0,
  onGoToLessonDetail
}: LessonCardProps) => {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Cơ bản":
        return "bg-green-100 text-green-800";
      case "Trung cấp":
        return "bg-yellow-100 text-yellow-800";
      case "Nâng cao":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-lg",
      completed && "ring-2 ring-green-500",
      locked && "opacity-60"
    )}>
      <div className="relative">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        {completed && (
          <div className="absolute top-2 right-2">
            <CheckCircle className="w-6 h-6 text-green-500 bg-background rounded-full" />
          </div>
        )}
        {locked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
        )}
        {!locked && !completed && progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          <Badge className={getDifficultyColor(difficulty)}>
            {difficulty}
          </Badge>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>⏱️ {duration}</span>
            <span className="text-accent font-medium">+{xp} XP</span>
          </div>
          
          <Button 
            size="sm" 
            disabled={locked}
            className="gap-2"
            onClick={() => !locked && onGoToLessonDetail?.()}
          >
            <Play className="w-4 h-4" />
            {completed ? "Ôn tập" : "Bắt đầu"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface DashboardProps {
  onGoToProfile?: () => void;
  onGoToSettings?: () => void;
  onGoToLessonDetail?: () => void;
  onLogout?: () => void;
}

const Dashboard = ({ onGoToProfile, onGoToSettings, onGoToLessonDetail, onLogout }: DashboardProps) => {
  const lessons = [
    {
      id: "1",
      title: "Chào hỏi cơ bản",
      description: "Học cách chào hỏi và giới thiệu bản thân bằng ngôn ngữ ký hiệu Việt Nam",
      thumbnail: lessonGreetings,
      difficulty: "Cơ bản" as const,
      duration: "10 phút",
      xp: 50,
      completed: true,
      locked: false,
      progress: 100
    },
    {
      id: "2", 
      title: "Gia đình",
      description: "Từ vựng về các thành viên trong gia đình và mối quan hệ",
      thumbnail: lessonFamily,
      difficulty: "Cơ bản" as const,
      duration: "15 phút",
      xp: 75,
      completed: true,
      locked: false,
      progress: 100
    },
    {
      id: "3",
      title: "Số đếm 1-20",
      description: "Học cách biểu đạt các con số từ 1 đến 20 bằng tay",
      thumbnail: lessonNumbers,
      difficulty: "Cơ bản" as const,
      duration: "12 phút", 
      xp: 60,
      completed: false,
      locked: false,
      progress: 30
    },
    {
      id: "4",
      title: "Cảm xúc",
      description: "Biểu đạt các cảm xúc cơ bản: vui, buồn, giận, sợ hãi",
      thumbnail: lessonEmotions,
      difficulty: "Trung cấp" as const,
      duration: "18 phút",
      xp: 100,
      completed: false,
      locked: false,
      progress: 0
    },
    {
      id: "5",
      title: "Động vật",
      description: "Từ vựng về các loài động vật thường gặp",
      thumbnail: lessonGreetings,
      difficulty: "Trung cấp" as const,
      duration: "20 phút",
      xp: 120,
      completed: false,
      locked: true,
      progress: 0
    },
    {
      id: "6",
      title: "Màu sắc",
      description: "Học cách biểu đạt các màu sắc khác nhau",
      thumbnail: lessonFamily,
      difficulty: "Trung cấp" as const,
      duration: "14 phút",
      xp: 80,
      completed: false,
      locked: true,
      progress: 0
    }
  ];

  const completedLessons = lessons.filter((lesson) => lesson.completed).length;
  const practiceUnlockTarget = 3;
  const practiceUnlocked = completedLessons >= practiceUnlockTarget;

  const practiceModules = [
    {
      key: "quick-review",
      title: "Ôn nhanh",
      desc: "Ôn lại ký hiệu đã học trong 5 phút",
      duration: "5 phút",
      xp: 20,
      locked: !practiceUnlocked
    },
    {
      key: "speed-signs",
      title: "Tốc độ ký hiệu",
      desc: "Tăng tốc độ nhận diện ký hiệu",
      duration: "7 phút",
      xp: 30,
      locked: !practiceUnlocked
    },
    {
      key: "mirror-practice",
      title: "Luyện gương",
      desc: "Luyện tập trước gương theo hướng dẫn",
      duration: "10 phút",
      xp: 40,
      locked: !practiceUnlocked
    },
    {
      key: "quiz-mix",
      title: "Quiz tổng hợp",
      desc: "Trắc nghiệm kết hợp nhiều dạng bài",
      duration: "8 phút",
      xp: 35,
      locked: !practiceUnlocked
    }
  ] as const;

  const storyItems = [
    {
      id: "s1",
      title: "Lần đầu gặp gỡ",
      type: "Hội thoại",
      difficulty: "Cơ bản",
      duration: "6 phút",
      xp: 40,
      locked: false
    },
    {
      id: "s2",
      title: "Thăm hỏi gia đình",
      type: "Hội thoại",
      difficulty: "Cơ bản",
      duration: "9 phút",
      xp: 55,
      locked: false
    },
    {
      id: "s3",
      title: "Một ngày ở trường",
      type: "Bài đọc",
      difficulty: "Trung cấp",
      duration: "12 phút",
      xp: 80,
      locked: true
    }
  ] as const;

  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [restartCounter, setRestartCounter] = useState(0);

  // Dictionary UI is handled by shared/components/Dictionary in the Dictionary tab.

  const activeStory = useMemo(() => storyItems.find((s) => s.id === activeStoryId) || null, [activeStoryId, storyItems]);

  type StoryStep = { speaker: string; text: string; hint?: string; mediaType?: "video" | "gif"; mediaUrl?: string };
  const storySteps = useMemo(() => {
    if (!activeStory) return [] as StoryStep[];
    if (activeStory.id === "s1") {
      return [
        { speaker: "A", text: "Xin chào! Mình là Minh.", hint: "Chào hỏi + giới thiệu tên", mediaType: "video", mediaUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4" },
        { speaker: "B", text: "Rất vui được gặp bạn, mình là Lan.", hint: "Đáp lại + giới thiệu", mediaType: "video", mediaUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4" },
        { speaker: "A", text: "Bạn có học Ngôn ngữ ký hiệu không?", hint: "Câu hỏi đơn giản", mediaType: "video", mediaUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4" },
        { speaker: "B", text: "Mình mới bắt đầu học.", hint: "Trả lời ngắn gọn", mediaType: "video", mediaUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4" }
      ];
    }
    if (activeStory.id === "s2") {
      return [
        { speaker: "A", text: "Gia đình bạn có mấy người?", hint: "Từ vựng: gia đình", mediaType: "video", mediaUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4" },
        { speaker: "B", text: "Nhà mình có bốn người.", hint: "Số đếm + danh từ", mediaType: "video", mediaUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4" },
        { speaker: "A", text: "Bạn có anh chị em không?", hint: "Câu hỏi", mediaType: "video", mediaUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4" },
        { speaker: "B", text: "Mình có một em trai.", hint: "Số đếm + thành viên", mediaType: "video", mediaUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4" }
      ];
    }
    return [] as StoryStep[];
  }, [activeStory]);

  const isFirstStep = activeStepIndex === 0;
  const isLastStep = storySteps.length > 0 && activeStepIndex === storySteps.length - 1;

  const openStory = (id: string) => {
    setActiveStoryId(id);
    setActiveStepIndex(0);
  };

  const closeStory = () => {
    setActiveStoryId(null);
    setActiveStepIndex(0);
  };

  const goPrev = () => {
    if (!isFirstStep) setActiveStepIndex((i) => i - 1);
  };

  const goNext = () => {
    if (!isLastStep) setActiveStepIndex((i) => i + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onGoToProfile={onGoToProfile} onGoToSettings={onGoToSettings} onLogout={onLogout} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Progress Stats */}
        <ProgressStats />

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Lessons */}
          <div className="lg:col-span-3">
          <Tabs defaultValue="lessons" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="lessons">Bài học</TabsTrigger>
              <TabsTrigger value="practice">Luyện tập</TabsTrigger>
              <TabsTrigger value="stories">Câu chuyện</TabsTrigger>
              <TabsTrigger value="dictionary">Từ điển</TabsTrigger>
              <TabsTrigger value="progress">Tiến độ</TabsTrigger>
            </TabsList>
              
              <TabsContent value="lessons" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Hành trình học tập</h2>
                  {/* Visual Roadmap */}
                  <div className="relative">
                    {/* Roadmap Path */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-600 via-blue-400 to-gray-300 h-full"></div>
                    
                    <div className="space-y-8">
                      {lessons.map((lesson, index) => (
                        <div key={lesson.id} className={`relative flex items-center ${
                          index % 2 === 0 ? 'justify-start' : 'justify-end'
                        }`}>
                          {/* Roadmap Node */}
                          <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 z-10 ${
                            lesson.completed 
                              ? 'bg-blue-600 border-blue-300' 
                              : lesson.locked 
                                ? 'bg-gray-300 border-gray-400' 
                                : 'bg-blue-400 border-blue-200'
                          }`}></div>
                          
                          {/* Lesson Card */}
                          <div className={`w-full max-w-md ${
                            index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'
                          }`}>
                            <LessonCard {...lesson} onGoToLessonDetail={onGoToLessonDetail} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="practice" className="space-y-6">
                <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-background">
                  <CardContent className="p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Chế độ luyện tập</h3>
                      <p className="text-muted-foreground">
                        Hoàn thành {practiceUnlockTarget} bài học để mở khóa luyện tập. Hiện tại: {completedLessons}/{practiceUnlockTarget}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min(100, Math.round((completedLessons / practiceUnlockTarget) * 100))}%` }}></div>
                      </div>
                    </div>
                    <Button disabled={!practiceUnlocked} className="mt-4 md:mt-0">
                      <Play className="w-4 h-4 mr-2" />
                      {practiceUnlocked ? "Bắt đầu luyện tập" : "Chưa mở khóa"}
                    </Button>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {practiceModules.map((m) => (
                    <Card key={m.key} className={`transition hover:shadow-md ${m.locked ? "opacity-60" : ""}`}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{m.title}</span>
                          {m.locked ? (
                            <Badge className="bg-gray-200 text-gray-700">Khóa</Badge>
                          ) : (
                            <Badge className="bg-blue-600">+{m.xp} XP</Badge>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{m.desc}</p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                          <span>⏱️ {m.duration}</span>
                          <span>{m.locked ? "Yêu cầu mở khóa" : "Sẵn sàng"}</span>
                        </div>
                        <Button disabled={m.locked} className="w-full gap-2">
                          <Play className="w-4 h-4" />
                          {m.locked ? "Mở sau" : "Bắt đầu"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
            <TabsContent value="stories" className="space-y-6">
              <Card className="bg-gradient-to-br from-purple-50 to-background border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Users className="w-10 h-10 text-purple-600" />
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Câu chuyện</h3>
                      <p className="text-muted-foreground">Học thông qua các câu chuyện thú vị và thực tế. Theo dõi hội thoại và thực hành ký hiệu tương ứng.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {storyItems.map((s) => (
                  <Card key={s.id} className={`overflow-hidden transition hover:shadow-md ${s.locked ? "opacity-60" : ""}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{s.title}</span>
                        <Badge variant={s.difficulty === "Cơ bản" ? "default" : "secondary"}>{s.difficulty}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{s.type} • ⏱️ {s.duration} • +{s.xp} XP</p>
                      <div className="flex items-center justify-between">
                        <Button disabled={s.locked} className="gap-2" onClick={() => !s.locked && openStory(s.id)}>
                          <BookOpen className="w-4 h-4" />
                          {s.type === "Hội thoại" ? "Bắt đầu hội thoại" : "Đọc & luyện ký hiệu"}
                        </Button>
                        {s.locked && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Lock className="w-4 h-4" />
                            Sẽ mở khóa sớm
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            {/* Story Modal */}
            {activeStory && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/60" onClick={closeStory}></div>
                <div className="relative bg-background w-full max-w-3xl mx-4 rounded-xl shadow-lg border">
                  <div className="flex items-center justify-between p-4 border-b">
                    <div>
                      <h3 className="text-lg font-semibold">{activeStory.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        Bước {storySteps.length ? activeStepIndex + 1 : 0}/{storySteps.length}
                      </p>
                    </div>
                    <button aria-label="Đóng" className="p-2 rounded hover:bg-accent" onClick={closeStory}>
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-4">
                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${storySteps.length ? Math.round(((activeStepIndex + 1) / storySteps.length) * 100) : 0}%` }}></div>
                    </div>

                    {/* Conversation viewport */}
                    {storySteps.length > 0 ? (
                      <div className="space-y-6">
                        {storySteps.slice(0, activeStepIndex + 1).map((st, idx) => (
                          <div key={`${idx}-${restartCounter}`} className={`grid grid-cols-1 md:grid-cols-5 gap-4 items-start`}>
                            <div className="md:col-span-3 order-2 md:order-1">
                              <div className={`rounded-lg p-3 border ${st.speaker === "A" ? "bg-blue-50 border-blue-200" : "bg-gray-50"}`}>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-medium text-muted-foreground">{st.speaker === "A" ? "Người A" : "Người B"}</span>
                                </div>
                                <p className="text-sm">{st.text}</p>
                                {st.hint && (
                                  <p className="text-xs text-muted-foreground mt-2">Gợi ý ký hiệu: {st.hint}</p>
                                )}
                              </div>
                            </div>
                            <div className="md:col-span-2 order-1 md:order-2">
                              {st.mediaType === "video" && st.mediaUrl && (
                                <video key={`${activeStoryId}-${activeStepIndex}-${restartCounter}`} className="w-full rounded-lg border" src={st.mediaUrl} controls playsInline loop muted />
                              )}
                              {st.mediaType === "gif" && st.mediaUrl && (
                                <img className="w-full rounded-lg border" src={st.mediaUrl} alt="Ký hiệu minh họa" />
                              )}
                              <div className="mt-2 flex items-center gap-2">
                                <Button variant="outline" size="sm" onClick={() => setRestartCounter((c) => c + 1)}>Xem lại</Button>
                                {idx === activeStepIndex && (
                                  <Button size="sm">Tôi đã thực hành</Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">Chưa có nội dung.</div>
                    )}

                    {/* Controls */}
                    <div className="mt-6 flex items-center justify-between">
                      <Button variant="outline" onClick={goPrev} disabled={isFirstStep} className="gap-2">
                        <ChevronLeft className="w-4 h-4" />
                        Trước
                      </Button>
                      <div className="text-sm text-muted-foreground">
                        {Math.round(((activeStepIndex + 1) / (storySteps.length || 1)) * 100)}%
                      </div>
                      <Button onClick={goNext} disabled={isLastStep} className="gap-2">
                        Tiếp
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <TabsContent value="dictionary" className="space-y-6">
              <Dictionary />
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Tiến độ học tập</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-blue-600" />
                        Thống kê tuần này
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Bài học hoàn thành</span>
                        <span className="font-semibold text-blue-600">5/7</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Thời gian học</span>
                        <span className="font-semibold text-blue-600">2h 30m</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Điểm XP</span>
                        <span className="font-semibold text-blue-600">+350</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        Mục tiêu tháng
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Bài học</span>
                          <span>15/20</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Thời gian</span>
                          <span>8h/12h</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Lịch sử hoạt động</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { action: "Hoàn thành bài 'Chào hỏi cơ bản'", time: "2 giờ trước", xp: "+50" },
                        { action: "Luyện tập từ điển", time: "Hôm qua", xp: "+25" },
                        { action: "Hoàn thành bài 'Gia đình'", time: "2 ngày trước", xp: "+75" },
                        { action: "Thử thách hàng ngày", time: "3 ngày trước", xp: "+100" }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{activity.action}</p>
                            <p className="text-sm text-muted-foreground">{activity.time}</p>
                          </div>
                          <Badge className="bg-blue-600 text-white">{activity.xp} XP</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Daily Challenge */}
            <Card className="bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-blue-600" />
                  Thử thách hàng ngày
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Hoàn thành 1 bài học để duy trì chuỗi ngày học của bạn!
                </p>
                <Button className="w-full" variant="outline">
                  Bắt đầu thử thách
                </Button>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Bảng xếp hạng tuần
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Minh Anh", xp: 2150, rank: 1 },
                    { name: "Thu Trang", xp: 1890, rank: 2 },
                    { name: "Bạn", xp: 1250, rank: 3 }
                  ].map((user) => (
                    <div key={user.rank} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          user.rank === 1 ? 'bg-blue-600 text-white' :
                          user.rank === 2 ? 'bg-gray-400 text-white' :
                          'bg-blue-500 text-white'
                        }`}>
                          {user.rank}
                        </span>
                        <span className="font-medium">{user.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{user.xp} XP</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;