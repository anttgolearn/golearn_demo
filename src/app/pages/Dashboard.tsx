import { Button } from "../../shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../shared/ui/tabs";
import { Badge } from "../../shared/ui/badge";
import { BookOpen, Users, Trophy, Play, CheckCircle, Lock, X, ChevronLeft, ChevronRight, Star, Target, Clock, BarChart3 } from "lucide-react";
import { Dictionary } from "../../shared/components/dictionary";
import React, { useMemo, useState } from "react";
import { cn } from "../../lib/utils";
import Header from "../../shared/components/Header";
import { 
  QuickReview, 
  SpeedChallenge, 
  MirrorPractice, 
  QuizMix, 
  ConversationPractice, 
  DailyChallenge 
} from "../../features/practice";
// Dictionary UI is rendered via shared/components/dictionary

// Images will be loaded from API


// Demo thumbnails (no APIIsssssssssssssa)
const lessonFamily = "/images/lesson-family-Be3SmyDt.jpg";

const lessonGreetings = "/images/lesson-greetings-BdV20h0N.jpg";
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
  onGoToLessonDetail?: (lessonId: string) => void;
}

const LessonCard = ({
  id,
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
            onClick={() => !locked && onGoToLessonDetail?.(id)}
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
  onGoToLessonDetail?: (lessonId: string) => void;
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
      completed: true, // Mở khóa luyện tập
      locked: false,
      progress: 100
    },
    {
      id: "4",
      title: "Cảm xúc",
      description: "Học cách biểu đạt 20 loại cảm xúc khác nhau từ cơ bản đến phức tạp",
      thumbnail: lessonEmotions,
      difficulty: "Trung cấp" as const,
      duration: "20 phút",
      xp: 120,
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

  const practiceModules = [
    {
      key: "quick-review",
      title: "Ôn nhanh",
      desc: "Ôn lại ký hiệu đã học trong 5 phút",
      duration: "5 phút",
      xp: 20,
      difficulty: "Dễ",
      icon: "⚡",
      color: "blue",
      locked: false
    },
    {
      key: "speed-signs",
      title: "Tốc độ ký hiệu",
      desc: "Tăng tốc độ nhận diện ký hiệu",
      duration: "7 phút",
      xp: 30,
      difficulty: "Trung bình",
      icon: "🏃",
      color: "red",
      locked: false
    },
    {
      key: "mirror-practice",
      title: "Luyện gương",
      desc: "Luyện tập trước gương theo hướng dẫn",
      duration: "10 phút",
      xp: 40,
      difficulty: "Trung bình",
      icon: "🪞",
      color: "purple",
      locked: false
    },
    {
      key: "quiz-mix",
      title: "Quiz tổng hợp",
      desc: "Trắc nghiệm kết hợp nhiều dạng bài",
      duration: "8 phút",
      xp: 35,
      difficulty: "Khó",
      icon: "🧠",
      color: "green",
      locked: false
    },
    {
      key: "conversation-practice",
      title: "Luyện hội thoại",
      desc: "Thực hành giao tiếp thực tế",
      duration: "15 phút",
      xp: 60,
      difficulty: "Khó",
      icon: "💬",
      color: "orange",
      locked: false
    },
    {
      key: "daily-challenge",
      title: "Thử thách hàng ngày",
      desc: "Bài tập đặc biệt mỗi ngày",
      duration: "20 phút",
      xp: 100,
      difficulty: "Khó",
      icon: "⭐",
      color: "yellow",
      locked: false
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
    },
    {
      id: "s4",
      title: "Chia sẻ cảm xúc",
      type: "Hội thoại",
      difficulty: "Trung cấp",
      duration: "10 phút",
      xp: 70,
      locked: false
    }
  ] as const;

  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [restartCounter, setRestartCounter] = useState(0);
  
  // Vocabulary modal state
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [selectedWordData, setSelectedWordData] = useState<{term: string, videoUrl: string, vi: string, category: string, color: string} | null>(null);

  // Practice components state
  const [activePractice, setActivePractice] = useState<string | null>(null);
  const [practiceStats, setPracticeStats] = useState({
    completed: 0,
    xpEarned: 0,
    streak: 0,
    accuracy: 0
  });

  // Dictionary UI is handled by shared/components/Dictionary in the Dictionary tab.

  // Comprehensive vocabulary data for stories
  const storyVocabulary = {
    "s1": [ // Lần đầu gặp gỡ - Chào hỏi
      { id: "w1", term: "Xin chào", videoUrl: "/resources/videos/Chào.mp4", vi: "Lời chào cơ bản", category: "greetings", color: "blue" },
      { id: "w2", term: "Minh", videoUrl: "/resources/videos/Chào.mp4", vi: "Tên riêng", category: "greetings", color: "blue" },
      { id: "w3", term: "Lan", videoUrl: "/resources/videos/Chào.mp4", vi: "Tên riêng", category: "greetings", color: "blue" },
      { id: "w4", term: "Vui", videoUrl: "/resources/videos/vui mừng - nam.mp4", vi: "Cảm xúc vui vẻ", category: "emotions", color: "purple" },
      { id: "w5", term: "Gặp", videoUrl: "/resources/videos/Chào.mp4", vi: "Hành động gặp gỡ", category: "greetings", color: "blue" },
      { id: "w6", term: "Bạn", videoUrl: "/resources/videos/Chào.mp4", vi: "Người bạn", category: "greetings", color: "blue" },
      { id: "w7", term: "Học", videoUrl: "/resources/videos/Chào.mp4", vi: "Hành động học tập", category: "education", color: "green" },
      { id: "w8", term: "Ngôn ngữ", videoUrl: "/resources/videos/Chào.mp4", vi: "Hệ thống giao tiếp", category: "education", color: "green" },
      { id: "w9", term: "Ký hiệu", videoUrl: "/resources/videos/Chào.mp4", vi: "Dấu hiệu giao tiếp", category: "education", color: "green" },
      { id: "w10", term: "Bắt đầu", videoUrl: "/resources/videos/Chào.mp4", vi: "Khởi đầu", category: "education", color: "green" }
    ],
    "s2": [ // Thăm hỏi gia đình - Gia đình & Số đếm
      { id: "w1", term: "Gia đình", videoUrl: "/resources/videos/bố mẹ.mp4", vi: "Thành viên trong nhà", category: "family", color: "red" },
      { id: "w2", term: "Mấy", videoUrl: "/resources/videos/1.mp4", vi: "Câu hỏi số lượng", category: "numbers", color: "orange" },
      { id: "w3", term: "Người", videoUrl: "/resources/videos/bố mẹ.mp4", vi: "Đơn vị đếm người", category: "family", color: "red" },
      { id: "w4", term: "Nhà", videoUrl: "/resources/videos/bố mẹ.mp4", vi: "Nơi ở", category: "family", color: "red" },
      { id: "w5", term: "Bốn", videoUrl: "/resources/videos/1.mp4", vi: "Số đếm 4", category: "numbers", color: "orange" },
      { id: "w6", term: "Anh chị em", videoUrl: "/resources/videos/bố mẹ.mp4", vi: "Thành viên gia đình", category: "family", color: "red" },
      { id: "w7", term: "Một", videoUrl: "/resources/videos/1.mp4", vi: "Số đếm 1", category: "numbers", color: "orange" },
      { id: "w8", term: "Em trai", videoUrl: "/resources/videos/bố mẹ.mp4", vi: "Anh em trai", category: "family", color: "red" }
    ],
    "s4": [ // Chia sẻ cảm xúc - Cảm xúc & Câu hỏi
      { id: "w1", term: "Hôm nay", videoUrl: "/resources/videos/Chào.mp4", vi: "Ngày hôm nay", category: "time", color: "teal" },
      { id: "w2", term: "Cảm thấy", videoUrl: "/resources/videos/vui mừng - nam.mp4", vi: "Trạng thái cảm xúc", category: "emotions", color: "purple" },
      { id: "w3", term: "Thế nào", videoUrl: "/resources/videos/Chào.mp4", vi: "Câu hỏi trạng thái", category: "questions", color: "indigo" },
      { id: "w4", term: "Vui mừng", videoUrl: "/resources/videos/vui mừng - nam.mp4", vi: "Cảm xúc tích cực", category: "emotions", color: "purple" },
      { id: "w5", term: "Vì", videoUrl: "/resources/videos/Chào.mp4", vi: "Lý do", category: "questions", color: "indigo" },
      { id: "w6", term: "Buồn thảm", videoUrl: "/resources/videos/buồn thảm.mp4", vi: "Cảm xúc tiêu cực", category: "emotions", color: "purple" },
      { id: "w7", term: "Tại sao", videoUrl: "/resources/videos/Chào.mp4", vi: "Câu hỏi lý do", category: "questions", color: "indigo" },
      { id: "w8", term: "Lo sợ", videoUrl: "/resources/videos/lo_sợ.mp4", vi: "Cảm xúc lo lắng", category: "emotions", color: "purple" },
      { id: "w9", term: "Kiểm tra", videoUrl: "/resources/videos/Chào.mp4", vi: "Bài thi", category: "education", color: "green" },
      { id: "w10", term: "Ngày mai", videoUrl: "/resources/videos/Chào.mp4", vi: "Ngày tiếp theo", category: "time", color: "teal" },
      { id: "w11", term: "Hoảng sợ", videoUrl: "/resources/videos/hoảng_sợ.mp4", vi: "Cảm xúc sợ hãi", category: "emotions", color: "purple" },
      { id: "w12", term: "Tốt", videoUrl: "/resources/videos/Chào.mp4", vi: "Tích cực", category: "emotions", color: "purple" },
      { id: "w13", term: "Tự tin", videoUrl: "/resources/videos/tự_tin.mp4", vi: "Cảm xúc tin tưởng", category: "emotions", color: "purple" },
      { id: "w14", term: "Cảm ơn", videoUrl: "/resources/videos/xin lỗi.mp4", vi: "Lời cảm ơn", category: "greetings", color: "blue" },
      { id: "w15", term: "Thích thú", videoUrl: "/resources/videos/thích_thú.mp4", vi: "Cảm xúc hứng thú", category: "emotions", color: "purple" },
      { id: "w16", term: "Việc học", videoUrl: "/resources/videos/Chào.mp4", vi: "Hoạt động học tập", category: "education", color: "green" },
      { id: "w17", term: "Hồi hộp", videoUrl: "/resources/videos/hồi_hộp.mp4", vi: "Cảm xúc bồn chồn", category: "emotions", color: "purple" },
      { id: "w18", term: "Có", videoUrl: "/resources/videos/Chào.mp4", vi: "Câu hỏi có/không", category: "questions", color: "indigo" }
    ]
  };

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
      if (activeStory.id === "s4") {
        return [
         { speaker: "A", text: "Hôm nay bạn cảm thấy thế nào?", hint: "Hỏi về cảm xúc", mediaType: "video", mediaUrl: "/resources/videos/vui mừng - nam.mp4" },
         { speaker: "B", text: "Mình cảm thấy rất vui mừng vì được gặp bạn.", hint: "Biểu đạt cảm xúc vui mừng", mediaType: "video", mediaUrl: "/resources/videos/vui mừng - nam.mp4" },
         { speaker: "A", text: "Tại sao bạn lại buồn thảm thế?", hint: "Hỏi về cảm xúc tiêu cực", mediaType: "video", mediaUrl: "/resources/videos/buồn thảm.mp4" },
         { speaker: "B", text: "Mình lo sợ về bài kiểm tra ngày mai.", hint: "Biểu đạt sự lo sợ", mediaType: "video", mediaUrl: "/resources/videos/lo_sợ.mp4" },
         { speaker: "A", text: "Đừng hoảng sợ, bạn sẽ làm tốt thôi.", hint: "Động viên, giảm lo âu", mediaType: "video", mediaUrl: "/resources/videos/hoảng_sợ.mp4" },
         { speaker: "B", text: "Cảm ơn bạn, mình cảm thấy tự tin hơn rồi.", hint: "Cảm ơn + cảm xúc tích cực", mediaType: "video", mediaUrl: "/resources/videos/tự_tin.mp4" },
         { speaker: "A", text: "Bạn có thích thú với việc học không?", hint: "Hỏi về sự thích thú", mediaType: "video", mediaUrl: "/resources/videos/thích_thú.mp4" },
         { speaker: "B", text: "Mình rất thích thú và hồi hộp với bài kiểm tra.", hint: "Biểu đạt thích thú và hồi hộp", mediaType: "video", mediaUrl: "/resources/videos/hồi_hộp.mp4" }
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

  // Handle vocabulary click
  const handleWordClick = (word: string) => {
    if (!activeStoryId) return;
    
    const vocabulary = storyVocabulary[activeStoryId as keyof typeof storyVocabulary] || [];
    const wordData = vocabulary.find(v => v.term.toLowerCase().includes(word.toLowerCase()) || word.toLowerCase().includes(v.term.toLowerCase()));
    
    if (wordData) {
      setSelectedWordData(wordData);
      setSelectedWordId(wordData.id);
    }
  };

  // Practice handlers
  const handlePracticeStart = (practiceType: string) => {
    setActivePractice(practiceType);
  };

  const handlePracticeComplete = (score: number, timeSpent: number) => {
    setPracticeStats(prev => ({
      ...prev,
      completed: prev.completed + 1,
      xpEarned: prev.xpEarned + score,
      accuracy: Math.round((prev.accuracy * prev.completed + score) / (prev.completed + 1)),
      streak: timeSpent > 0 ? prev.streak + 1 : prev.streak // Update streak based on completion
    }));
    setActivePractice(null);
  };

  const handlePracticeClose = () => {
    setActivePractice(null);
  };

  // Create clickable text with vocabulary words and different colors
  const createClickableText = (text: string) => {
    if (!activeStoryId) return text;
    
    const vocabulary = storyVocabulary[activeStoryId as keyof typeof storyVocabulary] || [];
    let result = text;
    
    // Color mapping for different categories
    const colorClasses = {
      blue: "text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100",
      purple: "text-purple-600 hover:text-purple-800 bg-purple-50 hover:bg-purple-100", 
      red: "text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100",
      orange: "text-orange-600 hover:text-orange-800 bg-orange-50 hover:bg-orange-100",
      green: "text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100",
      teal: "text-teal-600 hover:text-teal-800 bg-teal-50 hover:bg-teal-100",
      indigo: "text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100"
    };
    
    vocabulary.forEach(vocab => {
      const regex = new RegExp(`\\b${vocab.term}\\b`, 'gi');
      const colorClass = colorClasses[vocab.color as keyof typeof colorClasses] || colorClasses.blue;
      result = result.replace(regex, `<span class="cursor-pointer underline px-1 py-0.5 rounded transition-colors ${colorClass}" data-word="${vocab.term}" data-category="${vocab.category}">${vocab.term}</span>`);
    });
    
    return result;
  };

  // Add click handler to window
  React.useEffect(() => {
    (window as any).handleWordClick = handleWordClick;
    return () => {
      delete (window as any).handleWordClick;
    };
  }, [handleWordClick]);

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
                {/* Welcome Banner */}
                <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-background overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Trophy className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-green-800">Chế độ luyện tập</h3>
                            <p className="text-green-600 font-medium">Đã mở khóa! 🎉</p>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-lg mb-4">
                          Củng cố kiến thức và nâng cao kỹ năng ký hiệu của bạn thông qua các bài tập tương tác
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Hoàn thành: {completedLessons}/{practiceUnlockTarget} bài học</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>XP có thể kiếm: 500+</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg">
                          <Play className="w-5 h-5 mr-2" />
                          Bắt đầu luyện tập
                        </Button>
                        <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
                          <Target className="w-4 h-4 mr-2" />
                          Xem thống kê
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Practice Modules Grid */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Chọn loại luyện tập</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Tất cả đã mở khóa</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {practiceModules.map((m) => {
                      const getDifficultyColor = (difficulty: string) => {
                        switch (difficulty) {
                          case "Dễ": return "bg-green-100 text-green-700 border-green-200";
                          case "Trung bình": return "bg-yellow-100 text-yellow-700 border-yellow-200";
                          case "Khó": return "bg-red-100 text-red-700 border-red-200";
                          default: return "bg-gray-100 text-gray-700 border-gray-200";
                        }
                      };

                      const getColorClasses = (color: string) => {
                        switch (color) {
                          case "blue": return "border-blue-200 hover:border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100/50";
                          case "red": return "border-red-200 hover:border-red-300 bg-gradient-to-br from-red-50 to-red-100/50";
                          case "purple": return "border-purple-200 hover:border-purple-300 bg-gradient-to-br from-purple-50 to-purple-100/50";
                          case "green": return "border-green-200 hover:border-green-300 bg-gradient-to-br from-green-50 to-green-100/50";
                          case "orange": return "border-orange-200 hover:border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100/50";
                          case "yellow": return "border-yellow-200 hover:border-yellow-300 bg-gradient-to-br from-yellow-50 to-yellow-100/50";
                          default: return "border-gray-200 hover:border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100/50";
                        }
                      };

                      return (
                        <Card key={m.key} className={`transition-all duration-300 hover:shadow-lg hover:scale-105 ${getColorClasses(m.color)}`}>
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between mb-2">
                              <div className="text-3xl">{m.icon}</div>
                              <div className="flex flex-col items-end gap-1">
                                <Badge className={`text-xs ${getDifficultyColor(m.difficulty)}`}>
                                  {m.difficulty}
                                </Badge>
                                <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs">
                                  +{m.xp} XP
                                </Badge>
                              </div>
                            </div>
                            <CardTitle className="text-lg font-semibold text-gray-800">{m.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{m.desc}</p>
                            
                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Clock className="w-4 h-4" />
                                  <span>{m.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-green-600">
                                  <CheckCircle className="w-4 h-4" />
                                  <span className="font-medium">Sẵn sàng</span>
                                </div>
                              </div>
                              
                              <Button 
                                onClick={() => handlePracticeStart(m.key)}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                              >
                                <Play className="w-4 h-4 mr-2" />
                                Bắt đầu luyện tập
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                {/* Practice Stats */}
                <Card className="border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      Thống kê luyện tập
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{practiceStats.completed}</div>
                        <div className="text-sm text-muted-foreground">Bài đã hoàn thành</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{practiceStats.xpEarned}</div>
                        <div className="text-sm text-muted-foreground">XP đã kiếm</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{practiceStats.streak}</div>
                        <div className="text-sm text-muted-foreground">Ngày liên tiếp</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{practiceStats.accuracy}%</div>
                        <div className="text-sm text-muted-foreground">Độ chính xác</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60" onClick={closeStory}></div>
                <div className="relative bg-background w-full max-w-3xl max-h-[90vh] rounded-xl shadow-lg border flex flex-col">
                  <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
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

                  <div className="p-4 flex-1 overflow-y-auto">
                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${storySteps.length ? Math.round(((activeStepIndex + 1) / storySteps.length) * 100) : 0}%` }}></div>
                    </div>

                    {/* Color Legend */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Chú thích màu sắc từ vựng:</h4>
                      <div className="flex flex-wrap gap-3 text-xs">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                          <span>Chào hỏi</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-purple-500" />
                          <span>Cảm xúc</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-indigo-500" />
                          <span>Câu hỏi</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <span>Gia đình</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-orange-500" />
                          <span>Số đếm</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                          <span>Giáo dục</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-teal-500" />
                          <span>Thời gian</span>
                        </div>
                      </div>
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
                                <p 
                                  className="text-sm" 
                                  dangerouslySetInnerHTML={{ __html: createClickableText(st.text) }}
                                  onClick={(e) => {
                                    const target = e.target as HTMLElement;
                                    if (target.dataset.word) {
                                      handleWordClick(target.dataset.word);
                                    }
                                  }}
                                />
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
                    <div className="mt-6 flex items-center justify-between flex-shrink-0">
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

      {/* Vocabulary Modal */}
      {selectedWordId && selectedWordData && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => {
            setSelectedWordId(null);
            setSelectedWordData(null);
          }}
        >
          <div 
            className="bg-card rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] border border-border overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-primary" />
                <div>
                  <span className="font-medium">Ký hiệu cho từ: {selectedWordData.term}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {selectedWordData.category === 'greetings' && 'Chào hỏi'}
                      {selectedWordData.category === 'emotions' && 'Cảm xúc'}
                      {selectedWordData.category === 'family' && 'Gia đình'}
                      {selectedWordData.category === 'numbers' && 'Số đếm'}
                      {selectedWordData.category === 'education' && 'Giáo dục'}
                      {selectedWordData.category === 'time' && 'Thời gian'}
                      {selectedWordData.category === 'questions' && 'Câu hỏi'}
                    </Badge>
                    <div className={`w-3 h-3 rounded-full ${
                      selectedWordData.color === 'blue' ? 'bg-blue-500' :
                      selectedWordData.color === 'purple' ? 'bg-purple-500' :
                      selectedWordData.color === 'red' ? 'bg-red-500' :
                      selectedWordData.color === 'orange' ? 'bg-orange-500' :
                      selectedWordData.color === 'green' ? 'bg-green-500' :
                      selectedWordData.color === 'teal' ? 'bg-teal-500' :
                      selectedWordData.color === 'indigo' ? 'bg-indigo-500' : 'bg-gray-500'
                    }`} />
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setSelectedWordId(null);
                  setSelectedWordData(null);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </Button>
            </div>
            <div className="p-4 flex-1 overflow-auto">
              {selectedWordData.videoUrl && (
                <div className="rounded-lg overflow-hidden border">
                  <video 
                    className="w-full aspect-video object-contain bg-black" 
                    src={selectedWordData.videoUrl}
                    controls
                    playsInline
                    autoPlay
                    loop
                    muted
                  />
                </div>
              )}
              <div className="text-xs text-muted-foreground mt-2">
                {selectedWordData.vi}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Practice Components */}
      {activePractice === 'quick-review' && (
        <QuickReview 
          onComplete={handlePracticeComplete}
          onClose={handlePracticeClose}
        />
      )}
      
      {activePractice === 'speed-signs' && (
        <SpeedChallenge 
          onComplete={handlePracticeComplete}
          onClose={handlePracticeClose}
        />
      )}
      
      {activePractice === 'mirror-practice' && (
        <MirrorPractice 
          onComplete={handlePracticeComplete}
          onClose={handlePracticeClose}
        />
      )}
      
      {activePractice === 'quiz-mix' && (
        <QuizMix 
          onComplete={handlePracticeComplete}
          onClose={handlePracticeClose}
        />
      )}
      
      {activePractice === 'conversation-practice' && (
        <ConversationPractice 
          onComplete={handlePracticeComplete}
          onClose={handlePracticeClose}
        />
      )}
      
      {activePractice === 'daily-challenge' && (
        <DailyChallenge 
          onComplete={handlePracticeComplete}
          onClose={handlePracticeClose}
        />
      )}
    </div>
  );
};

export default Dashboard;