# 🎯 **Real Data Integration - ReviewVocabScreen**

## **📊 Tổng quan:**

ReviewVocabScreen giờ đây sử dụng data thực tế từ `HARDCODED_QUIZZES` thay vì mock data, hiển thị chính xác các từ vựng từ lesson vừa học.

---

## **🔧 Thay đổi chính:**

### **1. useReviewWords Hook:**
```typescript
// Before: Mock data
const mockQuizStore = { activeQuiz: { ... } };

// After: Real data
const quizData = HARDCODED_QUIZZES[lessonId];
```

### **2. Data Source:**
- **File**: `src/lib/mock-lessons.ts`
- **Type**: `HARDCODED_QUIZZES: Record<string, MockQuizPayload>`
- **Lesson ID**: `'01_01_1-discover'` (default)

### **3. Question Processing:**
```typescript
quizData.questions.forEach((question: MockQuestion) => {
  const isCorrect = mockUserAnswers[question.id.toString()] ?? false;
  
  // Extract from 3 sources:
  // 1. Content questions (1a category)
  // 2. Answer options with media
  // 3. Question parts with videos
});
```

---

## **📚 Data Structure:**

### **MockQuizPayload:**
```typescript
{
  id: '01_01_1-discover',
  title: 'Discover new signs',
  category: 'Lesson',
  unit: { id: 1, name: 'Unit 1', title: 'Basics' },
  lesson: { id: 101, name: 'Lesson 1' },
  questions: MockQuestion[]
}
```

### **MockQuestion:**
```typescript
{
  id: number,
  status: 'published' | 'draft',
  unitNumber: number,
  category: string,        // '1a', '2a', '3a'
  title: string,
  type: 'content' | 'single' | 'multiple' | 'cloze_answer',
  questionParts: MockQuestionPart[],
  answerOptions: MockAnswerOption[],
  hint: string[]
}
```

---

## **🎬 Video Extraction Logic:**

### **1. Content Questions (1a category):**
```typescript
if (question.category === '1a') {
  const firstPart = question.questionParts[0];
  if (firstPart?.type === 'video' && firstPart.url) {
    const video = {
      title: firstPart.content || question.title.replace('NEW_SIGN: ', ''),
      videoUrl: firstPart.url,
    };
    addVideo(video.title, video, isCorrect);
  }
}
```

**Example:**
- **Question**: `{ title: 'NEW_SIGN: Chào', category: '1a' }`
- **Extract**: `{ title: 'Chào', videoUrl: '/resources/videos/Chào.mp4' }`

### **2. Answer Options with Media:**
```typescript
question.answerOptions.forEach((answer) => {
  if (answer.media?.label && answer.media?.type === 'video') {
    const video = {
      title: answer.media.label,
      videoUrl: answer.media.url,
    };
    addVideo(answer.media.label, video, isCorrect);
  }
});
```

**Example:**
- **Answer**: `{ media: { type: 'video', url: '/resources/videos/Chào.mp4', label: 'Chào' } }`
- **Extract**: `{ title: 'Chào', videoUrl: '/resources/videos/Chào.mp4' }`

### **3. Question Parts with Videos:**
```typescript
question.questionParts
  .filter((part) => part.type === 'video' && part.content)
  .forEach((questionPart) => {
    const video = {
      title: questionPart.content!,
      videoUrl: questionPart.url!,
    };
    addVideo(questionPart.content!, video, isCorrect);
  });
```

**Example:**
- **Part**: `{ type: 'video', url: '/resources/videos/Chào.mp4', content: 'Chào' }`
- **Extract**: `{ title: 'Chào', videoUrl: '/resources/videos/Chào.mp4' }`

---

## **📊 Lesson Data Example:**

