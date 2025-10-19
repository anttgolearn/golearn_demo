# ReviewVocabScreen - Data Integration & Theming

## Tổng quan
ReviewVocabScreen đã được cập nhật để tích hợp với hệ thống lesson data thực tế và sử dụng màu sắc theo lesson type.

## Data Integration

### 1. Lesson Data Source
```typescript
// Lấy lesson data từ lesson structure
const lesson = getLessonById(lessonId);
const quizData = HARDCODED_QUIZZES[lessonId];

// Set lesson info cho theming
if (lesson) {
  const typeConfig = getLessonTypeConfig(lesson.type);
  setLessonInfo({
    title: lesson.title,
    type: lesson.type,
    color: typeConfig.color
  });
}
```

### 2. Vocabulary Extraction
```typescript
// Trích xuất từ vựng từ quiz questions
if (quizData && quizData.questions) {
  const vocabSet = new Set<string>();
  
  quizData.questions.forEach((question) => {
    // Extract từ question parts (video content)
    question.questionParts.forEach((part) => {
      if (part.type === 'video' && part.content) {
        vocabSet.add(part.content);
      }
    });
    
    // Extract từ answer options
    question.answerOptions.forEach((option) => {
      if (option.media?.label) {
        vocabSet.add(option.media.label);
      }
    });
  });
}
```

### 3. Helper Functions
```typescript
// Mapping từ vựng sang nghĩa
const getWordMeaning = (word: string): string => {
  const meanings: Record<string, string> = {
    'Chào': 'Lời chào cơ bản khi gặp ai đó',
    'Tạm biệt': 'Lời chào tạm biệt khi chia tay',
    // ... more mappings
  };
  return meanings[word] || `Nghĩa của từ ${word}`;
};

// Mapping từ vựng sang ví dụ
const getWordExample = (word: string): string => {
  const examples: Record<string, string> = {
    'Chào': 'Xin chào! Mình là Minh.',
    'Tạm biệt': 'Tạm biệt, hẹn gặp lại!',
    // ... more examples
  };
  return examples[word] || `Ví dụ với từ ${word}`;
};

// Mapping từ vựng sang độ khó
const getWordDifficulty = (word: string): "Dễ" | "Trung bình" | "Khó" => {
  const easyWords = ['Chào', 'Tạm biệt', 'Cảm ơn', 'Không', 'Có'];
  const mediumWords = ['Gia đình', 'Bố', 'Mẹ', 'Anh', 'Chị'];
  const hardWords = ['Giận', 'Sợ', 'Yêu'];
  
  if (easyWords.includes(word)) return "Dễ";
  if (mediumWords.includes(word)) return "Trung bình";
  if (hardWords.includes(word)) return "Khó";
  return "Dễ";
};
```

## Theming System

### 1. Lesson Type Colors
```typescript
const LESSON_TYPE_CONFIG = {
  Discover: { color: '#3B82F6', description: 'Khám phá ký hiệu mới' },
  Develop: { color: '#10B981', description: 'Phát triển kỹ năng' },
  Iconic: { color: '#F59E0B', description: 'Ký hiệu biểu tượng' },
  Dialog: { color: '#8B5CF6', description: 'Hội thoại thực tế' },
  Training: { color: '#EF4444', description: 'Luyện tập kỹ năng' },
  Review: { color: '#06B6D4', description: 'Ôn tập kiến thức' },
  Quiz: { color: '#EC4899', description: 'Kiểm tra kiến thức' },
  Vokabel: { color: '#84CC16', description: 'Học từ vựng' },
  Info: { color: '#6B7280', description: 'Thông tin bổ sung' },
  Explore: { color: '#F97316', description: 'Khám phá nâng cao' }
};
```

### 2. Dynamic Theme Colors
```typescript
const getThemeColors = () => {
  if (!lessonInfo) {
    return {
      primary: '#3B82F6', // Default blue
      primaryLight: '#DBEAFE',
      primaryDark: '#1E40AF',
      background: 'from-blue-50 to-blue-100'
    };
  }
  
  const colorMap: Record<string, any> = {
    '#3B82F6': { primary: '#3B82F6', primaryLight: '#DBEAFE', primaryDark: '#1E40AF', background: 'from-blue-50 to-blue-100' },
    '#10B981': { primary: '#10B981', primaryLight: '#D1FAE5', primaryDark: '#047857', background: 'from-emerald-50 to-emerald-100' },
    // ... more color mappings
  };
  
  return colorMap[lessonInfo.color] || colorMap['#3B82F6'];
};
```

