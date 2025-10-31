import { Button } from "../../shared/ui/button";
import { Card } from "../../shared/ui/card";
import { Badge } from "../../shared/ui/badge";
import { Play, Home, BookOpen, BookText, User, ChevronDown, Trophy, Target, Users, Hash, Smile, Zap, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { Dictionary } from "../../shared/components/dictionary";
import { ProfileTab } from "../../shared/components/profile-tab";
import CheckCircleIcon from "../../components/icons/CheckCircleIcon";
import LockIcon from "../../components/icons/LockIcon";
import MirrorIcon from "../../components/icons/MirrorIcon";
import HandIcon from "../../components/icons/HandIcon";

// Import practice components
import { QuickReview, SpeedChallenge, MirrorPractice, QuizMix, ConversationPractice, DailyChallenge } from "../../features/practice";
import ChapterIllustration from "../../components/illustrations/ChapterIllustration";

// Chapter Card Component
interface ChapterCardProps {
  chapterNumber: number;
  title: string;
  lessonsCompleted: number;
  totalLessons: number;
  isActive?: boolean;
  isLocked?: boolean;
  thumbnail?: string;
  onStart?: () => void;
  illustration?: 'greetings' | 'family' | 'numbers' | 'emotions' | 'default';
}

const ChapterCard = ({
  chapterNumber,
  title,
  lessonsCompleted,
  totalLessons,
  isActive = false,
  isLocked = false,
  thumbnail,
  onStart,
  illustration
}: ChapterCardProps) => {
  const progress = (lessonsCompleted / totalLessons) * 100;
  const isCompleted = lessonsCompleted === totalLessons;
  const [isHovered, setIsHovered] = useState(false);

      return (
        <Card 
          className={cn(
            "relative overflow-hidden transition-all duration-500 cursor-pointer",
            "hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1",
            "transform-gpu will-change-transform",
            isActive ? "border-2 border-blue-500 shadow-lg animate-glow" : "border-gray-200 hover:border-blue-400",
            isLocked && "opacity-60 cursor-not-allowed hover:scale-100 hover:translate-y-0 hover:shadow-none"
          )}
          onMouseEnter={() => !isLocked && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => !isLocked && onStart?.()}
        >
      {/* Active Indicator */}
      {isActive && (
        <div className="absolute -left-1 top-6 bottom-6 w-1 bg-blue-500 rounded-r-full z-10" />
      )}
      
      <div className="flex items-stretch">
            {/* Thumbnail Image */}
            {(thumbnail || illustration) && (
              <div className="relative w-40 flex-shrink-0 overflow-hidden group/thumb">
                {illustration ? (
                  <div className={cn(
                    "w-full h-full flex items-center justify-center bg-white transition-all duration-500",
                    isLocked ? "grayscale brightness-75" : "brightness-100",
                    isActive && "brightness-110 contrast-110"
                  )}>
                    <ChapterIllustration width={160} height={160} variant={illustration} />
                  </div>
                ) : (
                  <img 
                    src={thumbnail!} 
                    alt={title}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-500",
                      "group-hover/thumb:scale-110 group-hover/thumb:rotate-1",
                      isLocked ? "grayscale brightness-75" : "brightness-100",
                      isActive && "brightness-110 contrast-110"
                    )}
                  />
                )}
                {/* Animated shine effect on hover */}
                {!isLocked && (
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent",
                    "transition-all duration-700 -translate-x-full",
                    isHovered && "translate-x-full"
                  )} />
                )}
                {isLocked && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                      <LockIcon size={22} />
                    </div>
                  </div>
                )}
                {/* Dynamic overlay gradient */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r from-transparent via-background/60 to-background/90 transition-all duration-300",
                  isHovered && !isLocked && "from-blue-500/10 via-background/50 to-background/80"
                )} />
                {/* Corner accent */}
                {isActive && (
                  <div className="absolute top-0 left-0 w-0 h-0 border-t-[40px] border-t-blue-500 border-r-[40px] border-r-transparent" />
                )}
              </div>
            )}
        
        <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <Badge className={cn(
                "mb-2 transition-colors",
                isActive || isHovered 
                  ? "bg-blue-600 text-white" 
                  : "bg-blue-100 text-blue-800"
              )}>
                CHAPTER {chapterNumber}
              </Badge>
              <h3 className={cn(
                "text-xl font-semibold transition-colors",
                isActive ? "text-blue-700" : "text-gray-800"
              )}>
                {title}
              </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {lessonsCompleted} trên {totalLessons} bài học đã hoàn thành
                </p>
            </div>
            
                <Button
                  size="lg"
                  disabled={isLocked}
                  onClick={(e) => {
                    e.stopPropagation();
                    onStart?.();
                  }}
                  className={cn(
                    "rounded-full w-16 h-16 p-0 transition-all duration-300",
                    "shadow-lg hover:shadow-2xl hover:scale-125 hover:rotate-6",
                    "transform-gpu will-change-transform",
                    isActive 
                      ? "bg-blue-500 hover:bg-blue-600 animate-breath" 
                      : isHovered
                        ? "bg-blue-400 hover:bg-blue-500 animate-pulse"
                        : "bg-blue-300 hover:bg-blue-400",
                    isLocked && "opacity-50 cursor-not-allowed hover:scale-100 hover:rotate-0"
                  )}
                >
                  <Play className="w-8 h-8 text-white ml-1 transition-transform duration-300" fill="white" />
                </Button>
          </div>
          
          {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden relative">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden",
                    isCompleted ? "bg-blue-500" : "bg-blue-400",
                    isHovered && "bg-blue-500"
                  )}
                  style={{ width: `${progress}%` }}
                >
                  {/* Shimmer effect on progress bar */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" 
                       style={{ backgroundSize: '200% 100%' }} />
                </div>
              </div>
        </div>
      </div>
      
          {/* Completion Badge */}
          {isCompleted && (
            <div className="absolute top-4 right-4 z-10 animate-bounce-slow">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-glow">
                <span className="inline-block align-middle mr-1">
                  <CheckCircleIcon className="w-4 h-4 text-white" />
                </span>
                Hoàn thành
              </div>
            </div>
          )}
    </Card>
  );
};

