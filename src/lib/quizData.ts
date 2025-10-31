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
  { id: 'emotions', name: 'Cảm xúc', description: 'Biểu đạt các cảm xúc bằng NNKH', icon: '😊', color: '#f59e0b' },
]

// Build demo questions from the QA library to ensure video/label consistency
import { MULTIPLE_CHOICE_QA, VIDEO_COMPARISON_QA } from "./qa-library";

const q1src = MULTIPLE_CHOICE_QA.greetings[0];
const q2src = MULTIPLE_CHOICE_QA.greetings[1];
const q3: QuizQuestion = {
  id: 'q3',
  question: 'Ký hiệu cho số 1 là lựa chọn nào?',
  type: 'multiple-choice',
  options: ['1', '2', '3'],
  correctAnswer: '1',
  explanation: 'Giơ một ngón tay trỏ để biểu thị số 1.',
  category: 'numbers',
  difficulty: 'easy',
  signVideo: '/resources/videos/số 1.mp4',
  points: 10,
};

const vc1 = VIDEO_COMPARISON_QA.greetings[0];
const vc2 = VIDEO_COMPARISON_QA.emotions[0];

export const quizQuestions: QuizQuestion[] = [
  q1src && {
    id: 'q1',
    question: q1src.prompt,
    type: 'multiple-choice',
    options: q1src.options,
    correctAnswer: q1src.correctLabel,
    explanation: 'Động tác vẫy tay thể hiện lời chào cơ bản.',
    category: 'greetings',
    difficulty: 'easy',
    signVideo: q1src.video,
    points: 10,
  },
  q2src && {
    id: 'q2',
    question: q2src.prompt,
    type: 'multiple-choice',
    options: q2src.options,
    correctAnswer: q2src.correctLabel,
    explanation: 'Chạm tay vào cằm rồi đưa ra phía trước thể hiện lời cảm ơn.',
    category: 'greetings',
    difficulty: 'easy',
    signVideo: q2src.video,
    points: 10,
  },
  q3,
  vc1 && {
    id: 'q5',
    question: vc1.prompt,
    type: 'video-comparison',
    options: vc1.options.map(o => o.label),
    correctAnswer: vc1.correct,
    explanation: 'Video đúng thể hiện động tác ký hiệu chính xác.',
    category: 'greetings',
    difficulty: 'medium',
    signVideo: vc1.options[0].video,
    signVideo2: vc1.options[1].video,
    points: 10,
  },
  // Emotions
  ((): QuizQuestion | null => {
    const em = MULTIPLE_CHOICE_QA.emotions;
    const q6src = em.find(e => e.correctLabel === 'Vui mừng');
    if (!q6src) return null;
    return {
    id: 'q6',
    question: 'Ký hiệu nào thể hiện sự vui mừng?',
    type: 'multiple-choice',
    options: q6src.options,
    correctAnswer: 'Vui mừng',
    explanation: 'Ký hiệu vui mừng thường có nụ cười và động tác tích cực.',
    category: 'emotions',
    difficulty: 'easy',
    signVideo: q6src.video,
    points: 10,
  }; })(),
  ((): QuizQuestion | null => {
    const em = MULTIPLE_CHOICE_QA.emotions;
    const q7src = em.find(e => e.correctLabel === 'Buồn thảm');
    if (!q7src) return null;
    return {
    id: 'q7',
    question: 'Ký hiệu nào biểu đạt cảm xúc buồn?',
    type: 'multiple-choice',
    options: q7src.options.map(o => (o === 'Buồn thảm' ? 'Buồn' : o)),
    correctAnswer: 'Buồn',
    explanation: 'Ký hiệu buồn có biểu cảm và động tác thể hiện sự thất vọng.',
    category: 'emotions',
    difficulty: 'easy',
    signVideo: q7src.video,
    points: 10,
  }; })(),
  ((): QuizQuestion | null => {
    const em = MULTIPLE_CHOICE_QA.emotions;
    const q8src = em.find(e => e.correctLabel === 'Giận dữ');
    if (!q8src) return null;
    return {
    id: 'q8',
    question: 'Ký hiệu nào thể hiện sự tức giận?',
    type: 'multiple-choice',
    options: ['Tự tin', 'Tức giận', 'Bình tĩnh'],
    correctAnswer: 'Tức giận',
    explanation: 'Ký hiệu tức giận có động tác mạnh mẽ và biểu cảm căng thẳng.',
    category: 'emotions',
    difficulty: 'medium',
    signVideo: q8src.video,
    points: 15,
  }; })(),
  vc2 && {
    id: 'q10',
    question: 'Chọn video khớp với ký hiệu tự tin',
    type: 'video-comparison',
    options: vc2.options.map(o => o.label),
    correctAnswer: vc2.correct,
    explanation: 'Video A hiển thị ký hiệu tự tin với tư thế thẳng và động tác mạnh mẽ.',
    category: 'emotions',
    difficulty: 'hard',
    signVideo: vc2.options[0].video,
    signVideo2: vc2.options[1].video,
    points: 20,
  },
].filter(Boolean) as QuizQuestion[];

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
