// Lesson content generator based on video resources and lesson structure
import { 
  LessonQuestion, 
  createVideoQuestion, 
  createContentQuestion,
  type LessonType,
  QuestionCategories 
} from './lesson-structure';

// Complete video mapping based on ALL 63 videos from src/resources/videos
export const VIDEO_CONTENT_MAP = {
  // Greetings and Basic Communication - Expanded for comprehensive QuizScreen
  greetings: {
    'chao': { label: 'Chào', video: '/resources/videos/Chào.mp4' },
    'tam-biet': { label: 'Tạm biệt', video: '/resources/videos/tạm biệt.mp4' },
    'xin-loi': { label: 'Xin lỗi', video: '/resources/videos/xin lỗi.mp4' },
    'cam-on': { label: 'Cảm ơn', video: '/resources/videos/Chào.mp4' }, // Reuse video for demonstration
    'xin-chao': { label: 'Xin chào', video: '/resources/videos/tạm biệt.mp4' }, // Reuse video for demonstration
    'chao-ban': { label: 'Chào bạn', video: '/resources/videos/xin lỗi.mp4' }, // Reuse video for demonstration
  },
  
  // Family and Relationships
  family: {
    'bo': { label: 'Bố', video: '/resources/videos/bố.mp4' },
    'me': { label: 'Mẹ', video: '/resources/videos/mẹ.mp4' },
    'cha-me': { label: 'Cha mẹ', video: '/resources/videos/cha mẹ.mp4' },
    'bo-me': { label: 'Bố mẹ', video: '/resources/videos/bố mẹ.mp4' },
    'co-giao': { label: 'Cô giáo', video: '/resources/videos/cô giáo.mp4' },
    'bang-hoc-sinh': { label: 'Bảng học sinh', video: '/resources/videos/bảng học sinh.mp4' },
  },
  
  // Emotions and Feelings
  emotions: {
    'vui-mung': { label: 'Vui mừng', video: '/resources/videos/vui_mừng.mp4' },
    'buon-tham': { label: 'Buồn thảm', video: '/resources/videos/buồn thảm.mp4' },
    'gian-du': { label: 'Giận dữ', video: '/resources/videos/giận_dữ.mp4' },
    'thich-thu': { label: 'Thích thú', video: '/resources/videos/thích_thú.mp4' },
    'ngac-nhien': { label: 'Ngạc nhiên', video: '/resources/videos/Ngạc_nhiên.mp4' },
    'hoang-so': { label: 'Hoảng sợ', video: '/resources/videos/hoảng_sợ.mp4' },
    'hoi-hop': { label: 'Hồi hộp', video: '/resources/videos/hồi_hộp.mp4' },
    'boi-roi': { label: 'Bối rối', video: '/resources/videos/bối rối.mp4' },
    'tu-tin': { label: 'Tự tin', video: '/resources/videos/tự_tin.mp4' },
    'lo-so': { label: 'Lo sợ', video: '/resources/videos/lo_sợ.mp4' },
    'ghen-ti': { label: 'Ghen tị', video: '/resources/videos/ghen_tị.mp4' },
    'tuyet-vong': { label: 'Tuyệt vọng', video: '/resources/videos/tuyệt_vọng.mp4' },
    'nghen-ngao': { label: 'Nghẹn ngào', video: '/resources/videos/nghẹn_ngào.mp4' },
    'noi-gian': { label: 'Nổi giận', video: '/resources/videos/nổi_giận.mp4' },
    'gian-doi': { label: 'Giận dỗi', video: '/resources/videos/giận_dỗi.mp4' },
    'co-don': { label: 'Cô đơn', video: '/resources/videos/cô đơn.mp4' },
  },
  
  // Animals
  animals: {
    'con-cho': { label: 'Con chó', video: '/resources/videos/con chó.mp4' },
    'con-meo': { label: 'Con mèo', video: '/resources/videos/con mèo.mp4' },
    'con-ga': { label: 'Con gà', video: '/resources/videos/con gà.mp4' },
  },
  
  // Numbers
  numbers: {
    'so-1': { label: 'Số 1', video: '/resources/videos/số 1.mp4' },
    'so-2': { label: 'Số 2', video: '/resources/videos/số 2.mp4' },
    'so-3': { label: 'Số 3', video: '/resources/videos/số 3.mp4' },
  },
  
  // Shapes and Colors
  shapes: {
    'hinh-tam-giac': { label: 'Hình tam giác', video: '/resources/videos/hình tam giác.mp4' },
    'hinh-tron': { label: 'Hình tròn', video: '/resources/videos/hình tròn.mp4' },
    'hinh-vuong': { label: 'Hình vuông', video: '/resources/videos/hình vuông.mp4' },
    'mau-do': { label: 'Màu đỏ', video: '/resources/videos/Màu đỏ.mp4' },
  },
  
  // Food
  food: {
    'com': { label: 'Cơm', video: '/resources/videos/cơm.mp4' },
    'pho': { label: 'Phở', video: '/resources/videos/Phở.mp4' },
    'cai-banh-mi': { label: 'Cái bánh mì', video: '/resources/videos/cái bánh mì.mp4' },
    'cai-bat': { label: 'Cái bát', video: '/resources/videos/cái bát.mp4' },
  },
  
  // Objects
  objects: {
    'cai-chao': { label: 'Cái chảo', video: '/resources/videos/Cái chảo.mp4' },
    'cai-noi': { label: 'Cái nồi', video: '/resources/videos/Cái nồi.mp4' },
    'cay-but': { label: 'Cây bút', video: '/resources/videos/cây bút.mp4' },
    'quyen-sach': { label: 'Quyển sách', video: '/resources/videos/Quyển sách.mp4' },
    'cua-so': { label: 'Cửa sổ', video: '/resources/videos/cửa sổ.mp4' },
    'la-cay': { label: 'Lá cây', video: '/resources/videos/Lá cây.mp4' },
    'quan-bo': { label: 'Quần bò', video: '/resources/videos/Quần bò.mp4' },
    'cai-ao': { label: 'Cái áo', video: '/resources/videos/cái áo.mp4' },
  },
  
  // Transportation
  transportation: {
    'o-to': { label: 'Ô tô', video: '/resources/videos/ô tô.mp4' },
    'xe-may': { label: 'Xe máy', video: '/resources/videos/xe máy.mp4' },
    'tau-hoa': { label: 'Tàu hỏa', video: '/resources/videos/tàu hỏa.mp4' },
  },
  
  // Activities
  activities: {
    'da-bong': { label: 'Đá bóng', video: '/resources/videos/đá bóng.mp4' },
    'dan-ghi-ta': { label: 'Đàn ghi ta', video: '/resources/videos/đàn ghi ta.mp4' },
    'giac-ngu': { label: 'Giấc ngủ', video: '/resources/videos/giấc ngủ.mp4' },
  },
  
  // Weather and Time
  weather: {
    'mua-he': { label: 'Mùa hè', video: '/resources/videos/Mùa hè.mp4' },
    'mua-dong': { label: 'Mùa đông', video: '/resources/videos/Mùa đông.mp4' },
    'mua-thu': { label: 'Mùa thu', video: '/resources/videos/mùa thu.mp4' },
    'mua-phun': { label: 'Mưa phùn', video: '/resources/videos/mưa phùn.mp4' },
    'sang': { label: 'Sáng', video: '/resources/videos/sáng.mp4' },
    'buoi-sang': { label: 'Buổi sáng', video: '/resources/videos/buổi sáng.mp4' },
    'buoi-chieu': { label: 'Buổi chiều', video: '/resources/videos/buổi chiều.mp4' },
  },
  
  // Work
  work: {
    'cai-may-in': { label: 'Cái máy in', video: '/resources/videos/Cái máy in.mp4' },
    'to-tien': { label: 'Tờ tiền', video: '/resources/videos/tờ tiền.mp4' },
  },

  // Additional categories for complete coverage
  complexEmotions: {
    'nghen-ngao': { label: 'Nghẹn ngào', video: '/resources/videos/nghẹn_ngào.mp4' },
    'co-don': { label: 'Cô đơn', video: '/resources/videos/cô đơn.mp4' },
    'gian-doi': { label: 'Giận dỗi', video: '/resources/videos/giận_dỗi.mp4' },
    'noi-gian': { label: 'Nổi giận', video: '/resources/videos/nổi_giận.mp4' },
  },

  specialEmotions: {
    'tu-tin': { label: 'Tự tin', video: '/resources/videos/tự_tin.mp4' },
    'lo-so': { label: 'Lo sợ', video: '/resources/videos/lo_sợ.mp4' },
    'ghen-ti': { label: 'Ghen tị', video: '/resources/videos/ghen_tị.mp4' },
    'tuyet-vong': { label: 'Tuyệt vọng', video: '/resources/videos/tuyệt_vọng.mp4' },
  },

  studyObjects: {
    'cay-but': { label: 'Cây bút', video: '/resources/videos/cây bút.mp4' },
    'quyen-sach': { label: 'Quyển sách', video: '/resources/videos/Quyển sách.mp4' },
  },

  personalItems: {
    'quan-bo': { label: 'Quần bò', video: '/resources/videos/Quần bò.mp4' },
    'cai-ao': { label: 'Cái áo', video: '/resources/videos/cái áo.mp4' },
  },

  nature: {
    'la-cay': { label: 'Lá cây', video: '/resources/videos/Lá cây.mp4' },
  },

  environment: {
    'cua-so': { label: 'Cửa sổ', video: '/resources/videos/cửa sổ.mp4' },
  },
};

