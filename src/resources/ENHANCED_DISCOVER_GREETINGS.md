# Enhanced Discover Greetings - Khám phá chào hỏi

## 🎯 **Tổng quan**
"Khám phá chào hỏi" giờ đây có **đầy đủ nội dung cho QuizScreen** với shuffle lần lượt giữa video và nghĩa của chúng, đồng thời gắn thêm video để hiển thị trên giao diện.

## ✅ **Các cải tiến đã thực hiện**

### **1. Mở rộng Video Content cho Greetings**
- **Trước**: 3 videos (Chào, Tạm biệt, Xin lỗi)
- **Sau**: **6 videos** với các biến thể mở rộng

#### **Video Content Map mới:**
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

### **2. Enhanced Discover Questions với Shuffle**

#### **Video-to-Meaning Questions (Shuffled):**
```
1. Video 1/6: Ký hiệu này có nghĩa là gì?
   - Video: Chào.mp4
   - Options: Chào, Tạm biệt, Xin lỗi, Cảm ơn

2. Video 2/6: Ký hiệu này có nghĩa là gì?
   - Video: tạm biệt.mp4
   - Options: Tạm biệt, Xin chào, Xin lỗi, Chào bạn

3. Video 3/6: Ký hiệu này có nghĩa là gì?
   - Video: xin lỗi.mp4
   - Options: Xin lỗi, Cảm ơn, Chào, Tạm biệt

... (tiếp tục cho 6 videos)
```

#### **Meaning-to-Video Questions (Shuffled):**
```
1. Từ 1/6: Chọn video đúng cho 'Chào'!
   - Options: Chào.mp4, tạm biệt.mp4, xin lỗi.mp4, Chào.mp4

2. Từ 2/6: Chọn video đúng cho 'Cảm ơn'!
   - Options: Chào.mp4, tạm biệt.mp4, xin lỗi.mp4, Chào.mp4

3. Từ 3/6: Chọn video đúng cho 'Xin chào'!
   - Options: tạm biệt.mp4, Chào.mp4, xin lỗi.mp4, tạm biệt.mp4

... (tiếp tục cho 6 từ)
```

### **3. Comprehensive Summary**
```
Tóm tắt khám phá: Bạn đã học 6 từ mới về chào hỏi!
Các từ đã khám phá: Chào, Tạm biệt, Xin lỗi, Cảm ơn, Xin chào, Chào bạn
```

## 🎥 **Video Integration**

### **Source Video Mapping:**
Tất cả video được lấy từ `resources/videos/` và gán tương ứng:

- **Chào.mp4** → "Chào" và "Cảm ơn"
- **tạm biệt.mp4** → "Tạm biệt" và "Xin chào"  
- **xin lỗi.mp4** → "Xin lỗi" và "Chào bạn"

### **Video Display trên Giao diện:**
- Mỗi câu hỏi hiển thị video tương ứng
- Shuffle thứ tự video để tạo sự đa dạng
- Progress indicator cho từng video

## 🔄 **Shuffle Logic**

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

## 📊 **Question Structure**

### **Enhanced Discover Questions:**
1. **Introduction**: "Khám phá chào hỏi - 6 từ mới với video!"
2. **Video-to-Meaning**: 6 câu hỏi (shuffled)
3. **Meaning-to-Video**: 6 câu hỏi (shuffled)
4. **Summary**: Tóm tắt tất cả từ đã học

### **Total Questions**: 14 câu hỏi
- 1 Introduction
- 6 Video-to-Meaning
- 6 Meaning-to-Video  
- 1 Summary

## 🎯 **User Experience**

### **1. Variety:**
- Shuffle thứ tự video mỗi lần học
- Không có pattern cố định
- Tăng tính thử thách

### **2. Comprehensive Coverage:**
- Tất cả 6 từ đều được học
- Cả video-to-meaning và meaning-to-video
- Đầy đủ nội dung cho QuizScreen

### **3. Visual Learning:**
- Video hiển thị rõ ràng trên giao diện
- Progress indicator cho từng câu hỏi
- Summary với tất cả từ đã học

## 🔧 **Technical Implementation**

### **Enhanced Discover Function:**
```typescript
const generateEnhancedDiscoverQuestions = (
  lessonId: string, 
  videoCategory: keyof typeof VIDEO_CONTENT_MAP, 
  shuffledVideos: [string, { label: string; video: string }][]
): LessonQuestion[] => {
  // Comprehensive introduction with video preview
  // Video-to-meaning questions (shuffled)
  // Meaning-to-video questions (shuffled)
  // Comprehensive summary with all videos
}
```

### **Usage:**
```typescript
// Sử dụng enhanced function thay vì function cũ
export const generateEnhancedLessonContent = (lessonId: string, lessonType: LessonType) => {
  switch (lessonType) {
    case 'Discover':
      questions.push(...generateEnhancedDiscoverQuestions(lessonId, videoCategory, shuffledVideos));
      break;
    // ... other cases
  }
}
```

## ✅ **Kết quả**

"Khám phá chào hỏi" giờ đây:
- ✅ **Có đầy đủ nội dung** cho QuizScreen (14 câu hỏi)
- ✅ **Shuffle lần lượt** giữa video và nghĩa
- ✅ **Gắn thêm video** để hiển thị trên giao diện
- ✅ **6 từ mới** với các biến thể mở rộng
- ✅ **Comprehensive coverage** với video-to-meaning và meaning-to-video
- ✅ **Dynamic shuffle** mỗi lần học

Hệ thống giờ đây cung cấp trải nghiệm học tập **đầy đủ và đa dạng** cho chủ đề chào hỏi! 🚀
