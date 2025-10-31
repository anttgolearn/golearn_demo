export type IconicImageSet = {
  correct?: string; // image for correct option
  incorrect?: string; // image for distractor option
  question?: string; // optional central question image (if needed later)
};

const FALLBACKS = {
  correct: '/assets/placeholders/iconic-correct.png',
  incorrect: '/assets/placeholders/iconic-incorrect.png',
  question: '/assets/placeholders/iconic-question.png',
};

// ========== Emotions image mapping helpers ==========
// Use dist path and encode filenames with diacritics/spaces
const EMOTIONS_DIR = '/dist/resources/images/Emotions';
const EMOTIONS_FILES: Record<string, string> = {
  'vui mừng': 'Vui mừng.png',
  'buồn thảm': 'Buồn thảm.png',
  'giận dữ': 'Giận dữ.png',
  'thích thú': 'Thích thú.png',
  'ngạc nhiên': 'Ngạc nhiên.png',
  'hoảng sợ': 'Hoảng sợ.png',
  'hồi hộp': 'Hồi hộp.png',
  'bối rối': 'Bối rối.png',
  'tự tin': 'Tự tin.png',
  'lo sợ': 'Lo sợ.png',
  'ghen tị': 'Ghen tị.png',
  'tuyệt vọng': 'Tuyệt vọng.png',
  'nghẹn ngào': 'Nghẹn ngào.png',
  'nổi giận': 'Nổi giận.png',
  'giận dỗi': 'Giận dỗi.png',
  'cô đơn': 'Cô đơn.png',
};

const EMOTIONS_LABELS = Object.keys(EMOTIONS_FILES);

function buildEmotionPath(label: string): string {
  const file = EMOTIONS_FILES[(label || '').trim().toLowerCase()];
  return file ? `${EMOTIONS_DIR}/${encodeURIComponent(file)}` : FALLBACKS.correct;
}

export function emotionCorrect(label: string): string {
  return buildEmotionPath(label);
}

export function emotionIncorrect(label: string): string {
  const key = (label || '').trim().toLowerCase();
  const others = EMOTIONS_LABELS.filter(l => l !== key);
  if (others.length === 0) return FALLBACKS.incorrect;
  const pick = others[Math.floor(Math.random() * others.length)];
  return buildEmotionPath(pick);
}

