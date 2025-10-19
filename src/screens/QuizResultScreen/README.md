# Quiz Result Screen - UI Correct/Incorrect

## Tổng quan
Màn hình Quiz Result hiển thị kết quả chi tiết của bài quiz với UI rõ ràng cho từng câu hỏi đúng/sai.

## Các màn hình Result

### 1. QuizResultDetailScreen (Màn hình chính)
**File**: `src/screens/QuizResultScreen/QuizResultDetailScreen.tsx`

#### Tính năng:
- **Score Display**: Hiển thị điểm số tổng thể với animation
- **Score Message**: Thông báo động dựa trên điểm số
- **Toggle Details**: Nút "Xem chi tiết từng câu" để hiển thị/ẩn chi tiết
- **Question Results**: Danh sách chi tiết từng câu hỏi

#### UI Correct/Incorrect:

##### **Correct Answer (Câu đúng):**
```tsx
// Styling
className="border-green-200 bg-green-50 hover:bg-green-100"

// Icon & Text
<span className="text-3xl">✅</span>
<span className="text-green-600">Đúng</span>

// Answer Badge
className="bg-green-100 text-green-800"
```

##### **Incorrect Answer (Câu sai):**
```tsx
// Styling  
className="border-red-200 bg-red-50 hover:bg-red-100"

// Icon & Text
<span className="text-3xl">❌</span>
<span className="text-red-600">Sai</span>

// Answer Badge
className="bg-red-100 text-red-800"
```

### 2. ReviewVocabScreen (Màn hình từ vựng)
**File**: `src/screens/ReviewVocabScreen/ReviewVocabScreen.tsx`

#### UI Correct/Incorrect cho từ vựng:

##### **Correct Vocabulary:**
```tsx
// Card Styling
className="border-green-200 bg-green-50 hover:bg-green-100"

// Icon
{getCorrectnessIcon(item.isCorrect)} // Returns "✅"

// Status Text
"Đúng"
```

##### **Incorrect Vocabulary:**
```tsx
// Card Styling
className="border-red-200 bg-red-50 hover:bg-red-100"

// Icon  
{getCorrectnessIcon(item.isCorrect)} // Returns "❌"

// Status Text
"Sai"
```

##### **Unanswered:**
```tsx
// Card Styling
className="border-gray-200 bg-white hover:bg-gray-50"

// Icon
{getCorrectnessIcon(item.isCorrect)} // Returns "❓"

// Status Text
"Chưa trả lời"
```

## CSS Styling

### ReviewVocabScreen.css
```css
/* Correct answer styling */
.vocab-card.correct {
  border-color: #10b981;
  background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%);
}

.vocab-card.correct:hover {
  background: linear-gradient(135deg, #d1fae5 0%, #ecfdf5 100%);
}

/* Incorrect answer styling */
.vocab-card.incorrect {
  border-color: #ef4444;
  background: linear-gradient(135deg, #fef2f2 0%, #fef7f7 100%);
}

.vocab-card.incorrect:hover {
  background: linear-gradient(135deg, #fee2e2 0%, #fef2f2 100%);
}
```

## Data Structure

### QuestionResult Interface
```typescript
interface QuestionResult {
  id: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation?: string;
  videoUrl?: string;
}
```

### VocabItem Interface
```typescript
interface VocabItem {
  id: string;
  word: string;
  videoUrl: string;
  meaning: string;
  example: string;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  isCorrect?: boolean; // true = correct, false = incorrect, undefined = unanswered
}
```

## Color Scheme

### Correct Answers
- **Primary**: Green (#10b981)
- **Background**: Light green gradients
- **Text**: Dark green (#166534)
- **Icon**: ✅ (Green checkmark)

### Incorrect Answers  
- **Primary**: Red (#ef4444)
- **Background**: Light red gradients
- **Text**: Dark red (#991b1b)
- **Icon**: ❌ (Red X)

### Unanswered
- **Primary**: Gray (#6b7280)
- **Background**: White/Light gray
- **Text**: Gray
- **Icon**: ❓ (Question mark)

## Animations

### Card Animations
```css
/* Staggered appearance */
style={{ animationDelay: `${index * 100}ms` }}

/* Hover effects */
.vocab-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
```

### Score Animation
```typescript
// Count-up animation for score
useEffect(() => {
  const duration = 2000;
  const steps = 60;
  const increment = percent / steps;
  
  let current = 0;
  const timer = setInterval(() => {
    current += increment;
    if (current >= percent) {
      setDisplayScore(percent);
      setIsAnimating(false);
      clearInterval(timer);
    } else {
      setDisplayScore(Math.floor(current));
    }
  }, duration / steps);
  
  return () => clearInterval(timer);
}, [percent]);
```

## Responsive Design

### Mobile (< 640px)
- Single column layout
- Smaller padding
- Compact cards

### Tablet (640px - 768px)
- Two column layout
- Medium padding
- Standard cards

### Desktop (> 768px)
- Three column layout
- Full padding
- Large cards

## Accessibility

### Focus States
```css
.vocab-card:focus {
  outline: 2px solid #f97316;
  outline-offset: 2px;
}

button:focus {
  outline: 2px solid #f97316;
  outline-offset: 2px;
}
```

### Screen Reader Support
- Semantic HTML structure
- ARIA labels for interactive elements
- Clear text alternatives for icons

## Usage Examples

### Basic Usage
```tsx
<QuizResultDetailScreen
  correct={7}
  total={10}
  onRetry={() => navigate("quiz", lessonId)}
  onContinue={() => navigate("review-vocab", lessonId)}
  lessonId="lesson-1"
/>
```

### With Custom Data
```tsx
const questionResults = [
  {
    id: "1",
    question: "Ký hiệu nào có nghĩa là 'Xin chào'?",
    userAnswer: "Vẫy tay",
    correctAnswer: "Vẫy tay", 
    isCorrect: true,
    explanation: "Đúng! Vẫy tay là cách chào hỏi cơ bản trong NNKH.",
    videoUrl: "/resources/videos/Chào.mp4"
  }
];
```

## Future Enhancements

1. **Real-time Feedback**: Hiển thị feedback ngay khi trả lời
2. **Progress Tracking**: Theo dõi tiến độ học tập
3. **Analytics**: Thống kê chi tiết về performance
4. **Custom Themes**: Cho phép thay đổi màu sắc
5. **Sound Effects**: Âm thanh cho correct/incorrect
6. **Haptic Feedback**: Rung động trên mobile
7. **Accessibility**: Cải thiện hỗ trợ screen reader
8. **Offline Support**: Lưu trữ kết quả offline