// Dictionary data organized by categories with real video resources

export interface DictionaryWord {
  id: string
  word: string
  vietnamese: string
  category: string
  videoUrl: string
  emoji?: string
}

export interface DictionaryCategory {
  id: string
  name: string
  emoji: string
  color: string
}

export const dictionaryCategories: DictionaryCategory[] = [
  { id: 'all', name: 'Tất cả', emoji: '📚', color: '#3b82f6' },
  { id: 'greetings', name: 'Chào hỏi', emoji: '👋', color: '#3b82f6' },
  { id: 'emotions', name: 'Cảm xúc', emoji: '😊', color: '#ec4899' },
  { id: 'family', name: 'Gia đình', emoji: '👨‍👩‍👧', color: '#8b5cf6' },
  { id: 'numbers', name: 'Số đếm', emoji: '🔢', color: '#10b981' },
]

export const dictionaryWords: DictionaryWord[] = [
  // Greetings
  { id: 'g1', word: 'Xin chào', vietnamese: 'Xin chào', category: 'greetings', videoUrl: '/resources/videos/Chào.mp4', emoji: '👋' },
  { id: 'g2', word: 'Tạm biệt', vietnamese: 'Tạm biệt', category: 'greetings', videoUrl: '/resources/videos/tạm biệt.mp4', emoji: '👋' },
  { id: 'g3', word: 'Xin lỗi', vietnamese: 'Xin lỗi', category: 'greetings', videoUrl: '/resources/videos/xin lỗi.mp4', emoji: '🙏' },
  
  // Emotions - Basic
  { id: 'e1', word: 'Vui mừng', vietnamese: 'Tôi cảm thấy vui mừng', category: 'emotions', videoUrl: '/resources/videos/vui mừng - nam.mp4', emoji: '😊' },
  { id: 'e2', word: 'Buồn thảm', vietnamese: 'Tôi cảm thấy buồn thảm', category: 'emotions', videoUrl: '/resources/videos/buồn thảm.mp4', emoji: '😢' },
  { id: 'e3', word: 'Giận dữ', vietnamese: 'Tôi cảm thấy giận dữ', category: 'emotions', videoUrl: '/resources/videos/giận_dữ.mp4', emoji: '😠' },
  { id: 'e4', word: 'Hoảng sợ', vietnamese: 'Tôi cảm thấy hoảng sợ', category: 'emotions', videoUrl: '/resources/videos/hoảng_sợ.mp4', emoji: '😨' },
  { id: 'e5', word: 'Lo sợ', vietnamese: 'Tôi cảm thấy lo sợ', category: 'emotions', videoUrl: '/resources/videos/lo_sợ.mp4', emoji: '😰' },
  { id: 'e6', word: 'Tuyệt vọng', vietnamese: 'Tôi cảm thấy tuyệt vọng', category: 'emotions', videoUrl: '/resources/videos/tuyệt_vọng.mp4', emoji: '😞' },
  
  // Emotions - Positive
  { id: 'e7', word: 'Ngạc nhiên', vietnamese: 'Tôi cảm thấy ngạc nhiên', category: 'emotions', videoUrl: '/resources/videos/Ngạc_nhiên.mp4', emoji: '😲' },
  { id: 'e8', word: 'Cô đơn', vietnamese: 'Tôi cảm thấy cô đơn', category: 'emotions', videoUrl: '/resources/videos/cô_đơn.mp4', emoji: '😔' },
  { id: 'e9', word: 'Hồi hộp', vietnamese: 'Tôi cảm thấy hồi hộp', category: 'emotions', videoUrl: '/resources/videos/hồi_hộp.mp4', emoji: '😬' },
  { id: 'e10', word: 'Tự tin', vietnamese: 'Tôi cảm thấy tự tin', category: 'emotions', videoUrl: '/resources/videos/tự_tin.mp4', emoji: '😎' },
  { id: 'e11', word: 'Thích thú', vietnamese: 'Tôi cảm thấy thích thú', category: 'emotions', videoUrl: '/resources/videos/thích_thú.mp4', emoji: '😍' },
  { id: 'e12', word: 'Hạnh phúc', vietnamese: 'Tôi cảm thấy hạnh phúc', category: 'emotions', videoUrl: '/resources/videos/vui_mừng.mp4', emoji: '😄' },
  
  // Emotions - Negative
  { id: 'e13', word: 'Ghen tị', vietnamese: 'Tôi cảm thấy ghen tị', category: 'emotions', videoUrl: '/resources/videos/ghen_tị.mp4', emoji: '😒' },
  { id: 'e14', word: 'Bối rối', vietnamese: 'Tôi cảm thấy bối rối', category: 'emotions', videoUrl: '/resources/videos/bối_rối.mp4', emoji: '😕' },
  { id: 'e15', word: 'Giận dỗi', vietnamese: 'Tôi giận dỗi', category: 'emotions', videoUrl: '/resources/videos/giận_dỗi.mp4', emoji: '😤' },
  { id: 'e16', word: 'Nghẹn ngào', vietnamese: 'Tôi cảm thấy nghẹn ngào', category: 'emotions', videoUrl: '/resources/videos/nghẹn_ngào.mp4', emoji: '😭' },
  { id: 'e17', word: 'Nổi giận', vietnamese: 'Tôi nổi giận', category: 'emotions', videoUrl: '/resources/videos/nổi_giận.mp4', emoji: '😡' },
  
  // Family
  { id: 'f1', word: 'Bố', vietnamese: 'Người cha', category: 'family', videoUrl: '/resources/videos/bố.mp4', emoji: '👨' },
  { id: 'f2', word: 'Mẹ', vietnamese: 'Người mẹ', category: 'family', videoUrl: '/resources/videos/mẹ.mp4', emoji: '👩' },
  { id: 'f3', word: 'Cha mẹ', vietnamese: 'Bố mẹ', category: 'family', videoUrl: '/resources/videos/cha mẹ.mp4', emoji: '👨‍👩‍👧' },
  { id: 'f4', word: 'Bố mẹ', vietnamese: 'Bố mẹ', category: 'family', videoUrl: '/resources/videos/bố mẹ.mp4', emoji: '👨‍👩‍👦' },
  
  // Numbers
  { id: 'n1', word: 'Một', vietnamese: 'Số 1', category: 'numbers', videoUrl: '/resources/videos/1.mp4', emoji: '1️⃣' },
  { id: 'n2', word: 'Hai', vietnamese: 'Số 2', category: 'numbers', videoUrl: '/resources/videos/2.mp4', emoji: '2️⃣' },
  { id: 'n3', word: 'Ba', vietnamese: 'Số 3', category: 'numbers', videoUrl: '/resources/videos/3.mp4', emoji: '3️⃣' },
]

