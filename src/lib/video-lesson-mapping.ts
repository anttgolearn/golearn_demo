// Video lesson mapping utility for organizing quiz content by categories

export interface VideoLesson {
  id: string;
  label: string;
  videoSrc: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  relatedVideos: string[]; // IDs of related videos for distractors
}

export const VIDEO_CATEGORIES = {
  GREETINGS: 'greetings',
  FAMILY: 'family',
  EMOTIONS: 'emotions',
  ANIMALS: 'animals',
  NUMBERS: 'numbers',
  SHAPES_COLORS: 'shapes_colors',
  FOOD: 'food',
  OBJECTS: 'objects',
  TRANSPORTATION: 'transportation',
  ACTIVITIES: 'activities',
  SCHOOL: 'school',
  WORK: 'work',
  WEATHER: 'weather',
  TIME: 'time',
} as const;

export const VIDEO_LESSONS: VideoLesson[] = [
  // Greetings and Basic Communication
  { id: 'chao', label: 'Chào', videoSrc: '/resources/videos/Chào.mp4', category: VIDEO_CATEGORIES.GREETINGS, difficulty: 'easy', relatedVideos: ['tam-biet', 'xin-loi'] },
  { id: 'tam-biet', label: 'Tạm biệt', videoSrc: '/resources/videos/tạm biệt.mp4', category: VIDEO_CATEGORIES.GREETINGS, difficulty: 'easy', relatedVideos: ['chao', 'xin-loi'] },
  { id: 'xin-loi', label: 'Xin lỗi', videoSrc: '/resources/videos/xin lỗi.mp4', category: VIDEO_CATEGORIES.GREETINGS, difficulty: 'easy', relatedVideos: ['chao', 'tam-biet'] },

  // Family and Relationships
  { id: 'bo', label: 'Bố', videoSrc: '/resources/videos/bố.mp4', category: VIDEO_CATEGORIES.FAMILY, difficulty: 'easy', relatedVideos: ['me', 'cha-me'] },
  { id: 'me', label: 'Mẹ', videoSrc: '/resources/videos/mẹ.mp4', category: VIDEO_CATEGORIES.FAMILY, difficulty: 'easy', relatedVideos: ['bo', 'cha-me'] },
  { id: 'cha-me', label: 'Cha mẹ', videoSrc: '/resources/videos/cha mẹ.mp4', category: VIDEO_CATEGORIES.FAMILY, difficulty: 'medium', relatedVideos: ['bo', 'me', 'bo-me'] },
  { id: 'bo-me', label: 'Bố mẹ', videoSrc: '/resources/videos/bố mẹ.mp4', category: VIDEO_CATEGORIES.FAMILY, difficulty: 'medium', relatedVideos: ['cha-me', 'bo', 'me'] },
  { id: 'co-giao', label: 'Cô giáo', videoSrc: '/resources/videos/cô giáo.mp4', category: VIDEO_CATEGORIES.SCHOOL, difficulty: 'medium', relatedVideos: ['bang-hoc-sinh'] },
  { id: 'bang-hoc-sinh', label: 'Bảng học sinh', videoSrc: '/resources/videos/bảng học sinh.mp4', category: VIDEO_CATEGORIES.SCHOOL, difficulty: 'hard', relatedVideos: ['co-giao'] },

  // Emotions and Feelings
  { id: 'vui-mung', label: 'Vui mừng', videoSrc: '/resources/videos/vui_mừng.mp4', category: VIDEO_CATEGORIES.EMOTIONS, difficulty: 'easy', relatedVideos: ['buon-tham', 'thich-thu'] },
  { id: 'buon-tham', label: 'Buồn thảm', videoSrc: '/resources/videos/buồn thảm.mp4', category: VIDEO_CATEGORIES.EMOTIONS, difficulty: 'medium', relatedVideos: ['vui-mung', 'tuyet-vong'] },
  { id: 'gian-du', label: 'Giận dữ', videoSrc: '/resources/videos/giận_dữ.mp4', category: VIDEO_CATEGORIES.EMOTIONS, difficulty: 'medium', relatedVideos: ['noi-gian', 'gian-doi'] },
  { id: 'thich-thu', label: 'Thích thú', videoSrc: '/resources/videos/thích_thú.mp4', category: VIDEO_CATEGORIES.EMOTIONS, difficulty: 'easy', relatedVideos: ['vui-mung', 'ngac-nhien'] },
  { id: 'ngac-nhien', label: 'Ngạc nhiên', videoSrc: '/resources/videos/Ngạc_nhiên.mp4', category: VIDEO_CATEGORIES.EMOTIONS, difficulty: 'medium', relatedVideos: ['thich-thu', 'hoang-so'] },
  { id: 'hoang-so', label: 'Hoảng sợ', videoSrc: '/resources/videos/hoảng_sợ.mp4', category: VIDEO_CATEGORIES.EMOTIONS, difficulty: 'medium', relatedVideos: ['ngac-nhien', 'lo-so'] },
  { id: 'hoi-hop', label: 'Hồi hộp', videoSrc: '/resources/videos/hồi_hộp.mp4', category: VIDEO_CATEGORIES.EMOTIONS, difficulty: 'hard', relatedVideos: ['boi-roi', 'lo-so'] },
  { id: 'boi-roi', label: 'Bối rối', videoSrc: '/resources/videos/bối rối.mp4', category: VIDEO_CATEGORIES.EMOTIONS, difficulty: 'hard', relatedVideos: ['hoi-hop', 'co-don'] },
  { id: 'tu-tin', label: 'Tự tin', videoSrc: '/resources/videos/tự_tin.mp4', category: VIDEO_CATEGORIES.EMOTIONS, difficulty: 'hard', relatedVideos: ['lo-so', 'co-don'] },
  { id: 'lo-so', label: 'Lo sợ', videoSrc: '/resources/videos/lo_sợ.mp4', category: VIDEO_CATEGORIES.EMOTIONS, difficulty: 'medium', relatedVideos: ['tu-tin', 'hoang-so'] },
  { id: 'ghen-ti', label: 'Ghen tị', videoSrc: '/resources/videos/ghen_tị.mp4', category: VIDEO_CATEGORIES.EMOTIONS, difficulty: 'hard', relatedVideos: ['thich-thu', 'tuyet-vong'] },
  { id: 'tuyet-vong', label: 'Tuyệt vọng', videoSrc: '/resources/videos/tuyệt_vọng.mp4', category: VIDEO_CATEGORIES.EMOTIONS, difficulty: 'hard', relatedVideos: ['buon-tham', 'ghen-ti'] },
  { id: 'nghen-ngao', label: 'Nghẹn ngào', videoSrc: '/resources/videos/nghẹn_ngào.mp4', category: VIDEO_CATEGORIES.EMOTIONS, difficulty: 'hard', relatedVideos: ['tuyet-vong', 'co-don'] },
  { id: 'noi-gian', label: 'Nổi giận', videoSrc: '/resources/videos/nổi_giận.mp4', category: VIDEO_CATEGORIES.EMOTIONS, difficulty: 'medium', relatedVideos: ['gian-du', 'gian-doi'] },
  { id: 'gian-doi', label: 'Giận dỗi', videoSrc: '/resources/videos/giận_dỗi.mp4', category: VIDEO_CATEGORIES.EMOTIONS, difficulty: 'medium', relatedVideos: ['gian-du', 'noi-gian'] },
  { id: 'co-don', label: 'Cô đơn', videoSrc: '/resources/videos/cô đơn.mp4', category: VIDEO_CATEGORIES.EMOTIONS, difficulty: 'hard', relatedVideos: ['boi-roi', 'tuyet-vong'] },

  // Animals
  { id: 'con-cho', label: 'Con chó', videoSrc: '/resources/videos/con chó.mp4', category: VIDEO_CATEGORIES.ANIMALS, difficulty: 'easy', relatedVideos: ['con-meo', 'con-ga'] },
  { id: 'con-meo', label: 'Con mèo', videoSrc: '/resources/videos/con mèo.mp4', category: VIDEO_CATEGORIES.ANIMALS, difficulty: 'easy', relatedVideos: ['con-cho', 'con-ga'] },
  { id: 'con-ga', label: 'Con gà', videoSrc: '/resources/videos/con gà.mp4', category: VIDEO_CATEGORIES.ANIMALS, difficulty: 'easy', relatedVideos: ['con-cho', 'con-meo'] },

  // Numbers
  { id: 'so-1', label: 'Số 1', videoSrc: '/resources/videos/số 1.mp4', category: VIDEO_CATEGORIES.NUMBERS, difficulty: 'easy', relatedVideos: ['so-2', 'so-3'] },
  { id: 'so-2', label: 'Số 2', videoSrc: '/resources/videos/số 2.mp4', category: VIDEO_CATEGORIES.NUMBERS, difficulty: 'easy', relatedVideos: ['so-1', 'so-3'] },
  { id: 'so-3', label: 'Số 3', videoSrc: '/resources/videos/số 3.mp4', category: VIDEO_CATEGORIES.NUMBERS, difficulty: 'easy', relatedVideos: ['so-1', 'so-2'] },

  // Shapes and Colors
  { id: 'hinh-tam-giac', label: 'Hình tam giác', videoSrc: '/resources/videos/hình tam giác.mp4', category: VIDEO_CATEGORIES.SHAPES_COLORS, difficulty: 'medium', relatedVideos: ['hinh-tron', 'hinh-vuong'] },
  { id: 'hinh-tron', label: 'Hình tròn', videoSrc: '/resources/videos/hình tròn.mp4', category: VIDEO_CATEGORIES.SHAPES_COLORS, difficulty: 'medium', relatedVideos: ['hinh-tam-giac', 'hinh-vuong'] },
  { id: 'hinh-vuong', label: 'Hình vuông', videoSrc: '/resources/videos/hình vuông.mp4', category: VIDEO_CATEGORIES.SHAPES_COLORS, difficulty: 'medium', relatedVideos: ['hinh-tron', 'hinh-tam-giac'] },
  { id: 'mau-do', label: 'Màu đỏ', videoSrc: '/resources/videos/Màu đỏ.mp4', category: VIDEO_CATEGORIES.SHAPES_COLORS, difficulty: 'easy', relatedVideos: ['hinh-tron', 'hinh-vuong'] },

  // Food
  { id: 'com', label: 'Cơm', videoSrc: '/resources/videos/cơm.mp4', category: VIDEO_CATEGORIES.FOOD, difficulty: 'easy', relatedVideos: ['pho', 'cai-banh-mi'] },
  { id: 'pho', label: 'Phở', videoSrc: '/resources/videos/Phở.mp4', category: VIDEO_CATEGORIES.FOOD, difficulty: 'easy', relatedVideos: ['com', 'cai-banh-mi'] },
  { id: 'cai-banh-mi', label: 'Cái bánh mì', videoSrc: '/resources/videos/cái bánh mì.mp4', category: VIDEO_CATEGORIES.FOOD, difficulty: 'medium', relatedVideos: ['com', 'pho'] },
  { id: 'cai-bat', label: 'Cái bát', videoSrc: '/resources/videos/cái bát.mp4', category: VIDEO_CATEGORIES.OBJECTS, difficulty: 'medium', relatedVideos: ['cai-chao', 'cai-noi'] },

  // Objects
  { id: 'cai-chao', label: 'Cái chảo', videoSrc: '/resources/videos/Cái chảo.mp4', category: VIDEO_CATEGORIES.OBJECTS, difficulty: 'medium', relatedVideos: ['cai-bat', 'cai-noi'] },
  { id: 'cai-noi', label: 'Cái nồi', videoSrc: '/resources/videos/Cái nồi.mp4', category: VIDEO_CATEGORIES.OBJECTS, difficulty: 'medium', relatedVideos: ['cai-chao', 'cai-bat'] },
  { id: 'cay-but', label: 'Cây bút', videoSrc: '/resources/videos/cây bút.mp4', category: VIDEO_CATEGORIES.OBJECTS, difficulty: 'easy', relatedVideos: ['quyen-sach'] },
  { id: 'quyen-sach', label: 'Quyển sách', videoSrc: '/resources/videos/Quyển sách.mp4', category: VIDEO_CATEGORIES.OBJECTS, difficulty: 'easy', relatedVideos: ['cay-but'] },
  { id: 'cua-so', label: 'Cửa sổ', videoSrc: '/resources/videos/cửa sổ.mp4', category: VIDEO_CATEGORIES.OBJECTS, difficulty: 'easy', relatedVideos: ['la-cay'] },
  { id: 'la-cay', label: 'Lá cây', videoSrc: '/resources/videos/Lá cây.mp4', category: VIDEO_CATEGORIES.OBJECTS, difficulty: 'easy', relatedVideos: ['cua-so'] },
  { id: 'quan-bo', label: 'Quần bò', videoSrc: '/resources/videos/Quần bò.mp4', category: VIDEO_CATEGORIES.OBJECTS, difficulty: 'medium', relatedVideos: ['cai-ao'] },
  { id: 'cai-ao', label: 'Cái áo', videoSrc: '/resources/videos/cái áo.mp4', category: VIDEO_CATEGORIES.OBJECTS, difficulty: 'easy', relatedVideos: ['quan-bo'] },

  // Transportation
  { id: 'o-to', label: 'Ô tô', videoSrc: '/resources/videos/ô tô.mp4', category: VIDEO_CATEGORIES.TRANSPORTATION, difficulty: 'easy', relatedVideos: ['xe-may', 'tau-hoa'] },
  { id: 'xe-may', label: 'Xe máy', videoSrc: '/resources/videos/xe máy.mp4', category: VIDEO_CATEGORIES.TRANSPORTATION, difficulty: 'easy', relatedVideos: ['o-to', 'tau-hoa'] },
  { id: 'tau-hoa', label: 'Tàu hỏa', videoSrc: '/resources/videos/tàu hỏa.mp4', category: VIDEO_CATEGORIES.TRANSPORTATION, difficulty: 'medium', relatedVideos: ['o-to', 'xe-may'] },

  // Activities
  { id: 'da-bong', label: 'Đá bóng', videoSrc: '/resources/videos/đá bóng.mp4', category: VIDEO_CATEGORIES.ACTIVITIES, difficulty: 'easy', relatedVideos: ['dan-ghi-ta', 'giac-ngu'] },
  { id: 'dan-ghi-ta', label: 'Đàn ghi ta', videoSrc: '/resources/videos/đàn ghi ta.mp4', category: VIDEO_CATEGORIES.ACTIVITIES, difficulty: 'medium', relatedVideos: ['da-bong', 'giac-ngu'] },
  { id: 'giac-ngu', label: 'Giấc ngủ', videoSrc: '/resources/videos/giấc ngủ.mp4', category: VIDEO_CATEGORIES.ACTIVITIES, difficulty: 'easy', relatedVideos: ['da-bong', 'dan-ghi-ta'] },

  // Weather and Time
  { id: 'mua-he', label: 'Mùa hè', videoSrc: '/resources/videos/Mùa hè.mp4', category: VIDEO_CATEGORIES.WEATHER, difficulty: 'easy', relatedVideos: ['mua-dong', 'mua-thu'] },
  { id: 'mua-dong', label: 'Mùa đông', videoSrc: '/resources/videos/Mùa đông.mp4', category: VIDEO_CATEGORIES.WEATHER, difficulty: 'easy', relatedVideos: ['mua-he', 'mua-thu'] },
  { id: 'mua-thu', label: 'Mùa thu', videoSrc: '/resources/videos/mùa thu.mp4', category: VIDEO_CATEGORIES.WEATHER, difficulty: 'easy', relatedVideos: ['mua-he', 'mua-dong'] },
  { id: 'mua-phun', label: 'Mưa phùn', videoSrc: '/resources/videos/mưa phùn.mp4', category: VIDEO_CATEGORIES.WEATHER, difficulty: 'medium', relatedVideos: ['sang'] },
  { id: 'sang', label: 'Sáng', videoSrc: '/resources/videos/sáng.mp4', category: VIDEO_CATEGORIES.TIME, difficulty: 'easy', relatedVideos: ['mua-phun', 'buoi-sang'] },
  { id: 'buoi-sang', label: 'Buổi sáng', videoSrc: '/resources/videos/buổi sáng.mp4', category: VIDEO_CATEGORIES.TIME, difficulty: 'medium', relatedVideos: ['sang', 'buoi-chieu'] },
  { id: 'buoi-chieu', label: 'Buổi chiều', videoSrc: '/resources/videos/buổi chiều.mp4', category: VIDEO_CATEGORIES.TIME, difficulty: 'medium', relatedVideos: ['buoi-sang', 'sang'] },

  // Work and Money
  { id: 'cai-may-in', label: 'Cái máy in', videoSrc: '/resources/videos/Cái máy in.mp4', category: VIDEO_CATEGORIES.WORK, difficulty: 'hard', relatedVideos: ['to-tien'] },
  { id: 'to-tien', label: 'Tờ tiền', videoSrc: '/resources/videos/tờ tiền.mp4', category: VIDEO_CATEGORIES.WORK, difficulty: 'medium', relatedVideos: ['cai-may-in'] },
];