// Lesson content generators for each lesson type
export const generateLessonContent = (lessonId: string, lessonType: LessonType): LessonQuestion[] => {
  const questions: LessonQuestion[] = [];
  
  // Extract video category from lesson ID (e.g., "01_01_1-discover" -> "greetings")
  const videoCategory = getVideoCategoryFromLessonId(lessonId);
  
  switch (lessonType) {
    case 'Discover':
      questions.push(...generateDiscoverQuestions(lessonId, videoCategory));
      break;
    case 'Vokabel':
      questions.push(...generateVokabelQuestions(lessonId, videoCategory));
      break;
    case 'Develop':
      questions.push(...generateDevelopQuestions(lessonId, videoCategory));
      break;
    case 'Iconic':
      questions.push(...generateIconicQuestions(lessonId, videoCategory));
      break;
    case 'Dialog':
      questions.push(...generateDialogQuestions(lessonId, videoCategory));
      break;
    case 'Training':
      questions.push(...generateTrainingQuestions(lessonId, videoCategory));
      break;
    case 'Review':
      questions.push(...generateReviewQuestions(lessonId, videoCategory));
      break;
    case 'Quiz':
      questions.push(...generateQuizQuestions(lessonId, videoCategory));
      break;
    case 'Info':
      questions.push(...generateInfoQuestions(lessonId, videoCategory));
      break;
    case 'Explore':
      questions.push(...generateExploreQuestions(lessonId, videoCategory));
      break;
  }
  
  return questions;
};