// Get words by category
export const getWordsByCategory = (categoryId: string): DictionaryWord[] => {
  if (categoryId === 'all') return dictionaryWords
  return dictionaryWords.filter(word => word.category === categoryId)
}

// Get words by search term
export const searchWords = (searchTerm: string): DictionaryWord[] => {
  const term = searchTerm.toLowerCase()
  return dictionaryWords.filter(word => 
    word.word.toLowerCase().includes(term) || 
    word.vietnamese.toLowerCase().includes(term)
  )
}

// Get words by first letter
export const getWordsByLetter = (letter: string): DictionaryWord[] => {
  if (letter === 'All') return dictionaryWords
  if (letter === 'Numbers') return dictionaryWords.filter(word => word.category === 'numbers')
  return dictionaryWords.filter(word => word.word.charAt(0).toUpperCase() === letter)
}

// Get frequently searched words (most common)
export const getFrequentWords = (): DictionaryWord[] => {
  return [
    dictionaryWords.find(w => w.id === 'g1'), // Xin chào
    dictionaryWords.find(w => w.id === 'e1'), // Vui mừng
    dictionaryWords.find(w => w.id === 'f1'), // Bố
    dictionaryWords.find(w => w.id === 'f2'), // Mẹ
    dictionaryWords.find(w => w.id === 'n1'), // Một
    dictionaryWords.find(w => w.id === 'g3'), // Xin lỗi
    dictionaryWords.find(w => w.id === 'e10'), // Tự tin
    dictionaryWords.find(w => w.id === 'e7'), // Ngạc nhiên
  ].filter(Boolean) as DictionaryWord[]
}
