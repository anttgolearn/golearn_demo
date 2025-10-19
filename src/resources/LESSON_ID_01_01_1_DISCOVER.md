# Lesson ID: 01_01_1-discover - Chuỗi từ mới tương ứng

## 🎯 **Tổng quan**
`01_01_1-discover` là một lesson ID được thiết kế để tạo ra **một chuỗi các từ mới tương ứng** về chủ đề chào hỏi, sau đó thực hiện các thao tác như hiện tại.

## 🔄 **Flow hoạt động**

### **1. Lesson ID Structure:**
```
01_01_1-discover
│   │  │ └── Lesson type: discover
│   │  └──── Lesson number: 1
│   └─────── Chapter: 01 (Chào hỏi và lịch sự)
└─────────── Unit: 01 (Giao tiếp cơ bản)
```

### **2. Lesson Definition trong Structure:**
```typescript
// src/lib/lesson-structure.ts
{
  id: '01_01_1-discover',
  title: 'Khám phá chào hỏi',
  type: 'Discover',
  description: 'Học các ký hiệu chào hỏi cơ bản',
  difficulty: 'easy',
  estimatedTime: 5,
  questions: [], // Sẽ được populate với video content
}
```

### **3. Processing Flow trong QuizScreen:**
```typescript
// src/screens/QuizScreen/QuizScreen.tsx
useEffect(() => {
  // 1. Lấy lesson từ structure
  const lesson = getLessonById(lessonId); // "01_01_1-discover"
  
  if (lesson) {
    // 2. Generate content sử dụng structured system
    const structuredQuestions = generateLessonContent(lessonId, lesson.type);
    // lesson.type = 'Discover'
    
    // 3. Map sang format QuizScreen
    mock = structuredQuestions.map(q => ({
      id: q.id,
      type: q.type,
      prompt: q.prompt,
      mediaUrl: q.questionParts.find(p => p.type === 'video')?.url,
      options: q.answerOptions.map(a => a.label),
      answer: q.correctAnswer,
      videoOptions: q.answerOptions.map(a => ({
        label: a.label,
        videoSrc: a.media?.url || ''
      }))
    }));
  }
}, [lessonId]);
```

### **4. Content Generation:**
```typescript
// src/lib/lesson-content-generator.ts
export const generateLessonContent = (lessonId: string, lessonType: LessonType) => {
  switch (lessonType) {
    case 'Discover':
      questions.push(...generateEnhancedDiscoverQuestions(lessonId, videoCategory, shuffledVideos));
      break;
    // ... other cases
  }
}
```

## 📝 **Chuỗi từ mới được tạo ra**

### **Video Content Map cho Greetings:**
```typescript
greetings: {
  'chao': { label: 'Chào', video: '/resources/videos/Chào.mp4' },
  'tam-biet': { label: 'Tạm biệt', video: '/resources/videos/tạm biệt.mp4' },
  'xin-loi': { label: 'Xin lỗi', video: '/resources/videos/xin lỗi.mp4' },
  'cam-on': { label: 'Cảm ơn', video: '/resources/videos/Chào.mp4' },
  'xin-chao': { label: 'Xin chào', video: '/resources/videos/tạm biệt.mp4' },
  'chao-ban': { label: 'Chào bạn', video: '/resources/videos/xin lỗi.mp4' },
}
```

### **Questions được tạo ra (14 câu hỏi):**

#### **1. Introduction (1 câu):**
```
"Khám phá chào hỏi - 6 từ mới với video!"
Video: Chào.mp4
```

#### **2. Video-to-Meaning Questions (6 câu - Shuffled):**
```
1. "Video 1/6: Ký hiệu này có nghĩa là gì?"
   Video: Chào.mp4
   Options: [Chào, Tạm biệt, Xin lỗi, Cảm ơn]

2. "Video 2/6: Ký hiệu này có nghĩa là gì?"
   Video: tạm biệt.mp4
   Options: [Tạm biệt, Xin chào, Xin lỗi, Chào bạn]

3. "Video 3/6: Ký hiệu này có nghĩa là gì?"
   Video: xin lỗi.mp4
   Options: [Xin lỗi, Cảm ơn, Chào, Tạm biệt]

4. "Video 4/6: Ký hiệu này có nghĩa là gì?"
   Video: Chào.mp4 (Cảm ơn)
   Options: [Cảm ơn, Xin chào, Xin lỗi, Chào bạn]

5. "Video 5/6: Ký hiệu này có nghĩa là gì?"
   Video: tạm biệt.mp4 (Xin chào)
   Options: [Xin chào, Tạm biệt, Xin lỗi, Chào]

6. "Video 6/6: Ký hiệu này có nghĩa là gì?"
   Video: xin lỗi.mp4 (Chào bạn)
   Options: [Chào bạn, Cảm ơn, Xin chào, Xin lỗi]
```