// Enhanced lesson content generator with shuffle and comprehensive coverage
export const generateEnhancedLessonContent = (lessonId: string, lessonType: LessonType): LessonQuestion[] => {
  const questions: LessonQuestion[] = [];
  const videoCategory = getVideoCategoryFromLessonId(lessonId);
  const videos = VIDEO_CONTENT_MAP[videoCategory];
  const videoEntries = Object.entries(videos);

  // Shuffle video entries for variety
  const shuffledVideos = [...videoEntries].sort(() => Math.random() - 0.5);

  switch (lessonType) {
    case 'Discover':
      questions.push(...generateEnhancedDiscoverQuestions(lessonId, videoCategory, shuffledVideos));
      break;
    case 'Develop':
      questions.push(...generateDevelopQuestions(lessonId, videoCategory));
      break;
    case 'Iconic':
      questions.push(...generateIconicQuestions(lessonId, videoCategory));
      break;
    case 'Dialog':
      questions.push(...generateDialogQuestions(lessonId, videoCategory));
      break;
    case 'Vokabel':
      questions.push(...generateVokabelQuestions(lessonId, videoCategory));
      break;
    case 'Training':
      questions.push(...generateTrainingQuestions(lessonId, videoCategory));
      break;
    case 'Review':
      questions.push(...generateReviewQuestions(lessonId, videoCategory));
      break;
    case 'Quiz':
      questions.push(...generateEnhancedQuizQuestions(lessonId, videoCategory, shuffledVideos));
      break;
    case 'Info':
      questions.push(...generateInfoQuestions(lessonId, videoCategory));
      break;
    case 'Explore':
      questions.push(...generateExploreQuestions(lessonId, videoCategory));
      break;
  }
  
  return questions;
};

// Helper function to extract category from lesson ID
const getCategoryFromLessonId = (lessonId: string): string => {
  if (lessonId.includes('01_01')) return 'greetings';
  if (lessonId.includes('01_02')) return 'family';
  if (lessonId.includes('02_01')) return 'emotions';
  if (lessonId.includes('02_02')) return 'emotions';
  if (lessonId.includes('03_01')) return 'animals';
  if (lessonId.includes('03_02')) return 'weather';
  if (lessonId.includes('04_01')) return 'numbers';
  if (lessonId.includes('04_02')) return 'shapes';
  if (lessonId.includes('05_01')) return 'food';
  if (lessonId.includes('05_02')) return 'objects';
  if (lessonId.includes('06_01')) return 'transportation';
  if (lessonId.includes('06_02')) return 'activities';
  if (lessonId.includes('07_01')) return 'work';
  if (lessonId.includes('07_02')) return 'work';
  return 'general';
};

// Helper function to get video category
const getVideoCategoryFromLessonId = (lessonId: string): keyof typeof VIDEO_CONTENT_MAP => {
  // Map lesson IDs to specific video categories based on actual lesson structure
  if (lessonId.includes('08_01')) return 'complexEmotions';
  if (lessonId.includes('08_02')) return 'specialEmotions';
  if (lessonId.includes('09_01')) return 'studyObjects';
  if (lessonId.includes('09_02')) return 'personalItems';
  if (lessonId.includes('10_01')) return 'nature';
  if (lessonId.includes('10_02')) return 'environment';
  
  // Map specific lesson IDs to correct categories
  if (lessonId.includes('01_01')) return 'greetings';
  if (lessonId.includes('01_02')) return 'family';
  if (lessonId.includes('02_01')) return 'emotions';
  if (lessonId.includes('02_02')) return 'emotions'; // Chapter 4: Cảm xúc nâng cao
  if (lessonId.includes('03_01')) return 'animals';
  if (lessonId.includes('03_02')) return 'weather';
  if (lessonId.includes('04_01')) return 'numbers';
  if (lessonId.includes('04_02')) return 'shapes';
  if (lessonId.includes('05_01')) return 'food';
  if (lessonId.includes('05_02')) return 'objects';
  if (lessonId.includes('06_01')) return 'transportation';
  if (lessonId.includes('06_02')) return 'activities';
  if (lessonId.includes('07_01')) return 'work';
  if (lessonId.includes('07_02')) return 'work';
  
  // Fallback to category-based mapping
  const category = getCategoryFromLessonId(lessonId);
  switch (category) {
    case 'greetings': return 'greetings';
    case 'emotions': return 'emotions';
    case 'animals': return 'animals';
    case 'numbers': return 'numbers';
    case 'food': return 'food';
    case 'transportation': return 'transportation';
    case 'work': return 'work';
    default: return 'greetings';
  }
};

