// Hardcoded mock data matching the desired server JSON format

export type MockAnswerMedia = {
  type: 'video' | 'image' | 'audio';
  url: string;
  label?: string;
};

export type MockQuestionPart = {
  type: 'video' | 'image' | 'html' | 'table';
  url?: string;
  content?: string;
  caption?: string;
  tableData?: unknown;
  dialogPerson?: 'a' | 'b'; // For dialog questions
};

export type MockAnswerOption = {
  isCorrect?: boolean;
  media?: MockAnswerMedia;
  answerText?: string;
  label?: string;
};

export type MockQuestion = {
  id: number;
  status: 'published' | 'draft';
  unitNumber: number;
  category: string;
  title: string;
  type: 'content' | 'single' | 'multiple' | 'cloze_answer';
  questionParts: MockQuestionPart[];
  answerOptions: MockAnswerOption[];
  hint: string[];
  prompt?: string; // For dialog cloze questions
};

export type MockQuizPayload = {
  id: string;
  title: string;
  category: string;
  unit: { id: number; name: string; title: string };
  lesson: { id: number; name: string };
  questions: MockQuestion[];
};

import { VIDEO_CONTENT_MAP } from './lesson-content-generator';

export const HARDCODED_QUIZZES: Record<string, MockQuizPayload> = {
  // Unit 1 / Chapter 1 / Lesson 1 - Discover: Greetings
  '01_01_1-discover': {
    id: '01_01_1-discover',
    title: 'Discover new signs',
    category: 'Lesson',
    unit: { id: 1, name: 'Unit 1', title: 'Basics' },
    lesson: { id: 101, name: 'Lesson 1' },
    questions: [
      {
        id: 1,
        status: 'published',
        unitNumber: 1,
        category: '1a',
        title: 'Từ mới: Chào',
        type: 'content',
        questionParts: [
          { type: 'video', url: '/resources/videos/Chào.mp4', content: 'Chào', caption: 'Chào' },
        ],
        answerOptions: [],
        hint: [],
      },
      {
        id: 2,
        status: 'published',
        unitNumber: 1,
        category: '2a',
        title: 'Chọn ký hiệu đúng cho "Chào"',
        type: 'single',
        questionParts: [
          { type: 'html', content: '<p>Chọn video đúng</p>' },
        ],
        answerOptions: [
          { isCorrect: true, media: { type: 'video', url: '/resources/videos/Chào.mp4', label: 'Chào' } },
          { isCorrect: false, media: { type: 'video', url: '/resources/videos/tạm biệt.mp4', label: 'Tạm biệt' } },
        ],
        hint: ['Hãy nhớ động tác chào hỏi.'],
      },
      {
        id: 3,
        status: 'published',
        unitNumber: 1,
        category: '2a',
        title: 'Ký hiệu nào có nghĩa là "Tạm biệt"?',
        type: 'single',
        questionParts: [
          { type: 'html', content: '<p>Chọn video đúng</p>' },
        ],
        answerOptions: [
          { isCorrect: true, media: { type: 'video', url: '/resources/videos/tạm biệt.mp4', label: 'Tạm biệt' } },
          { isCorrect: false, media: { type: 'video', url: '/resources/videos/xin lỗi.mp4', label: 'Xin lỗi' } },
        ],
        hint: [],
      },
      {
        id: 4,
        status: 'published',
        unitNumber: 1,
        category: '2a',
        title: 'Ký hiệu nào có nghĩa là "Xin lỗi"?',
        type: 'single',
        questionParts: [
          { type: 'html', content: '<p>Chọn video đúng</p>' },
        ],
        answerOptions: [
          { isCorrect: true, media: { type: 'video', url: '/resources/videos/xin lỗi.mp4', label: 'Xin lỗi' } },
          { isCorrect: false, media: { type: 'video', url: '/resources/videos/Chào.mp4', label: 'Chào' } },
        ],
        hint: [],
      },
      {
        id: 5,
        status: 'published',
        unitNumber: 1,
        category: '3a',
        title: 'Điền vào chỗ trống',
        type: 'cloze_answer',
        questionParts: [
          { type: 'video', url: '/resources/videos/Chào.mp4', content: 'Chào', caption: 'Chào' },
        ],
        answerOptions: [
          { isCorrect: true, answerText: 'chào' },
          { isCorrect: false, answerText: 'tạm biệt' },
          { isCorrect: false, answerText: 'xin lỗi' },
          { isCorrect: false, answerText: 'cảm ơn' },
        ],
        hint: ['chào', 'tạm biệt', 'xin lỗi', 'cảm ơn'],
      },
    ],
  },
};

