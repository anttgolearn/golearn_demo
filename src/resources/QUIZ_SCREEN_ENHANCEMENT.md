# QuizScreen Enhancement - 4-5 từ mới theo chủ đề

## 🎯 **Tổng quan**
QuizScreen giờ đây hiển thị **4-5 từ mới theo chủ đề** của lesson/chapter, dựa trên video có sẵn trong `resources/videos` và gán tương ứng với mỗi lesson ID discover.

## ✅ **Các cải tiến đã thực hiện**

### **1. Enhanced Discover Questions (Khám phá)**
- **Trước**: 3 câu hỏi khám phá
- **Sau**: **6 câu hỏi khám phá** (tùy theo số lượng video)
- **Nội dung**: Hiển thị tất cả video trong category với progress indicator

#### **Example cho Chapter 4 (Cảm xúc nâng cao):**
```
1. Khám phá cảm xúc nâng cao - 8 từ mới!
2. Từ 1/6: Chọn ký hiệu đúng cho 'Vui mừng'!
3. Từ 2/6: Chọn ký hiệu đúng cho 'Buồn thảm'!
4. Từ 3/6: Chọn ký hiệu đúng cho 'Giận dữ'!
5. Từ 4/6: Chọn ký hiệu đúng cho 'Thích thú'!
6. Từ 5/6: Chọn ký hiệu đúng cho 'Ngạc nhiên'!
7. Từ 6/6: Chọn ký hiệu đúng cho 'Hoảng sợ'!
8. Tóm tắt khám phá: Bạn đã học 6 từ mới về cảm xúc nâng cao!
```

### **2. Enhanced Vokabel Questions (Từ vựng)**
- **Trước**: 4 câu hỏi từ vựng
- **Sau**: **7 câu hỏi từ vựng** (tùy theo số lượng video)
- **Nội dung**: Mở rộng vốn từ với tất cả video trong category

#### **Example cho Chapter 7 (Số đếm cơ bản):**
```
1. Từ vựng số đếm - 3 từ mới!
2. Từ vựng 1/3: Ký hiệu nào có nghĩa là 'Số 1'?
3. Từ vựng 2/3: Ký hiệu nào có nghĩa là 'Số 2'?
4. Từ vựng 3/3: Ký hiệu nào có nghĩa là 'Số 3'?
5. Tóm tắt từ vựng: Bạn đã học 3 từ mới về số đếm!
```

### **3. Enhanced Quiz Questions (Kiểm tra)**
- **Trước**: 5 câu hỏi quiz
- **Sau**: **8 câu hỏi quiz** (tùy theo số lượng video)
- **Nội dung**: Kiểm tra toàn diện với tất cả video trong category

#### **Example cho Chapter 5 (Động vật thường gặp):**
```
1. Kiểm tra toàn diện: động vật - 3 từ mới!
2. Từ 1/3: Ký hiệu nào có nghĩa là 'Con chó'?
3. Từ 2/3: Ký hiệu nào có nghĩa là 'Con mèo'?
4. Từ 3/3: Ký hiệu nào có nghĩa là 'Con gà'?
5. Tóm tắt: Bạn đã học 3 từ mới về động vật!
```

## 🎥 **Video Integration**

### **Source Video Mapping:**
Tất cả video được lấy từ `resources/videos/` và gán tương ứng với từng lesson ID:

#### **Chapter 4 (Cảm xúc nâng cao) - Lesson ID: `02_02_*`:**
- `vui_mừng.mp4` → "Vui mừng"
- `buồn thảm.mp4` → "Buồn thảm"
- `giận_dữ.mp4` → "Giận dữ"
- `thích_thú.mp4` → "Thích thú"
- `Ngạc_nhiên.mp4` → "Ngạc nhiên"
- `hoảng_sợ.mp4` → "Hoảng sợ"
- `hồi_hộp.mp4` → "Hồi hộp"
- `bối rối.mp4` → "Bối rối"