// Generate questions for Discover lesson type - follow 2+3 word pattern: 2 words -> 3 questions -> 3 words -> 3 questions
const generateDiscoverQuestions = (lessonId: string, videoCategory: keyof typeof VIDEO_CONTENT_MAP): LessonQuestion[] => {
  const questions: LessonQuestion[] = [];
  const videos = VIDEO_CONTENT_MAP[videoCategory];
  const videoEntries = Object.entries(videos);

  if (videoEntries.length === 0) {
    return questions;
  }

  // Pick 5 videos for 2+3 pattern (or fewer if not enough available)
  const selected = videoEntries.slice(0, Math.min(5, videoEntries.length));
  
  if (selected.length >= 2) {
    // First 2 words - Learning phase
    const firstTwoWords = selected.slice(0, 2);
    firstTwoWords.forEach(([, data], idx) => {
      questions.push(
        createContentQuestion(
          `${lessonId}-content-${idx + 1}`,
          QuestionCategories.CONTENT.CAT_1A,
          `Từ mới: ${data.label}`,
          data.video,
          data.label
        )
      );
    });
    
    // 3 questions for first 2 words
    const questionTypes = ['single', 'multiple_choice', 'cloze_answer'];
    for (let i = 0; i < 3; i++) {
      const randomWord = firstTwoWords[Math.floor(Math.random() * firstTwoWords.length)];
      const [key, data] = randomWord;
      const otherWords = selected.filter(([k]) => k !== key).slice(0, 2);
      
      const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      
      if (questionType === 'single') {
        // Single: Hiển thị tiêu đề "Video nào là từ X", chọn 1 trong 2 video
        const distractors = otherWords.slice(0, 1).map(([, d]) => ({ label: d.label, video: d.video }));
        questions.push(
          createVideoQuestion(
            `${lessonId}-single-${i + 1}`,
            QuestionCategories.SINGLE.CAT_2A,
            `Video nào là từ '${data.label}'?`,
            data.video,
            data.label,
            distractors.map(d => d.label),
            distractors.map(d => d.video)
          )
        );
      } else if (questionType === 'multiple_choice') {
        // Multiple Choice: Hiển thị 1 video, hỏi nghĩa của video đó, chọn đáp án đúng
        // Random số lượng đáp án: 2 hoặc 4
        const numOptions = Math.random() < 0.5 ? 2 : 4;
        const numDistractors = numOptions - 1; // 1 đáp án đúng + distractors
        const distractors = otherWords.slice(0, numDistractors).map(([, d]) => d.label);
        
        questions.push({
          id: `${lessonId}-multiple-${i + 1}`,
          type: 'multiple',
          category: QuestionCategories.MULTIPLE.CAT_3A,
          prompt: `Ký hiệu này có nghĩa là gì?`,
          title: data.label,
          questionParts: [{ type: 'video', url: data.video }],
          answerOptions: [
            { label: data.label, isCorrect: true },
            ...distractors.map(label => ({ label: label, isCorrect: false }))
          ],
          correctAnswer: data.label,
        });
      } else {
        // Cloze: Điền từ còn thiếu
        const distractors = otherWords.map(([, d]) => d.label);
        // Normalize function to match QuizScreen logic
        const normalize = (s: string) => s.trim().toLowerCase();
        const normalizedLabel = normalize(data.label);
        const normalizedDistractors = distractors.map(label => normalize(label));
        
        questions.push({
          id: `${lessonId}-cloze-${i + 1}`,
          type: 'cloze_answer',
          category: QuestionCategories.CLOZE_ANSWER.CAT_4A,
          prompt: `Điền từ cho ký hiệu này`,
          title: data.label,
          questionParts: [{ type: 'video', url: data.video }],
          answerOptions: [
            { label: normalizedLabel, isCorrect: true },
            ...normalizedDistractors.map(label => ({ label: label, isCorrect: false }))
          ],
          correctAnswer: normalizedLabel,
        });
      }
    }
  }
  
  if (selected.length >= 5) {
    // Next 3 words - Learning phase
    const nextThreeWords = selected.slice(2, 5);
    nextThreeWords.forEach(([, data], idx) => {
      questions.push(
        createContentQuestion(
          `${lessonId}-content-${idx + 3}`,
          QuestionCategories.CONTENT.CAT_1A,
          `Từ mới: ${data.label}`,
          data.video,
          data.label
        )
      );
    });
    
    // 3 questions for next 3 words
    const questionTypes = ['single', 'multiple_choice', 'cloze_answer'];
    for (let i = 0; i < 3; i++) {
      const randomWord = nextThreeWords[Math.floor(Math.random() * nextThreeWords.length)];
      const [key, data] = randomWord;
      const otherWords = selected.filter(([k]) => k !== key).slice(0, 2);
      
      const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      
      if (questionType === 'single') {
        // Single: Hiển thị tiêu đề "Video nào là từ X", chọn 1 trong 2 video
        const distractors = otherWords.slice(0, 1).map(([, d]) => ({ label: d.label, video: d.video }));
        questions.push(
          createVideoQuestion(
            `${lessonId}-single-${i + 4}`,
            QuestionCategories.SINGLE.CAT_2A,
            `Video nào là từ '${data.label}'?`,
            data.video,
            data.label,
            distractors.map(d => d.label),
            distractors.map(d => d.video)
          )
        );
      } else if (questionType === 'multiple_choice') {
        // Multiple Choice: Hiển thị 1 video, hỏi nghĩa của video đó, chọn đáp án đúng
        // Random số lượng đáp án: 2 hoặc 4
        const numOptions = Math.random() < 0.5 ? 2 : 4;
        const numDistractors = numOptions - 1; // 1 đáp án đúng + distractors
        const distractors = otherWords.slice(0, numDistractors).map(([, d]) => d.label);
        
        questions.push({
          id: `${lessonId}-multiple-${i + 4}`,
          type: 'multiple',
          category: QuestionCategories.MULTIPLE.CAT_3A,
          prompt: `Ký hiệu này có nghĩa là gì?`,
          title: data.label,
          questionParts: [{ type: 'video', url: data.video }],
          answerOptions: [
            { label: data.label, isCorrect: true },
            ...distractors.map(label => ({ label: label, isCorrect: false }))
          ],
          correctAnswer: data.label,
        });
      } else {
        // Cloze: Điền từ còn thiếu
        const distractors = otherWords.map(([, d]) => d.label);
        // Normalize function to match QuizScreen logic
        const normalize = (s: string) => s.trim().toLowerCase();
        const normalizedLabel = normalize(data.label);
        const normalizedDistractors = distractors.map(label => normalize(label));
        
        questions.push({
          id: `${lessonId}-cloze-${i + 4}`,
          type: 'cloze_answer',
          category: QuestionCategories.CLOZE_ANSWER.CAT_4A,
          prompt: `Điền từ cho ký hiệu này`,
          title: data.label,
          questionParts: [{ type: 'video', url: data.video }],
          answerOptions: [
            { label: normalizedLabel, isCorrect: true },
            ...normalizedDistractors.map(label => ({ label: label, isCorrect: false }))
          ],
          correctAnswer: normalizedLabel,
        });
      }
    }
  }







  return questions;
};