// New function to build discover quiz with 2+3 word structure
function buildDiscoverQuizStructure(
  quizId: string,
  categoryKey: keyof typeof VIDEO_CONTENT_MAP,
  unitMeta: { id: number; name: string; title: string },
  lessonMeta: { id: number; name: string },
  introLabel: string
): MockQuizPayload {
  const entries = Object.entries(VIDEO_CONTENT_MAP[categoryKey]);
  const questions: MockQuestion[] = [];
  
  if (entries.length >= 5) {
    // First 2 words - Learning phase
    const firstTwoWords = entries.slice(0, 2);
    firstTwoWords.forEach(([, data]) => {
      questions.push({
        id: questions.length + 1,
        status: 'published',
        unitNumber: unitMeta.id,
        category: '1a',
        title: `Từ mới: ${data.label}`,
        type: 'content',
        questionParts: [
          { type: 'video', url: data.video, content: data.label, caption: data.label }
        ],
        answerOptions: [],
        hint: [],
      });
    });
    
    // 2-3 questions for first 2 words (random type)
    const questionTypes = ['single', 'cloze_answer'];
    for (let i = 0; i < 3; i++) {
      const randomWord = firstTwoWords[Math.floor(Math.random() * firstTwoWords.length)];
      const [key, data] = randomWord;
      const otherWords = entries.filter(([k]) => k !== key).slice(0, 2);
      
      const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      
      if (questionType === 'single') {
        questions.push({
          id: questions.length + 1,
          status: 'published',
          unitNumber: unitMeta.id,
          category: '2a',
          title: `Chọn ký hiệu đúng cho "${data.label}"`,
          type: 'single',
          questionParts: [
            { type: 'html', content: '<p>Chọn video đúng</p>' }
          ],
          answerOptions: [
            { isCorrect: true, media: { type: 'video' as const, url: data.video, label: data.label } },
            ...otherWords.map(([, d]) => ({ isCorrect: false, media: { type: 'video' as const, url: d.video, label: d.label } }))
          ],
          hint: [`Hãy nhớ ký hiệu cho "${data.label}".`],
        });
      } else {
        questions.push({
          id: questions.length + 1,
          status: 'published',
          unitNumber: unitMeta.id,
          category: '3a',
          title: `Điền từ cho ký hiệu này`,
          type: 'cloze_answer',
          questionParts: [
            { type: 'video', url: data.video, content: data.label, caption: data.label }
          ],
          answerOptions: [
            { isCorrect: true, answerText: data.label.toLowerCase() },
            ...otherWords.map(([, d]) => ({ isCorrect: false, answerText: d.label.toLowerCase() }))
          ],
          hint: [data.label.toLowerCase(), ...otherWords.map(([, d]) => d.label.toLowerCase())],
        });
      }
    }
    
    // Next 3 words - Learning phase
    const nextThreeWords = entries.slice(2, 5);
    nextThreeWords.forEach(([, data]) => {
      questions.push({
        id: questions.length + 1,
        status: 'published',
        unitNumber: unitMeta.id,
        category: '1a',
        title: `Từ mới: ${data.label}`,
        type: 'content',
        questionParts: [
          { type: 'video', url: data.video, content: data.label, caption: data.label }
        ],
        answerOptions: [],
        hint: [],
      });
    });
    
    // 2-3 questions for next 3 words
    for (let i = 0; i < 3; i++) {
      const randomWord = nextThreeWords[Math.floor(Math.random() * nextThreeWords.length)];
      const [key, data] = randomWord;
      const otherWords = entries.filter(([k]) => k !== key).slice(0, 2);
      
      const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      
      if (questionType === 'single') {
        questions.push({
          id: questions.length + 1,
          status: 'published',
          unitNumber: unitMeta.id,
          category: '2a',
          title: `Chọn ký hiệu đúng cho "${data.label}"`,
          type: 'single',
          questionParts: [
            { type: 'html', content: '<p>Chọn video đúng</p>' }
          ],
          answerOptions: [
            { isCorrect: true, media: { type: 'video' as const, url: data.video, label: data.label } },
            ...otherWords.map(([, d]) => ({ isCorrect: false, media: { type: 'video' as const, url: d.video, label: d.label } }))
          ],
          hint: [`Hãy nhớ ký hiệu cho "${data.label}".`],
        });
      } else {
        questions.push({
          id: questions.length + 1,
          status: 'published',
          unitNumber: unitMeta.id,
          category: '3a',
          title: `Điền từ cho ký hiệu này`,
          type: 'cloze_answer',
          questionParts: [
            { type: 'video', url: data.video, content: data.label, caption: data.label }
          ],
          answerOptions: [
            { isCorrect: true, answerText: data.label.toLowerCase() },
            ...otherWords.map(([, d]) => ({ isCorrect: false, answerText: d.label.toLowerCase() }))
          ],
          hint: [data.label.toLowerCase(), ...otherWords.map(([, d]) => d.label.toLowerCase())],
        });
      }
    }
  }
  
  return {
    id: quizId,
    title: introLabel,
    category: 'Lesson',
    unit: unitMeta,
    lesson: lessonMeta,
    questions,
  };
}

// Utility to auto-generate quizzes for all categories/videos
function buildSingleChoiceFromCategory(
  quizId: string,
  categoryKey: keyof typeof VIDEO_CONTENT_MAP,
  unitMeta: { id: number; name: string; title: string },
  lessonMeta: { id: number; name: string },
  introLabel: string
): MockQuizPayload {
  const entries = Object.entries(VIDEO_CONTENT_MAP[categoryKey]);
  const questions: MockQuestion[] = [];
  if (entries.length) {
    const [, first] = entries[0];
    questions.push({
      id: 1,
      status: 'published',
      unitNumber: unitMeta.id,
      category: '1a',
      title: `Từ mới: ${first.label}`,
      type: 'content',
      questionParts: [{ type: 'video', url: first.video, content: first.label, caption: first.label }],
      answerOptions: [],
      hint: [],
    });
  }
  let qid = 2;
  for (const [, data] of entries) {
    const distractors = entries
      .filter(([, d]) => d.label !== data.label)
      .slice(0, 1);
    const options: MockAnswerOption[] = [
      { isCorrect: true, media: { type: 'video' as const, url: data.video, label: data.label } },
      ...distractors.map(([, d]) => ({ isCorrect: false, media: { type: 'video' as const, url: d.video, label: d.label } })),
    ];
    questions.push({
      id: qid++,
      status: 'published',
      unitNumber: unitMeta.id,
      category: '2a',
      title: `Chọn ký hiệu đúng cho "${data.label}"`,
      type: 'single',
      questionParts: [{ type: 'html', content: `<p>${introLabel}</p>` }],
      answerOptions: options,
      hint: [],
    });
  }
  return {
    id: quizId,
    title: introLabel,
    category: 'Lesson',
    unit: unitMeta,
    lesson: lessonMeta,
    questions,
  };
}

// Populate more quizzes for coverage using available videos
HARDCODED_QUIZZES['01_01_2-develop'] = buildSingleChoiceFromCategory(
  '01_01_2-develop',
  'family',
  { id: 1, name: 'Unit 1', title: 'Basics' },
  { id: 102, name: 'Lesson 2' },
  'Gia đình'
);

