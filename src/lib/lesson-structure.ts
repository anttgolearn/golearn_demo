// Lesson structure system following Unit → Chapter → Lessons hierarchy
// Based on existing code patterns and video content organization

export type LessonType = 
  | 'Discover' 
  | 'Develop' 
  | 'Iconic' 
  | 'Dialog' 
  | 'Training' 
  | 'Review' 
  | 'Quiz'
  | 'Vokabel'
  | 'Info'
  | 'Explore';

export type QuestionCategory = 
  | 'CONTENT' 
  | 'SINGLE' 
  | 'MULTIPLE' 
  | 'CLOZE_ANSWER'
  // normalized lowercase variants for UI/flow rules
  | 'single'
  | 'multiple'
  | 'cloze_answer';

export const QuestionCategories = {
  CONTENT: {
    CAT_1A: '1a', // Video content - new sign introduction
    CAT_1C: '1c', // Video content - explanation with context
  },
  SINGLE: {
    CAT_2A: '2a', // Single choice - basic recognition
    CAT_2B: '2b', // Single choice - meaning identification
    CAT_2C: '2c', // Single choice - context usage
    CAT_2D: '2d', // Single choice - visual similarity
    CAT_2F: '2f', // Single choice - emotional context
    CAT_2G: '2g', // Single choice - gesture recognition
    CAT_2J: '2j', // Single choice - family relationships
    CAT_2K: '2k', // Single choice - daily objects
    CAT_2L: '2l', // Single choice - animals
    CAT_2M: '2m', // Single choice - numbers
    CAT_2N: '2n', // Single choice - colors/shapes
  },
  MULTIPLE: {
    CAT_3A: '3a', // Multiple choice - emotion combinations
    CAT_3B: '3b', // Multiple choice - object categories
    CAT_3C: '3c', // Multiple choice - context scenarios
  },
  CLOZE_ANSWER: {
    CAT_4A: '4a', // Fill gap - basic words
    CAT_4B: '4b', // Fill gap - sentences
    CAT_4C: '4c', // Fill gap - conversations
    CAT_4D: '4d', // Fill gap - emotional expressions
    CAT_4F: '4f', // Fill gap - family terms
    CAT_4G: '4g', // Fill gap - daily activities
    CAT_4Z: '4z', // Fill gap - complex scenarios
  },
} as const;

export interface VideoContent {
  title: string;
  videoUrl: string;
  label?: string;
  type: 'video';
}

export interface QuestionPart {
  type: 'video' | 'text' | 'image';
  content?: string;
  url?: string;
}

export interface AnswerOption {
  label: string;
  isCorrect: boolean;
  media?: {
    label: string;
    url: string;
    type: 'video' | 'image';
  };
}

export interface LessonQuestion {
  id: string;
  type: QuestionCategory;
  category: string; // QuestionCategories key
  prompt: string;
  title: string;
  questionParts: QuestionPart[];
  answerOptions: AnswerOption[];
  correctAnswer: string | string[] | boolean;
  explanation?: string;
  points?: number;
}

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  description: string;
  questions: LessonQuestion[];
  estimatedTime: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  prerequisites?: string[]; // lesson IDs
  unlockCondition?: string;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  theme: string;
  estimatedTime: number;
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
  theme: string;
  color: string;
  icon: string;
}