// Generate questions for Vokabel lesson type
const generateVokabelQuestions = (lessonId: string, videoCategory: keyof typeof VIDEO_CONTENT_MAP): LessonQuestion[] => {
  const questions: LessonQuestion[] = [];
  const videos = VIDEO_CONTENT_MAP[videoCategory];
  const videoEntries = Object.entries(videos);
  
  // Add content introduction with comprehensive vocabulary overview
  questions.push(createContentQuestion(
    `${lessonId}-intro`,
    QuestionCategories.CONTENT.CAT_1C,
    `Từ vựng ${getCategoryTitle(videoCategory)} - ${videoEntries.length} từ mới!`,
    videoEntries[0]?.[1]?.video || '',
    `Học ${videoEntries.length} từ vựng về ${getCategoryTitle(videoCategory)}`
  ));
  
  // Add vocabulary questions for ALL videos in the category (4-5+ words)
  const maxQuestions = Math.min(videoEntries.length, 7); // Cover up to 7 videos for vocabulary
  
  for (let i = 0; i < maxQuestions; i++) {
    const [key, videoData] = videoEntries[i];
    const distractors = getRandomDistractors(videoCategory, key, 3);
    
    questions.push(createVideoQuestion(
      `${lessonId}-vocab${i + 1}`,
      QuestionCategories.SINGLE.CAT_2B,
      `Từ vựng ${i + 1}/${maxQuestions}: Ký hiệu nào có nghĩa là '${videoData.label}'?`,
      videoData.video,
      videoData.label,
      distractors.map(d => d.label),
      distractors.map(d => d.video)
    ));
  }
  
  // Add vocabulary summary if there are multiple videos
  if (videoEntries.length > 1) {
    const allLabels = videoEntries.slice(0, maxQuestions).map(([, data]) => data.label).join(', ');
    questions.push(createContentQuestion(
      `${lessonId}-vocab-summary`,
      QuestionCategories.CONTENT.CAT_1C,
      `Tóm tắt từ vựng: Bạn đã học ${maxQuestions} từ mới về ${getCategoryTitle(videoCategory)}!`,
      videoEntries[0]?.[1]?.video || '',
      `Các từ vựng đã học: ${allLabels}`
    ));
  }
  
  return questions;
};

// Generate questions for Develop lesson type
const generateDevelopQuestions = (lessonId: string, videoCategory: keyof typeof VIDEO_CONTENT_MAP): LessonQuestion[] => {
  const questions: LessonQuestion[] = [];
  const videos = VIDEO_CONTENT_MAP[videoCategory];
  const videoEntries = Object.entries(videos);
  
  // Add development-focused questions
  for (let i = 0; i < Math.min(3, videoEntries.length); i++) {
    const [key, videoData] = videoEntries[i];
    const distractors = getRandomDistractors(videoCategory, key, 3);
    
    questions.push(createVideoQuestion(
      `${lessonId}-dev${i + 1}`,
      QuestionCategories.SINGLE.CAT_2C,
      `Phát triển kỹ năng: Chọn ký hiệu '${videoData.label}'!`,
      videoData.video,
      videoData.label,
      distractors.map(d => d.label),
      distractors.map(d => d.video)
    ));
  }
  
  return questions;
};

// Generate questions for Iconic lesson type
const generateIconicQuestions = (lessonId: string, videoCategory: keyof typeof VIDEO_CONTENT_MAP): LessonQuestion[] => {
  const questions: LessonQuestion[] = [];
  const videos = VIDEO_CONTENT_MAP[videoCategory];
  const videoEntries = Object.entries(videos);
  
  // Get category title for context
  const categoryTitle = getCategoryTitle(videoCategory);
  
  // Add iconic symbol questions with enhanced format
  for (let i = 0; i < Math.min(2, videoEntries.length); i++) {
    const [key, videoData] = videoEntries[i];
    const otherWords = videoEntries.filter(([k]) => k !== key).slice(0, 3);
    
    // Create iconic question with image placeholder and video
    questions.push({
      id: `${lessonId}-iconic-${i + 1}`,
      type: 'single',
      category: QuestionCategories.SINGLE.CAT_2G,
      prompt: `Ký hiệu biểu tượng ${categoryTitle}: '${videoData.label}' là gì?`,
      title: videoData.label,
      questionParts: [
        { type: 'image', content: getIconicEmoji(videoCategory) }, // Random emoji as placeholder image
        { type: 'video', url: videoData.video }
      ],
      answerOptions: [
        { label: videoData.label, isCorrect: true },
        ...otherWords.map(([, data]) => ({ label: data.label, isCorrect: false }))
      ],
      correctAnswer: videoData.label,
    });
  }
  
  return questions;
};