HARDCODED_QUIZZES['02_01_1-discover'] = buildDiscoverQuizStructure(
  '02_01_1-discover',
  'emotions',
  { id: 2, name: 'Unit 2', title: 'Emotions' },
  { id: 201, name: 'Lesson 1' },
  'Khám phá cảm xúc cơ bản'
);

HARDCODED_QUIZZES['03_01_1-discover'] = buildDiscoverQuizStructure(
  '03_01_1-discover',
  'animals',
  { id: 3, name: 'Unit 3', title: 'Nature & Animals' },
  { id: 301, name: 'Lesson 1' },
  'Khám phá động vật'
);

HARDCODED_QUIZZES['04_01_1-discover'] = buildDiscoverQuizStructure(
  '04_01_1-discover',
  'numbers',
  { id: 4, name: 'Unit 4', title: 'Numbers & Shapes' },
  { id: 401, name: 'Lesson 1' },
  'Khám phá số đếm'
);

HARDCODED_QUIZZES['04_02_1-discover'] = buildDiscoverQuizStructure(
  '04_02_1-discover',
  'shapes',
  { id: 4, name: 'Unit 4', title: 'Numbers & Shapes' },
  { id: 402, name: 'Lesson 2' },
  'Khám phá hình học'
);

HARDCODED_QUIZZES['05_01_1-discover'] = buildDiscoverQuizStructure(
  '05_01_1-discover',
  'food',
  { id: 5, name: 'Unit 5', title: 'Food & Objects' },
  { id: 501, name: 'Lesson 1' },
  'Khám phá thức ăn'
);

HARDCODED_QUIZZES['05_02_1-discover'] = buildDiscoverQuizStructure(
  '05_02_1-discover',
  'objects',
  { id: 5, name: 'Unit 5', title: 'Food & Objects' },
  { id: 502, name: 'Lesson 2' },
  'Khám phá đồ vật'
);

HARDCODED_QUIZZES['06_01_1-discover'] = buildDiscoverQuizStructure(
  '06_01_1-discover',
  'transportation',
  { id: 6, name: 'Unit 6', title: 'Transportation & Activities' },
  { id: 601, name: 'Lesson 1' },
  'Khám phá giao thông'
);

HARDCODED_QUIZZES['06_02_1-discover'] = buildDiscoverQuizStructure(
  '06_02_1-discover',
  'activities',
  { id: 6, name: 'Unit 6', title: 'Transportation & Activities' },
  { id: 602, name: 'Lesson 2' },
  'Khám phá hoạt động'
);

HARDCODED_QUIZZES['03_02_1-discover'] = buildDiscoverQuizStructure(
  '03_02_1-discover',
  'weather',
  { id: 3, name: 'Unit 3', title: 'Nature & Animals' },
  { id: 302, name: 'Lesson 2' },
  'Khám phá thời tiết'
);

// Add Iconic and Review lessons for all Chapter 1s
HARDCODED_QUIZZES['01_01_2-iconic'] = buildSingleChoiceFromCategory(
  '01_01_2-iconic',
  'greetings',
  { id: 1, name: 'Unit 1', title: 'Basics' },
  { id: 102, name: 'Lesson 2' },
  'Ký hiệu biểu tượng chào hỏi'
);

HARDCODED_QUIZZES['01_01_3-iconic'] = buildSingleChoiceFromCategory(
  '01_01_3-iconic',
  'greetings',
  { id: 1, name: 'Unit 1', title: 'Basics' },
  { id: 103, name: 'Lesson 3' },
  'Ký hiệu biểu tượng chào hỏi cơ bản'
);

HARDCODED_QUIZZES['01_01_3-review'] = buildSingleChoiceFromCategory(
  '01_01_3-review',
  'greetings',
  { id: 1, name: 'Unit 1', title: 'Basics' },
  { id: 103, name: 'Lesson 3' },
  'Ôn tập chào hỏi'
);

HARDCODED_QUIZZES['02_01_2-iconic'] = buildSingleChoiceFromCategory(
  '02_01_2-iconic',
  'emotions',
  { id: 2, name: 'Unit 2', title: 'Emotions' },
  { id: 202, name: 'Lesson 2' },
  'Ký hiệu biểu tượng cảm xúc'
);

HARDCODED_QUIZZES['02_01_3-iconic'] = buildSingleChoiceFromCategory(
  '02_01_3-iconic',
  'emotions',
  { id: 2, name: 'Unit 2', title: 'Emotions' },
  { id: 203, name: 'Lesson 3' },
  'Ký hiệu biểu tượng cảm xúc cơ bản'
);

HARDCODED_QUIZZES['02_01_3-review'] = buildSingleChoiceFromCategory(
  '02_01_3-review',
  'emotions',
  { id: 2, name: 'Unit 2', title: 'Emotions' },
  { id: 203, name: 'Lesson 3' },
  'Ôn tập cảm xúc'
);

HARDCODED_QUIZZES['03_01_2-iconic'] = buildSingleChoiceFromCategory(
  '03_01_2-iconic',
  'animals',
  { id: 3, name: 'Unit 3', title: 'Nature & Animals' },
  { id: 302, name: 'Lesson 2' },
  'Ký hiệu biểu tượng động vật'
);

HARDCODED_QUIZZES['03_01_3-review'] = buildSingleChoiceFromCategory(
  '03_01_3-review',
  'animals',
  { id: 3, name: 'Unit 3', title: 'Nature & Animals' },
  { id: 303, name: 'Lesson 3' },
  'Ôn tập động vật'
);

HARDCODED_QUIZZES['04_01_2-iconic'] = buildSingleChoiceFromCategory(
  '04_01_2-iconic',
  'numbers',
  { id: 4, name: 'Unit 4', title: 'Numbers & Shapes' },
  { id: 402, name: 'Lesson 2' },
  'Ký hiệu biểu tượng số'
);

HARDCODED_QUIZZES['04_01_3-review'] = buildSingleChoiceFromCategory(
  '04_01_3-review',
  'numbers',
  { id: 4, name: 'Unit 4', title: 'Numbers & Shapes' },
  { id: 403, name: 'Lesson 3' },
  'Ôn tập số đếm'
);