// Utility functions for lesson generation
export const getVideosByCategory = (category: string): VideoLesson[] => {
  return VIDEO_LESSONS.filter(video => video.category === category);
};

export const getVideosByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): VideoLesson[] => {
  return VIDEO_LESSONS.filter(video => video.difficulty === difficulty);
};

export const getRelatedVideos = (videoId: string, count: number = 3): VideoLesson[] => {
  const video = VIDEO_LESSONS.find(v => v.id === videoId);
  if (!video) return [];
  
  return video.relatedVideos
    .map(id => VIDEO_LESSONS.find(v => v.id === id))
    .filter((v): v is VideoLesson => v !== undefined)
    .slice(0, count);
};

export const generateQuestionOptions = (correctVideoId: string, category?: string): VideoLesson[] => {
  const correctVideo = VIDEO_LESSONS.find(v => v.id === correctVideoId);
  if (!correctVideo) return [];
  
  // Get related videos as distractors
  const distractors = getRelatedVideos(correctVideoId, 3);
  
  // If we need more options, get random videos from same category or difficulty
  if (distractors.length < 3) {
    const categoryVideos = category 
      ? getVideosByCategory(category).filter(v => v.id !== correctVideoId)
      : getVideosByDifficulty(correctVideo.difficulty).filter(v => v.id !== correctVideoId);
    
    const additionalDistractors = categoryVideos
      .filter(v => !distractors.some(d => d.id === v.id))
      .slice(0, 3 - distractors.length);
    
    distractors.push(...additionalDistractors);
  }
  
  // Return correct video + distractors (shuffled)
  const allOptions = [correctVideo, ...distractors.slice(0, 3)];
  return allOptions.sort(() => Math.random() - 0.5);
};

export const getLessonContent = (lessonType: 'discover' | 'vokabel' | 'practice' | 'milestone', category?: string) => {
  const categories = category ? [category] : Object.values(VIDEO_CATEGORIES);
  let selectedVideos: VideoLesson[] = [];
  
  switch (lessonType) {
    case 'discover':
      // Mix of easy and medium difficulty videos
      selectedVideos = categories.flatMap(cat => 
        getVideosByCategory(cat).filter(v => ['easy', 'medium'].includes(v.difficulty))
      );
      break;
    case 'vokabel':
      // Focus on medium difficulty for vocabulary building
      selectedVideos = categories.flatMap(cat => 
        getVideosByCategory(cat).filter(v => v.difficulty === 'medium')
      );
      break;
    case 'practice':
      // Mix of all difficulties for comprehensive practice
      selectedVideos = categories.flatMap(cat => getVideosByCategory(cat));
      break;
    case 'milestone':
      // Focus on hard difficulty for challenging assessment
      selectedVideos = categories.flatMap(cat => 
        getVideosByCategory(cat).filter(v => ['medium', 'hard'].includes(v.difficulty))
      );
      break;
  }
  
  return selectedVideos;
};