#### **Chapter 7 (Số đếm cơ bản) - Lesson ID: `04_01_*`:**
- `số 1.mp4` → "Số 1"
- `số 2.mp4` → "Số 2"
- `số 3.mp4` → "Số 3"

#### **Chapter 5 (Động vật thường gặp) - Lesson ID: `03_01_*`:**
- `con chó.mp4` → "Con chó"
- `con mèo.mp4` → "Con mèo"
- `con gà.mp4` → "Con gà"

## 📊 **Thống kê theo Lesson Type**

### **Discover Lessons:**
- **Số câu hỏi**: 6-8 câu (tùy theo số video)
- **Loại câu hỏi**: Single choice với video recognition
- **Progress**: Hiển thị "Từ X/Y"
- **Summary**: Tóm tắt các từ đã khám phá

### **Vokabel Lessons:**
- **Số câu hỏi**: 7 câu (tùy theo số video)
- **Loại câu hỏi**: Single choice với vocabulary focus
- **Progress**: Hiển thị "Từ vựng X/Y"
- **Summary**: Tóm tắt các từ vựng đã học

### **Quiz Lessons:**
- **Số câu hỏi**: 8 câu (tùy theo số video)
- **Loại câu hỏi**: Single choice với challenging questions
- **Progress**: Hiển thị "Từ X/Y"
- **Summary**: Tóm tắt toàn diện

## 🎯 **User Experience Improvements**

### **1. Progress Indicators:**
- Hiển thị rõ ràng "Từ 1/6", "Từ vựng 2/3", etc.
- Người dùng biết được tiến độ học tập

### **2. Comprehensive Coverage:**
- Tất cả video trong category đều được sử dụng
- Không bỏ sót nội dung nào

### **3. Summary Questions:**
- Tóm tắt các từ đã học ở cuối mỗi lesson
- Củng cố kiến thức và ghi nhớ

### **4. Dynamic Content:**
- Số lượng câu hỏi thay đổi theo số video có sẵn
- Tự động adapt với nội dung thực tế

## 🔧 **Technical Implementation**

### **Enhanced Question Generation:**
```typescript
// Discover: Up to 6 videos
const maxQuestions = Math.min(videoEntries.length, 6);

// Vokabel: Up to 7 videos  
const maxQuestions = Math.min(videoEntries.length, 7);

// Quiz: Up to 8 videos
const maxQuestions = Math.min(videoEntries.length, 8);
```

### **Progress Indicators:**
```typescript
`Từ ${i + 1}/${maxQuestions}: Chọn ký hiệu đúng cho '${videoData.label}'!`
`Từ vựng ${i + 1}/${maxQuestions}: Ký hiệu nào có nghĩa là '${videoData.label}'?`
```

### **Summary Questions:**
```typescript
const allLabels = videoEntries.slice(0, maxQuestions).map(([, data]) => data.label).join(', ');
questions.push(createContentQuestion(
  `${lessonId}-summary`,
  QuestionCategories.CONTENT.CAT_1C,
  `Tóm tắt: Bạn đã học ${maxQuestions} từ mới về ${getCategoryTitle(videoCategory)}!`,
  videoEntries[0]?.[1]?.video || '',
  `Các từ đã học: ${allLabels}`
));
```

## ✅ **Kết quả**

QuizScreen giờ đây:
- ✅ **Hiển thị 4-5+ từ mới** theo chủ đề của lesson/chapter
- ✅ **Sử dụng tất cả video** có sẵn trong resources/videos
- ✅ **Gán chính xác** với mỗi lesson ID discover
- ✅ **Có progress indicators** rõ ràng
- ✅ **Tóm tắt comprehensive** ở cuối mỗi lesson
- ✅ **Adaptive content** theo số lượng video thực tế

Hệ thống giờ đây cung cấp trải nghiệm học tập **toàn diện và hiệu quả** hơn rất nhiều! 🚀