### **Lesson: 01_01_1-discover**
```typescript
questions: [
  {
    id: 1,
    category: '1a',           // Content question
    title: 'NEW_SIGN: Chào',
    questionParts: [{
      type: 'video',
      url: '/resources/videos/Chào.mp4',
      content: 'Chào'
    }]
  },
  {
    id: 2,
    category: '2a',           // Practice question
    title: 'Chọn ký hiệu đúng cho "Chào"',
    answerOptions: [
      { 
        isCorrect: true, 
        media: { 
          type: 'video', 
          url: '/resources/videos/Chào.mp4', 
          label: 'Chào' 
        } 
      },
      { 
        isCorrect: false, 
        media: { 
          type: 'video', 
          url: '/resources/videos/tạm biệt.mp4', 
          label: 'Tạm biệt' 
        } 
      }
    ]
  }
  // ... more questions
]
```

---

## **🎯 Extracted Vocabulary:**

### **From Lesson 01_01_1-discover:**
1. **Chào** - `/resources/videos/Chào.mp4` (Correct)
2. **Tạm biệt** - `/resources/videos/tạm biệt.mp4` (Incorrect)
3. **Xin lỗi** - `/resources/videos/xin lỗi.mp4` (Correct)

### **Correctness Tracking:**
```typescript
const mockUserAnswers: Record<string, boolean> = {
  '1': true,  // Chào - correct
  '2': true,  // Chọn ký hiệu đúng cho "Chào" - correct
  '3': false, // Ký hiệu nào có nghĩa là "Tạm biệt" - incorrect
  '4': true,  // Ký hiệu nào có nghĩa là "Xin lỗi" - correct
  '5': true,  // Điền vào chỗ trống - correct
};
```

---

## **🔧 Usage:**

### **1. Basic Usage:**
```typescript
const { reviewWords, correctAnswers, incorrectAnswers } = useReviewWords('01_01_1-discover');
```

### **2. With Component:**
```typescript
<ReviewVocabScreen
  lessonId="01_01_1-discover"
  onContinue={handleContinue}
  onBack={handleBack}
/>
```

### **3. Demo Component:**
```typescript
import RealDataDemo from './RealDataDemo';

// Shows lesson selection and real data integration
<RealDataDemo />
```

---

## **📱 UI Features:**

### **1. Vocabulary List:**
- **Source**: Real lesson questions
- **Order**: Sorted by word length
- **Deduplication**: Map-based deduplication
- **Correctness**: Visual indicators

### **2. Bottom Sheet Modal:**
- **Video Player**: Object-contain with real URLs
- **Speed Control**: Turtle button
- **Close Button**: X icon
- **Animations**: Slide up from bottom

### **3. Helper Functions:**
- **Meaning**: Vietnamese definitions
- **Examples**: Usage examples
- **Difficulty**: Easy/Medium/Hard classification

---

## **🎬 Console Logs:**

### **Debug Information:**
```typescript
console.log('Extracted videos from lesson:', {
  lessonId,
  totalVideos: videoMap.size,
  correctCount: correctAnswers.length,
  incorrectCount: incorrectAnswers.length,
  videos: Array.from(videoMap.keys())
});
```

### **Video Loading:**
```typescript
onLoadStart: () => console.log('Video loading started:', videoUrl),
onCanPlay: () => console.log('Video can play:', videoUrl),
onError: (e) => console.error('Video load error:', videoUrl, e)
```

---

## **✅ Benefits:**

### **1. Real Data:**
- ✅ Uses actual lesson questions
- ✅ Real video URLs from lesson content
- ✅ Accurate vocabulary extraction
- ✅ Proper correctness tracking

### **2. Dynamic Content:**
- ✅ Different lessons show different vocabulary
- ✅ Lesson-specific video content
- ✅ Contextual word meanings
- ✅ Appropriate difficulty levels

### **3. User Experience:**
- ✅ Relevant vocabulary review
- ✅ Accurate progress tracking
- ✅ Meaningful learning reinforcement
- ✅ Contextual examples

**🎯 Kết luận:** ReviewVocabScreen giờ đây hiển thị chính xác các từ vựng từ lesson vừa học, sử dụng data thực tế từ `HARDCODED_QUIZZES` thay vì mock data! 🎬✨
