# Video Debug Guide

## 🎬 **Hướng dẫn debug video trong ReviewVocabScreen**

### **✅ Vấn đề đã được sửa:**

#### **1. Video URL Mapping:**
- **Trước**: Video URL được tạo từ tên từ vựng (`/resources/videos/${word}.mp4`)
- **Sau**: Sử dụng video mapping thực tế với các video có sẵn

#### **2. Debug Logs:**
- **Video Click**: Log khi click vào từ vựng
- **Video URL**: Log URL của video được chọn
- **Video Loading**: Log khi video bắt đầu load
- **Video Error**: Log chi tiết khi video lỗi

### **🔧 Cách sử dụng:**

#### **1. Test Video Loading:**
```tsx
// Import VideoTestDemo
import VideoTestDemo from './VideoTestDemo';

// Sử dụng trong App.tsx
<VideoTestDemo />
```

#### **2. Debug Console:**
Mở Developer Tools (F12) và xem console logs:
- `Video clicked: {word, videoUrl, meaning, ...}`
- `Video URL: /resources/videos/hello-sign-demo.mp4`
- `Video loading started: /resources/videos/hello-sign-demo.mp4`
- `Video can play: /resources/videos/hello-sign-demo.mp4`

#### **3. Video Error Handling:**
Nếu video không load được:
- Console sẽ hiển thị error details
- Fallback UI sẽ hiển thị thay thế
- Error message với tên từ vựng

### **📁 Video Files Structure:**

#### **Available Videos:**
```
/resources/videos/
├── hello-sign-demo.mp4    # Video chính cho HELLO
├── welcome.mp4            # Video cho WELCOME
├── me.mp4                 # Video cho ME
├── you.mp4                # Video cho YOU
├── family.mp4             # Video cho FAMILY
├── father.mp4             # Video cho FATHER
├── mother.mp4             # Video cho MOTHER
├── brother.mp4            # Video cho BROTHER
├── sister.mp4             # Video cho SISTER
├── sibling.mp4            # Video cho SIBLING
├── thank-you.mp4          # Video cho THANK YOU
├── sorry.mp4              # Video cho SORRY
├── no.mp4                 # Video cho NO
├── yes.mp4                # Video cho YES
└── goodbye.mp4            # Video cho GOODBYE
```

### **🎯 Video Mapping Logic:**

#### **1. Primary Mapping:**
```typescript
const videoMapping: Record<string, string> = {
  'Chào': '/resources/videos/hello-sign-demo.mp4',
  'Chào mừng': '/resources/videos/welcome.mp4',
  'Tôi': '/resources/videos/me.mp4',
  // ... more mappings
};
```

#### **2. Fallback Logic:**
```typescript
videoUrl: videoMapping[word] || 
          videoMapping[word.toUpperCase()] || 
          `/resources/videos/${word.toLowerCase()}.mp4`
```

### **🐛 Common Issues & Solutions:**

#### **1. Video không load:**
- **Check**: Console logs để xem video URL
- **Solution**: Đảm bảo video file tồn tại trong `/resources/videos/`
- **Fallback**: Sử dụng video mapping hoặc tạo video mới

#### **2. Video URL sai:**
- **Check**: Debug logs trong `handleVideoClick`
- **Solution**: Cập nhật video mapping trong code
- **Test**: Sử dụng VideoTestDemo để test

#### **3. Video không auto-play:**
- **Check**: Browser autoplay policy
- **Solution**: Thêm `muted` attribute hoặc user interaction
- **Test**: Click vào video để play manually

### **📱 Testing Steps:**

#### **1. Basic Test:**
1. Mở ReviewVocabScreen
2. Click vào từ vựng (HELLO, WELCOME, ME)
3. Kiểm tra console logs
4. Xem video có load được không

#### **2. Advanced Test:**
1. Sử dụng VideoTestDemo
2. Test từng video riêng biệt
3. Kiểm tra error handling
4. Test responsive design

#### **3. Production Test:**
1. Deploy lên server
2. Test với video files thực tế
3. Kiểm tra performance
4. Test trên mobile devices

### **🎬 Video Requirements:**

#### **1. Format:**
- **Container**: MP4
- **Codec**: H.264
- **Resolution**: 720p hoặc 1080p
- **Aspect Ratio**: 16:9

#### **2. Content:**
- **Duration**: 2-5 giây
- **Loop**: Video có thể loop mượt mà
- **Quality**: Rõ nét, ánh sáng tốt
- **Sign Language**: Ký hiệu rõ ràng, dễ hiểu

#### **3. File Size:**
- **Target**: < 2MB per video
- **Compression**: Optimize cho web
- **Loading**: Fast loading time

### **🔧 Development Tips:**

#### **1. Local Development:**
```bash
# Serve videos locally
python -m http.server 8000
# hoặc
npx serve /resources/videos
```

#### **2. Video Optimization:**
```bash
# Compress video
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -c:a aac -b:a 128k output.mp4
```

#### **3. Debug Tools:**
- **Browser DevTools**: Network tab để xem video loading
- **Console**: Debug logs cho video events
- **VideoTestDemo**: Test component riêng biệt

### **✅ Kết quả mong đợi:**

#### **1. Video Loading:**
- ✅ Video load nhanh chóng
- ✅ Auto-play khi mở modal
- ✅ Loop mượt mà
- ✅ Error handling tốt

#### **2. User Experience:**
- ✅ Click vào từ vựng → Video modal mở
- ✅ Video hiển thị người thật thực hiện ký hiệu
- ✅ Cloud icon decoration
- ✅ Close button hoạt động

#### **3. Performance:**
- ✅ Video load trong < 2 giây
- ✅ Smooth animations
- ✅ Responsive design
- ✅ Mobile-friendly

Video giờ đây sẽ load đúng và hiển thị ký hiệu ngôn ngữ ký hiệu tương ứng! 🎬✨
