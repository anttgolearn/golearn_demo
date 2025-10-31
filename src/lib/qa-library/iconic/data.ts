import { IconicQuestion, IconicQuestionBank } from './types';
import { twoWayMediaTemplate } from './templates';
import { VIDEO_CONTENT_MAP } from '../../lesson-content-generator';

// Seed data migrated from features/learning/data/iconic-vocabulary.ts
// Keep structure by chapterId to make it easy to extend/demo
export const iconicVocabularyByChapter: IconicQuestionBank = {
  "1_1": [
    {
      id: 1,
      word: "Chào hỏi",
      video: "/resources/videos/Chào.mp4",
      instruction: "Học ký hiệu chào hỏi - ký hiệu giao tiếp cơ bản",
      difficulty: "easy",
      points: 10,
      timeLimit: 15,
      questionType: "picture_choice",
      description: "Ký hiệu chào hỏi thể hiện sự thân thiện và lịch sự",
      options: [
        { id: 1, image: "https://picsum.photos/300/300?random=1", text: "Bắt tay chào hỏi", isCorrect: true, type: "image" },
        { id: 2, image: "https://picsum.photos/300/300?random=2", text: "Vẫy tay tạm biệt", isCorrect: false, type: "image" },
      ],
    },
  ],
  // Unit 2 - Emotions: Chapter 1 (Cảm xúc cơ bản)
  "2_1": buildEmotionsChapter(
    [
      'Vui mừng',
      'Buồn thảm',
      'Giận dữ',
      'Thích thú',
      'Ngạc nhiên',
      'Hoảng sợ',
    ],
    100
  ),
  // Unit 2 - Emotions: Chapter 2 (Cảm xúc nâng cao)
  "2_2": buildEmotionsChapter(
    [
      'Tự tin',
      'Lo sợ',
      'Ghen tị',
      'Tuyệt vọng',
      'Nghẹn ngào',
      'Cô đơn',
      'Giận dỗi',
      'Nổi giận',
    ],
    200
  ),
};

// Registry helpers
export const getIconicQuestionsByChapter = (chapterId: string) => {
  return iconicVocabularyByChapter[chapterId] || [];
};

export const registerIconicQuestions = (chapterId: string, questions: IconicQuestionBank[string]) => {
  iconicVocabularyByChapter[chapterId] = questions;
};

// ========== Builders ==========
function getVideoByLabelFromCategory(category: keyof typeof VIDEO_CONTENT_MAP, label: string): string {
  try {
    const entries = Object.values(VIDEO_CONTENT_MAP[category] || {});
    const found: any = entries.find((e: any) => String(e.label).trim().toLowerCase() === label.trim().toLowerCase());
    return found?.video || '';
  } catch { return ''; }
}

function buildEmotionsChapter(labels: string[], baseId: number): IconicQuestion[] {
  const questions: IconicQuestion[] = [];
  let id = baseId;
  labels.forEach((label, idx) => {
    const video = getVideoByLabelFromCategory('emotions', label);
    const incorrectLabel = labels[(idx + 1) % labels.length];
    const items = twoWayMediaTemplate({
      id,
      label,
      video,
      correctText: label,
      incorrectText: incorrectLabel,
      difficulty: 'medium',
      points: 15,
      timeLimit: 20,
    });
    questions.push(...items);
    id += 2;
  });
  return questions;
}