HARDCODED_QUIZZES['05_01_2-iconic'] = buildSingleChoiceFromCategory(
  '05_01_2-iconic',
  'food',
  { id: 5, name: 'Unit 5', title: 'Food & Objects' },
  { id: 502, name: 'Lesson 2' },
  'Ký hiệu biểu tượng thức ăn'
);

HARDCODED_QUIZZES['05_01_3-review'] = buildSingleChoiceFromCategory(
  '05_01_3-review',
  'food',
  { id: 5, name: 'Unit 5', title: 'Food & Objects' },
  { id: 503, name: 'Lesson 3' },
  'Ôn tập thức ăn'
);

HARDCODED_QUIZZES['06_01_2-iconic'] = buildSingleChoiceFromCategory(
  '06_01_2-iconic',
  'transportation',
  { id: 6, name: 'Unit 6', title: 'Transportation & Activities' },
  { id: 602, name: 'Lesson 2' },
  'Ký hiệu biểu tượng giao thông'
);

HARDCODED_QUIZZES['06_01_3-review'] = buildSingleChoiceFromCategory(
  '06_01_3-review',
  'transportation',
  { id: 6, name: 'Unit 6', title: 'Transportation & Activities' },
  { id: 603, name: 'Lesson 3' },
  'Ôn tập giao thông'
);

// Add Discover Advanced and Practice lessons for all Chapter 1s
HARDCODED_QUIZZES['01_01_3-discover-advanced'] = buildSingleChoiceFromCategory(
  '01_01_3-discover-advanced',
  'greetings',
  { id: 1, name: 'Unit 1', title: 'Basics' },
  { id: 103, name: 'Lesson 3' },
  'Khám phá chào hỏi nâng cao'
);

HARDCODED_QUIZZES['01_01_4-practice'] = buildSingleChoiceFromCategory(
  '01_01_4-practice',
  'greetings',
  { id: 1, name: 'Unit 1', title: 'Basics' },
  { id: 104, name: 'Lesson 4' },
  'Luyện tập chào hỏi'
);

HARDCODED_QUIZZES['02_01_3-discover-advanced'] = buildSingleChoiceFromCategory(
  '02_01_3-discover-advanced',
  'emotions',
  { id: 2, name: 'Unit 2', title: 'Emotions' },
  { id: 203, name: 'Lesson 3' },
  'Khám phá cảm xúc nâng cao'
);

HARDCODED_QUIZZES['02_01_4-practice'] = buildSingleChoiceFromCategory(
  '02_01_4-practice',
  'emotions',
  { id: 2, name: 'Unit 2', title: 'Emotions' },
  { id: 204, name: 'Lesson 4' },
  'Luyện tập cảm xúc'
);

HARDCODED_QUIZZES['03_01_3-discover-advanced'] = buildSingleChoiceFromCategory(
  '03_01_3-discover-advanced',
  'animals',
  { id: 3, name: 'Unit 3', title: 'Nature & Animals' },
  { id: 303, name: 'Lesson 3' },
  'Khám phá động vật nâng cao'
);

HARDCODED_QUIZZES['03_01_4-practice'] = buildSingleChoiceFromCategory(
  '03_01_4-practice',
  'animals',
  { id: 3, name: 'Unit 3', title: 'Nature & Animals' },
  { id: 304, name: 'Lesson 4' },
  'Luyện tập động vật'
);

HARDCODED_QUIZZES['04_01_3-discover-advanced'] = buildSingleChoiceFromCategory(
  '04_01_3-discover-advanced',
  'numbers',
  { id: 4, name: 'Unit 4', title: 'Numbers & Shapes' },
  { id: 403, name: 'Lesson 3' },
  'Khám phá số đếm nâng cao'
);

HARDCODED_QUIZZES['04_01_4-practice'] = buildSingleChoiceFromCategory(
  '04_01_4-practice',
  'numbers',
  { id: 4, name: 'Unit 4', title: 'Numbers & Shapes' },
  { id: 404, name: 'Lesson 4' },
  'Luyện tập số đếm'
);

HARDCODED_QUIZZES['05_01_3-discover-advanced'] = buildSingleChoiceFromCategory(
  '05_01_3-discover-advanced',
  'food',
  { id: 5, name: 'Unit 5', title: 'Food & Objects' },
  { id: 503, name: 'Lesson 3' },
  'Khám phá thức ăn nâng cao'
);

HARDCODED_QUIZZES['05_01_4-practice'] = buildSingleChoiceFromCategory(
  '05_01_4-practice',
  'food',
  { id: 5, name: 'Unit 5', title: 'Food & Objects' },
  { id: 504, name: 'Lesson 4' },
  'Luyện tập thức ăn'
);

HARDCODED_QUIZZES['06_01_3-discover-advanced'] = buildSingleChoiceFromCategory(
  '06_01_3-discover-advanced',
  'transportation',
  { id: 6, name: 'Unit 6', title: 'Transportation & Activities' },
  { id: 603, name: 'Lesson 3' },
  'Khám phá giao thông nâng cao'
);

HARDCODED_QUIZZES['06_01_4-practice'] = buildSingleChoiceFromCategory(
  '06_01_4-practice',
  'transportation',
  { id: 6, name: 'Unit 6', title: 'Transportation & Activities' },
  { id: 604, name: 'Lesson 4' },
  'Luyện tập giao thông'
);