// Helper function to get appropriate emoji for iconic questions based on category
const getIconicEmoji = (videoCategory: keyof typeof VIDEO_CONTENT_MAP): string => {
  const emojiMap: Record<string, string> = {
    greetings: '👋',
    family: '👨‍👩‍👧‍👦',
    emotions: '😊',
    animals: '🐶',
    weather: '☀️',
    numbers: '🔢',
    shapes: '🔷',
    food: '🍎',
    objects: '📱',
    transportation: '🚗',
    work: '💼',
    complexEmotions: '😌',
    specialEmotions: '🤔',
    studyObjects: '📚',
    personalItems: '👕',
    nature: '🌿',
    environment: '🌍',
  };
  return emojiMap[videoCategory] || '🎭';
};

// Generate questions for Dialog lesson type
const generateDialogQuestions = (lessonId: string, videoCategory: keyof typeof VIDEO_CONTENT_MAP): LessonQuestion[] => {
  const questions: LessonQuestion[] = [];
  const videos = VIDEO_CONTENT_MAP[videoCategory];
  const videoEntries = Object.entries(videos);
  
  // Add dialog/context questions
  for (let i = 0; i < Math.min(3, videoEntries.length); i++) {
    const [key, videoData] = videoEntries[i];
    const distractors = getRandomDistractors(videoCategory, key, 3);
    
    questions.push(createVideoQuestion(
      `${lessonId}-dialog${i + 1}`,
      QuestionCategories.SINGLE.CAT_2D,
      `Trong hội thoại: Ký hiệu '${videoData.label}' được dùng khi nào?`,
      videoData.video,
      videoData.label,
      distractors.map(d => d.label),
      distractors.map(d => d.video)
    ));
  }
  
  return questions;
};

// Generate questions for Training lesson type
const generateTrainingQuestions = (lessonId: string, videoCategory: keyof typeof VIDEO_CONTENT_MAP): LessonQuestion[] => {
  const questions: LessonQuestion[] = [];
  const videos = VIDEO_CONTENT_MAP[videoCategory];
  const videoEntries = Object.entries(videos);
  
  if (videoEntries.length === 0) {
    return questions;
  }

  // Pick 4 videos for training (or fewer if not enough available)
  const selected = videoEntries.slice(0, Math.min(4, videoEntries.length));
  
  // Add training questions with mixed question types
  const questionTypes = ['single', 'multiple_choice', 'cloze_answer'];
  
  for (let i = 0; i < selected.length; i++) {
    const [key, videoData] = selected[i];
    const otherWords = selected.filter(([k]) => k !== key).slice(0, 3);
    const questionType = questionTypes[i % questionTypes.length]; // Cycle through question types
    
    if (questionType === 'single') {
      // Single: Hiển thị tiêu đề "Video nào là từ X", chọn 1 trong 2 video
      const distractors = otherWords.slice(0, 1).map(([, d]) => ({ label: d.label, video: d.video }));
      questions.push(
        createVideoQuestion(
          `${lessonId}-train-single-${i + 1}`,
          QuestionCategories.SINGLE.CAT_2F,
          `Luyện tập: Video nào là từ '${videoData.label}'?`,
          videoData.video,
          videoData.label,
          distractors.map(d => d.label),
          distractors.map(d => d.video)
        )
      );
    } else if (questionType === 'multiple_choice') {
      // Multiple Choice: Hiển thị 1 video, hỏi nghĩa của video đó, chọn đáp án đúng
      // Random số lượng đáp án: 2 hoặc 4
      const numOptions = Math.random() < 0.5 ? 2 : 4;
      const numDistractors = numOptions - 1; // 1 đáp án đúng + distractors
      const distractors = otherWords.slice(0, numDistractors).map(([, d]) => d.label);
      
      questions.push({
        id: `${lessonId}-train-multiple-${i + 1}`,
        type: 'multiple',
        category: QuestionCategories.MULTIPLE.CAT_3A,
        prompt: `Luyện tập: Ký hiệu này có nghĩa là gì?`,
        title: videoData.label,
        questionParts: [{ type: 'video', url: videoData.video }],
        answerOptions: [
          { label: videoData.label, isCorrect: true },
          ...distractors.map(label => ({ label: label, isCorrect: false }))
        ],
        correctAnswer: videoData.label,
      });
    } else {
      // Cloze: Điền từ còn thiếu
      const distractors = otherWords.map(([, d]) => d.label);
      // Normalize function to match QuizScreen logic
      const normalize = (s: string) => s.trim().toLowerCase();
      const normalizedLabel = normalize(videoData.label);
      const normalizedDistractors = distractors.map(label => normalize(label));
      
      questions.push({
        id: `${lessonId}-train-cloze-${i + 1}`,
        type: 'cloze_answer',
        category: QuestionCategories.CLOZE_ANSWER.CAT_4A,
        prompt: `Luyện tập: Điền từ cho ký hiệu này`,
        title: videoData.label,
        questionParts: [{ type: 'video', url: videoData.video }],
        answerOptions: [
          { label: normalizedLabel, isCorrect: true },
          ...normalizedDistractors.map(label => ({ label: label, isCorrect: false }))
        ],
        correctAnswer: normalizedLabel,
      });
    }
  }
  
  return questions;
};