// Lesson type configurations
export const LESSON_TYPE_CONFIG = {
  Discover: {
    icon: '🔍',
    color: '#3B82F6', // blue
    description: 'Khám phá ký hiệu mới',
    questionTypes: ['CONTENT', 'SINGLE'],
    difficulty: 'easy',
    estimatedTime: 5,
  },
  Develop: {
    icon: '🌱',
    color: '#10B981', // emerald
    description: 'Phát triển kỹ năng',
    questionTypes: ['SINGLE', 'MULTIPLE'],
    difficulty: 'medium',
    estimatedTime: 8,
  },
  Iconic: {
    icon: '⭐',
    color: '#F59E0B', // amber
    description: 'Ký hiệu biểu tượng',
    questionTypes: ['CONTENT', 'SINGLE'],
    difficulty: 'easy',
    estimatedTime: 4,
  },
  Dialog: {
    icon: '💬',
    color: '#8B5CF6', // violet
    description: 'Hội thoại thực tế',
    questionTypes: ['CLOZE_ANSWER', 'MULTIPLE'],
    difficulty: 'hard',
    estimatedTime: 12,
  },
  Training: {
    icon: '🏋️',
    color: '#EF4444', // red
    description: 'Luyện tập kỹ năng',
    questionTypes: ['SINGLE', 'MULTIPLE'],
    difficulty: 'medium',
    estimatedTime: 10,
  },
  Review: {
    icon: '📚',
    color: '#06B6D4', // cyan
    description: 'Ôn tập kiến thức',
    questionTypes: ['SINGLE', 'MULTIPLE', 'CLOZE_ANSWER'],
    difficulty: 'medium',
    estimatedTime: 15,
  },
  Quiz: {
    icon: '🎯',
    color: '#EC4899', // pink
    description: 'Kiểm tra kiến thức',
    questionTypes: ['SINGLE', 'MULTIPLE'],
    difficulty: 'hard',
    estimatedTime: 20,
  },
  Vokabel: {
    icon: '📖',
    color: '#84CC16', // lime
    description: 'Học từ vựng',
    questionTypes: ['CONTENT', 'SINGLE'],
    difficulty: 'easy',
    estimatedTime: 6,
  },
  Info: {
    icon: 'ℹ️',
    color: '#6B7280', // gray
    description: 'Thông tin bổ sung',
    questionTypes: ['CONTENT'],
    difficulty: 'easy',
    estimatedTime: 3,
  },
  Explore: {
    icon: '🧭',
    color: '#F97316', // orange
    description: 'Khám phá nâng cao',
    questionTypes: ['CONTENT', 'SINGLE', 'MULTIPLE'],
    difficulty: 'hard',
    estimatedTime: 18,
  },
} as const;