// Chapter 1 Practice Dialog - Practice 4
HARDCODED_QUIZZES['01_01_4-practice-dialog'] = {
  id: '01_01_4-practice-dialog',
  title: 'Hội thoại chào hỏi',
  category: 'Dialog', // This triggers dialog UI
  unit: { id: 1, name: 'Unit 1', title: 'Giao tiếp cơ bản' },
  lesson: { id: 104, name: 'Practice 4' },
  questions: [
    {
      id: 1,
      status: 'published',
      unitNumber: 1,
      category: '4c', // Dialog conversation category
      title: 'Hội thoại chào hỏi - Điền từ còn thiếu',
      type: 'cloze_answer',
      prompt: 'Điền từ còn thiếu: "Chào ___!"',
      questionParts: [
        {
          type: 'video',
          url: '/resources/videos/Chào.mp4',
          content: 'Chào bạn!',
          caption: 'Person A: Chào bạn!',
          dialogPerson: 'a'
        },
        {
          type: 'video', 
          url: '/resources/videos/Chào.mp4',
          content: 'Chào! Rất vui được gặp bạn.',
          caption: 'Person B: Chào! Rất vui được gặp bạn.',
          dialogPerson: 'b'
        },
        {
          type: 'video',
          url: '/resources/videos/cảm ơn.mp4',
          content: 'Cảm ơn bạn!',
          caption: 'Person A: Cảm ơn bạn!',
          dialogPerson: 'a'
        }
      ],
      answerOptions: [
        { isCorrect: true, answerText: 'chào' },
        { isCorrect: false, answerText: 'tạm biệt' },
        { isCorrect: false, answerText: 'xin lỗi' },
        { isCorrect: false, answerText: 'cảm ơn' }
      ],
      hint: ['chào', 'tạm biệt', 'xin lỗi', 'cảm ơn']
    },
    {
      id: 2,
      status: 'published',
      unitNumber: 1,
      category: '4c',
      title: 'Hội thoại tạm biệt - Điền từ còn thiếu',
      type: 'cloze_answer',
      prompt: 'Điền từ còn thiếu: "Tạm biệt ___!"',
      questionParts: [
        {
          type: 'video',
          url: '/resources/videos/tạm biệt.mp4',
          content: 'Tạm biệt!',
          caption: 'Person A: Tạm biệt!',
          dialogPerson: 'a'
        },
        {
          type: 'video',
          url: '/resources/videos/tạm biệt.mp4', 
          content: 'Tạm biệt! Hẹn gặp lại!',
          caption: 'Person B: Tạm biệt! Hẹn gặp lại!',
          dialogPerson: 'b'
        }
      ],
      answerOptions: [
        { isCorrect: true, answerText: 'tạm biệt' },
        { isCorrect: false, answerText: 'chào' },
        { isCorrect: false, answerText: 'xin lỗi' },
        { isCorrect: false, answerText: 'cảm ơn' }
      ],
      hint: ['chào', 'tạm biệt', 'xin lỗi', 'cảm ơn']
    },
    {
      id: 3,
      status: 'published',
      unitNumber: 1,
      category: '4c',
      title: 'Hội thoại xin lỗi - Điền từ còn thiếu',
      type: 'cloze_answer',
      prompt: 'Điền từ còn thiếu: "Xin lỗi ___!"',
      questionParts: [
        {
          type: 'video',
          url: '/resources/videos/xin lỗi.mp4',
          content: 'Xin lỗi!',
          caption: 'Person A: Xin lỗi!',
          dialogPerson: 'a'
        },
        {
          type: 'video',
          url: '/resources/videos/cảm ơn.mp4',
          content: 'Không sao!',
          caption: 'Person B: Không sao!',
          dialogPerson: 'b'
        }
      ],
      answerOptions: [
        { isCorrect: true, answerText: 'xin lỗi' },
        { isCorrect: false, answerText: 'chào' },
        { isCorrect: false, answerText: 'tạm biệt' },
        { isCorrect: false, answerText: 'cảm ơn' }
      ],
      hint: ['chào', 'tạm biệt', 'xin lỗi', 'cảm ơn']
    }
  ]
};

export type MockChapterLesson = {
  id: string;
  type: string;
  locked: boolean;
  completed: boolean;
  position: number; // server-defined order
  order_index?: number; // alias if needed
  firstIncomplete?: boolean;
};
export type MockChapter = {
  id: number;
  unitId: number;
  unitNumber: number;
  chapterNumber: number;
  title: string;
  subtitle: string;
  locked: boolean;
  lessons: MockChapterLesson[];
};