// Generate questions for Review lesson type
const generateReviewQuestions = (lessonId: string, videoCategory: keyof typeof VIDEO_CONTENT_MAP): LessonQuestion[] => {
  const questions: LessonQuestion[] = [];
  const videos = VIDEO_CONTENT_MAP[videoCategory];
  const videoEntries = Object.entries(videos);
  
  // Add review questions
  for (let i = 0; i < Math.min(5, videoEntries.length); i++) {
    const [key, videoData] = videoEntries[i];
    const distractors = getRandomDistractors(videoCategory, key, 3);
    
    questions.push(createVideoQuestion(
      `${lessonId}-review${i + 1}`,
      QuestionCategories.SINGLE.CAT_2M,
      `Ôn tập: Chọn ký hiệu '${videoData.label}'!`,
      videoData.video,
      videoData.label,
      distractors.map(d => d.label),
      distractors.map(d => d.video)
    ));
  }
  
  return questions;
};

// Generate questions for Quiz lesson type - Enhanced with 4-5 new words per topic
const generateQuizQuestions = (lessonId: string, videoCategory: keyof typeof VIDEO_CONTENT_MAP): LessonQuestion[] => {
  const questions: LessonQuestion[] = [];
  const videos = VIDEO_CONTENT_MAP[videoCategory];
  const videoEntries = Object.entries(videos);
  
  // Add quiz introduction with comprehensive overview
  questions.push(createContentQuestion(
    `${lessonId}-intro`,
    QuestionCategories.CONTENT.CAT_1A,
    `Kiểm tra toàn diện: ${getCategoryTitle(videoCategory)} - ${videoEntries.length} từ mới!`,
    videoEntries[0]?.[1]?.video || '',
    `Tổng cộng ${videoEntries.length} từ vựng về ${getCategoryTitle(videoCategory)}`
  ));
  
  // Add comprehensive quiz covering ALL videos in the category (4-5+ words)
  const maxQuestions = Math.min(videoEntries.length, 8); // Cover up to 8 videos for comprehensive quiz
  
  for (let i = 0; i < maxQuestions; i++) {
    const [key, videoData] = videoEntries[i];
    const distractors = getRandomDistractors(videoCategory, key, 3);
    
    questions.push(createVideoQuestion(
      `${lessonId}-quiz${i + 1}`,
      QuestionCategories.SINGLE.CAT_2N,
      `Từ ${i + 1}/${maxQuestions}: Ký hiệu nào có nghĩa là '${videoData.label}'?`,
      videoData.video,
      videoData.label,
      distractors.map(d => d.label),
      distractors.map(d => d.video)
    ));
  }
  
  // Add summary question if there are multiple videos
  if (videoEntries.length > 1) {
    const allLabels = videoEntries.map(([, data]) => data.label).join(', ');
    questions.push(createContentQuestion(
      `${lessonId}-summary`,
      QuestionCategories.CONTENT.CAT_1C,
      `Tóm tắt: Bạn đã học ${videoEntries.length} từ mới về ${getCategoryTitle(videoCategory)}!`,
      videoEntries[0]?.[1]?.video || '',
      `Các từ đã học: ${allLabels}`
    ));
  }
  
  return questions;
};

// Generate questions for Info lesson type
const generateInfoQuestions = (lessonId: string, videoCategory: keyof typeof VIDEO_CONTENT_MAP): LessonQuestion[] => {
  const questions: LessonQuestion[] = [];
  const videos = VIDEO_CONTENT_MAP[videoCategory];
  const videoEntries = Object.entries(videos);
  
  // Add informational content
  questions.push(createContentQuestion(
    `${lessonId}-info`,
    QuestionCategories.CONTENT.CAT_1C,
    `Thông tin bổ sung về ${getCategoryTitle(videoCategory)}`,
    videoEntries[0]?.[1]?.video || '',
    getCategoryTitle(videoCategory)
  ));
  
  return questions;
};

// Generate questions for Explore lesson type
const generateExploreQuestions = (lessonId: string, videoCategory: keyof typeof VIDEO_CONTENT_MAP): LessonQuestion[] => {
  const questions: LessonQuestion[] = [];
  const videos = VIDEO_CONTENT_MAP[videoCategory];
  const videoEntries = Object.entries(videos);
  
  // Add exploration questions
  for (let i = 0; i < Math.min(4, videoEntries.length); i++) {
    const [key, videoData] = videoEntries[i];
    const distractors = getRandomDistractors(videoCategory, key, 3);
    
    questions.push(createVideoQuestion(
      `${lessonId}-explore${i + 1}`,
      QuestionCategories.SINGLE.CAT_2K,
      `Khám phá: '${videoData.label}' có ý nghĩa gì?`,
      videoData.video,
      videoData.label,
      distractors.map(d => d.label),
      distractors.map(d => d.video)
    ));
  }
  
  return questions;
};

// Helper functions
const getCategoryTitle = (videoCategory: keyof typeof VIDEO_CONTENT_MAP): string => {
  const titles = {
    greetings: 'chào hỏi',
    family: 'gia đình',
    emotions: 'cảm xúc',
    animals: 'động vật',
    numbers: 'số đếm',
    shapes: 'hình học',
    food: 'thức ăn',
    objects: 'đồ vật',
    transportation: 'giao thông',
    activities: 'hoạt động',
    weather: 'thời tiết',
    work: 'công việc',
    complexEmotions: 'cảm xúc phức tạp',
    specialEmotions: 'cảm xúc đặc biệt',
    studyObjects: 'đồ vật học tập',
    personalItems: 'đồ vật cá nhân',
    nature: 'thực vật',
    environment: 'môi trường',
  };
  return titles[videoCategory] || 'chủ đề này';
};