#### **3. Meaning-to-Video Questions (6 câu - Shuffled):**
```
1. "Từ 1/6: Chọn video đúng cho 'Chào'!"
   Options: [Chào.mp4, tạm biệt.mp4, xin lỗi.mp4, Chào.mp4]

2. "Từ 2/6: Chọn video đúng cho 'Cảm ơn'!"
   Options: [Chào.mp4, tạm biệt.mp4, xin lỗi.mp4, Chào.mp4]

3. "Từ 3/6: Chọn video đúng cho 'Xin chào'!"
   Options: [tạm biệt.mp4, Chào.mp4, xin lỗi.mp4, tạm biệt.mp4]

4. "Từ 4/6: Chọn video đúng cho 'Tạm biệt'!"
   Options: [tạm biệt.mp4, Chào.mp4, xin lỗi.mp4, tạm biệt.mp4]

5. "Từ 5/6: Chọn video đúng cho 'Xin lỗi'!"
   Options: [xin lỗi.mp4, Chào.mp4, tạm biệt.mp4, xin lỗi.mp4]

6. "Từ 6/6: Chọn video đúng cho 'Chào bạn'!"
   Options: [xin lỗi.mp4, Cảm ơn, Xin chào, xin lỗi.mp4]
```

#### **4. Summary (1 câu):**
```
"Tóm tắt khám phá: Bạn đã học 6 từ mới về chào hỏi!"
"Các từ đã khám phá: Chào, Tạm biệt, Xin lỗi, Cảm ơn, Xin chào, Chào bạn"
Video: Chào.mp4
```

## 🎲 **Shuffle Logic**

### **1. Video Shuffle:**
```typescript
const shuffledVideos = [...videoEntries].sort(() => Math.random() - 0.5);
```

### **2. Double Shuffle cho Meaning-to-Video:**
```typescript
const shuffledVideos2 = [...shuffledVideos].sort(() => Math.random() - 0.5);
```

### **3. Distractor Shuffle:**
```typescript
const shuffled = entries.sort(() => Math.random() - 0.5);
```

## 🎥 **Video Integration**

### **Source Videos từ resources/videos/:**
- **Chào.mp4** → "Chào" và "Cảm ơn"
- **tạm biệt.mp4** → "Tạm biệt" và "Xin chào"
- **xin lỗi.mp4** → "Xin lỗi" và "Chào bạn"

### **Video Display:**
- Mỗi câu hỏi hiển thị video tương ứng
- Progress indicator cho từng video
- Video options cho multiple choice questions

## 🔧 **Technical Implementation**

### **Enhanced Discover Function:**
```typescript
const generateEnhancedDiscoverQuestions = (
  lessonId: string, 
  videoCategory: keyof typeof VIDEO_CONTENT_MAP, 
  shuffledVideos: [string, { label: string; video: string }][]
): LessonQuestion[] => {
  const questions: LessonQuestion[] = [];
  
  // 1. Comprehensive introduction with video preview
  questions.push(createContentQuestion(/* ... */));
  
  // 2. Video-to-meaning questions (shuffled)
  for (let i = 0; i < maxQuestions; i++) {
    questions.push(createVideoQuestion(/* ... */));
  }
  
  // 3. Meaning-to-video questions (shuffled)
  for (let i = 0; i < Math.min(maxQuestions, 6); i++) {
    questions.push(createVideoQuestion(/* ... */));
  }
  
  // 4. Comprehensive summary with all videos
  if (shuffledVideos.length > 1) {
    questions.push(createContentQuestion(/* ... */));
  }
  
  return questions;
};
```

## ✅ **Kết quả**

Khi `01_01_1-discover` được gọi:

1. ✅ **Tạo ra chuỗi từ mới** về chủ đề chào hỏi (6 từ)
2. ✅ **Shuffle lần lượt** giữa video và nghĩa của chúng
3. ✅ **Gắn video** để hiển thị trên giao diện
4. ✅ **14 câu hỏi** đầy đủ cho QuizScreen
5. ✅ **Dynamic shuffle** mỗi lần học để tạo sự đa dạng
6. ✅ **Comprehensive coverage** với cả video-to-meaning và meaning-to-video

**Lesson ID `01_01_1-discover` giờ đây hoạt động như một chuỗi các từ mới tương ứng, sau đó thực hiện các thao tác như hiện tại!** 🚀
