export interface QuizQuestion {
  id: string
  question: string
  type: 'multiple-choice' | 'true-false' | 'image-choice' | 'sign-recognition' | 'fill-blank' | 'translation' | 'video-comparison'
  options?: string[]
  // In demo mode we also allow multiple correct answers
  correctAnswer: string | boolean | string[]
  explanation: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  imageUrl?: string
  signVideo?: string
  signVideo2?: string
  points?: number
}

export interface QuizCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

// Demo categories and questions (no backend required)
export const quizCategories: QuizCategory[] = [
  { id: 'greetings', name: 'Chào hỏi', description: 'Các ký hiệu chào hỏi cơ bản', icon: '👋', color: '#3b82f6' },
  { id: 'family', name: 'Gia đình', description: 'Từ vựng về gia đình', icon: '👨‍👩‍👧‍👦', color: '#ef4444' },
  { id: 'numbers', name: 'Số đếm', description: 'Số đếm cơ bản', icon: '🔢', color: '#10b981' },
]

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Ký hiệu nào thể hiện lời chào cơ bản?',
    type: 'multiple-choice',
    options: ['Xin chào', 'Cảm ơn', 'Xin lỗi'],
    correctAnswer: 'Xin chào',
    explanation: 'Động tác vẫy tay thể hiện lời chào cơ bản.',
    category: 'greetings',
    difficulty: 'easy',
    signVideo: '/resources/videos/Chào.mp4',
    points: 10,
  },
  {
    id: 'q2',
    question: 'Ký hiệu nào mang nghĩa Cảm ơn?',
    type: 'multiple-choice',
    options: ['Xin chào', 'Cảm ơn', 'Xin lỗi'],
    correctAnswer: 'Cảm ơn',
    explanation: 'Chạm tay vào cằm rồi đưa ra phía trước thể hiện lời cảm ơn.',
    category: 'greetings',
    difficulty: 'easy',
    signVideo: '/resources/videos/Chào.mp4',
    points: 10,
  },
  {
    id: 'q3',
    question: 'Ký hiệu cho số 1 là lựa chọn nào?',
    type: 'multiple-choice',
    options: ['1', '2', '3'],
    correctAnswer: '1',
    explanation: 'Giơ một ngón tay trỏ để biểu thị số 1.',
    category: 'numbers',
    difficulty: 'easy',
    signVideo: '/resources/videos/1.mp4',
    points: 10,
  },
  {
    id: 'q4',
    question: 'Ký hiệu nào chỉ con chó?',
    type: 'multiple-choice',
    options: ['Chó', 'Mèo', 'Gà'],
    correctAnswer: 'Chó',
    explanation: 'Động tác mô tả đặc trưng của chó.',
    category: 'family',
    difficulty: 'medium',
    signVideo: '/resources/videos/con chó - nam.mp4',
    points: 10,
  },
  {
    id: 'q5',
    question: 'Chọn video khớp với ký hiệu chào hỏi',
    type: 'video-comparison',
    options: ['A', 'B'],
    correctAnswer: 'A',
    explanation: 'Video A hiển thị động tác vẫy tay chào hỏi.',
    category: 'greetings',
    difficulty: 'medium',
    signVideo: '/resources/videos/Chào.mp4',
    signVideo2: '/resources/videos/1.mp4',
    points: 10,
  },
]

// Demo fetchers returning local data
export async function fetchQuizCategories(): Promise<QuizCategory[]> {
  return quizCategories
}

export async function fetchQuizQuestions(category?: string, count: number = 5): Promise<QuizQuestion[]> {
  const filtered = category ? quizQuestions.filter(q => q.category === category) : quizQuestions
  const selected = [...filtered].sort(() => Math.random() - 0.5).slice(0, Math.min(count, filtered.length))
  return selected
}

// Legacy function for backward compatibility - now uses demo data
export async function getRandomQuestions(category?: string, count: number = 5): Promise<QuizQuestion[]> {
  return await fetchQuizQuestions(category, count)
}