// Unit structure with video-based content - All units follow Unit 1 format: Discover -> Iconic -> Discover (advanced) -> Practice -> Review
export const UNIT_STRUCTURE: Unit[] = [
  {
    id: 'unit-1',
    title: 'Giao tiếp cơ bản',
    description: 'Học các ký hiệu giao tiếp hàng ngày',
    theme: 'communication',
    color: '#3B82F6',
    icon: '👋',
    chapters: [
      {
        id: 'unit-1-chapter-1',
        title: 'Chào hỏi và lịch sự',
        description: 'Học cách chào hỏi và nói lời cảm ơn',
        theme: 'greetings',
        estimatedTime: 29,
        lessons: [
          {
            id: '01_01_1-discover',
            title: 'Khám phá chào hỏi',
            type: 'Discover',
            description: 'Học các ký hiệu chào hỏi cơ bản',
            difficulty: 'easy',
            estimatedTime: 5,
            questions: [],
          },
          {
            id: '01_01_2-practice',
            title: 'Luyện tập chào hỏi',
            type: 'Training',
            description: 'Thực hành các ký hiệu chào hỏi đã học',
            difficulty: 'medium',
            estimatedTime: 8,
            questions: [],
          },
          {
            id: '01_01_3-iconic',
            title: 'Ký hiệu biểu tượng chào hỏi',
            type: 'Iconic',
            description: 'Học ký hiệu đặc trưng về chào hỏi',
            difficulty: 'easy',
            estimatedTime: 4,
            questions: [],
          },
          {
            id: '01_01_4-practice-advanced',
            title: 'Luyện tập nâng cao chào hỏi',
            type: 'Training',
            description: 'Thực hành nâng cao các ký hiệu chào hỏi',
            difficulty: 'medium',
            estimatedTime: 8,
            questions: [],
          },
          {
            id: '01_01_5-review',
            title: 'Ôn tập chào hỏi',
            type: 'Review',
            description: 'Tổng hợp kiến thức về chào hỏi',
            difficulty: 'medium',
            estimatedTime: 6,
            questions: [],
          },
        ],
      },
      {
        id: 'unit-1-chapter-2',
        title: 'Gia đình và mối quan hệ',
        description: 'Học về các thành viên gia đình',
        theme: 'family',
        estimatedTime: 29,
        lessons: [
          {
            id: '01_02_1-discover',
            title: 'Khám phá gia đình',
            type: 'Discover',
            description: 'Học ký hiệu về gia đình',
            difficulty: 'easy',
            estimatedTime: 5,
            questions: [],
          },
          {
            id: '01_02_2-iconic',
            title: 'Ký hiệu biểu tượng gia đình',
            type: 'Iconic',
            description: 'Học ký hiệu đặc trưng về gia đình',
            difficulty: 'easy',
            estimatedTime: 4,
            questions: [],
          },
          {
            id: '01_02_3-discover-advanced',
            title: 'Khám phá gia đình nâng cao',
            type: 'Discover',
            description: 'Học các ký hiệu gia đình nâng cao và mối quan hệ',
            difficulty: 'easy',
            estimatedTime: 6,
            questions: [],
          },
          {
            id: '01_02_4-practice',
            title: 'Luyện tập gia đình',
            type: 'Training',
            description: 'Thực hành các ký hiệu gia đình đã học',
            difficulty: 'medium',
            estimatedTime: 8,
            questions: [],
          },
          {
            id: '01_02_5-review',
            title: 'Ôn tập gia đình',
            type: 'Review',
            description: 'Tổng hợp kiến thức về gia đình',
            difficulty: 'medium',
            estimatedTime: 6,
            questions: [],
          },
        ],
      },
    ],
  },
  {
    id: 'unit-2',
    title: 'Cảm xúc và tâm trạng',
    description: 'Học cách biểu đạt cảm xúc qua ký hiệu',
    theme: 'emotions',
    color: '#EF4444',
    icon: '😊',
    chapters: [
      {
        id: 'unit-2-chapter-1',
        title: 'Cảm xúc cơ bản',
        description: 'Học các cảm xúc đơn giản',
        theme: 'basic-emotions',
        estimatedTime: 29,
        lessons: [
          {
            id: '02_01_1-discover',
            title: 'Khám phá cảm xúc cơ bản',
            type: 'Discover',
            description: 'Học ký hiệu cảm xúc cơ bản',
            difficulty: 'easy',
            estimatedTime: 5,
            questions: [],
          },
          {
            id: '02_01_2-practice',
            title: 'Luyện tập cảm xúc',
            type: 'Training',
            description: 'Thực hành biểu đạt cảm xúc qua ký hiệu',
            difficulty: 'medium',
            estimatedTime: 8,
            questions: [],
          },
          {
            id: '02_01_3-iconic',
            title: 'Ký hiệu biểu tượng cảm xúc',
            type: 'Iconic',
            description: 'Học ký hiệu đặc trưng về cảm xúc cơ bản',
            difficulty: 'easy',
            estimatedTime: 4,
            questions: [],
          },
          {
            id: '02_01_4-practice-advanced',
            title: 'Luyện tập nâng cao cảm xúc',
            type: 'Training',
            description: 'Thực hành nâng cao các ký hiệu cảm xúc',
            difficulty: 'medium',
            estimatedTime: 8,
            questions: [],
          },
          {
            id: '02_01_5-review',
            title: 'Ôn tập cảm xúc',
            type: 'Review',
            description: 'Tổng hợp kiến thức về cảm xúc cơ bản',
            difficulty: 'medium',
            estimatedTime: 6,
            questions: [],
          },
        ],
      },
      {
        id: 'unit-2-chapter-2',
        title: 'Cảm xúc nâng cao',
        description: 'Học các cảm xúc phức tạp',
        theme: 'advanced-emotions',
        estimatedTime: 29,
        lessons: [
          {
            id: '02_02_1-discover',
            title: 'Khám phá cảm xúc nâng cao',
            type: 'Discover',
            description: 'Học các cảm xúc phức tạp: Tự tin, Lo sợ, Ghen tị, Tuyệt vọng',
            difficulty: 'easy',
            estimatedTime: 5,
            questions: [],
          },
          {
            id: '02_02_2-iconic',
            title: 'Ký hiệu biểu tượng cảm xúc nâng cao',
            type: 'Iconic',
            description: 'Học ký hiệu đặc trưng về cảm xúc nâng cao',
            difficulty: 'easy',
            estimatedTime: 4,
            questions: [],
          },
          {
            id: '02_02_3-discover-advanced',
            title: 'Khám phá cảm xúc đặc biệt',
            type: 'Discover',
            description: 'Học các cảm xúc đặc biệt và tinh tế',
            difficulty: 'easy',
            estimatedTime: 6,
            questions: [],
          },
          {
            id: '02_02_4-practice',
            title: 'Luyện tập cảm xúc nâng cao',
            type: 'Training',
            description: 'Thực hành các ký hiệu cảm xúc nâng cao đã học',
            difficulty: 'medium',
            estimatedTime: 8,
            questions: [],
          },
          {
            id: '02_02_5-review',
            title: 'Ôn tập cảm xúc nâng cao',
            type: 'Review',
            description: 'Tổng hợp kiến thức về cảm xúc nâng cao',
            difficulty: 'medium',
            estimatedTime: 6,
            questions: [],
          },
        ],
      },
    ],
  },
  {
    id: 'unit-3',
    title: 'Thiên nhiên và động vật',
    description: 'Học về thế giới tự nhiên và động vật',
    theme: 'nature',
    color: '#10B981',
    icon: '🌿',
    chapters: [
      {
        id: 'unit-3-chapter-1',
        title: 'Động vật thường gặp',
        description: 'Học các ký hiệu về động vật quen thuộc',
        theme: 'animals',
        estimatedTime: 29,
        lessons: [
          {
            id: '03_01_1-discover',
            title: 'Khám phá động vật',
            type: 'Discover',
            description: 'Học ký hiệu động vật cơ bản',
            difficulty: 'easy',
            estimatedTime: 5,
            questions: [],
          },
          {
            id: '03_01_2-practice',
            title: 'Luyện tập động vật',
            type: 'Training',
            description: 'Thực hành nhận biết và sử dụng ký hiệu động vật',
            difficulty: 'medium',
            estimatedTime: 8,
            questions: [],
          },
          {
            id: '03_01_3-iconic',
            title: 'Ký hiệu biểu tượng động vật',
            type: 'Iconic',
            description: 'Học ký hiệu đặc trưng về động vật',
            difficulty: 'easy',
            estimatedTime: 4,
            questions: [],
          },
          {
            id: '03_01_4-practice-advanced',
            title: 'Luyện tập nâng cao động vật',
            type: 'Training',
            description: 'Thực hành nâng cao các ký hiệu động vật',
            difficulty: 'medium',
            estimatedTime: 8,
            questions: [],
          },
          {
            id: '03_01_5-review',
            title: 'Ôn tập động vật',
            type: 'Review',
            description: 'Tổng hợp kiến thức về động vật',
            difficulty: 'medium',
            estimatedTime: 6,
            questions: [],
          },
        ],
      },
      {
        id: 'unit-3-chapter-2',
        title: 'Thời tiết và thời gian',
        description: 'Học ký hiệu thời tiết và thời gian',
        theme: 'weather',
        estimatedTime: 29,
        lessons: [
          {
            id: '03_02_1-discover',
            title: 'Khám phá thời tiết',
            type: 'Discover',
            description: 'Học ký hiệu thời tiết cơ bản',
            difficulty: 'easy',
            estimatedTime: 5,
            questions: [],
          },
          {
            id: '03_02_2-iconic',
            title: 'Ký hiệu biểu tượng thời tiết',
            type: 'Iconic',
            description: 'Học ký hiệu đặc trưng về thời tiết',
            difficulty: 'easy',
            estimatedTime: 4,
            questions: [],
          },
          {
            id: '03_02_3-discover-advanced',
            title: 'Khám phá thời gian',
            type: 'Discover',
            description: 'Học từ vựng về thời gian: Sáng, Buổi sáng, Buổi chiều',
            difficulty: 'easy',
            estimatedTime: 6,
            questions: [],
          },
          {
            id: '03_02_4-practice',
            title: 'Luyện tập thời tiết',
            type: 'Training',
            description: 'Thực hành ký hiệu thời tiết và thời gian',
            difficulty: 'medium',
            estimatedTime: 8,
            questions: [],
          },
          {
            id: '03_02_5-review',
            title: 'Ôn tập thời tiết',
            type: 'Review',
            description: 'Tổng hợp kiến thức về thời tiết và thời gian',
            difficulty: 'medium',
            estimatedTime: 6,
            questions: [],
          },
        ],
      },
    ],
  },
  {
    id: 'unit-4',
    title: 'Số đếm và hình học',
    description: 'Học về số và hình dạng cơ bản',
    theme: 'numbers',
    color: '#F59E0B',
    icon: '🔢',
    chapters: [
      {
        id: 'unit-4-chapter-1',
        title: 'Số đếm cơ bản',
        description: 'Học các ký hiệu số từ 1-10',
        theme: 'counting',
        estimatedTime: 29,
        lessons: [
          {
            id: '04_01_1-discover',
            title: 'Khám phá số đếm',
            type: 'Discover',
            description: 'Học ký hiệu số đếm cơ bản',
            difficulty: 'easy',
            estimatedTime: 5,
            questions: [],
          },
          {
            id: '04_01_2-practice',
            title: 'Luyện tập số đếm',
            type: 'Training',
            description: 'Thực hành nhận biết và sử dụng ký hiệu số đếm',
            difficulty: 'medium',
            estimatedTime: 8,
            questions: [],
          },
          {
            id: '04_01_3-iconic',
            title: 'Ký hiệu biểu tượng số',
            type: 'Iconic',
            description: 'Học ký hiệu đặc trưng về số đếm',
            difficulty: 'easy',
            estimatedTime: 4,
            questions: [],
          },
          {
            id: '04_01_4-practice-advanced',
            title: 'Luyện tập nâng cao số đếm',
            type: 'Training',
            description: 'Thực hành nâng cao các ký hiệu số đếm',
            difficulty: 'medium',
            estimatedTime: 8,
            questions: [],
          },
          {
            id: '04_01_5-review',
            title: 'Ôn tập số đếm',
            type: 'Review',
            description: 'Tổng hợp kiến thức về số đếm',
            difficulty: 'medium',
            estimatedTime: 6,
            questions: [],
          },
        ],
      },
      {
        id: 'unit-4-chapter-2',
        title: 'Hình dạng và màu sắc',
        description: 'Học ký hiệu hình dạng và màu sắc',
        theme: 'shapes',
        estimatedTime: 29,
        lessons: [
          {
            id: '04_02_1-discover',
            title: 'Khám phá hình học',
            type: 'Discover',
            description: 'Học ký hiệu hình dạng cơ bản',
            difficulty: 'easy',
            estimatedTime: 5,
            questions: [],
          },
          {
            id: '04_02_2-iconic',
            title: 'Ký hiệu biểu tượng hình học',
            type: 'Iconic',
            description: 'Học ký hiệu đặc trưng về hình dạng',
            difficulty: 'easy',
            estimatedTime: 4,
            questions: [],
          },
          {
            id: '04_02_3-discover-advanced',
            title: 'Khám phá màu sắc',
            type: 'Discover',
            description: 'Học từ vựng về màu sắc: Màu đỏ và các màu khác',
            difficulty: 'easy',
            estimatedTime: 6,
            questions: [],
          },
          {
            id: '04_02_4-practice',
            title: 'Luyện tập hình học',
            type: 'Training',
            description: 'Thực hành ký hiệu hình dạng và màu sắc',
            difficulty: 'medium',
            estimatedTime: 8,
            questions: [],
          },
          {
            id: '04_02_5-review',
            title: 'Ôn tập hình học',
            type: 'Review',
            description: 'Tổng hợp kiến thức về hình dạng và màu sắc',
            difficulty: 'medium',
            estimatedTime: 6,
            questions: [],
          },
        ],
      },
    ],
  },
  {
    id: 'unit-5',
    title: 'Thức ăn và đồ vật',
    description: 'Học về đồ ăn và vật dụng hàng ngày',
    theme: 'food',
    color: '#8B5CF6',
    icon: '🍎',
    chapters: [
      {
        id: 'unit-5-chapter-1',
        title: 'Thức ăn và bữa ăn',
        description: 'Học các ký hiệu về thức ăn',
        theme: 'food-items',
        estimatedTime: 29,
        lessons: [
          {
            id: '05_01_1-discover',
            title: 'Khám phá thức ăn',
            type: 'Discover',
            description: 'Học ký hiệu thức ăn cơ bản',
            difficulty: 'easy',
            estimatedTime: 5,
            questions: [],
          },
          {
            id: '05_01_2-practice',
            title: 'Luyện tập thức ăn',
            type: 'Training',
            description: 'Thực hành ký hiệu thức ăn và bữa ăn',
            difficulty: 'medium',
            estimatedTime: 8,
            questions: [],
          },
          {
            id: '05_01_3-iconic',
            title: 'Ký hiệu biểu tượng thức ăn',
            type: 'Iconic',
            description: 'Học ký hiệu đặc trưng về thức ăn',
            difficulty: 'easy',
            estimatedTime: 4,
            questions: [],
          },
          {
            id: '05_01_4-practice-advanced',
            title: 'Luyện tập nâng cao thức ăn',
            type: 'Training',
            description: 'Thực hành nâng cao các ký hiệu thức ăn',
            difficulty: 'medium',
            estimatedTime: 8,
            questions: [],
          },
          {
            id: '05_01_5-review',
            title: 'Ôn tập thức ăn',
            type: 'Review',
            description: 'Tổng hợp kiến thức về thức ăn',
            difficulty: 'medium',
            estimatedTime: 6,
            questions: [],
          },
        ],
      },
      {
        id: 'unit-5-chapter-2',
        title: 'Đồ vật trong nhà',
        description: 'Học ký hiệu đồ vật trong nhà',
        theme: 'household',
        estimatedTime: 29,
        lessons: [
          {
            id: '05_02_1-discover',
            title: 'Khám phá đồ vật',
            type: 'Discover',
            description: 'Học ký hiệu đồ vật cơ bản',
            difficulty: 'easy',
            estimatedTime: 5,
            questions: [],
          },
          {
            id: '05_02_2-iconic',
            title: 'Ký hiệu biểu tượng đồ vật',
            type: 'Iconic',
            description: 'Học ký hiệu đặc trưng về đồ vật',
            difficulty: 'easy',
            estimatedTime: 4,
            questions: [],
          },
          {
            id: '05_02_3-discover-advanced',
            title: 'Khám phá đồ vật cá nhân',
            type: 'Discover',
            description: 'Học từ vựng về đồ vật: Cây bút, Quyển sách, Quần bò, Cái áo',
            difficulty: 'easy',
            estimatedTime: 6,
            questions: [],
          },
          {
            id: '05_02_4-practice',
            title: 'Luyện tập đồ vật',
            type: 'Training',
            description: 'Thực hành ký hiệu đồ vật trong nhà',
            difficulty: 'medium',
            estimatedTime: 8,
            questions: [],
          },
          {
            id: '05_02_5-review',
            title: 'Ôn tập đồ vật',
            type: 'Review',
            description: 'Tổng hợp kiến thức về đồ vật',
            difficulty: 'medium',
            estimatedTime: 6,
            questions: [],
          },
        ],
      },
    ],
  },
  {
    id: 'unit-6',
    title: 'Giao thông và hoạt động',
    description: 'Học về phương tiện và hoạt động',
    theme: 'transportation',
    color: '#EC4899',
    icon: '🚗',
    chapters: [
      {
        id: 'unit-6-chapter-1',
        title: 'Phương tiện giao thông',
        description: 'Học các ký hiệu về phương tiện',
        theme: 'vehicles',
        estimatedTime: 29,
        lessons: [
          {
            id: '06_01_1-discover',
            title: 'Khám phá giao thông',
            type: 'Discover',
            description: 'Học ký hiệu giao thông cơ bản',
            difficulty: 'easy',
            estimatedTime: 5,
            questions: [],
          },
          {
            id: '06_01_2-practice',
            title: 'Luyện tập giao thông',
            type: 'Training',
            description: 'Thực hành ký hiệu phương tiện giao thông',
            difficulty: 'medium',
            estimatedTime: 8,
            questions: [],
          },
          {
            id: '06_01_3-iconic',
            title: 'Ký hiệu biểu tượng giao thông',
            type: 'Iconic',
            description: 'Học ký hiệu đặc trưng về giao thông',
            difficulty: 'easy',
            estimatedTime: 4,
            questions: [],
          },
          {
            id: '06_01_4-practice-advanced',
            title: 'Luyện tập nâng cao giao thông',
            type: 'Training',
            description: 'Thực hành nâng cao các ký hiệu giao thông',
            difficulty: 'medium',
            estimatedTime: 8,
            questions: [],
          },
          {
            id: '06_01_5-review',
            title: 'Ôn tập giao thông',
            type: 'Review',
            description: 'Tổng hợp kiến thức về giao thông',
            difficulty: 'medium',
            estimatedTime: 6,
            questions: [],
          },
        ],
      },
      {
        id: 'unit-6-chapter-2',
        title: 'Hoạt động và sở thích',
        description: 'Học ký hiệu hoạt động và sở thích',
        theme: 'activities',
        estimatedTime: 29,
        lessons: [
          {
            id: '06_02_1-discover',
            title: 'Khám phá hoạt động',
            type: 'Discover',
            description: 'Học ký hiệu hoạt động cơ bản',
            difficulty: 'easy',
            estimatedTime: 5,
            questions: [],
          },
          {
            id: '06_02_2-iconic',
            title: 'Ký hiệu biểu tượng hoạt động',
            type: 'Iconic',
            description: 'Học ký hiệu đặc trưng về hoạt động',
            difficulty: 'easy',
            estimatedTime: 4,
            questions: [],
          },
          {
            id: '06_02_3-discover-advanced',
            title: 'Khám phá sở thích',
            type: 'Discover',
            description: 'Mở rộng vốn từ về hoạt động và sở thích',
            difficulty: 'easy',
            estimatedTime: 6,
            questions: [],
          },
          {
            id: '06_02_4-practice',
            title: 'Luyện tập hoạt động',
            type: 'Training',
            description: 'Thực hành ký hiệu hoạt động và sở thích',
            difficulty: 'medium',
            estimatedTime: 8,
            questions: [],
          },
          {
            id: '06_02_5-review',
            title: 'Ôn tập hoạt động',
            type: 'Review',
            description: 'Tổng hợp kiến thức về hoạt động',
            difficulty: 'medium',
            estimatedTime: 6,
            questions: [],
          },
        ],
      },
    ],
  },
  {
    id: 'unit-7',
    title: 'Trường học và công việc',
    description: 'Học về trường học và công việc',
    theme: 'education',
    color: '#06B6D4',
    icon: '🎓',
    chapters: [
      {
        id: 'unit-7-chapter-1',
        title: 'Cuộc sống học đường',
        description: 'Học ký hiệu trường học và học tập',
        theme: 'school',
        estimatedTime: 29,
        lessons: [
          {
            id: '07_01_1-discover',
            title: 'Khám phá trường học',
            type: 'Discover',
            description: 'Học ký hiệu trường học cơ bản',
            difficulty: 'easy',
            estimatedTime: 5,
            questions: [],
          },
          {
            id: '07_01_2-practice',
            title: 'Luyện tập trường học',
            type: 'Training',
            description: 'Thực hành ký hiệu trường học',
            difficulty: 'medium',
            estimatedTime: 8,
            questions: [],
          },
          {
            id: '07_01_3-iconic',
            title: 'Ký hiệu biểu tượng trường học',
            type: 'Iconic',
            description: 'Học ký hiệu đặc trưng về trường học',
            difficulty: 'easy',
            estimatedTime: 4,
            questions: [],
          },
          {
            id: '07_01_4-practice-advanced',
            title: 'Luyện tập nâng cao trường học',
            type: 'Training',
            description: 'Thực hành nâng cao các ký hiệu trường học',
            difficulty: 'medium',
            estimatedTime: 8,
            questions: [],
          },
          {
            id: '07_01_5-review',
            title: 'Ôn tập trường học',
            type: 'Review',
            description: 'Tổng hợp kiến thức về trường học',
            difficulty: 'medium',
            estimatedTime: 6,
            questions: [],
          },
        ],
      },
      {
        id: 'unit-7-chapter-2',
        title: 'Công việc và tiền bạc',
        description: 'Học ký hiệu công việc và tiền bạc',
        theme: 'work',
        estimatedTime: 29,
        lessons: [
          {
            id: '07_02_1-discover',
            title: 'Khám phá công việc',
            type: 'Discover',
            description: 'Học ký hiệu công việc cơ bản',
            difficulty: 'easy',
            estimatedTime: 5,
            questions: [],
          },
          {
            id: '07_02_2-iconic',
            title: 'Ký hiệu biểu tượng công việc',
            type: 'Iconic',
            description: 'Học ký hiệu đặc trưng về công việc',
            difficulty: 'easy',
            estimatedTime: 4,
            questions: [],
          },
          {
            id: '07_02_3-discover-advanced',
            title: 'Khám phá tiền bạc',
            type: 'Discover',
            description: 'Mở rộng vốn từ về công việc và tiền bạc',
            difficulty: 'easy',
            estimatedTime: 6,
            questions: [],
          },
          {
            id: '07_02_4-practice',
            title: 'Luyện tập công việc',
            type: 'Training',
            description: 'Thực hành ký hiệu công việc và tiền bạc',
            difficulty: 'medium',
            estimatedTime: 8,
            questions: [],
          },
          {
            id: '07_02_5-review',
            title: 'Ôn tập công việc',
            type: 'Review',
            description: 'Tổng hợp kiến thức về công việc',
            difficulty: 'medium',
            estimatedTime: 6,
            questions: [],
          },
        ],
      },
    ],
  },
];