export const HARDCODED_CHAPTERS: Record<string, MockChapter> = {
  '1_1': {
    id: 1,
    unitId: 1,
    unitNumber: 1,
    chapterNumber: 1,
    title: 'Chào hỏi và lịch sự',
    subtitle: 'Học các ký hiệu chào hỏi cơ bản',
    locked: false,
    // Chapter 1 sequence: Discover -> Practice -> Iconic -> Practice -> Review
    lessons: [
      { id: '01_01_1-discover', type: 'Discover', locked: false, completed: false, position: 1, order_index: 1, firstIncomplete: true },
      { id: '01_01_2-practice', type: 'Training', locked: false, completed: false, position: 2, order_index: 2 },
      { id: '01_01_3-iconic', type: 'Iconic', locked: false, completed: false, position: 3, order_index: 3 },
      { id: '01_01_4-practice-advanced', type: 'Training', locked: false, completed: false, position: 4, order_index: 4 },
      { id: '01_01_5-review', type: 'Review', locked: false, completed: false, position: 5, order_index: 5 },
    ],
  },
  '1_2': {
    id: 2,
    unitId: 1,
    unitNumber: 1,
    chapterNumber: 2,
    title: 'Gia đình và mối quan hệ',
    subtitle: 'Học ký hiệu về các thành viên gia đình',
    locked: false,
    // Chapter 2 sequence: Discover -> Iconic -> Discover (advanced) -> Practice -> Review
    lessons: [
      { id: '01_02_1-discover', type: 'Discover', locked: false, completed: false, position: 1, order_index: 1, firstIncomplete: true },
      { id: '01_02_2-iconic', type: 'Iconic', locked: false, completed: false, position: 2, order_index: 2 },
      { id: '01_02_3-discover-advanced', type: 'Discover', locked: false, completed: false, position: 3, order_index: 3 },
      { id: '01_02_4-practice', type: 'Training', locked: false, completed: false, position: 4, order_index: 4 },
      { id: '01_02_5-review', type: 'Review', locked: false, completed: false, position: 5, order_index: 5 },
    ],
  },
  '2_1': {
    id: 3,
    unitId: 2,
    unitNumber: 2,
    chapterNumber: 1,
    title: 'Cảm xúc cơ bản',
    subtitle: 'Học ký hiệu cảm xúc cơ bản',
    locked: false,
    // Chapter 1 sequence: Discover -> Practice -> Iconic -> Practice -> Review
    lessons: [
      { id: '02_01_1-discover', type: 'Discover', locked: false, completed: false, position: 1, order_index: 1, firstIncomplete: true },
      { id: '02_01_2-practice', type: 'Training', locked: false, completed: false, position: 2, order_index: 2 },
      { id: '02_01_3-iconic', type: 'Iconic', locked: false, completed: false, position: 3, order_index: 3 },
      { id: '02_01_4-practice-advanced', type: 'Training', locked: false, completed: false, position: 4, order_index: 4 },
      { id: '02_01_5-review', type: 'Review', locked: false, completed: false, position: 5, order_index: 5 },
    ],
  },
  '2_2': {
    id: 4,
    unitId: 2,
    unitNumber: 2,
    chapterNumber: 2,
    title: 'Cảm xúc nâng cao',
    subtitle: 'Học các cảm xúc phức tạp',
    locked: false,
    // Chapter 2 sequence: Discover -> Iconic -> Discover (advanced) -> Practice -> Review
    lessons: [
      { id: '02_02_1-discover', type: 'Discover', locked: false, completed: false, position: 1, order_index: 1, firstIncomplete: true },
      { id: '02_02_2-iconic', type: 'Iconic', locked: false, completed: false, position: 2, order_index: 2 },
      { id: '02_02_3-discover-advanced', type: 'Discover', locked: false, completed: false, position: 3, order_index: 3 },
      { id: '02_02_4-practice', type: 'Training', locked: false, completed: false, position: 4, order_index: 4 },
      { id: '02_02_5-review', type: 'Review', locked: false, completed: false, position: 5, order_index: 5 },
    ],
  },
  '3_1': {
    id: 5,
    unitId: 3,
    unitNumber: 3,
    chapterNumber: 1,
    title: 'Động vật thường gặp',
    subtitle: 'Học ký hiệu động vật quen thuộc',
    locked: false,
    // Chapter 1 sequence: Discover -> Practice -> Iconic -> Practice -> Review
    lessons: [
      { id: '03_01_1-discover', type: 'Discover', locked: false, completed: false, position: 1, order_index: 1, firstIncomplete: true },
      { id: '03_01_2-practice', type: 'Training', locked: false, completed: false, position: 2, order_index: 2 },
      { id: '03_01_3-iconic', type: 'Iconic', locked: false, completed: false, position: 3, order_index: 3 },
      { id: '03_01_4-practice-advanced', type: 'Training', locked: false, completed: false, position: 4, order_index: 4 },
      { id: '03_01_5-review', type: 'Review', locked: false, completed: false, position: 5, order_index: 5 },
    ],
  },
  '3_2': {
    id: 6,
    unitId: 3,
    unitNumber: 3,
    chapterNumber: 2,
    title: 'Thời tiết và thời gian',
    subtitle: 'Học ký hiệu thời tiết và thời gian',
    locked: false,
    // Chapter 2 sequence: Discover -> Iconic -> Discover (advanced) -> Practice -> Review
    lessons: [
      { id: '03_02_1-discover', type: 'Discover', locked: false, completed: false, position: 1, order_index: 1, firstIncomplete: true },
      { id: '03_02_2-iconic', type: 'Iconic', locked: false, completed: false, position: 2, order_index: 2 },
      { id: '03_02_3-discover-advanced', type: 'Discover', locked: false, completed: false, position: 3, order_index: 3 },
      { id: '03_02_4-practice', type: 'Training', locked: false, completed: false, position: 4, order_index: 4 },
      { id: '03_02_5-review', type: 'Review', locked: false, completed: false, position: 5, order_index: 5 },
    ],
  },
  '4_1': {
    id: 7,
    unitId: 4,
    unitNumber: 4,
    chapterNumber: 1,
    title: 'Số đếm cơ bản',
    subtitle: 'Học ký hiệu số đếm cơ bản',
    locked: false,
    // Chapter 1 sequence: Discover -> Practice -> Iconic -> Practice -> Review
    lessons: [
      { id: '04_01_1-discover', type: 'Discover', locked: false, completed: false, position: 1, order_index: 1, firstIncomplete: true },
      { id: '04_01_2-practice', type: 'Training', locked: false, completed: false, position: 2, order_index: 2 },
      { id: '04_01_3-iconic', type: 'Iconic', locked: false, completed: false, position: 3, order_index: 3 },
      { id: '04_01_4-practice-advanced', type: 'Training', locked: false, completed: false, position: 4, order_index: 4 },
      { id: '04_01_5-review', type: 'Review', locked: false, completed: false, position: 5, order_index: 5 },
    ],
  },
  '4_2': {
    id: 8,
    unitId: 4,
    unitNumber: 4,
    chapterNumber: 2,
    title: 'Hình dạng và màu sắc',
    subtitle: 'Học ký hiệu hình dạng và màu sắc',
    locked: false,
    // Chapter 2 sequence: Discover -> Iconic -> Discover (advanced) -> Practice -> Review
    lessons: [
      { id: '04_02_1-discover', type: 'Discover', locked: false, completed: false, position: 1, order_index: 1, firstIncomplete: true },
      { id: '04_02_2-iconic', type: 'Iconic', locked: false, completed: false, position: 2, order_index: 2 },
      { id: '04_02_3-discover-advanced', type: 'Discover', locked: false, completed: false, position: 3, order_index: 3 },
      { id: '04_02_4-practice', type: 'Training', locked: false, completed: false, position: 4, order_index: 4 },
      { id: '04_02_5-review', type: 'Review', locked: false, completed: false, position: 5, order_index: 5 },
    ],
  },
  '5_1': {
    id: 9,
    unitId: 5,
    unitNumber: 5,
    chapterNumber: 1,
    title: 'Thức ăn và bữa ăn',
    subtitle: 'Học ký hiệu thức ăn và bữa ăn',
    locked: false,
    // Chapter 1 sequence: Discover -> Practice -> Iconic -> Practice -> Review
    lessons: [
      { id: '05_01_1-discover', type: 'Discover', locked: false, completed: false, position: 1, order_index: 1, firstIncomplete: true },
      { id: '05_01_2-practice', type: 'Training', locked: false, completed: false, position: 2, order_index: 2 },
      { id: '05_01_3-iconic', type: 'Iconic', locked: false, completed: false, position: 3, order_index: 3 },
      { id: '05_01_4-practice-advanced', type: 'Training', locked: false, completed: false, position: 4, order_index: 4 },
      { id: '05_01_5-review', type: 'Review', locked: false, completed: false, position: 5, order_index: 5 },
    ],
  },
  '5_2': {
    id: 10,
    unitId: 5,
    unitNumber: 5,
    chapterNumber: 2,
    title: 'Đồ vật trong nhà',
    subtitle: 'Học ký hiệu đồ vật trong nhà',
    locked: false,
    // Chapter 2 sequence: Discover -> Iconic -> Discover (advanced) -> Practice -> Review
    lessons: [
      { id: '05_02_1-discover', type: 'Discover', locked: false, completed: false, position: 1, order_index: 1, firstIncomplete: true },
      { id: '05_02_2-iconic', type: 'Iconic', locked: false, completed: false, position: 2, order_index: 2 },
      { id: '05_02_3-discover-advanced', type: 'Discover', locked: false, completed: false, position: 3, order_index: 3 },
      { id: '05_02_4-practice', type: 'Training', locked: false, completed: false, position: 4, order_index: 4 },
      { id: '05_02_5-review', type: 'Review', locked: false, completed: false, position: 5, order_index: 5 },
    ],
  },
  '6_1': {
    id: 11,
    unitId: 6,
    unitNumber: 6,
    chapterNumber: 1,
    title: 'Phương tiện giao thông',
    subtitle: 'Học ký hiệu phương tiện giao thông',
    locked: false,
    // Chapter 1 sequence: Discover -> Practice -> Iconic -> Practice -> Review
    lessons: [
      { id: '06_01_1-discover', type: 'Discover', locked: false, completed: false, position: 1, order_index: 1, firstIncomplete: true },
      { id: '06_01_2-practice', type: 'Training', locked: false, completed: false, position: 2, order_index: 2 },
      { id: '06_01_3-iconic', type: 'Iconic', locked: false, completed: false, position: 3, order_index: 3 },
      { id: '06_01_4-practice-advanced', type: 'Training', locked: false, completed: false, position: 4, order_index: 4 },
      { id: '06_01_5-review', type: 'Review', locked: false, completed: false, position: 5, order_index: 5 },
    ],
  },
  '6_2': {
    id: 12,
    unitId: 6,
    unitNumber: 6,
    chapterNumber: 2,
    title: 'Hoạt động và sở thích',
    subtitle: 'Học ký hiệu hoạt động và sở thích',
    locked: false,
    // Chapter 2 sequence: Discover -> Iconic -> Discover (advanced) -> Practice -> Review
    lessons: [
      { id: '06_02_1-discover', type: 'Discover', locked: false, completed: false, position: 1, order_index: 1, firstIncomplete: true },
      { id: '06_02_2-iconic', type: 'Iconic', locked: false, completed: false, position: 2, order_index: 2 },
      { id: '06_02_3-discover-advanced', type: 'Discover', locked: false, completed: false, position: 3, order_index: 3 },
      { id: '06_02_4-practice', type: 'Training', locked: false, completed: false, position: 4, order_index: 4 },
      { id: '06_02_5-review', type: 'Review', locked: false, completed: false, position: 5, order_index: 5 },
    ],
  },
  '7_1': {
    id: 13,
    unitId: 7,
    unitNumber: 7,
    chapterNumber: 1,
    title: 'Cuộc sống học đường',
    subtitle: 'Học ký hiệu trường học và học tập',
    locked: false,
    // Chapter 1 sequence: Discover -> Practice -> Iconic -> Practice -> Review
    lessons: [
      { id: '07_01_1-discover', type: 'Discover', locked: false, completed: false, position: 1, order_index: 1, firstIncomplete: true },
      { id: '07_01_2-practice', type: 'Training', locked: false, completed: false, position: 2, order_index: 2 },
      { id: '07_01_3-iconic', type: 'Iconic', locked: false, completed: false, position: 3, order_index: 3 },
      { id: '07_01_4-practice-advanced', type: 'Training', locked: false, completed: false, position: 4, order_index: 4 },
      { id: '07_01_5-review', type: 'Review', locked: false, completed: false, position: 5, order_index: 5 },
    ],
  },
  '7_2': {
    id: 14,
    unitId: 7,
    unitNumber: 7,
    chapterNumber: 2,
    title: 'Công việc và tiền bạc',
    subtitle: 'Học ký hiệu công việc và tiền bạc',
    locked: false,
    // Chapter 2 sequence: Discover -> Iconic -> Discover (advanced) -> Practice -> Review
    lessons: [
      { id: '07_02_1-discover', type: 'Discover', locked: false, completed: false, position: 1, order_index: 1, firstIncomplete: true },
      { id: '07_02_2-iconic', type: 'Iconic', locked: false, completed: false, position: 2, order_index: 2 },
      { id: '07_02_3-discover-advanced', type: 'Discover', locked: false, completed: false, position: 3, order_index: 3 },
      { id: '07_02_4-practice', type: 'Training', locked: false, completed: false, position: 4, order_index: 4 },
      { id: '07_02_5-review', type: 'Review', locked: false, completed: false, position: 5, order_index: 5 },
    ],
  },
  '8_1': {
    id: 15,
    unitId: 8,
    unitNumber: 8,
    chapterNumber: 1,
    title: 'Cảm xúc phức tạp',
    subtitle: 'Học các cảm xúc phức tạp',
    locked: false,
    // Chapter 1 sequence: Discover -> Practice -> Iconic -> Practice -> Review
    lessons: [
      { id: '08_01_1-discover', type: 'Discover', locked: false, completed: false, position: 1, order_index: 1, firstIncomplete: true },
      { id: '08_01_2-practice', type: 'Training', locked: false, completed: false, position: 2, order_index: 2 },
      { id: '08_01_3-iconic', type: 'Iconic', locked: false, completed: false, position: 3, order_index: 3 },
      { id: '08_01_4-practice-advanced', type: 'Training', locked: false, completed: false, position: 4, order_index: 4 },
      { id: '08_01_5-review', type: 'Review', locked: false, completed: false, position: 5, order_index: 5 },
    ],
  },
  '8_2': {
    id: 16,
    unitId: 8,
    unitNumber: 8,
    chapterNumber: 2,
    title: 'Cảm xúc đặc biệt',
    subtitle: 'Học các cảm xúc đặc biệt',
    locked: false,
    // Chapter 2 sequence: Discover -> Iconic -> Discover (advanced) -> Practice -> Review
    lessons: [
      { id: '08_02_1-discover', type: 'Discover', locked: false, completed: false, position: 1, order_index: 1, firstIncomplete: true },
      { id: '08_02_2-iconic', type: 'Iconic', locked: false, completed: false, position: 2, order_index: 2 },
      { id: '08_02_3-discover-advanced', type: 'Discover', locked: false, completed: false, position: 3, order_index: 3 },
      { id: '08_02_4-practice', type: 'Training', locked: false, completed: false, position: 4, order_index: 4 },
      { id: '08_02_5-review', type: 'Review', locked: false, completed: false, position: 5, order_index: 5 },
    ],
  },
  '9_1': {
    id: 17,
    unitId: 9,
    unitNumber: 9,
    chapterNumber: 1,
    title: 'Đồ vật học tập',
    subtitle: 'Học ký hiệu đồ vật học tập',
    locked: false,
    // Chapter 1 sequence: Discover -> Practice -> Iconic -> Practice -> Review
    lessons: [
      { id: '09_01_1-discover', type: 'Discover', locked: false, completed: false, position: 1, order_index: 1, firstIncomplete: true },
      { id: '09_01_2-practice', type: 'Training', locked: false, completed: false, position: 2, order_index: 2 },
      { id: '09_01_3-iconic', type: 'Iconic', locked: false, completed: false, position: 3, order_index: 3 },
      { id: '09_01_4-practice-advanced', type: 'Training', locked: false, completed: false, position: 4, order_index: 4 },
      { id: '09_01_5-review', type: 'Review', locked: false, completed: false, position: 5, order_index: 5 },
    ],
  },
  '9_2': {
    id: 18,
    unitId: 9,
    unitNumber: 9,
    chapterNumber: 2,
    title: 'Đồ vật cá nhân',
    subtitle: 'Học ký hiệu đồ vật cá nhân',
    locked: false,
    // Chapter 2 sequence: Discover -> Iconic -> Discover (advanced) -> Practice -> Review
    lessons: [
      { id: '09_02_1-discover', type: 'Discover', locked: false, completed: false, position: 1, order_index: 1, firstIncomplete: true },
      { id: '09_02_2-iconic', type: 'Iconic', locked: false, completed: false, position: 2, order_index: 2 },
      { id: '09_02_3-discover-advanced', type: 'Discover', locked: false, completed: false, position: 3, order_index: 3 },
      { id: '09_02_4-practice', type: 'Training', locked: false, completed: false, position: 4, order_index: 4 },
      { id: '09_02_5-review', type: 'Review', locked: false, completed: false, position: 5, order_index: 5 },
    ],
  },
  '10_1': {
    id: 19,
    unitId: 10,
    unitNumber: 10,
    chapterNumber: 1,
    title: 'Thực vật',
    subtitle: 'Học ký hiệu thực vật',
    locked: false,
    // Chapter 1 sequence: Discover -> Practice -> Iconic -> Practice -> Review
    lessons: [
      { id: '10_01_1-discover', type: 'Discover', locked: false, completed: false, position: 1, order_index: 1, firstIncomplete: true },
      { id: '10_01_2-practice', type: 'Training', locked: false, completed: false, position: 2, order_index: 2 },
      { id: '10_01_3-iconic', type: 'Iconic', locked: false, completed: false, position: 3, order_index: 3 },
      { id: '10_01_4-practice-advanced', type: 'Training', locked: false, completed: false, position: 4, order_index: 4 },
      { id: '10_01_5-review', type: 'Review', locked: false, completed: false, position: 5, order_index: 5 },
    ],
  },
  '10_2': {
    id: 20,
    unitId: 10,
    unitNumber: 10,
    chapterNumber: 2,
    title: 'Môi trường sống',
    subtitle: 'Học ký hiệu môi trường sống',
    locked: false,
    // Chapter 2 sequence: Discover -> Iconic -> Discover (advanced) -> Practice -> Review
    lessons: [
      { id: '10_02_1-discover', type: 'Discover', locked: false, completed: false, position: 1, order_index: 1, firstIncomplete: true },
      { id: '10_02_2-iconic', type: 'Iconic', locked: false, completed: false, position: 2, order_index: 2 },
      { id: '10_02_3-discover-advanced', type: 'Discover', locked: false, completed: false, position: 3, order_index: 3 },
      { id: '10_02_4-practice', type: 'Training', locked: false, completed: false, position: 4, order_index: 4 },
      { id: '10_02_5-review', type: 'Review', locked: false, completed: false, position: 5, order_index: 5 },
    ],
  },
};


