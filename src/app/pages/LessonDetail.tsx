import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui/card";
import { Badge } from "../../shared/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../shared/ui/select";
import { Switch } from "../../shared/ui/switch";
import { BottomNavigation } from "../../shared/components";
// removed unused Tabs imports
import { 
  Play, 
  Pause, 
  CheckCircle,
  ArrowLeft,
  Clock,
  Star,
  BookOpen,
  Target,
  Trophy,
  Camera,
  User,
  Book
} from "lucide-react";
import MirrorIcon from "../../components/icons/MirrorIcon";
import CheckCircleIcon from "../../components/icons/CheckCircleIcon";
import HandIcon from "../../components/icons/HandIcon";
import { Hash, Users, Smile, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";

// Import practice components
import { QuickReview, SpeedChallenge, MirrorPractice, QuizMix, ConversationPractice, DailyChallenge } from "../../features/practice";
// Import learning components
import { IconicLearningWrapper } from "../../features/learning";

interface LessonDetailProps {
  lessonId: string;
  onBackToDashboard?: () => void;
}

const LessonDetail = ({ lessonId, onBackToDashboard }: LessonDetailProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted] = useState(false);
  const [speed, setSpeed] = useState<"slow" | "medium" | "normal">("normal");
  const [showTranscript, setShowTranscript] = useState(true);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([0, 1]);
  const [showMirror, setShowMirror] = useState(false);
  const [mirrorFeedback, setMirrorFeedback] = useState<"neutral" | "correct" | "incorrect">("neutral");
  const [activeTab, setActiveTab] = useState('home');
  const mirrorVideoRef = useRef<HTMLVideoElement | null>(null);
  const mirrorStreamRef = useRef<MediaStream | null>(null);
  const feedbackTimerRef = useRef<number | null>(null);
  
  // State for video sequence
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoSequence, setVideoSequence] = useState<string[]>([]);
  const [isSequencePlaying, setIsSequencePlaying] = useState(false);

  // Practice activity states
  const [activePractice, setActivePractice] = useState<string | null>(null);
  const [practiceScores, setPracticeScores] = useState<{[key: string]: {score: number, timeSpent: number}}>({});

  const lessonsData = {
    "1": {
      id: "1",
      title: "Chào hỏi cơ bản",
      description: "Học cách chào hỏi và giới thiệu bản thân bằng ngôn ngữ ký hiệu Việt Nam",
      difficulty: "Cơ bản",
      duration: "10 phút",
      xp: 50,
      progress: 60,
      thumbnail: "/placeholder.jpg",
      instructor: "Cô Nguyễn Thị Lan",
      rating: 4.8,
      studentsCount: 1250
    },
    "4": {
      id: "4",
      title: "Cảm xúc cơ bản",
      description: "Học cách biểu đạt vui mừng, buồn, giận, sợ hãi",
      difficulty: "Cơ bản",
      duration: "15 phút",
      xp: 80,
      progress: 0,
      thumbnail: "/public/images/lesson-emotions-CLtOmn_z.jpg",
      instructor: "Thầy Phạm Văn Minh",
      rating: 4.9,
      studentsCount: 980
    },
    "7": {
      id: "7",
      title: "Cảm xúc cơ bản",
      description: "Học cách biểu đạt vui mừng, buồn, giận, sợ hãi",
      difficulty: "Cơ bản",
      duration: "15 phút",
      xp: 80,
      progress: 0,
      thumbnail: "/public/images/lesson-emotions-CLtOmn_z.jpg",
      instructor: "Thầy Phạm Văn Minh",
      rating: 4.9,
      studentsCount: 980
    },
    "8": {
      id: "8",
      title: "Cảm xúc tích cực",
      description: "Hạnh phúc, tự tin, thích thú, hào hứng, hài lòng",
      difficulty: "Cơ bản",
      duration: "18 phút",
      xp: 90,
      progress: 0,
      thumbnail: "/public/images/lesson-emotions-CLtOmn_z.jpg",
      instructor: "Thầy Phạm Văn Minh",
      rating: 4.8,
      studentsCount: 850
    },
    "9": {
      id: "9",
      title: "Cảm xúc tiêu cực",
      description: "Thất vọng, chán nản, khó chịu, cô đơn, hối hận",
      difficulty: "Trung cấp",
      duration: "20 phút",
      xp: 100,
      progress: 0,
      thumbnail: "/public/images/lesson-emotions-CLtOmn_z.jpg",
      instructor: "Thầy Phạm Văn Minh",
      rating: 4.7,
      studentsCount: 720
    },
    "10": {
      id: "10",
      title: "Cảm xúc phức tạp",
      description: "Bối rối, hồi hộp, tự hào, hy vọng, bình tĩnh",
      difficulty: "Trung cấp",
      duration: "22 phút",
      xp: 110,
      progress: 0,
      thumbnail: "/public/images/lesson-emotions-CLtOmn_z.jpg",
      instructor: "Thầy Phạm Văn Minh",
      rating: 4.6,
      studentsCount: 680
    },
    "11": {
      id: "11",
      title: "Tình cảm đặc biệt",
      description: "Xấu hổ, ghen tị, ghen tuông, thương yêu, biết ơn",
      difficulty: "Nâng cao",
      duration: "25 phút",
      xp: 130,
      progress: 0,
      thumbnail: "/public/images/lesson-emotions-CLtOmn_z.jpg",
      instructor: "Thầy Phạm Văn Minh",
      rating: 4.5,
      studentsCount: 590
    },
    "12": {
      id: "12",
      title: "Thực hành tổng hợp",
      description: "Ôn tập tất cả các cảm xúc đã học với bài tập tương tác",
      difficulty: "Nâng cao",
      duration: "30 phút",
      xp: 150,
      progress: 0,
      thumbnail: "/public/images/lesson-emotions-CLtOmn_z.jpg",
      instructor: "Thầy Phạm Văn Minh",
      rating: 4.9,
      studentsCount: 420
    },
    "2": {
      id: "2",
      title: "Thành viên gia đình",
      description: "Từ vựng về các thành viên trong gia đình",
      difficulty: "Cơ bản",
      duration: "15 phút",
      xp: 75,
      progress: 0,
      thumbnail: "/public/images/lesson-family-Be3SmyDt.jpg",
      instructor: "Cô Nguyễn Thị Lan",
      rating: 4.8,
      studentsCount: 1100
    },
    "3": {
      id: "3",
      title: "Số đếm 1-20",
      description: "Học cách biểu đạt các con số",
      difficulty: "Cơ bản",
      duration: "12 phút",
      xp: 60,
      progress: 0,
      thumbnail: "/public/images/lesson-numbers-DJNsYzix.jpg",
      instructor: "Thầy Lê Văn Hùng",
      rating: 4.7,
      studentsCount: 950
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
        title: "Giới thiệu cảm xúc cơ bản",
        description: "Tổng quan về 6 cảm xúc cơ bản và tầm quan trọng",
        duration: "2 phút",
        type: "video",
        content: "Video giới thiệu cảm xúc cơ bản",
        completed: false
      },
      {
        id: 2,
        title: "Vui mừng & Buồn thảm",
        description: "Học cách thể hiện vui mừng và buồn thảm",
        duration: "4 phút",
        type: "video",
        content: "Video hướng dẫn vui mừng và buồn thảm",
        completed: false
      },
      {
        id: 3,
        title: "Giận dữ & Hoảng sợ",
        description: "Học cách thể hiện giận dữ và hoảng sợ",
        duration: "4 phút",
        type: "video",
        content: "Video hướng dẫn giận dữ và hoảng sợ",
        completed: false
      },
      {
        id: 4,
        title: "Lo sợ & Tuyệt vọng",
        description: "Học cách thể hiện lo sợ và tuyệt vọng",
        duration: "4 phút",
        type: "video",
        content: "Video hướng dẫn lo sợ và tuyệt vọng",
        completed: false
      },
      {
        id: 5,
        title: "Luyện tập nhận diện",
        description: "Thực hành nhận diện 6 cảm xúc cơ bản",
        duration: "3 phút",
        type: "practice",
        content: "Bài tập nhận diện cảm xúc",
        completed: false
      },
      {
        id: 6,
        title: "Thực hành tổng hợp",
        description: "Ứng dụng cảm xúc trong tình huống thực tế",
        duration: "3 phút",
        type: "interactive",
        content: "Bài tập tương tác",
        completed: false
      }
    ],
    "7": [
      {
        id: 1,
        title: "Giới thiệu cảm xúc cơ bản",
        description: "Tổng quan về 6 cảm xúc cơ bản và tầm quan trọng",
        duration: "2 phút",
        type: "video",
        content: "Video giới thiệu cảm xúc cơ bản",
        completed: false
      },
      {
        id: 2,
        title: "Vui mừng & Buồn thảm",
        description: "Học cách thể hiện vui mừng và buồn thảm",
        duration: "4 phút",
        type: "video",
        content: "Video hướng dẫn vui mừng và buồn thảm",
        completed: false
      },
      {
        id: 3,
        title: "Giận dữ & Hoảng sợ",
        description: "Học cách thể hiện giận dữ và hoảng sợ",
        duration: "4 phút",
        type: "video",
        content: "Video hướng dẫn giận dữ và hoảng sợ",
        completed: false
      },
      {
        id: 4,
        title: "Lo sợ & Tuyệt vọng",
        description: "Học cách thể hiện lo sợ và tuyệt vọng",
        duration: "4 phút",
        type: "video",
        content: "Video hướng dẫn lo sợ và tuyệt vọng",
        completed: false
      },
      {
        id: 5,
        title: "Luyện tập nhận diện",
        description: "Thực hành nhận diện 6 cảm xúc cơ bản",
        duration: "3 phút",
        type: "practice",
        content: "Bài tập nhận diện cảm xúc",
        completed: false
      },
      {
        id: 6,
        title: "Thực hành tổng hợp",
        description: "Ứng dụng cảm xúc trong tình huống thực tế",
        duration: "3 phút",
        type: "interactive",
        content: "Bài tập tương tác",
        completed: false
      }
    ],
    "8": [
      {
        id: 1,
        title: "Giới thiệu cảm xúc tích cực",
        description: "Tầm quan trọng của cảm xúc tích cực trong giao tiếp",
        duration: "2 phút",
        type: "video",
        content: "Video giới thiệu",
        completed: false
      },
      {
        id: 2,
        title: "Ngạc nhiên & Hạnh phúc",
        description: "Học cách thể hiện ngạc nhiên và hạnh phúc",
        duration: "4 phút",
        type: "video",
        content: "Video hướng dẫn ngạc nhiên và hạnh phúc",
        completed: false
      },
      {
        id: 3,
        title: "Tự tin & Thích thú",
        description: "Học cách thể hiện tự tin và thích thú",
        duration: "4 phút",
        type: "video",
        content: "Video hướng dẫn tự tin và thích thú",
        completed: false
      },
      {
        id: 4,
        title: "Hồi hộp & Cô đơn",
        description: "Học cách thể hiện hồi hộp và cô đơn",
        duration: "4 phút",
        type: "video",
        content: "Video hướng dẫn hồi hộp và cô đơn",
        completed: false
      },
      {
        id: 5,
        title: "Luyện tập cảm xúc tích cực",
        description: "Thực hành các cảm xúc tích cực",
        duration: "3 phút",
        type: "practice",
        content: "Bài tập thực hành",
        completed: false
      },
      {
        id: 6,
        title: "Tình huống giao tiếp",
        description: "Ứng dụng cảm xúc tích cực trong cuộc sống",
        duration: "3 phút",
        type: "interactive",
        content: "Bài tập tình huống",
        completed: false
      }
    ],
    "9": [
      {
        id: 1,
        title: "Nhận diện cảm xúc tiêu cực",
        description: "Hiểu về cảm xúc tiêu cực và cách xử lý",
        duration: "2 phút",
        type: "video",
        content: "Video giới thiệu",
        completed: false
      },
      {
        id: 2,
        title: "Ghen tị & Bối rối",
        description: "Học cách thể hiện ghen tị và bối rối",
        duration: "4 phút",
        type: "video",
        content: "Video hướng dẫn ghen tị và bối rối",
        completed: false
      },
      {
        id: 3,
        title: "Giận dỗi & Nghẹn ngào",
        description: "Học cách thể hiện giận dỗi và nghẹn ngào",
        duration: "4 phút",
        type: "video",
        content: "Video hướng dẫn giận dỗi và nghẹn ngào",
        completed: false
      },
      {
        id: 4,
        title: "Nổi giận & Thất vọng",
        description: "Học cách thể hiện nổi giận và thất vọng",
        duration: "4 phút",
        type: "video",
        content: "Video hướng dẫn nổi giận và thất vọng",
        completed: false
      },
      {
        id: 5,
        title: "Quản lý cảm xúc tiêu cực",
        description: "Thực hành kiểm soát cảm xúc tiêu cực",
        duration: "3 phút",
        type: "practice",
        content: "Bài tập thực hành",
        completed: false
      },
      {
        id: 6,
        title: "Xử lý tình huống khó khăn",
        description: "Ứng dụng trong các tình huống thực tế",
        duration: "3 phút",
        type: "interactive",
        content: "Bài tập giải quyết vấn đề",
        completed: false
      }
    ],
    "10": [
      {
        id: 1,
        title: "Hiểu về cảm xúc phức tạp",
        description: "Các cảm xúc đòi hỏi sự tinh tế trong biểu đạt",
        duration: "2 phút",
        type: "video",
        content: "Video giới thiệu",
        completed: false
      },
      {
        id: 2,
        title: "Tức giận & Xin lỗi",
        description: "Học cách thể hiện tức giận và xin lỗi",
        duration: "4 phút",
        type: "video",
        content: "Video hướng dẫn tức giận và xin lỗi",
        completed: false
      },
      {
        id: 3,
        title: "Bối rối & Hồi hộp nâng cao",
        description: "Các sắc thái khác nhau của bối rối và hồi hộp",
        duration: "4 phút",
        type: "video",
        content: "Video hướng dẫn chi tiết",
        completed: false
      },
      {
        id: 4,
        title: "Tự tin & Ngạc nhiên nâng cao",
        description: "Biểu đạt tự tin và ngạc nhiên trong nhiều tình huống",
        duration: "4 phút",
        type: "video",
        content: "Video hướng dẫn nâng cao",
        completed: false
      },
      {
        id: 5,
        title: "Luyện tập phân biệt",
        description: "Phân biệt các sắc thái cảm xúc",
        duration: "3 phút",
        type: "practice",
        content: "Bài tập phân biệt",
        completed: false
      },
      {
        id: 6,
        title: "Giao tiếp tinh tế",
        description: "Sử dụng cảm xúc phức tạp hiệu quả",
        duration: "3 phút",
        type: "interactive",
        content: "Bài tập giao tiếp",
        completed: false
      }
    ],
    "11": [
      {
        id: 1,
        title: "Tình cảm đặc biệt trong cuộc sống",
        description: "Vai trò của tình cảm sâu sắc trong giao tiếp",
        duration: "2 phút",
        type: "video",
        content: "Video giới thiệu",
        completed: false
      },
      {
        id: 2,
        title: "Xấu hổ & Ghen tuông",
        description: "Học cách thể hiện xấu hổ và ghen tuông",
        duration: "4 phút",
        type: "video",
        content: "Video hướng dẫn xấu hổ và ghen tuông",
        completed: false
      },
      {
        id: 3,
        title: "Thương yêu & Biết ơn",
        description: "Học cách thể hiện tình yêu và lòng biết ơn",
        duration: "4 phút",
        type: "video",
        content: "Video hướng dẫn tình cảm tích cực",
        completed: false
      },
      {
        id: 4,
        title: "Tự hào & Hy vọng",
        description: "Học cách thể hiện tự hào và hy vọng",
        duration: "4 phút",
        type: "video",
        content: "Video hướng dẫn tự hào và hy vọng",
        completed: false
      },
      {
        id: 5,
        title: "Luyện tập tình cảm",
        description: "Thực hành biểu đạt tình cảm đặc biệt",
        duration: "3 phút",
        type: "practice",
        content: "Bài tập thực hành",
        completed: false
      },
      {
        id: 6,
        title: "Giao tiếp chân thành",
        description: "Ứng dụng tình cảm trong mối quan hệ",
        duration: "3 phút",
        type: "interactive",
        content: "Bài tập tương tác",
        completed: false
      }
    ],
    "12": [
      {
        id: 1,
        title: "Tổng hợp lý thuyết",
        description: "Ôn tập tất cả cảm xúc đã học",
        duration: "5 phút",
        type: "video",
        content: "Video tổng hợp",
        completed: false
      },
      {
        id: 2,
        title: "Bài kiểm tra nhận diện",
        description: "Kiểm tra khả năng nhận diện cảm xúc",
        duration: "5 phút",
        type: "quiz",
        content: "Bài kiểm tra nhận diện",
        completed: false
      },
      {
        id: 3,
        title: "Bài kiểm tra biểu đạt",
        description: "Kiểm tra khả năng biểu đạt cảm xúc",
        duration: "5 phút",
        type: "practice",
        content: "Bài kiểm tra thực hành",
        completed: false
      },
      {
        id: 4,
        title: "Tình huống tổng hợp 1",
        description: "Ứng dụng trong cuộc sống hàng ngày",
        duration: "5 phút",
        type: "interactive",
        content: "Tình huống thực tế",
        completed: false
      },
      {
        id: 5,
        title: "Tình huống tổng hợp 2",
        description: "Ứng dụng trong giao tiếp xã hội",
        duration: "5 phút",
        type: "interactive",
        content: "Tình huống nâng cao",
        completed: false
      },
      {
        id: 6,
        title: "Đánh giá tổng kết",
        description: "Đánh giá toàn diện kỹ năng cảm xúc",
        duration: "5 phút",
        type: "quiz",
        content: "Bài đánh giá cuối",
        completed: false
      }
    ],
    "2": [
      {
        id: 1,
        title: "Thành viên cơ bản",
        description: "Học về bố, mẹ, anh, chị, em",
        duration: "3 phút",
        type: "video",
        content: "Video hướng dẫn các thành viên gia đình cơ bản",
        completed: false
      },
      {
        id: 2,
        title: "Gia đình mở rộng",
        description: "Ông, bà, cô, chú, cậu, dì",
        duration: "4 phút",
        type: "video",
        content: "Video hướng dẫn gia đình mở rộng",
        completed: false
      },
      {
        id: 3,
        title: "Luyện tập gia đình",
        description: "Thực hành giới thiệu gia đình",
        duration: "4 phút",
        type: "practice",
        content: "Bài tập thực hành",
        completed: false
      },
      {
        id: 4,
        title: "Ôn tập tổng hợp",
        description: "Kiểm tra kiến thức về gia đình",
        duration: "4 phút",
        type: "quiz",
        content: "Bài kiểm tra tổng hợp",
        completed: false
      }
    ],
    "3": [
      {
        id: 1,
        title: "Số từ 1-10",
        description: "Học các số cơ bản từ 1 đến 10",
        duration: "3 phút",
        type: "video",
        content: "Video hướng dẫn số từ 1-10",
        completed: false
      },
      {
        id: 2,
        title: "Số từ 11-20",
        description: "Học các số từ 11 đến 20",
        duration: "3 phút",
        type: "video",
        content: "Video hướng dẫn số từ 11-20",
        completed: false
      },
      {
        id: 3,
        title: "Luyện tập số đếm",
        description: "Thực hành đếm đồ vật",
        duration: "3 phút",
        type: "practice",
        content: "Bài tập đếm số",
        completed: false
      },
      {
        id: 4,
        title: "Kiểm tra số đếm",
        description: "Kiểm tra khả năng nhận biết số",
        duration: "3 phút",
        type: "quiz",
        content: "Bài kiểm tra số đếm",
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
      { id: "w6", term: "Tuyệt vọng", vi: "Tôi cảm thấy tuyệt vọng", videoUrl: "/resources/videos/tuyệt_vọng.mp4" }
    ],
    "7": [
      { id: "w1", term: "Vui mừng", vi: "Tôi cảm thấy vui mừng", videoUrl: "/resources/videos/vui mừng - nam.mp4" },
      { id: "w2", term: "Buồn thảm", vi: "Tôi cảm thấy buồn thảm", videoUrl: "/resources/videos/buồn thảm.mp4" },
      { id: "w3", term: "Giận dữ", vi: "Tôi cảm thấy giận dữ", videoUrl: "/resources/videos/giận_dữ.mp4" },
      { id: "w4", term: "Hoảng sợ", vi: "Tôi cảm thấy hoảng sợ", videoUrl: "/resources/videos/hoảng_sợ.mp4" },
      { id: "w5", term: "Lo sợ", vi: "Tôi cảm thấy lo sợ", videoUrl: "/resources/videos/lo_sợ.mp4" },
      { id: "w6", term: "Tuyệt vọng", vi: "Tôi cảm thấy tuyệt vọng", videoUrl: "/resources/videos/tuyệt_vọng.mp4" }
    ],
    "8": [
      { id: "w7", term: "Ngạc nhiên", vi: "Tôi cảm thấy ngạc nhiên", videoUrl: "/resources/videos/Ngạc_nhiên.mp4" },
      { id: "w8", term: "Cô đơn", vi: "Tôi cảm thấy cô đơn", videoUrl: "/resources/videos/cô_đơn.mp4" },
      { id: "w9", term: "Hồi hộp", vi: "Tôi cảm thấy hồi hộp", videoUrl: "/resources/videos/hồi_hộp.mp4" },
      { id: "w10", term: "Tự tin", vi: "Tôi cảm thấy tự tin", videoUrl: "/resources/videos/tự_tin.mp4" },
      { id: "w11", term: "Thích thú", vi: "Tôi cảm thấy thích thú", videoUrl: "/resources/videos/thích_thú.mp4" },
      { id: "w12", term: "Hạnh phúc", vi: "Tôi cảm thấy hạnh phúc", videoUrl: "/resources/videos/vui_mừng.mp4" }
    ],
    "9": [
      { id: "w13", term: "Ghen tị", vi: "Tôi cảm thấy ghen tị", videoUrl: "/resources/videos/ghen_tị.mp4" },
      { id: "w14", term: "Bối rối", vi: "Tôi cảm thấy bối rối", videoUrl: "/resources/videos/bối_rối.mp4" },
      { id: "w15", term: "Giận dỗi", vi: "Tôi giận dỗi", videoUrl: "/resources/videos/giận_dỗi.mp4" },
      { id: "w16", term: "Nghẹn ngào", vi: "Tôi cảm thấy nghẹn ngào", videoUrl: "/resources/videos/nghẹn_ngào.mp4" },
      { id: "w17", term: "Nổi giận", vi: "Tôi nổi giận", videoUrl: "/resources/videos/nổi_giận.mp4" },
      { id: "w18", term: "Thất vọng", vi: "Tôi cảm thấy thất vọng", videoUrl: "/resources/videos/tuyệt_vọng.mp4" }
    ],
    "10": [
      { id: "w19", term: "Tức giận", vi: "Tôi cảm thấy tức giận", videoUrl: "/resources/videos/nổi_giận.mp4" },
      { id: "w20", term: "Xin lỗi", vi: "Tôi xin lỗi", videoUrl: "/resources/videos/xin lỗi.mp4" },
      { id: "w21", term: "Bối rối", vi: "Tôi cảm thấy bối rối", videoUrl: "/resources/videos/bối_rối.mp4" },
      { id: "w22", term: "Hồi hộp", vi: "Tôi cảm thấy hồi hộp", videoUrl: "/resources/videos/hồi_hộp.mp4" },
      { id: "w23", term: "Tự tin", vi: "Tôi cảm thấy tự tin", videoUrl: "/resources/videos/tự_tin.mp4" },
      { id: "w24", term: "Ngạc nhiên", vi: "Tôi cảm thấy ngạc nhiên", videoUrl: "/resources/videos/Ngạc_nhiên.mp4" }
    ],
    "11": [
      { id: "w25", term: "Xấu hổ", vi: "Tôi cảm thấy xấu hổ", videoUrl: "/resources/videos/bối_rối.mp4" },
      { id: "w26", term: "Ghen tuông", vi: "Tôi cảm thấy ghen tuông", videoUrl: "/resources/videos/ghen_tị.mp4" },
      { id: "w27", term: "Thương yêu", vi: "Tôi yêu thương", videoUrl: "/resources/videos/thích_thú.mp4" },
      { id: "w28", term: "Biết ơn", vi: "Tôi biết ơn", videoUrl: "/resources/videos/xin lỗi.mp4" },
      { id: "w29", term: "Tự hào", vi: "Tôi tự hào", videoUrl: "/resources/videos/tự_tin.mp4" },
      { id: "w30", term: "Hy vọng", vi: "Tôi hy vọng", videoUrl: "/resources/videos/thích_thú.mp4" }
    ],
    "12": [
      { id: "w31", term: "Tất cả cảm xúc", vi: "Ôn tập toàn bộ", videoUrl: "/resources/videos/vui mừng - nam.mp4" }
    ],
    "2": [
      { id: "f1", term: "Bố", vi: "Người cha", videoUrl: "/resources/videos/bố.mp4" },
      { id: "f2", term: "Mẹ", vi: "Người mẹ", videoUrl: "/resources/videos/mẹ.mp4" },
      { id: "f3", term: "Cha mẹ", vi: "Bố mẹ", videoUrl: "/resources/videos/cha mẹ.mp4" },
      { id: "f4", term: "Anh", vi: "Anh trai", videoUrl: "/resources/videos/bố.mp4" },
      { id: "f5", term: "Chị", vi: "Chị gái", videoUrl: "/resources/videos/mẹ.mp4" },
      { id: "f6", term: "Em", vi: "Em trai/em gái", videoUrl: "/resources/videos/cha mẹ.mp4" }
    ],
    "3": [
      { id: "n1", term: "Một", vi: "Số 1", videoUrl: "/resources/videos/1.mp4" },
      { id: "n2", term: "Hai", vi: "Số 2", videoUrl: "/resources/videos/2.mp4" },
      { id: "n3", term: "Ba", vi: "Số 3", videoUrl: "/resources/videos/3.mp4" },
      { id: "n4", term: "Bốn", vi: "Số 4", videoUrl: "/resources/videos/1.mp4" },
      { id: "n5", term: "Năm", vi: "Số 5", videoUrl: "/resources/videos/2.mp4" },
      { id: "n6", term: "Mười", vi: "Số 10", videoUrl: "/resources/videos/3.mp4" }
    ]
  };
  
  const vocabulary = vocabularyData[lessonId as keyof typeof vocabularyData] || vocabularyData["1"];

  // Create video sequence for emotion lessons
  React.useEffect(() => {
    if (["4", "7", "8", "9", "10", "11", "12"].includes(lessonId)) {
      const emotionVideos = vocabulary.map(item => item.videoUrl);
      setVideoSequence(emotionVideos);
    } else {
      setVideoSequence([]);
    }
  }, [lessonId]); // Only depend on lessonId, not vocabulary

  const transcriptData = {
    "1": "Xin chào! Hôm nay chúng ta sẽ học cách chào hỏi và hỏi thăm sức khỏe.",
    "4": "Chào các bạn! Hôm nay chúng ta sẽ học cách biểu đạt 6 cảm xúc cơ bản: vui mừng, buồn thảm, giận dữ, hoảng sợ, lo sợ và tuyệt vọng. Đây là những cảm xúc nền tảng mà mọi người đều trải qua.",
    "7": "Chào các bạn! Hôm nay chúng ta sẽ học cách biểu đạt 6 cảm xúc cơ bản: vui mừng, buồn thảm, giận dữ, hoảng sợ, lo sợ và tuyệt vọng. Đây là những cảm xúc nền tảng mà mọi người đều trải qua.",
    "8": "Chào mừng các bạn đến với bài học cảm xúc tích cực! Chúng ta sẽ học cách thể hiện ngạc nhiên, cô đơn, hồi hộp, tự tin, thích thú và hạnh phúc. Những cảm xúc này giúp chúng ta giao tiếp tích cực hơn.",
    "9": "Bài học hôm nay về cảm xúc tiêu cực: ghen tị, bối rối, giận dỗi, nghẹn ngào, nổi giận và thất vọng. Việc nhận biết và thể hiện những cảm xúc này một cách đúng đắn rất quan trọng.",
    "10": "Chúng ta sẽ học về những cảm xúc phức tạp: tức giận, xin lỗi, bối rối, hồi hộp, tự tin và ngạc nhiên. Đây là những cảm xúc đòi hỏi sự tinh tế trong cách biểu đạt.",
    "11": "Bài học đặc biệt về tình cảm: xấu hổ, ghen tuông, thương yêu, biết ơn, tự hào và hy vọng. Những tình cảm này thể hiện sự sâu sắc trong giao tiếp.",
    "12": "Đây là bài thực hành tổng hợp! Chúng ta sẽ ôn tập tất cả các cảm xúc đã học với các bài tập tương tác và tình huống thực tế.",
    "2": "Chào các bạn! Hôm nay chúng ta sẽ học về các thành viên trong gia đình. Gia đình là nền tảng quan trọng trong cuộc sống, và việc biết cách gọi tên các thành viên gia đình bằng ngôn ngữ ký hiệu sẽ giúp chúng ta giao tiếp hiệu quả hơn.",
    "3": "Xin chào! Hôm nay chúng ta sẽ học về số đếm từ 1 đến 20. Số đếm rất quan trọng trong cuộc sống hàng ngày, từ việc đếm đồ vật đến nói về tuổi tác, thời gian."
  };
  
  const transcript = transcriptData[lessonId as keyof typeof transcriptData] || transcriptData["1"];

  const handleJumpToWord = (wordId: string) => {
    setSelectedWordId(wordId);
    // Placeholder: simulate seeking to the segment of the selected word
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 1200);
  };

  const handlePlayPause = () => {
    if (["4", "7", "8", "9", "10", "11", "12"].includes(lessonId) && videoSequence.length > 0) {
      setIsSequencePlaying(!isSequencePlaying);
      setIsPlaying(!isSequencePlaying);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Navigation handlers
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home' && onBackToDashboard) {
      onBackToDashboard();
    }
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

  // Render practice content
  const renderPracticeContent = () => (
    <div className="space-y-6 animate-slide-up">
      {/* Practice Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Trung tâm Luyện tập</h1>
        <p className="text-gray-600">Củng cố kỹ năng ngôn ngữ ký hiệu với luyện tập tập trung</p>
      </div>

      {/* Daily Goal */}
      <Card className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white overflow-hidden relative group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] transform-gpu">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="p-6 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-breath">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Mục tiêu hàng ngày</h3>
                <p className="text-sm text-white/80">
                  {Object.keys(practiceScores).length} trên 5 bài tập đã hoàn thành
                </p>
              </div>
            </div>
            <div className="text-4xl animate-float"><Target className="w-8 h-8" /></div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-700" 
              style={{ width: `${(Object.keys(practiceScores).length / 5) * 100}%` }}
            >
              <div className="h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
            </div>
          </div>
        </div>
      </Card>

      {/* Practice Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { 
            id: 'quickReview', 
            title: 'Ôn tập nhanh', 
            description: 'Luyện tập các từ đã học với flashcard', 
            icon: '⚡', 
            color: 'from-blue-500 to-blue-600', 
            exercises: 15,
            component: 'QuickReview'
          },
          { 
            id: 'iconicLearning', 
            title: 'Ký hiệu biểu tượng', 
            description: 'Học các ký hiệu đặc trưng thông qua visual learning', 
            icon: '⭐', 
            color: 'from-blue-500 to-blue-600', 
            exercises: 5,
            component: 'IconicLearning'
          },
          { 
            id: 'speedChallenge', 
            title: 'Thử thách tốc độ', 
            description: 'Thách thức nhận diện ký hiệu nhanh', 
            icon: '🎯', 
            color: 'from-red-500 to-red-600', 
            exercises: 8,
            component: 'SpeedChallenge'
          },
          { 
            id: 'mirrorPractice', 
            title: 'Luyện gương', 
            description: 'Thực hành trước gương với hướng dẫn', 
            icon: '🪞', 
            color: 'from-purple-500 to-purple-600', 
            exercises: 12,
            component: 'MirrorPractice'
          },
          { 
            id: 'quizMix', 
            title: 'Quiz tổng hợp', 
            description: 'Kiểm tra kiến thức với câu hỏi đa dạng', 
            icon: '📝', 
            color: 'from-green-500 to-green-600', 
            exercises: 10,
            component: 'QuizMix'
          },
          { 
            id: 'conversationPractice', 
            title: 'Luyện hội thoại', 
            description: 'Thực hành giao tiếp trong tình huống thực tế', 
            icon: '💬', 
            color: 'from-blue-500 to-blue-600', 
            exercises: 6,
            component: 'ConversationPractice'
          },
          { 
            id: 'dailyChallenge', 
            title: 'Thử thách hàng ngày', 
            description: 'Thử thách đặc biệt với phần thưởng hấp dẫn', 
            icon: '🏆', 
            color: 'from-yellow-500 to-yellow-600', 
            exercises: 5,
            component: 'DailyChallenge'
          },
        ].map((category, index) => (
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
                    {(() => {
                      const map: Record<string, JSX.Element> = {
                        '⚡': <Sparkles className="w-6 h-6 text-white" />, 
                        '⭐': <Star className="w-6 h-6 text-white" />, 
                        '🎯': <Target className="w-6 h-6 text-white" />, 
                        '🪞': <MirrorIcon className="w-6 h-6 text-white" />, 
                        '📝': <BookOpen className="w-6 h-6 text-white" />, 
                        '💬': <Book className="w-6 h-6 text-white" />, 
                        '🏆': <Trophy className="w-6 h-6 text-white" />, 
                      };
                      return map[category.icon] || <Sparkles className="w-6 h-6 text-white" />;
                    })()}
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
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span className="text-green-600 font-semibold">
                      {practiceScores[category.id].score} điểm
                    </span>
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
          {Object.entries(practiceScores).length > 0 ? (
            Object.entries(practiceScores).slice(-3).map(([activityId, result], index) => {
              const activityNames = {
                quickReview: 'Ôn tập nhanh',
                speedChallenge: 'Thử thách tốc độ',
                mirrorPractice: 'Luyện gương',
                quizMix: 'Quiz tổng hợp',
                conversationPractice: 'Luyện hội thoại',
                dailyChallenge: 'Thử thách hàng ngày'
              };
              const activityIcons: Record<string, JSX.Element> = {
                quickReview: <Sparkles className="w-7 h-7" />, 
                speedChallenge: <Target className="w-7 h-7" />, 
                mirrorPractice: <MirrorIcon className="w-7 h-7" />, 
                quizMix: <BookOpen className="w-7 h-7" />, 
                conversationPractice: <Book className="w-7 h-7" />, 
                dailyChallenge: <Trophy className="w-7 h-7" />
              };
              
              return (
                <Card 
                  key={activityId}
                  className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl animate-wiggle">{activityIcons[activityId as keyof typeof activityIcons]}</div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{activityNames[activityId as keyof typeof activityNames]}</h4>
                        <p className="text-sm text-gray-600">Vừa hoàn thành</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className={cn(
                          "text-lg font-bold",
                          result.score >= 4 ? "text-green-600" : "text-blue-600"
                        )}>
                          {result.score} điểm
                        </div>
                        <div className="text-xs text-gray-500">
                          {Math.floor(result.timeSpent / 60)}:{(result.timeSpent % 60).toString().padStart(2, '0')}
                        </div>
                      </div>
                      <Trophy className={cn(
                        "w-5 h-5",
                        result.score >= 4 ? "text-yellow-500" : "text-gray-400"
                      )} />
                    </div>
                  </div>
                </Card>
              );
            })
          ) : (
            [
              { title: 'Ôn tập Chào hỏi', time: '2 giờ trước', score: 95, icon: <HandIcon size={28} /> },
              { title: 'Từ Gia đình', time: 'Hôm qua', score: 88, icon: <Users className="w-7 h-7 text-indigo-600" /> },
              { title: 'Luyện tập Số đếm', time: '2 ngày trước', score: 92, icon: <Hash className="w-7 h-7 text-green-600" /> },
            ].map((activity, index) => (
              <Card 
                key={index}
                className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl animate-wiggle">{activity.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{activity.title}</h4>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className={cn(
                        "text-lg font-bold",
                        activity.score >= 90 ? "text-green-600" : "text-blue-600"
                      )}>
                        {activity.score}%
                      </div>
                    </div>
                    <Trophy className={cn(
                      "w-5 h-5",
                      activity.score >= 90 ? "text-yellow-500" : "text-gray-400"
                    )} />
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );

  // Render dictionary content
  const renderDictionaryContent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Từ điển Ký hiệu</h2>
        <p className="text-gray-600">Tìm kiếm và học từ vựng mới</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Tìm kiếm từ vựng..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <BookOpen className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
      </div>

      {/* Dictionary Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Cảm xúc', 'Gia đình', 'Số đếm', 'Thời gian', 'Màu sắc', 'Động vật', 'Thức ăn', 'Hoạt động'].map((category) => (
          <Card key={category} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-xl mb-2">{category}</h4>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Render profile content
  const renderProfileContent = () => {
    const userStats = {
      name: 'Người học BSL',
      level: 3,
      totalXP: 850,
      streak: 7,
      lessonsCompleted: 15,
      wordsLearned: 120,
      practiceTime: '2h 30m',
      achievements: [
        { id: 1, icon: 'streak', name: '7 ngày liên tiếp', earned: true },
        { id: 2, icon: 'milestone', name: 'Chương đầu tiên', earned: true },
        { id: 3, icon: 'target', name: '100 từ', earned: true },
        { id: 4, icon: 'trophy', name: 'Tuần hoàn hảo', earned: false },
      ]
    };

    return (
      <div className="space-y-6 animate-slide-up">
        {/* Profile Header */}
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-pulse" />
          <div className="p-8 relative z-10">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl animate-breath">
                <Users className="w-12 h-12 text-purple-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">{userStats.name}</h2>
                <div className="flex items-center gap-4 flex-wrap">
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Star className="w-4 h-4 mr-1" />
                    Cấp {userStats.level}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Trophy className="w-4 h-4 mr-1" />
                    {userStats.totalXP} Điểm
                  </Badge>
                  <Badge className="bg-blue-500 text-white animate-glow">
                    <span className="text-lg mr-1">🔥</span>
                    {userStats.streak} ngày liên tiếp
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: BookOpen, label: 'Bài học', value: userStats.lessonsCompleted, color: 'from-blue-400 to-blue-600' },
            { icon: Star, label: 'Từ vựng', value: userStats.wordsLearned, color: 'from-blue-400 to-blue-600' },
            { icon: Clock, label: 'Thời gian', value: userStats.practiceTime, color: 'from-green-400 to-emerald-600' },
            { icon: Trophy, label: 'Chuỗi', value: `${userStats.streak} ngày`, color: 'from-purple-400 to-pink-600' },
          ].map((stat, index) => (
            <Card 
              key={index}
              className={cn(
                "p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer animate-slide-up",
                "transform-gpu will-change-transform"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn(
                "w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center mb-3",
                "shadow-lg animate-float",
                stat.color
              )}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-blue-500" />
            Thành tích
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {userStats.achievements.map((achievement, index) => (
              <Card 
                key={achievement.id}
                className={cn(
                  "p-6 text-center transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in",
                  achievement.earned 
                    ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-xl" 
                    : "bg-gray-50 opacity-60 grayscale"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={cn(
                  "mb-3 flex items-center justify-center",
                  achievement.earned ? "animate-bounce-slow" : ""
                )}>
                  {(() => {
                    switch (achievement.icon) {
                      case 'streak':
                        return <Sparkles className="w-10 h-10 text-amber-500" />;
                      case 'milestone':
                        return <Star className="w-10 h-10 text-yellow-500" />;
                      case 'target':
                        return <Target className="w-10 h-10 text-red-500" />;
                      case 'trophy':
                        return <Trophy className="w-10 h-10 text-yellow-500" />;
                      default:
                        return <Star className="w-10 h-10 text-blue-500" />;
                    }
                  })()}
                </div>
                <div className="text-sm font-semibold text-gray-800">{achievement.name}</div>
                {achievement.earned && (
                  <Badge className="mt-2 bg-green-500 text-white text-xs inline-flex items-center gap-1">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-white" />
                    Đã đạt
                  </Badge>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Weekly Progress Chart */}
        <Card className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Tiến độ tuần</h3>
          <div className="flex items-end justify-around h-40 gap-2">
            {[
              { day: 'T2', height: '60%', completed: true },
              { day: 'T3', height: '80%', completed: true },
              { day: 'T4', height: '40%', completed: true },
              { day: 'T5', height: '100%', completed: true },
              { day: 'T6', height: '70%', completed: true },
              { day: 'T7', height: '90%', completed: true },
              { day: 'CN', height: '30%', completed: false },
            ].map((bar, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div 
                  className={cn(
                    "w-8 rounded-t-lg transition-all duration-500 hover:scale-110 cursor-pointer",
                    bar.completed 
                      ? "bg-gradient-to-t from-blue-500 to-blue-400" 
                      : "bg-gray-300"
                  )}
                  style={{ height: bar.height }}
                />
                <span className="text-xs font-medium text-gray-600">{bar.day}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  // Handle video sequence playback
  React.useEffect(() => {
    if (["4", "7", "8", "9", "10", "11", "12"].includes(lessonId) && isSequencePlaying && videoSequence.length > 0) {
      // Auto-play the current video when sequence starts
      const videoElement = document.querySelector('video');
      if (videoElement) {
        videoElement.play().catch(console.error);
      }
    }
  }, [currentVideoIndex, isSequencePlaying, videoSequence.length, lessonId]);

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24">
      <main className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
          {/* Conditional Content Based on Active Tab */}
          {activeTab === 'home' && (
            <>
              {/* Back Button */}
              <Button 
                variant="ghost" 
                className={cn(
                  "mb-4 sm:mb-6 transition-all duration-300 hover:scale-105 hover:bg-blue-50",
                  "transform-gpu will-change-transform"
                )}
                onClick={onBackToDashboard}
              >
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                Quay lại
              </Button>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6 animate-slide-up">
              {/* Video Player */}
              <Card className={cn(
                "overflow-hidden transition-all duration-500",
                "hover:shadow-2xl hover:scale-[1.01]",
                "transform-gpu will-change-transform"
              )}>
                <div className="relative">
                  {["4", "7", "8", "9", "10", "11", "12"].includes(lessonId) && videoSequence.length > 0 ? (
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
                      <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm animate-fade-in backdrop-blur-sm">
                        {currentVideoIndex + 1} / {videoSequence.length}
                      </div>
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg animate-float backdrop-blur-sm">
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
                          className={cn(
                            "bg-black bg-opacity-70 text-white hover:bg-opacity-90 backdrop-blur-sm",
                            "transition-all duration-300 hover:scale-110 transform-gpu"
                          )}
                        >
                          ← Trước
                        </Button>
                        <Button 
                          size="sm"
                          className={cn(
                            "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
                            "transition-all duration-300 hover:scale-125 hover:rotate-6",
                            "transform-gpu shadow-lg animate-breath"
                          )}
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
                          className={cn(
                            "bg-black bg-opacity-70 text-white hover:bg-opacity-90 backdrop-blur-sm",
                            "transition-all duration-300 hover:scale-110 transform-gpu"
                          )}
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
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-[2px]">
                        <Button 
                          size="lg" 
                          className={cn(
                            "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
                            "w-16 h-16 rounded-full transition-all duration-300",
                            "hover:scale-125 hover:rotate-6 shadow-2xl",
                            "transform-gpu animate-breath"
                          )}
                          onClick={handlePlayPause}
                        >
                          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
                
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">{lesson.title}</h1>
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className={cn(
                          "h-8 w-8 flex-shrink-0 transition-all duration-300 hover:scale-110",
                          "hover:bg-blue-50 hover:border-blue-400 transform-gpu"
                        )}
                        onClick={() => setShowMirror(true)} 
                        title="Luyện tập gương"
                      >
                        <Camera className="w-4 h-4 text-blue-600" />
                      </Button>
                    </div>
                    <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md animate-float flex-shrink-0">
                      {lesson.difficulty}
                    </Badge>
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
                    <div className={cn(
                      "bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200",
                      "text-sm leading-6 mb-4 animate-slide-up shadow-sm"
                    )}>
                      <p className="text-gray-700">{transcript}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2 transition-all duration-300 hover:text-blue-600">
                      <Clock className="w-5 h-5 animate-float flex-shrink-0" />
                      <span className="whitespace-nowrap">{lesson.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 transition-all duration-300 hover:text-blue-600">
                      <Trophy className="w-5 h-5 animate-wiggle text-yellow-500 flex-shrink-0" />
                      <span className="whitespace-nowrap">{lesson.xp} XP</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 flex-shrink-0" />
                      <span className="whitespace-nowrap">{lesson.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 flex-shrink-0" />
                      <span className="whitespace-nowrap">{lesson.studentsCount} học viên</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mirror Practice Modal */}
              {showMirror && (
                <div 
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-2 sm:p-4 animate-fade-in"
                  onClick={() => setShowMirror(false)}
                >
                  <div 
                    className={cn(
                      "bg-white rounded-lg sm:rounded-xl shadow-2xl",
                      "w-full max-w-[95vw] sm:max-w-xl",
                      "max-h-[95vh] sm:max-h-[90vh]",
                      "border border-gray-200",
                      "flex flex-col",
                      "animate-slide-up",
                      "mx-auto"
                    )}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-200 bg-gray-50 flex-shrink-0 rounded-t-lg sm:rounded-t-xl">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Camera className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span className="font-semibold text-sm sm:text-base text-gray-800 truncate">Luyện tập gương</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setShowMirror(false)}
                        className="h-8 w-8 p-0 hover:bg-gray-200 flex-shrink-0"
                        aria-label="Đóng"
                      >
                        <span className="text-lg text-gray-600">×</span>
                      </Button>
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4 flex-1 overflow-y-auto overscroll-contain">
                      <div className={cn(
                        "relative rounded-lg overflow-hidden border-2",
                        mirrorFeedback === "correct" ? "border-green-500" : 
                        mirrorFeedback === "incorrect" ? "border-red-500" : 
                        "border-gray-300"
                      )}>
                        <video 
                          ref={mirrorVideoRef} 
                          className="w-full aspect-video object-cover bg-black" 
                          muted 
                          playsInline 
                        />
                        {mirrorFeedback !== "neutral" && (
                          <div className={cn(
                            "absolute top-2 right-2 px-2.5 py-1 rounded-md text-xs font-semibold shadow-lg",
                            mirrorFeedback === "correct" ? "bg-green-600 text-white" : "bg-red-600 text-white"
                          )}>
                            {mirrorFeedback === "correct" ? "✓ Đúng động tác" : "✗ Sai động tác"}
                          </div>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        Đặt camera của bạn đối diện để thực hành ngôn ngữ ký hiệu. Hệ thống sẽ cung cấp phản hồi theo thời gian thực.
                      </p>
                    </div>

                    {/* Footer (optional) */}
                    <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-t border-gray-200 bg-gray-50 flex-shrink-0 rounded-b-lg sm:rounded-b-xl">
                      <Button 
                        onClick={() => setShowMirror(false)}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                      >
                        Đóng
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Vocabulary list (click to jump) */}
              <Card className={cn(
                "transition-all duration-500 hover:shadow-xl",
                "transform-gpu will-change-transform"
              )}>
                <CardHeader>
                  <CardTitle className="text-gray-800 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-blue-500 animate-float" />
                    Từ vựng trong video ({vocabulary.length} từ)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                        {vocabulary.map((w, index) => (
                          <button
                            key={w.id}
                            onClick={() => handleJumpToWord(w.id)}
                            className={cn(
                              "p-3 text-left rounded-lg border transition-all duration-300 w-full",
                              "hover:scale-105 hover:shadow-md transform-gpu animate-fade-in",
                              selectedWordId === w.id 
                                ? "border-blue-500 bg-blue-50 shadow-md" 
                                : "border-gray-200 hover:bg-blue-50/50 hover:border-blue-300"
                            )}
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <div className="flex items-center gap-2 mb-1 min-w-0">
                              <div className="font-medium text-sm text-gray-800 truncate flex-1">{w.term}</div>
                              {w.videoUrl && <Play className="w-3 h-3 text-blue-500 animate-pulse flex-shrink-0" />}
                            </div>
                            <div className="text-xs text-gray-600 truncate">{w.vi}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                      {vocabulary.length > 6 && (
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                      )}
                  </div>
                      {selectedWordId && (
                        <div 
                          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-2 sm:p-4 animate-fade-in"
                          onClick={() => setSelectedWordId(null)}
                        >
                          <div 
                            className={cn(
                              "bg-white rounded-lg sm:rounded-xl shadow-2xl",
                              "w-full max-w-[95vw] sm:max-w-2xl",
                              "max-h-[95vh] sm:max-h-[90vh]",
                              "border-2 border-blue-200",
                              "flex flex-col",
                              "animate-slide-up",
                              "mx-auto"
                            )}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {/* Header */}
                            <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 flex-shrink-0 gap-2 rounded-t-lg sm:rounded-t-xl">
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                <Play className="w-4 h-4 text-blue-500 animate-pulse flex-shrink-0" />
                                <h3 className="font-semibold text-sm sm:text-base text-gray-800 truncate">
                                  {vocabulary.find(v => v.id === selectedWordId)?.term}
                                </h3>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedWordId(null)}
                                className="h-8 w-8 p-0 hover:bg-blue-200 flex-shrink-0 rounded-full"
                                aria-label="Đóng"
                              >
                                <span className="text-lg text-gray-600">×</span>
                              </Button>
                            </div>

                            {/* Content */}
                            <div className="p-3 sm:p-4 md:p-5 flex-1 overflow-y-auto overscroll-contain">
                              {vocabulary.find(v => v.id === selectedWordId)?.videoUrl && (
                                <div className="rounded-lg overflow-hidden border-2 border-gray-200 mb-3 sm:mb-4 bg-black">
                                  <video 
                                    className="w-full aspect-video object-contain" 
                                    src={vocabulary.find(v => v.id === selectedWordId)?.videoUrl}
                                    controls
                                    playsInline
                                    autoPlay
                                    loop
                                    muted
                                  />
                                </div>
                              )}
                              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 sm:p-4 border border-blue-200">
                                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                  <span className="font-semibold text-blue-600">Nghĩa: </span>
                                  {vocabulary.find(v => v.id === selectedWordId)?.vi}
                                </p>
                              </div>
                            </div>

                            {/* Footer */}
                            <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-t border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 flex-shrink-0 rounded-b-lg sm:rounded-b-xl flex gap-2">
                              <Button 
                                onClick={() => setSelectedWordId(null)}
                                variant="outline"
                                className="flex-1 border-blue-300 hover:bg-blue-100"
                              >
                                Đóng
                              </Button>
                              <Button 
                                onClick={() => {
                                  const currentIndex = vocabulary.findIndex(v => v.id === selectedWordId);
                                  if (currentIndex < vocabulary.length - 1) {
                                    setSelectedWordId(vocabulary[currentIndex + 1].id);
                                  }
                                }}
                                disabled={vocabulary.findIndex(v => v.id === selectedWordId) === vocabulary.length - 1}
                                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                              >
                                Từ tiếp →
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                </CardContent>
              </Card>

              {/* Lesson Steps */}
              <Card className={cn(
                "transition-all duration-500 hover:shadow-xl",
                "transform-gpu will-change-transform"
              )}>
                <CardHeader>
                  <CardTitle className="text-gray-800 flex items-center gap-2">
                    <Target className="w-6 h-6 text-blue-500 animate-float" />
                    Nội dung bài học
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {steps.map((step, index) => (
                      <div 
                        key={step.id}
                        className={cn(
                          "p-3 sm:p-4 rounded-lg border-2 transition-all duration-300",
                          "hover:scale-[1.02] hover:shadow-md transform-gpu animate-fade-in",
                          step.completed 
                            ? 'border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm' 
                            : index === currentStep
                              ? 'border-blue-400 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md'
                              : 'border-gray-200 bg-gray-50'
                        )}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                          <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center font-semibold flex-shrink-0",
                            "transition-all duration-300 shadow-md",
                            step.completed 
                              ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white animate-bounce-slow' 
                              : index === currentStep
                                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white animate-pulse'
                                : 'bg-gray-400 text-white'
                          )}>
                            {step.completed ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <span>{index + 1}</span>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm sm:text-base">{step.title}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{step.description}</p>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                              <span className="text-xs text-muted-foreground whitespace-nowrap">{step.duration}</span>
                              <Badge variant="outline" className="text-xs">{step.type}</Badge>
                            </div>
                          </div>
                          
                          {!step.completed && index === currentStep && (
                            <Button 
                              size="sm" 
                              className={cn(
                                "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
                                "transition-all duration-300 hover:scale-110 shadow-md flex-shrink-0",
                                "transform-gpu animate-pulse w-full sm:w-auto"
                              )}
                              onClick={() => handleStepComplete(step.id)}
                            >
                              Bắt đầu
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
                    <Button 
                      variant="outline" 
                      onClick={handlePrevStep}
                      disabled={currentStep === 0}
                      className={cn(
                        "border-2 border-blue-300 hover:bg-blue-50 hover:border-blue-400",
                        "transition-all duration-300 hover:scale-105 transform-gpu w-full sm:w-auto"
                      )}
                    >
                      ← Bước trước
                    </Button>
                    <Button 
                      className={cn(
                        "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
                        "transition-all duration-300 hover:scale-110 shadow-lg",
                        "transform-gpu w-full sm:w-auto"
                      )}
                      onClick={handleNextStep}
                      disabled={currentStep === steps.length - 1}
                    >
                      Bước tiếp →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
              {/* Progress */}
              <Card className={cn(
                "transition-all duration-500 hover:shadow-xl",
                "transform-gpu will-change-transform"
              )}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Target className="w-5 h-5 text-blue-500 animate-wiggle" />
                    Tiến độ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2 text-gray-700 font-medium">
                        <span>Hoàn thành</span>
                        <span className="text-blue-600">{lesson.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden relative">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-700 relative overflow-hidden"
                          style={{ width: `${lesson.progress}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" 
                               style={{ backgroundSize: '200% 100%' }} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm p-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 transition-all duration-300 hover:shadow-sm">
                        <span className="text-gray-700">Bước hoàn thành</span>
                        <span className="font-semibold text-blue-600">{completedSteps.length}/{steps.length}</span>
                      </div>
                      <div className="flex justify-between text-sm p-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 transition-all duration-300 hover:shadow-sm">
                        <span className="text-gray-700">Thời gian còn lại</span>
                        <span className="font-semibold text-blue-600 flex items-center gap-1">
                          <Clock className="w-3 h-3 animate-float" />
                          4 phút
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Instructor */}
              <Card className={cn(
                "transition-all duration-500 hover:shadow-xl hover:scale-[1.02]",
                "transform-gpu will-change-transform"
              )}>
                <CardHeader>
                  <CardTitle className="text-gray-800 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-500 animate-float" />
                    Giảng viên
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg animate-breath flex-shrink-0">
                      {lesson.instructor.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-800 truncate">{lesson.instructor}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">Chuyên gia ngôn ngữ ký hiệu</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Lessons */}
              <Card className={cn(
                "transition-all duration-500 hover:shadow-xl",
                "transform-gpu will-change-transform"
              )}>
                <CardHeader>
                  <CardTitle className="text-gray-800 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    Bài học liên quan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {relatedLessons.map((relatedLesson) => (
                      <div 
                        key={relatedLesson.id} 
                        className="flex gap-3 p-2 rounded-lg hover:bg-blue-50 transition-all duration-300 cursor-pointer hover:shadow-sm"
                      >
                        <img 
                          src={relatedLesson.thumbnail} 
                          alt={relatedLesson.title}
                          className="w-16 h-12 object-cover rounded flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{relatedLesson.title}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-1">{relatedLesson.description}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{relatedLesson.difficulty}</Badge>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{relatedLesson.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
            </>
          )}

          {/* Practice Tab Content */}
          {activeTab === 'practice' && (
            <div className="animate-slide-up">
              {renderPracticeContent()}
            </div>
          )}

          {/* Dictionary Tab Content */}
          {activeTab === 'dictionary' && (
            <div className="animate-slide-up">
              {renderDictionaryContent()}
            </div>
          )}

          {/* Profile Tab Content */}
          {activeTab === 'profile' && (
            <div className="animate-slide-up">
              {renderProfileContent()}
            </div>
          )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation 
        currentSection={activeTab}
        onNavigate={handleTabChange}
      />

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
      
      {activePractice === 'iconicLearning' && (
        <IconicLearningWrapper
          key={lessonId} // Force re-render when lessonId changes
          lessonId={lessonId}
          onComplete={(score, timeSpent) => handlePracticeComplete('iconicLearning', score, timeSpent)}
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

export default LessonDetail;