// Utility functions for lesson management
export const getLessonById = (lessonId: string): Lesson | undefined => {
  for (const unit of UNIT_STRUCTURE) {
    for (const chapter of unit.chapters) {
      const lesson = chapter.lessons.find(l => l.id === lessonId);
      if (lesson) return lesson;
    }
  }
  return undefined;
};

export const getChapterByLessonId = (lessonId: string): Chapter | undefined => {
  for (const unit of UNIT_STRUCTURE) {
    for (const chapter of unit.chapters) {
      const lesson = chapter.lessons.find(l => l.id === lessonId);
      if (lesson) return chapter;
    }
  }
  return undefined;
};

export const getUnitByLessonId = (lessonId: string): Unit | undefined => {
  for (const unit of UNIT_STRUCTURE) {
    for (const chapter of unit.chapters) {
      const lesson = chapter.lessons.find(l => l.id === lessonId);
      if (lesson) return unit;
    }
  }
  return undefined;
};

export const getLessonTypeConfig = (lessonType: LessonType) => {
  return LESSON_TYPE_CONFIG[lessonType];
};

export const getQuestionsByCategory = (_category: string): LessonQuestion[] => {
  // This would be populated with actual video-based questions
  // based on the category and available videos
  return [];
};

// Video content integration functions
export const createVideoQuestion = (
  id: string,
  category: string,
  prompt: string,
  videoSrc: string,
  correctLabel: string,
  distractorLabels: string[],
  distractorVideos: string[]
): LessonQuestion => {
  const answerOptions: AnswerOption[] = [
    {
      label: correctLabel,
      isCorrect: true,
      media: {
        label: correctLabel,
        url: videoSrc,
        type: 'video',
      },
    },
    ...distractorLabels.map((label, index) => ({
      label,
      isCorrect: false,
      media: {
        label,
        url: distractorVideos[index] || videoSrc,
        type: 'video' as const,
      },
    })),
  ];

  return {
    id,
    type: 'SINGLE',
    category,
    prompt,
    title: correctLabel,
    questionParts: [
      {
        type: 'video',
        content: correctLabel,
        url: videoSrc,
      },
    ],
    answerOptions,
    correctAnswer: correctLabel,
  };
};

export const createContentQuestion = (
  id: string,
  category: string,
  prompt: string,
  videoSrc: string,
  title: string
): LessonQuestion => {
  return {
    id,
    type: 'CONTENT',
    category,
    prompt,
    title,
    questionParts: [
      {
        type: 'video',
        content: title,
        url: videoSrc,
      },
    ],
    answerOptions: [],
    correctAnswer: '',
  };
};