### 3. UI Color Application
```tsx
// Background theo lesson type
<div className={`min-h-screen bg-gradient-to-br ${theme.background}`}>

// Border color cho vocabulary items
<button
  style={{ borderColor: theme.primaryLight }}
  className="w-full h-16 bg-white border rounded-xl"
>

// Play icon color
<div 
  style={{ backgroundColor: theme.primary }}
  className="w-8 h-8 rounded-full"
>

// Next lesson button color
<button
  style={{ backgroundColor: theme.primary }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = theme.primaryDark;
  }}
>
```

## Data Flow

### 1. Lesson ID → Lesson Data
```
lessonId → getLessonById() → Lesson object
lessonId → HARDCODED_QUIZZES[lessonId] → Quiz data
```

### 2. Quiz Data → Vocabulary
```
Quiz questions → Extract video content → Vocabulary list
Answer options → Extract media labels → Vocabulary list
```

### 3. Vocabulary → UI
```
Vocabulary list → Map to VocabItem → Render UI
Lesson type → Get theme colors → Apply styling
```

## Supported Lesson Types

### Discover (Blue)
- **Color**: `#3B82F6`
- **Background**: `from-blue-50 to-blue-100`
- **Use case**: Khám phá ký hiệu mới

### Develop (Emerald)
- **Color**: `#10B981`
- **Background**: `from-emerald-50 to-emerald-100`
- **Use case**: Phát triển kỹ năng

### Iconic (Amber)
- **Color**: `#F59E0B`
- **Background**: `from-amber-50 to-amber-100`
- **Use case**: Ký hiệu biểu tượng

### Dialog (Violet)
- **Color**: `#8B5CF6`
- **Background**: `from-violet-50 to-violet-100`
- **Use case**: Hội thoại thực tế

### Training (Red)
- **Color**: `#EF4444`
- **Background**: `from-red-50 to-red-100`
- **Use case**: Luyện tập kỹ năng

### Review (Cyan)
- **Color**: `#06B6D4`
- **Background**: `from-cyan-50 to-cyan-100`
- **Use case**: Ôn tập kiến thức

### Quiz (Pink)
- **Color**: `#EC4899`
- **Background**: `from-pink-50 to-pink-100`
- **Use case**: Kiểm tra kiến thức

### Vokabel (Lime)
- **Color**: `#84CC16`
- **Background**: `from-lime-50 to-lime-100`
- **Use case**: Học từ vựng

### Info (Gray)
- **Color**: `#6B7280`
- **Background**: `from-gray-50 to-gray-100`
- **Use case**: Thông tin bổ sung

### Explore (Orange)
- **Color**: `#F97316`
- **Background**: `from-orange-50 to-orange-100`
- **Use case**: Khám phá nâng cao

## Fallback System

### 1. No Lesson Data
```typescript
// Fallback to default vocabulary if no lesson data
if (vocabulary.length === 0) {
  vocabulary = [
    { id: "hello", word: "HELLO", ... },
    { id: "welcome", word: "WELCOME", ... },
    // ... default vocabulary
  ];
}
```

### 2. No Theme Data
```typescript
// Default theme if no lesson info
if (!lessonInfo) {
  return {
    primary: '#3B82F6', // Default blue
    primaryLight: '#DBEAFE',
    primaryDark: '#1E40AF',
    background: 'from-blue-50 to-blue-100'
  };
}
```

## Performance Optimizations

### 1. Memoization
```typescript
// Memoize theme colors to avoid recalculation
const theme = useMemo(() => getThemeColors(), [lessonInfo]);
```

### 2. Lazy Loading
```typescript
// Load vocabulary asynchronously
useEffect(() => {
  const loadVocabulary = async () => {
    // ... async loading logic
  };
  loadVocabulary();
}, [lessonId]);
```

### 3. Error Handling
```typescript
try {
  // Load lesson data
  const lesson = getLessonById(lessonId);
  const quizData = HARDCODED_QUIZZES[lessonId];
  // ... process data
} catch (error) {
  console.error('Error loading vocabulary:', error);
  setLoading(false);
}
```

## Future Enhancements

1. **Real API Integration**: Thay thế mock data bằng API thực
2. **Caching**: Cache vocabulary data để tăng performance
3. **Progressive Loading**: Load vocabulary theo từng batch
4. **Offline Support**: Lưu trữ vocabulary offline
5. **Analytics**: Track user interaction với vocabulary
6. **Personalization**: Customize vocabulary dựa trên user progress
7. **A/B Testing**: Test different UI layouts
8. **Accessibility**: Cải thiện hỗ trợ screen reader