interface Unit {
  id: string;
  unitNumber: number;
  title: string;
  totalChapters: number;
  icon: string;
  thumbnail?: string;
  gradient: string;
  chapters: Array<{
    id: string;
    chapterNumber: number;
    title: string;
    lessonsCompleted: number;
    totalLessons: number;
    isActive: boolean;
    isLocked: boolean;
    thumbnail?: string;
  }>;
}

interface DashboardProps {
  onGoToSettings?: () => void;
  onGoToLessonDetail?: (lessonId: string) => void;
  onGoToChapterOverview?: (chapterId: string) => void;
  onLogout?: () => void;
}

const Dashboard = ({ onGoToLessonDetail, onGoToChapterOverview, onLogout }: DashboardProps) => {
  const [currentChapter] = useState(1);
  const [activeTab, setActiveTab] = useState<'home' | 'practice' | 'dictionary' | 'profile'>('home');
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({ 
    'unit-1': true,
    'unit-4': true 
  });

  // Practice activity states
  const [activePractice, setActivePractice] = useState<string | null>(null);
  const [practiceScores, setPracticeScores] = useState<{[key: string]: {score: number, timeSpent: number}}>({});

  const units: Unit[] = [
    {
      id: "unit-1",
      unitNumber: 1,
      title: "Giới thiệu",
      totalChapters: 12,
      icon: "👋",
      thumbnail: "/images/lesson-greetings-BdV20h0N.jpg",
      gradient: "from-blue-200 via-blue-100 to-blue-50",
      chapters: [
        {
          id: "1",
          chapterNumber: 1,
          title: "Xin chào và chào mừng",
          lessonsCompleted: 1,
          totalLessons: 6,
          isActive: true,
          isLocked: false,
          thumbnail: "/images/lesson-greetings-BdV20h0N.jpg"
        },
        {
          id: "2",
          chapterNumber: 2,
          title: "Bắt đầu cuộc trò chuyện",
          lessonsCompleted: 0,
          totalLessons: 6,
          isActive: false,
          isLocked: false,
          thumbnail: "/images/hello-sign-demo.png"
        },
        {
          id: "3",
          chapterNumber: 3,
          title: "Chào hỏi và tạm biệt",
          lessonsCompleted: 0,
          totalLessons: 6,
          isActive: false,
          isLocked: true,
          thumbnail: "/images/lesson-greetings-BdV20h0N.jpg"
        }
      ]
    },
    {
      id: "unit-2",
      unitNumber: 2,
      title: "Gia đình và Mối quan hệ",
      totalChapters: 8,
      icon: "👨‍👩‍👧",
      thumbnail: "/images/lesson-family-Be3SmyDt.jpg",
      gradient: "from-indigo-200 via-indigo-100 to-indigo-50",
      chapters: [
        {
          id: "2",
          chapterNumber: 1,
          title: "Thành viên gia đình",
          lessonsCompleted: 0,
          totalLessons: 6,
          isActive: false,
          isLocked: false,
          thumbnail: "/images/lesson-family-Be3SmyDt.jpg"
        },
        {
          id: "5",
          chapterNumber: 2,
          title: "Mối quan hệ gia đình",
          lessonsCompleted: 0,
          totalLessons: 6,
          isActive: false,
          isLocked: false,
          thumbnail: "/images/lesson-family-Be3SmyDt.jpg"
        },
        {
          id: "13",
          chapterNumber: 3,
          title: "Gia đình mở rộng",
          lessonsCompleted: 0,
          totalLessons: 6,
          isActive: false,
          isLocked: false,
          thumbnail: "/images/lesson-family-Be3SmyDt.jpg"
        },
        {
          id: "14",
          chapterNumber: 4,
          title: "Tuổi tác và thế hệ",
          lessonsCompleted: 0,
          totalLessons: 6,
          isActive: false,
          isLocked: false,
          thumbnail: "/images/lesson-family-Be3SmyDt.jpg"
        },
        {
          id: "15",
          chapterNumber: 5,
          title: "Tình cảm gia đình",
          lessonsCompleted: 0,
          totalLessons: 6,
          isActive: false,
          isLocked: false,
          thumbnail: "/images/lesson-family-Be3SmyDt.jpg"
        },
        {
          id: "16",
          chapterNumber: 6,
          title: "Thực hành gia đình",
          lessonsCompleted: 0,
          totalLessons: 6,
          isActive: false,
          isLocked: true,
          thumbnail: "/images/lesson-family-Be3SmyDt.jpg"
        }
      ]
    },
    {
      id: "unit-3",
      unitNumber: 3,
      title: "Cảm xúc và Tình cảm",
      totalChapters: 6,
      icon: "😊",
      thumbnail: "/images/lesson-emotions-CLtOmn_z.jpg",
      gradient: "from-pink-200 via-pink-100 to-pink-50",
      chapters: [
        {
          id: "7",
          chapterNumber: 1,
          title: "Cảm xúc cơ bản",
          lessonsCompleted: 0,
          totalLessons: 6,
          isActive: false,
          isLocked: false,
          thumbnail: "/images/lesson-emotions-CLtOmn_z.jpg"
        },
        {
          id: "8",
          chapterNumber: 2,
          title: "Cảm xúc tích cực",
          lessonsCompleted: 0,
          totalLessons: 6,
          isActive: false,
          isLocked: false,
          thumbnail: "/images/lesson-emotions-CLtOmn_z.jpg"
        },
        {
          id: "9",
          chapterNumber: 3,
          title: "Cảm xúc tiêu cực",
          lessonsCompleted: 0,
          totalLessons: 6,
          isActive: false,
          isLocked: false,
          thumbnail: "/images/lesson-emotions-CLtOmn_z.jpg"
        },
        {
          id: "10",
          chapterNumber: 4,
          title: "Cảm xúc phức tạp",
          lessonsCompleted: 0,
          totalLessons: 6,
          isActive: false,
          isLocked: false,
          thumbnail: "/images/lesson-emotions-CLtOmn_z.jpg"
        },
        {
          id: "11",
          chapterNumber: 5,
          title: "Tình cảm đặc biệt",
          lessonsCompleted: 0,
          totalLessons: 6,
          isActive: false,
          isLocked: false,
          thumbnail: "/images/lesson-emotions-CLtOmn_z.jpg"
        },
        {
          id: "12",
          chapterNumber: 6,
          title: "Thực hành tổng hợp",
          lessonsCompleted: 0,
          totalLessons: 6,
          isActive: false,
          isLocked: true,
          thumbnail: "/images/lesson-emotions-CLtOmn_z.jpg"
        }
      ]
    },
    {
      id: "unit-4",
      unitNumber: 4,
      title: "Số đếm và Thời gian",
      totalChapters: 10,
      icon: "🔢",
      thumbnail: "/images/lesson-numbers-DJNsYzix.jpg",
      gradient: "from-green-200 via-green-100 to-green-50",
      chapters: [
        {
          id: "3",
          chapterNumber: 1,
          title: "Số từ 1-20",
          lessonsCompleted: 0,
          totalLessons: 6,
          isActive: false,
          isLocked: false,
          thumbnail: "/images/lesson-numbers-DJNsYzix.jpg"
        },
        {
          id: "17",
          chapterNumber: 2,
          title: "Số từ 21-100",
          lessonsCompleted: 0,
          totalLessons: 6,
          isActive: false,
          isLocked: false,
          thumbnail: "/images/lesson-numbers-DJNsYzix.jpg"
        },
        {
          id: "18",
          chapterNumber: 3,
          title: "Thời gian trong ngày",
          lessonsCompleted: 0,
          totalLessons: 6,
          isActive: false,
          isLocked: false,
          thumbnail: "/images/lesson-numbers-DJNsYzix.jpg"
        },
        {
          id: "19",
          chapterNumber: 4,
          title: "Ngày trong tuần",
          lessonsCompleted: 0,
          totalLessons: 6,
          isActive: false,
          isLocked: false,
          thumbnail: "/images/lesson-numbers-DJNsYzix.jpg"
        },
        {
          id: "20",
          chapterNumber: 5,
          title: "Tháng và năm",
          lessonsCompleted: 0,
          totalLessons: 6,
          isActive: false,
          isLocked: false,
          thumbnail: "/images/lesson-numbers-DJNsYzix.jpg"
        },
        {
          id: "21",
          chapterNumber: 6,
          title: "Thực hành số đếm",
          lessonsCompleted: 0,
          totalLessons: 6,
          isActive: false,
          isLocked: true,
          thumbnail: "/images/lesson-numbers-DJNsYzix.jpg"
        }
      ]
    }
  ];

  const handleChapterStart = (chapterId: string) => {
    if (onGoToChapterOverview) {
      onGoToChapterOverview(chapterId);
    } else if (onGoToLessonDetail) {
      // fallback to old behavior
      onGoToLessonDetail(chapterId);
    }
  };

  const handleTabClick = (tab: typeof activeTab) => {
    setActiveTab(tab);
  };

  const toggleUnit = (unitId: string) => {
    setExpandedUnits(prev => ({
      ...prev,
      [unitId]: !prev[unitId]
    }));
  };

  // Practice activity handlers
  const handlePracticeStart = (practiceType: string) => {
    setActivePractice(practiceType);
  };

  const handlePracticeComplete = (practiceType: string, score: number, timeSpent: number) => {
    setPracticeScores(prev => ({
      ...prev,
      [practiceType]: { score, timeSpent }
    }));
    setActivePractice(null);
  };

  const handlePracticeClose = () => {
    setActivePractice(null);
  };

  const renderCategoryIcon = (id: string) => {
    switch (id) {
      case 'quick':
        return <Zap className="w-6 h-6 text-white" />;
      case 'target':
        return <Target className="w-6 h-6 text-white" />;
      case 'mirror':
        return <MirrorIcon className="w-6 h-6 text-white" />;
      case 'books':
        return <BookOpen className="w-6 h-6 text-white" />;
      case 'chat':
        return <BookText className="w-6 h-6 text-white" />;
      case 'trophy':
        return <Trophy className="w-6 h-6 text-white" />;
      default:
        return <Zap className="w-6 h-6 text-white" />;
    }
  };

  const getIllustrationVariantForUnit = (unitId: string, icon: string, title: string): 'greetings' | 'family' | 'numbers' | 'emotions' | 'default' => {
    if (icon === '👋' || title.toLowerCase().includes('chào')) return 'greetings';
    if (icon === '👨‍👩‍👧' || title.toLowerCase().includes('gia đình')) return 'family';
    if (icon === '🔢' || title.toLowerCase().includes('số')) return 'numbers';
    if (icon === '😊' || title.toLowerCase().includes('cảm xúc')) return 'emotions';
    if (unitId === 'unit-1') return 'greetings';
    if (unitId === 'unit-2') return 'family';
    if (unitId === 'unit-3') return 'numbers';
    if (unitId === 'unit-4') return 'emotions';
    return 'default';
  };

  const renderUnitIcon = (icon: string) => {
    // Map known emojis to icons
    if (icon === '👋') return <HandIcon size={28} />;
    if (icon === '👨  👧') return <Users className="w-7 h-7 text-blue-700" />;
    if (icon === '🔢') return <Hash className="w-7 h-7 text-green-700" />;
    if (icon === '😊') return <Smile className="w-7 h-7 text-pink-700" />;
    return <Smile className="w-7 h-7" />;
  };

  const renderActivityIcon = (icon: string) => {
    if (icon === '👋') return <HandIcon size={28} />;
    if (icon === '👨  👧') return <Users className="w-7 h-7 text-indigo-600" />;
    if (icon === '🔢') return <Hash className="w-7 h-7 text-green-600" />;
    return <Sparkles className="w-7 h-7" />;
  };

  // Practice categories data - updated with mapping to practice components
  const practiceCategories = [
    { 
      id: 'quickReview', 
      icon: 'quick', 
      title: 'Ôn tập nhanh', 
      description: 'Luyện tập với flashcard', 
      color: 'from-blue-400 to-blue-500', 
      exercises: 12,
      component: 'QuickReview'
    },
    { 
      id: 'speedChallenge', 
      icon: 'target', 
      title: 'Thử thách tốc độ', 
      description: 'Nhận diện nhanh ký hiệu', 
      color: 'from-red-400 to-pink-500', 
      exercises: 8,
      component: 'SpeedChallenge'
    },
    { 
      id: 'mirrorPractice', 
      icon: 'mirror', 
      title: 'Luyện gương', 
      description: 'Thực hành trước gương', 
      color: 'from-blue-400 to-indigo-500', 
      exercises: 15,
      component: 'MirrorPractice'
    },
    { 
      id: 'quizMix', 
      icon: 'books', 
      title: 'Quiz tổng hợp', 
      description: 'Kiểm tra kiến thức', 
      color: 'from-purple-400 to-pink-500', 
      exercises: 10,
      component: 'QuizMix'
    },
    { 
      id: 'conversationPractice', 
      icon: 'chat', 
      title: 'Luyện hội thoại', 
      description: 'Thực hành giao tiếp', 
      color: 'from-green-400 to-emerald-500', 
      exercises: 6,
      component: 'ConversationPractice'
    },
    { 
      id: 'dailyChallenge', 
      icon: 'trophy', 
      title: 'Thử thách hàng ngày', 
      description: 'Thử thách đặc biệt', 
      color: 'from-blue-400 to-indigo-500', 
      exercises: 5,
      component: 'DailyChallenge'
    },
  ];


  // Render Practice Tab Content
  const renderPracticeContent = () => (
    <div className="space-y-6 animate-slide-up">
      {/* Practice Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Trung tâm Luyện tập</h1>
        <p className="text-gray-600">Củng cố kỹ năng ngôn ngữ ký hiệu với luyện tập tập trung</p>
      </div>

      {/* Daily Goal */}
      <Card className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white overflow-hidden relative group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] transform-gpu">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="p-6 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-breath">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Mục tiêu hàng ngày</h3>
                <p className="text-sm text-white/80">
                  {Object.keys(practiceScores).length} trên 6 bài tập đã hoàn thành
                </p>
              </div>
            </div>
            <div className="text-4xl animate-float"><Target className="w-8 h-8" /></div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-700" 
              style={{ width: `${(Object.keys(practiceScores).length / 6) * 100}%` }}
            >
              <div className="h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
            </div>
          </div>
        </div>
      </Card>

      {/* Practice Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {practiceCategories.map((category, index) => (
          <Card 
            key={category.id}
            className={cn(
              "relative overflow-hidden cursor-pointer transition-all duration-500",
              "hover:shadow-2xl hover:scale-[1.05] hover:-translate-y-2",
              "transform-gpu will-change-transform animate-slide-up"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => handlePracticeStart(category.id)}
          >
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-10",
              category.color
            )} />
            <div className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center text-2xl",
                    "shadow-lg animate-float",
                    category.color
                  )}>
                    {renderCategoryIcon(category.icon)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{category.title}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
                <Play className="w-8 h-8 text-blue-500 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BookOpen className="w-4 h-4" />
                  <span>{category.exercises} bài tập</span>
                </div>
                {practiceScores[category.id] && (
                <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span>{practiceScores[category.id].score} điểm</span>
                </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Hoạt động gần đây</h3>
        <div className="space-y-3">
          {[
            { title: 'Ôn tập Chào hỏi', time: '2 giờ trước', score: 95, icon: '👋' },
            { title: 'Từ Gia đình', time: 'Hôm qua', score: 88, icon: '👨‍👩‍👧' },
            { title: 'Luyện tập Số đếm', time: '2 ngày trước', score: 92, icon: '🔢' },
          ].map((activity, index) => (
            <Card 
              key={index}
              className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl animate-wiggle">{renderActivityIcon(activity.icon)}</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{activity.title}</h4>
                    <p className="text-sm text-gray-600">{activity.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "text-lg font-bold",
                    activity.score >= 90 ? "text-green-600" : "text-blue-600"
                  )}>
                    {activity.score}%
                  </div>
                  <Trophy className={cn(
                    "w-5 h-5",
                    activity.score >= 90 ? "text-yellow-500" : "text-gray-400"
                  )} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24">
      <main className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        {/* Render content based on active tab */}
        {activeTab === 'home' && units.map((unit, unitIndex) => {
          const isExpanded = expandedUnits[unit.id];
          
          return (
            <div key={unit.id} className="space-y-6">
              {/* Unit Header */}
                  <Card 
                    className={cn(
                      `bg-gradient-to-r ${unit.gradient} border-blue-300`,
                      "overflow-hidden relative cursor-pointer transition-all duration-500",
                      "hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1",
                      "transform-gpu will-change-transform"
                    )}
                    onClick={() => toggleUnit(unit.id)}
                  >
                    {/* Background Image with Overlay - Enhanced */}
                    {unit.thumbnail && (
                      <div className="absolute inset-0 opacity-30 overflow-hidden">
                        <img 
                          src={unit.thumbnail} 
                          alt={unit.title}
                          className="w-full h-full object-cover scale-110 blur-sm"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80" />
                        {/* Animated overlay pulse */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-transparent animate-pulse" />
                      </div>
                    )}
                
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-300 rounded-full translate-y-1/2 -translate-x-1/2" />
                </div>
                
                <div className="flex items-center justify-between p-6 relative z-10">
                  <div className="flex items-center gap-4 flex-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleUnit(unit.id);
                      }}
                      className={cn(
                        "bg-blue-300/50 hover:bg-blue-300 transition-all duration-300",
                        !isExpanded && "bg-blue-400"
                      )}
                    >
                      <ChevronDown className={cn(
                        "w-6 h-6 text-blue-800 transition-transform duration-300",
                        isExpanded ? "rotate-0" : "-rotate-90"
                      )} />
                    </Button>
                    
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-gray-800 mb-1">{unit.title}</h1>
                      <div className="flex items-center gap-2">
                            <Badge className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                              BÀI {unit.unitNumber}
                            </Badge>
                            <span className="text-gray-700 font-medium">{unit.totalChapters} chương</span>
                      </div>
                    </div>
                  </div>
                  
                      <div className="relative group">
                        {/* Icon with animated background */}
                        <div className="absolute inset-0 bg-white rounded-full blur-md opacity-75 group-hover:opacity-100 transition-all duration-500 animate-breath" />
                        <div className="relative bg-white rounded-full p-4 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 transform-gpu">
                          <span className="inline-block transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 animate-float">
                            {renderUnitIcon(unit.icon)}
                          </span>
                        </div>
                      </div>
                </div>
              </Card>

              {/* Chapters List with Connecting Lines - Collapsible */}
              <div className={cn(
                "transition-all duration-500 ease-in-out origin-top",
                isExpanded 
                  ? "opacity-100 scale-y-100 max-h-[5000px]" 
                  : "opacity-0 scale-y-0 max-h-0 overflow-hidden"
              )}>
                    {/* Continue Button */}
                    {unitIndex === 0 && (
                      <div className="flex justify-end mb-6 animate-slide-up">
                        <Button
                          variant="outline"
                          className={cn(
                            "border-2 border-blue-500 text-blue-600 font-semibold",
                            "hover:bg-blue-50 hover:border-blue-600 hover:scale-110 hover:-translate-y-1",
                            "transition-all duration-300 shadow-md hover:shadow-xl",
                            "transform-gpu will-change-transform animate-pulse"
                          )}
                          onClick={() => handleChapterStart(String(currentChapter))}
                        >
                          <span className="inline-flex items-center gap-2">
                            TIẾP TỤC
                            <Play className="w-4 h-4 inline-block animate-bounce-slow" />
                          </span>
                        </Button>
                      </div>
                    )}

                <div className="relative space-y-8">
                  {/* Vertical Connecting Line */}
                  {unit.chapters.length > 1 && (
                    <div className="absolute left-1/2 top-8 bottom-8 w-1 bg-gradient-to-b from-blue-400 via-blue-300 to-gray-300 -z-10 transform -translate-x-1/2 rounded-full" />
                  )}
                  
                      {unit.chapters.map((chapter, index) => (
                        <div key={chapter.id} className="relative animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                          <ChapterCard
                            chapterNumber={chapter.chapterNumber}
                            title={chapter.title}
                            lessonsCompleted={chapter.lessonsCompleted}
                            totalLessons={chapter.totalLessons}
                            isActive={chapter.isActive}
                            isLocked={chapter.isLocked}
                            thumbnail={undefined}
                            illustration={getIllustrationVariantForUnit(unit.id, unit.icon, unit.title)}
                            onStart={() => handleChapterStart(chapter.id)}
                          />
                          
                          {/* Connection dot on the line */}
                          {index < unit.chapters.length - 1 && (
                            <div className="absolute left-1/2 -bottom-4 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 z-10 shadow-lg border-2 border-white animate-float" 
                                 style={{ animationDelay: `${index * 200}ms` }} />
                          )}
                        </div>
                      ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* Continue Learning Banner - Only on Home Tab */}
        {activeTab === 'home' && (
            <Card className="mt-12 bg-gradient-to-r from-blue-100 via-indigo-50 to-blue-50 border-blue-200 hover:shadow-2xl transition-all duration-500 overflow-hidden relative group cursor-pointer hover:scale-[1.02] hover:-translate-y-1 transform-gpu">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" 
                   style={{ backgroundSize: '200% 100%' }} />
              
              <div className="p-8 flex items-center justify-between relative z-10">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-all duration-300">
                    Tiếp tục hành trình học ngôn ngữ ký hiệu
                  </h2>
                  <p className="text-gray-700 group-hover:text-gray-900 transition-all duration-300 group-hover:translate-x-2 inline-flex items-center gap-2">
                    <span>Học các ký hiệu cơ bản để giao tiếp với người khác</span>
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                  </p>
                </div>
                <div className="text-6xl animate-float">
                  <span className="inline-block group-hover:animate-wiggle transition-transform duration-300 group-hover:scale-110">
                    <BookOpen className="w-12 h-12 text-blue-700" />
                  </span>
                </div>
              </div>
            </Card>
        )}

        {/* Practice Tab Content */}
        {activeTab === 'practice' && renderPracticeContent()}

        {/* Dictionary Tab Content */}
        {activeTab === 'dictionary' && (
          <div className="animate-slide-up">
            <Dictionary />
          </div>
        )}

        {/* Profile Tab Content */}
        {activeTab === 'profile' && (
          <div className="animate-slide-up">
            <ProfileTab onLogout={onLogout} />
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50">
        <div className="container mx-auto px-4 max-w-lg">
          <div className="flex items-center justify-around py-2">
                <button 
                  onClick={() => handleTabClick('home')}
                  className={cn(
                    "flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all duration-300",
                    "hover:scale-105 transform-gpu",
                    activeTab === 'home' 
                      ? "text-blue-600 bg-blue-50" 
                      : "text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  )}
                >
                  <Home className={cn(
                    "w-6 h-6 transition-all duration-300",
                    activeTab === 'home' ? "scale-110 animate-bounce-slow" : "hover:scale-110"
                  )} 
                  fill={activeTab === 'home' ? 'currentColor' : 'none'}
                  />
                  <span className="text-xs font-medium">Trang chủ</span>
                  {activeTab === 'home' && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full animate-pulse" />
                  )}
                </button>
            
                <button 
                  onClick={() => handleTabClick('practice')}
                  className={cn(
                    "flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all duration-300",
                    "hover:scale-105 transform-gpu",
                    activeTab === 'practice' 
                      ? "text-blue-600 bg-blue-50" 
                      : "text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  )}
                >
                  <BookOpen className={cn(
                    "w-6 h-6 transition-all duration-300",
                    activeTab === 'practice' ? "scale-110 animate-wiggle" : "hover:scale-110"
                  )} />
                  <span className="text-xs font-medium">Luyện tập</span>
                </button>
            
                <button 
                  onClick={() => handleTabClick('dictionary')}
                  className={cn(
                    "flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all duration-300",
                    "hover:scale-105 transform-gpu",
                    activeTab === 'dictionary' 
                      ? "text-blue-600 bg-blue-50" 
                      : "text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  )}
                >
                  <BookText className={cn(
                    "w-6 h-6 transition-all duration-300",
                    activeTab === 'dictionary' ? "scale-110 animate-float" : "hover:scale-110"
                  )} />
                  <span className="text-xs font-medium">Từ điển</span>
                </button>
                
                <button 
                  onClick={() => handleTabClick('profile')}
                  className={cn(
                    "flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all duration-300",
                    "hover:scale-105 transform-gpu",
                    activeTab === 'profile' 
                      ? "text-blue-600 bg-blue-50" 
                      : "text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  )}
                >
                  <User className={cn(
                    "w-6 h-6 transition-all duration-300",
                    activeTab === 'profile' ? "scale-110 animate-breath" : "hover:scale-110"
                  )} />
                  <span className="text-xs font-medium">Hồ sơ</span>
                </button>
          </div>
        </div>
      </div>

      {/* Practice Components */}
      {activePractice === 'quickReview' && (
        <QuickReview
          onComplete={(score, timeSpent) => handlePracticeComplete('quickReview', score, timeSpent)}
          onClose={handlePracticeClose}
        />
      )}
      
      {activePractice === 'speedChallenge' && (
        <SpeedChallenge
          onComplete={(score, timeSpent) => handlePracticeComplete('speedChallenge', score, timeSpent)}
          onClose={handlePracticeClose}
        />
      )}
      
      {activePractice === 'mirrorPractice' && (
        <MirrorPractice
          onComplete={(score, timeSpent) => handlePracticeComplete('mirrorPractice', score, timeSpent)}
          onClose={handlePracticeClose}
        />
      )}
      
      {activePractice === 'quizMix' && (
        <QuizMix
          onComplete={(score, timeSpent) => handlePracticeComplete('quizMix', score, timeSpent)}
          onClose={handlePracticeClose}
        />
      )}
      
      {activePractice === 'conversationPractice' && (
        <ConversationPractice
          onComplete={(score, timeSpent) => handlePracticeComplete('conversationPractice', score, timeSpent)}
          onClose={handlePracticeClose}
        />
      )}
      
      {activePractice === 'dailyChallenge' && (
        <DailyChallenge
          onComplete={(score, timeSpent) => handlePracticeComplete('dailyChallenge', score, timeSpent)}
          onClose={handlePracticeClose}
        />
      )}
    </div>
  );
};

export default Dashboard;