// User-editable image bank: map by label (lowercase, accents allowed) or custom keys
// Example:
//   'hoảng sợ': { correct: '/uploads/iconic/hoang-so-correct.jpg', incorrect: '/uploads/iconic/hoang-so-wrong.jpg' }
//   'tạm biệt': { correct: '/uploads/iconic/tam-biet-1.jpg' }
export const ICONIC_IMAGE_BANK: Record<string, IconicImageSet> = {
  // Seed few examples; replace with your own uploads
  'chào hỏi': {
    correct: '/uploads/iconic/chao-hoi-correct.jpg',
    incorrect: '/uploads/iconic/chao-hoi-wrong.jpg',
  },
  'tạm biệt': {
    correct: '/uploads/iconic/tam-biet-correct.jpg',
    incorrect: '/uploads/iconic/tam-biet-wrong.jpg',
  },
  'xin lỗi': {
    correct: '/uploads/iconic/xin-loi-correct.jpg',
    incorrect: '/uploads/iconic/xin-loi-wrong.jpg',
  },
  'cảm ơn': {
    correct: '/uploads/iconic/cam-on-correct.jpg',
    incorrect: '/uploads/iconic/cam-on-wrong.jpg',
  },
  'xin chào': {
    correct: '/uploads/iconic/xin-chao-correct.jpg',
    incorrect: '/uploads/iconic/xin-chao-wrong.jpg',
  },
  'bố': {
    correct: '/uploads/iconic/bo-correct.jpg',
    incorrect: '/uploads/iconic/bo-wrong.jpg',
  },
  'mẹ': {
    correct: '/uploads/iconic/me-correct.jpg',
    incorrect: '/uploads/iconic/me-wrong.jpg',
  },
  'bố mẹ': {
    correct: '/uploads/iconic/bo-me-correct.jpg',
    incorrect: '/uploads/iconic/bo-me-wrong.jpg',
  },
  'cô giáo': {
    correct: '/uploads/iconic/co-giao-correct.jpg',
    incorrect: '/uploads/iconic/co-giao-wrong.jpg',
  },
  'bảng học sinh': {
    correct: '/uploads/iconic/bang-hoc-sinh-correct.jpg',
    incorrect: '/uploads/iconic/bang-hoc-sinh-wrong.jpg',
  },













  'vui mừng': { correct: emotionCorrect('vui mừng'), incorrect: emotionIncorrect('vui mừng') },
  'buồn thảm': { correct: emotionCorrect('buồn thảm'), incorrect: emotionIncorrect('buồn thảm') },
  'giận dữ': { correct: emotionCorrect('giận dữ'), incorrect: emotionIncorrect('giận dữ') },
  'thích thú': { correct: emotionCorrect('thích thú'), incorrect: emotionIncorrect('thích thú') },
  'ngạc nhiên': { correct: emotionCorrect('ngạc nhiên'), incorrect: emotionIncorrect('ngạc nhiên') },
  'hoảng sợ': { correct: emotionCorrect('hoảng sợ'), incorrect: emotionIncorrect('hoảng sợ') },
  'hồi hộp': { correct: emotionCorrect('hồi hộp'), incorrect: emotionIncorrect('hồi hộp') },
  'bối rối': { correct: emotionCorrect('bối rối'), incorrect: emotionIncorrect('bối rối') },
  'tự tin': { correct: emotionCorrect('tự tin'), incorrect: emotionIncorrect('tự tin') },
  'lo sợ': { correct: emotionCorrect('lo sợ'), incorrect: emotionIncorrect('lo sợ') },
  'ghen tị': { correct: emotionCorrect('ghen tị'), incorrect: emotionIncorrect('ghen tị') },
  'tuyệt vọng': { correct: emotionCorrect('tuyệt vọng'), incorrect: emotionIncorrect('tuyệt vọng') },
  'nghẹn ngào': { correct: emotionCorrect('nghẹn ngào'), incorrect: emotionIncorrect('nghẹn ngào') },
  'nổi giận': { correct: emotionCorrect('nổi giận'), incorrect: emotionIncorrect('nổi giận') },
  'giận dỗi': { correct: emotionCorrect('giận dỗi'), incorrect: emotionIncorrect('giận dỗi') },
  'cô đơn': { correct: emotionCorrect('cô đơn'), incorrect: emotionIncorrect('cô đơn') },





  
  'con chó': {
    correct: '/uploads/iconic/con-cho-correct.jpg',
    incorrect: '/uploads/iconic/con-cho-wrong.jpg',
  },
  'con mèo': {
    correct: '/uploads/iconic/con-meo-correct.jpg',
    incorrect: '/uploads/iconic/con-meo-wrong.jpg',
  },
  'con gà': {
    correct: '/uploads/iconic/con-ga-correct.jpg',
    incorrect: '/uploads/iconic/con-ga-wrong.jpg',
  },
  'số 1': {
    correct: '/uploads/iconic/so-1-correct.jpg',
    incorrect: '/uploads/iconic/so-1-wrong.jpg',
  },
  'số 2': {
    correct: '/uploads/iconic/so-2-correct.jpg',
    incorrect: '/uploads/iconic/so-2-wrong.jpg',
  },
  'số 3': {
    correct: '/uploads/iconic/so-3-correct.jpg',
    incorrect: '/uploads/iconic/so-3-wrong.jpg',
  },
  'hình tam giác': {
    correct: '/uploads/iconic/hinh-tam-giac-correct.jpg',
    incorrect: '/uploads/iconic/hinh-tam-giac-wrong.jpg',
  },
  'hình tròn': {
    correct: '/uploads/iconic/hinh-tron-correct.jpg',
    incorrect: '/uploads/iconic/hinh-tron-wrong.jpg',
  },
  'hình vuông': {
    correct: '/uploads/iconic/hinh-vuong-correct.jpg',
    incorrect: '/uploads/iconic/hinh-vuong-wrong.jpg',
  },
  'màu đỏ': {
    correct: '/uploads/iconic/mau-do-correct.jpg',
    incorrect: '/uploads/iconic/mau-do-wrong.jpg',
  },
  'cơm': {
    correct: '/uploads/iconic/com-correct.jpg',
    incorrect: '/uploads/iconic/com-wrong.jpg',
  },
  'phở': {
    correct: '/uploads/iconic/pho-correct.jpg',
    incorrect: '/uploads/iconic/pho-wrong.jpg',
  },
  'cái bánh mì': {
    correct: '/uploads/iconic/cai-banh-mi-correct.jpg',
    incorrect: '/uploads/iconic/cai-banh-mi-wrong.jpg',
  },
  'cái bát': {
    correct: '/uploads/iconic/cai-bat-correct.jpg',
    incorrect: '/uploads/iconic/cai-bat-wrong.jpg',
  },
  'cái chảo': {
    correct: '/uploads/iconic/cai-chao-correct.jpg',
    incorrect: '/uploads/iconic/cai-chao-wrong.jpg',
  },
  'cái nồi': {
    correct: '/uploads/iconic/cai-noi-correct.jpg',
    incorrect: '/uploads/iconic/cai-noi-wrong.jpg',
  },
  'cây bút': {
    correct: '/uploads/iconic/cay-but-correct.jpg',
    incorrect: '/uploads/iconic/cay-but-wrong.jpg',
  },
  'quyển sách': {
    correct: '/uploads/iconic/quyen-sach-correct.jpg',
    incorrect: '/uploads/iconic/quyen-sach-wrong.jpg',
  },
  'cửa sổ': {
    correct: '/uploads/iconic/cua-so-correct.jpg',
    incorrect: '/uploads/iconic/cua-so-wrong.jpg',
  },
  'lá cây': {
    correct: '/uploads/iconic/la-cay-correct.jpg',
    incorrect: '/uploads/iconic/la-cay-wrong.jpg',
  },
  'quần bò': {
    correct: '/uploads/iconic/quan-bo-correct.jpg',
    incorrect: '/uploads/iconic/quan-bo-wrong.jpg',
  },
  'cái áo': {
    correct: '/uploads/iconic/cai-ao-correct.jpg',
    incorrect: '/uploads/iconic/cai-ao-wrong.jpg',
  },
  'ô tô': {
    correct: '/uploads/iconic/o-to-correct.jpg',
    incorrect: '/uploads/iconic/o-to-wrong.jpg',
  },
  'xe máy': {
    correct: '/uploads/iconic/xe-may-correct.jpg',
    incorrect: '/uploads/iconic/xe-may-wrong.jpg',
  },
  'tàu hỏa': {
    correct: '/uploads/iconic/tau-hoa-correct.jpg',
    incorrect: '/uploads/iconic/tau-hoa-wrong.jpg',
  },
  'đá bóng': {
    correct: '/uploads/iconic/da-bong-correct.jpg',
    incorrect: '/uploads/iconic/da-bong-wrong.jpg',
  },
  'đàn ghi ta': {
    correct: '/uploads/iconic/dan-ghi-ta-correct.jpg',
    incorrect: '/uploads/iconic/dan-ghi-ta-wrong.jpg',
  },
  'giấc ngủ': {
    correct: '/uploads/iconic/giac-ngu-correct.jpg',
    incorrect: '/uploads/iconic/giac-ngu-wrong.jpg',
  },
  'mùa hè': {
    correct: '/uploads/iconic/mua-he-correct.jpg',
    incorrect: '/uploads/iconic/mua-he-wrong.jpg',
  },
  'mùa đông': {
    correct: '/uploads/iconic/mua-dong-correct.jpg',
    incorrect: '/uploads/iconic/mua-dong-wrong.jpg',
  },
  'mùa thu': {
    correct: '/uploads/iconic/mua-thu-correct.jpg',
    incorrect: '/uploads/iconic/mua-thu-wrong.jpg',
  },
  'mưa phùn': {
    correct: '/uploads/iconic/mua-phun-correct.jpg',
    incorrect: '/uploads/iconic/mua-phun-wrong.jpg',
  },
  'sáng': {
    correct: '/uploads/iconic/sang-correct.jpg',
    incorrect: '/uploads/iconic/sang-wrong.jpg',
  },
  'buổi sáng': {
    correct: '/uploads/iconic/buoi-sang-correct.jpg',
    incorrect: '/uploads/iconic/buoi-sang-wrong.jpg',
  },
  'buổi chiều': {
    correct: '/uploads/iconic/buoi-chieu-correct.jpg',
    incorrect: '/uploads/iconic/buoi-chieu-wrong.jpg',
  },
  'cái máy in': {
    correct: '/uploads/iconic/cai-may-in-correct.jpg',
    incorrect: '/uploads/iconic/cai-may-in-wrong.jpg',
  },
  'tờ tiền': {
    correct: '/uploads/iconic/to-tien-correct.jpg',
    incorrect: '/uploads/iconic/to-tien-wrong.jpg',
  },
};

export const getImageSet = (label: string): Required<IconicImageSet> => {
  const key = (label || '').trim().toLowerCase();
  const entry = ICONIC_IMAGE_BANK[key] || {};
  return {
    correct: entry.correct || FALLBACKS.correct,
    incorrect: entry.incorrect || FALLBACKS.incorrect,
    question: entry.question || FALLBACKS.question,
  };
};