const getRandomDistractors = (
  videoCategory: keyof typeof VIDEO_CONTENT_MAP, 
  excludeKey: string, 
  count: number
): Array<{ label: string; video: string }> => {
  const videos = VIDEO_CONTENT_MAP[videoCategory];
  const entries = Object.entries(videos).filter(([key]) => key !== excludeKey);
  
  // Shuffle and take the requested count
  const shuffled = entries.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(([, data]) => data);
};

// Enhanced Discover Questions with shuffle and comprehensive video coverage
const generateEnhancedDiscoverQuestions = (
  lessonId: string, 
  videoCategory: keyof typeof VIDEO_CONTENT_MAP, 
  shuffledVideos: [string, { label: string; video: string }][]
): LessonQuestion[] => {
  const questions: LessonQuestion[] = [];
  
  // Add comprehensive introduction with video preview
  questions.push(createContentQuestion(
    `${lessonId}-intro`,
    QuestionCategories.CONTENT.CAT_1A,
    `Khám phá ${getCategoryTitle(videoCategory)} - ${shuffledVideos.length} từ mới với video!`,
    shuffledVideos[0]?.[1]?.video || '',
    `Học ${shuffledVideos.length} từ vựng về ${getCategoryTitle(videoCategory)} với video minh họa`
  ));
  
  // Add video-to-meaning questions (shuffled)
  const maxQuestions = Math.min(shuffledVideos.length, 8);
  
  for (let i = 0; i < maxQuestions; i++) {
    const [key, videoData] = shuffledVideos[i];
    const distractors = getRandomDistractors(videoCategory, key, 3);
    
    questions.push(createVideoQuestion(
      `${lessonId}-video-meaning-${i + 1}`,
      QuestionCategories.SINGLE.CAT_2A,
      `Video ${i + 1}/${maxQuestions}: Ký hiệu này có nghĩa là gì?`,
      videoData.video,
      videoData.label,
      distractors.map(d => d.label),
      distractors.map(d => d.video)
    ));
  }
  
  // Add meaning-to-video questions (shuffled)
  const shuffledVideos2 = [...shuffledVideos].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < Math.min(maxQuestions, 6); i++) {
    const [key, videoData] = shuffledVideos2[i];
    const distractors = getRandomDistractors(videoCategory, key, 3);
    
    questions.push(createVideoQuestion(
      `${lessonId}-meaning-video-${i + 1}`,
      QuestionCategories.SINGLE.CAT_2B,
      `Từ ${i + 1}/${Math.min(maxQuestions, 6)}: Chọn video đúng cho '${videoData.label}'!`,
      videoData.video,
      videoData.label,
      distractors.map(d => d.label),
      distractors.map(d => d.video)
    ));
  }
  
  // Add comprehensive summary with all videos
  if (shuffledVideos.length > 1) {
    const allLabels = shuffledVideos.map(([, data]) => data.label).join(', ');
    questions.push(createContentQuestion(
      `${lessonId}-discovery-summary`,
      QuestionCategories.CONTENT.CAT_1C,
      `Tóm tắt khám phá: Bạn đã học ${shuffledVideos.length} từ mới về ${getCategoryTitle(videoCategory)}!`,
      shuffledVideos[0]?.[1]?.video || '',
      `Các từ đã khám phá: ${allLabels}`
    ));
  }
  
  return questions;
};

// Enhanced Quiz Questions with shuffle and comprehensive coverage
const generateEnhancedQuizQuestions = (
  lessonId: string, 
  videoCategory: keyof typeof VIDEO_CONTENT_MAP, 
  shuffledVideos: [string, { label: string; video: string }][]
): LessonQuestion[] => {
  const questions: LessonQuestion[] = [];
  
  // Add quiz introduction with comprehensive overview
  questions.push(createContentQuestion(
    `${lessonId}-quiz-intro`,
    QuestionCategories.CONTENT.CAT_1A,
    `Kiểm tra toàn diện: ${getCategoryTitle(videoCategory)} - ${shuffledVideos.length} từ mới!`,
    shuffledVideos[0]?.[1]?.video || '',
    `Tổng cộng ${shuffledVideos.length} từ vựng về ${getCategoryTitle(videoCategory)}`
  ));
  
  // Add comprehensive quiz covering ALL videos (shuffled)
  const maxQuestions = Math.min(shuffledVideos.length, 10); // Cover up to 10 videos for comprehensive quiz
  
  for (let i = 0; i < maxQuestions; i++) {
    const [key, videoData] = shuffledVideos[i];
    const distractors = getRandomDistractors(videoCategory, key, 3);
    
    questions.push(createVideoQuestion(
      `${lessonId}-quiz-${i + 1}`,
      QuestionCategories.SINGLE.CAT_2N,
      `Quiz ${i + 1}/${maxQuestions}: Ký hiệu nào có nghĩa là '${videoData.label}'?`,
      videoData.video,
      videoData.label,
      distractors.map(d => d.label),
      distractors.map(d => d.video)
    ));
  }
  
  // Add summary question if there are multiple videos
  if (shuffledVideos.length > 1) {
    const allLabels = shuffledVideos.map(([, data]) => data.label).join(', ');
    questions.push(createContentQuestion(
      `${lessonId}-quiz-summary`,
      QuestionCategories.CONTENT.CAT_1C,
      `Tóm tắt quiz: Bạn đã học ${shuffledVideos.length} từ mới về ${getCategoryTitle(videoCategory)}!`,
      shuffledVideos[0]?.[1]?.video || '',
      `Các từ đã học: ${allLabels}`
    ));
  }
  
  return questions;
};
