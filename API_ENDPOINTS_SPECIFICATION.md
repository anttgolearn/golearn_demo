# GoLearn - RESTful API Endpoints Specification

## Tổng quan
Tài liệu này mô tả các RESTful API endpoints cần thiết cho ứng dụng GoLearn - ứng dụng học ngôn ngữ ký hiệu Việt Nam. Dựa trên cấu trúc frontend hiện tại, các API được phân loại theo chức năng và module.

## Base URL
```
Production: https://api.golearn.vn/v1
Development: http://localhost:3000/api/v1
```

## Frontend File Structure & API Mapping

### 📁 Core Pages (`src/app/pages/`)
| File | API Group | Description |
|------|-----------|-------------|
| `Landing.tsx` | Auth, Social | Landing page with auth modal, testimonials |
| `Dashboard.tsx` | Lessons, Practice, Stories, Dictionary, Progress | Main learning dashboard |
| `Lesson.tsx` | Lessons | Individual lesson interface |
| `LessonDetail.tsx` | Lessons | Lesson detail page |
| `Profile.tsx` | User Profile, Progress, Settings | User profile management |
| `Settings.tsx` | Settings, Notifications | App settings and preferences |
| `Onboarding.tsx` | Auth, User Profile | Onboarding flow |
| `NotFound.tsx` | - | 404 error page |

### 📁 Learning Features (`src/features/learning/`)
| File | API Group | Description |
|------|-----------|-------------|
| `lesson-interface.tsx` | Lessons, Content, AI | Main lesson learning interface |
| `learning-flow.tsx` | Lessons | Complete learning flow |
| `practice-hub.tsx` | Practice | Practice modules hub |
| `fill-gap-exercise.tsx` | Dictionary, Practice | Vocabulary exercises |
| `lesson-results.tsx` | Progress, AI | Lesson completion results |

### 📁 Onboarding Features (`src/features/onboarding/`)
| File | API Group | Description |
|------|-----------|-------------|
| `onboarding-flow.tsx` | Auth, User Profile | Main onboarding flow |
| `sign-up-form.tsx` | Auth | User registration form |
| `assessment.tsx` | User Profile | User skill assessment |
| `language-selection.tsx` | Settings | Language preference selection |
| `learning-goals.tsx` | User Profile | Learning goals setup |
| `learning-reasons.tsx` | User Profile | Learning motivation setup |
| `mirror-practice.tsx` | AI, Practice | Camera-based practice |
| `demo-choose.tsx` | Stories | Story selection demo |
| `demo-learn.tsx` | Stories | Story learning demo |
| `demo-fill-gap.tsx` | Dictionary | Dictionary demo |
| `quiz-interface.tsx` | Lessons, Practice | Quiz interface |
| `welcome-screen.tsx` | - | Welcome screen UI |

### 📁 Shared Components (`src/shared/components/`)
| File | API Group | Description |
|------|-----------|-------------|
| `dictionary.tsx` | Dictionary | Main dictionary component |
| `Header.tsx` | Notifications | App header with notifications |
| `profile-system.tsx` | User Profile | Profile management components |
| `progress-analytics.tsx` | Progress | Progress tracking components |
| `streak-celebration.tsx` | Progress | Streak celebration UI |
| `app-benefits.tsx` | Social | App benefits display |
| `completion-screen.tsx` | Progress | Lesson completion screen |
| `course-overview.tsx` | Lessons | Course overview component |
| `bottom-navigation.tsx` | - | Bottom navigation bar |

### 📁 Utilities (`src/utils/`)
| File | API Group | Description |
|------|-----------|-------------|
| `video-loader.ts` | Content | Video loading utilities |
| `video-mapping.ts` | Content | Video mapping utilities |
| `test-videos.ts` | Content | Test video data |

### 📁 Components (`src/components/`)
| File | API Group | Description |
|------|-----------|-------------|
| `VideoDebug.tsx` | Content | Video debugging component |

### 📁 Assets (`public/resources/`)
| Folder | API Group | Description |
|--------|-----------|-------------|
| `videos/` | Content | Video assets storage |
| `images/` | Content | Image assets storage |

### 📁 Configuration Files
| File | Description |
|------|-------------|
| `package.json` | Dependencies and scripts |
| `vite.config.ts` | Vite configuration |
| `tailwind.config.js` | Tailwind CSS configuration |
| `tsconfig.json` | TypeScript configuration |

## Authentication
Tất cả API (trừ auth) yêu cầu Bearer token trong header:
```
Authorization: Bearer <jwt_token>
```

---

## 1. Authentication & User Management

**Frontend Files:**
- `src/app/pages/Landing.tsx` - Auth modal, sign up/sign in forms
- `src/features/onboarding/sign-up-form.tsx` - Registration form
- `src/features/onboarding/onboarding-flow.tsx` - Complete onboarding process
- `src/app/pages/Profile.tsx` - User profile management

### 1.1 User Registration
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "firstName": "Nguyễn Văn",
  "password": "password123",
  "language": "vi",
  "goal": "personal_learning",
  "reasons": ["family", "work", "community"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "firstName": "Nguyễn Văn",
      "level": 1,
      "xp": 0,
      "streak": 0,
      "createdAt": "2024-01-15T10:30:00Z"
    },
    "token": "jwt_token_here"
  }
}
```

### 1.2 User Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### 1.3 Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "refresh_token_here"
}
```

### 1.4 Logout
```http
POST /auth/logout
Authorization: Bearer <jwt_token>
```

### 1.5 Password Reset
```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

```http
POST /auth/reset-password
Content-Type: application/json

{
  "token": "reset_token",
  "newPassword": "new_password123"
}
```

---

## 2. User Profile Management

**Frontend Files:**
- `src/app/pages/Profile.tsx` - Main profile page with tabs
- `src/shared/components/profile-system.tsx` - Profile components
- `src/features/onboarding/assessment.tsx` - User assessment during onboarding

### 2.1 Get User Profile
```http
GET /users/profile
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "firstName": "Nguyễn Văn",
    "lastName": "A",
    "avatar": "https://api.golearn.vn/avatars/user_123.jpg",
    "level": 5,
    "xp": 1250,
    "streak": 7,
    "completedLessons": 12,
    "totalLessons": 20,
    "joinDate": "2024-01-15T10:30:00Z",
    "preferences": {
      "language": "vi",
      "notifications": true,
      "theme": "auto"
    }
  }
}
```

### 2.2 Update User Profile
```http
PUT /users/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "firstName": "Nguyễn Văn",
  "lastName": "B",
  "preferences": {
    "notifications": false,
    "theme": "dark"
  }
}
```

### 2.3 Upload Avatar
```http
POST /users/avatar
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data

file: <image_file>
```

### 2.4 Delete Account
```http
DELETE /users/profile
Authorization: Bearer <jwt_token>
```

---

## 3. Lessons Management

**Frontend Files:**
- `src/app/pages/Dashboard.tsx` - Lessons list, roadmap view
- `src/app/pages/Lesson.tsx` - Individual lesson interface
- `src/app/pages/LessonDetail.tsx` - Lesson detail page
- `src/features/learning/lesson-interface.tsx` - Lesson learning interface
- `src/features/learning/learning-flow.tsx` - Complete learning flow

### 3.1 Get All Lessons
```http
GET /lessons
Authorization: Bearer <jwt_token>
Query Parameters:
  - category: string (optional)
  - difficulty: string (optional)
  - level: number (optional)
  - page: number (default: 1)
  - limit: number (default: 20)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "lessons": [
      {
        "id": "lesson_1",
        "title": "Chào hỏi cơ bản",
        "description": "Học cách chào hỏi và giới thiệu bản thân",
        "thumbnail": "https://api.golearn.vn/thumbnails/lesson_1.jpg",
        "difficulty": "Cơ bản",
        "duration": 600, // seconds
        "xp": 50,
        "level": 1,
        "category": "greetings",
        "completed": true,
        "locked": false,
        "progress": 100,
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50,
      "totalPages": 3
    }
  }
}
```

### 3.2 Get Lesson Detail
```http
GET /lessons/{lessonId}
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "lesson_1",
    "title": "Chào hỏi cơ bản",
    "description": "Học cách chào hỏi và giới thiệu bản thân",
    "content": {
      "videoUrl": "https://api.golearn.vn/videos/lesson_1.mp4",
      "transcript": "Xin chào! Hôm nay chúng ta sẽ học...",
      "vocabulary": [
        {
          "word": "Xin chào",
          "translation": "Hello",
          "videoUrl": "https://api.golearn.vn/videos/greeting.mp4",
          "variants": [
            {
              "id": "v1",
              "label": "Từ đơn · Một tay",
              "hands": "một tay",
              "type": "từ đơn"
            }
          ]
        }
      ]
    },
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "question": "Cách chào 'Xin chào' trong ngôn ngữ ký hiệu là gì?",
        "options": ["Vẫy tay", "Gật đầu", "Nhảy", "Hát"],
        "correctAnswer": "Vẫy tay",
        "explanation": "Chào 'Xin chào' được thực hiện bằng cách vẫy tay nhẹ nhàng"
      }
    ],
    "difficulty": "Cơ bản",
    "duration": 600,
    "xp": 50,
    "level": 1,
    "category": "greetings"
  }
}
```

### 3.3 Start Lesson
```http
POST /lessons/{lessonId}/start
Authorization: Bearer <jwt_token>
```

### 3.4 Complete Lesson
```http
POST /lessons/{lessonId}/complete
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "score": 85,
  "timeSpent": 580, // seconds
  "answers": [
    {
      "questionId": "q1",
      "answer": "Vẫy tay",
      "isCorrect": true
    }
  ]
}
```

### 3.5 Get Lesson Progress
```http
GET /lessons/{lessonId}/progress
Authorization: Bearer <jwt_token>
```

---

## 4. Practice & Exercises

**Frontend Files:**
- `src/app/pages/Dashboard.tsx` - Practice modules in Practice tab
- `src/features/learning/practice-hub.tsx` - Practice hub interface
- `src/features/onboarding/mirror-practice.tsx` - Mirror practice component
- `src/features/onboarding/demo-practice.tsx` - Demo practice components

### 4.1 Get Practice Modules
```http
GET /practice/modules
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "quick-review",
      "title": "Ôn nhanh",
      "description": "Ôn lại ký hiệu đã học trong 5 phút",
      "duration": 300,
      "xp": 20,
      "locked": false,
      "unlockRequirement": {
        "completedLessons": 3
      }
    }
  ]
}
```

### 4.2 Start Practice Session
```http
POST /practice/{moduleId}/start
Authorization: Bearer <jwt_token>
```

### 4.3 Complete Practice Session
```http
POST /practice/{moduleId}/complete
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "score": 90,
  "timeSpent": 280,
  "exercisesCompleted": 15
}
```

---

## 5. Stories & Conversations

**Frontend Files:**
- `src/app/pages/Dashboard.tsx` - Stories tab with story cards
- `src/features/onboarding/demo-choose.tsx` - Story selection demo
- `src/features/onboarding/demo-learn.tsx` - Story learning demo

### 5.1 Get Stories
```http
GET /stories
Authorization: Bearer <jwt_token>
Query Parameters:
  - difficulty: string (optional)
  - category: string (optional)
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "story_1",
      "title": "Lần đầu gặp gỡ",
      "type": "Hội thoại",
      "difficulty": "Cơ bản",
      "duration": 360,
      "xp": 40,
      "locked": false,
      "thumbnail": "https://api.golearn.vn/thumbnails/story_1.jpg"
    }
  ]
}
```

### 5.2 Get Story Detail
```http
GET /stories/{storyId}
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "story_1",
    "title": "Lần đầu gặp gỡ",
    "type": "Hội thoại",
    "steps": [
      {
        "id": "step_1",
        "speaker": "A",
        "text": "Xin chào! Mình là Minh.",
        "hint": "Chào hỏi + giới thiệu tên",
        "mediaType": "video",
        "mediaUrl": "https://api.golearn.vn/videos/greeting_intro.mp4"
      }
    ],
    "difficulty": "Cơ bản",
    "duration": 360,
    "xp": 40
  }
}
```

### 5.3 Complete Story
```http
POST /stories/{storyId}/complete
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "timeSpent": 350,
  "stepsCompleted": 4
}
```

---

## 6. Dictionary & Vocabulary

**Frontend Files:**
- `src/app/pages/Dashboard.tsx` - Dictionary tab
- `src/shared/components/dictionary.tsx` - Main dictionary component
- `src/features/learning/fill-gap-exercise.tsx` - Vocabulary exercises

### 6.1 Search Dictionary
```http
GET /dictionary/search
Authorization: Bearer <jwt_token>
Query Parameters:
  - q: string (search term)
  - category: string (optional)
  - difficulty: string (optional)
  - page: number (default: 1)
  - limit: number (default: 20)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "entries": [
      {
        "id": "word_1",
        "word": "Hello",
        "emoji": "👋",
        "description": "Wave your hand",
        "category": "greetings",
        "difficulty": "easy",
        "videoUrl": "https://api.golearn.vn/videos/hello.mp4",
        "variants": [
          {
            "id": "v1",
            "label": "Từ đơn · Một tay",
            "hands": "một tay",
            "type": "từ đơn"
          }
        ]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100
    }
  }
}
```

### 6.2 Get Dictionary Categories
```http
GET /dictionary/categories
Authorization: Bearer <jwt_token>
```

### 6.3 Add to Favorites
```http
POST /dictionary/favorites
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "wordId": "word_1"
}
```

### 6.4 Remove from Favorites
```http
DELETE /dictionary/favorites/{wordId}
Authorization: Bearer <jwt_token>
```

### 6.5 Get Favorites
```http
GET /dictionary/favorites
Authorization: Bearer <jwt_token>
```

---

## 7. Progress & Analytics

**Frontend Files:**
- `src/app/pages/Dashboard.tsx` - Progress stats, leaderboard
- `src/app/pages/Profile.tsx` - Personal progress, achievements, goals
- `src/shared/components/progress-analytics.tsx` - Progress analytics components
- `src/shared/components/streak-celebration.tsx` - Streak celebration UI

### 7.1 Get User Progress
```http
GET /progress
Authorization: Bearer <jwt_token>
Query Parameters:
  - period: string (week, month, year) (default: week)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalXp": 1250,
      "currentLevel": 5,
      "streak": 7,
      "completedLessons": 12,
      "totalLessons": 20
    },
    "weeklyStats": {
      "lessonsCompleted": 5,
      "timeSpent": 9000, // seconds
      "xpEarned": 350,
      "streakDays": 7
    },
    "monthlyGoals": [
      {
        "goal": "Học 20 bài học trong tháng này",
        "progress": 15,
        "target": 20,
        "color": "bg-blue-600"
      }
    ],
    "achievements": [
      {
        "id": "ach_1",
        "name": "Người mới bắt đầu",
        "description": "Hoàn thành bài học đầu tiên",
        "earned": true,
        "date": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

### 7.2 Get Learning History
```http
GET /progress/history
Authorization: Bearer <jwt_token>
Query Parameters:
  - page: number (default: 1)
  - limit: number (default: 20)
```

### 7.3 Get Leaderboard
```http
GET /leaderboard
Authorization: Bearer <jwt_token>
Query Parameters:
  - period: string (week, month, all) (default: week)
  - limit: number (default: 10)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "leaderboard": [
      {
        "rank": 1,
        "userId": "user_456",
        "name": "Minh Anh",
        "xp": 2150,
        "avatar": "https://api.golearn.vn/avatars/user_456.jpg"
      }
    ],
    "currentUser": {
      "rank": 3,
      "xp": 1250
    }
  }
}
```

---

## 8. Notifications

**Frontend Files:**
- `src/shared/components/Header.tsx` - Notification bell icon
- `src/app/pages/Settings.tsx` - Notification preferences
- `src/shared/providers/theme-provider.tsx` - Theme and notification context

### 8.1 Get Notifications
```http
GET /notifications
Authorization: Bearer <jwt_token>
Query Parameters:
  - page: number (default: 1)
  - limit: number (default: 20)
  - unreadOnly: boolean (default: false)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "notif_1",
        "type": "lesson_reminder",
        "title": "Nhắc nhở học tập",
        "message": "Đã đến giờ học bài 'Chào hỏi cơ bản'",
        "read": false,
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "unreadCount": 3
  }
}
```

### 8.2 Mark Notification as Read
```http
PUT /notifications/{notificationId}/read
Authorization: Bearer <jwt_token>
```

### 8.3 Mark All Notifications as Read
```http
PUT /notifications/read-all
Authorization: Bearer <jwt_token>
```

### 8.4 Update Notification Preferences
```http
PUT /notifications/preferences
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "lessonReminders": true,
  "achievements": true,
  "streakReminders": false,
  "weeklyReports": true
}
```

---

## 9. Content Management

**Frontend Files:**
- `src/features/learning/lesson-interface.tsx` - Video playback interface
- `src/components/VideoDebug.tsx` - Video debugging component
- `src/utils/video-loader.ts` - Video loading utilities
- `src/utils/video-mapping.ts` - Video mapping utilities
- `src/utils/test-videos.ts` - Test video data
- `public/resources/videos/` - Video assets folder

### 9.1 Get Video Content
```http
GET /content/videos/{videoId}
Authorization: Bearer <jwt_token>
```

### 9.2 Get Video Stream
```http
GET /content/videos/{videoId}/stream
Authorization: Bearer <jwt_token>
Range: bytes=0-1023
```

### 9.3 Get Thumbnails
```http
GET /content/thumbnails/{thumbnailId}
Authorization: Bearer <jwt_token>
```

---

## 10. AI & Assessment

**Frontend Files:**
- `src/features/onboarding/mirror-practice.tsx` - Camera-based practice
- `src/features/learning/lesson-interface.tsx` - AI feedback integration
- `src/features/learning/lesson-results.tsx` - Assessment results display

### 10.1 Submit Practice Video
```http
POST /ai/assess-practice
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data

file: <video_file>
lessonId: lesson_1
exerciseId: ex_1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "score": 85,
    "feedback": "Tốt! Bạn đã thực hiện đúng động tác chào hỏi",
    "suggestions": [
      "Hãy chậm lại một chút để rõ ràng hơn",
      "Giữ tay thẳng hơn khi vẫy"
    ],
    "accuracy": 0.85,
    "timing": 0.90
  }
}
```

### 10.2 Get AI Feedback
```http
GET /ai/feedback/{sessionId}
Authorization: Bearer <jwt_token>
```

---

## 11. Social Features

**Frontend Files:**
- `src/app/pages/Landing.tsx` - Community testimonials, social proof
- `src/shared/components/app-benefits.tsx` - Community benefits display
- `src/features/onboarding/learning-reasons.tsx` - Community learning reasons

### 11.1 Get Community Posts
```http
GET /community/posts
Authorization: Bearer <jwt_token>
Query Parameters:
  - page: number (default: 1)
  - limit: number (default: 20)
  - category: string (optional)
```

### 11.2 Create Community Post
```http
POST /community/posts
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Chia sẻ kinh nghiệm học",
  "content": "Tôi muốn chia sẻ...",
  "category": "experience",
  "tags": ["học tập", "kinh nghiệm"]
}
```

### 11.3 Like/Unlike Post
```http
POST /community/posts/{postId}/like
Authorization: Bearer <jwt_token>
```

### 11.4 Comment on Post
```http
POST /community/posts/{postId}/comments
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "content": "Cảm ơn bạn đã chia sẻ!"
}
```

---

## 12. Settings & Preferences

**Frontend Files:**
- `src/app/pages/Settings.tsx` - Main settings page
- `src/app/pages/Profile.tsx` - Settings tab in profile
- `src/shared/providers/theme-provider.tsx` - Theme management
- `src/features/onboarding/language-selection.tsx` - Language preferences

### 12.1 Get App Settings
```http
GET /settings
Authorization: Bearer <jwt_token>
```

### 12.2 Update App Settings
```http
PUT /settings
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "language": "vi",
  "theme": "dark",
  "notifications": {
    "lessonReminders": true,
    "achievements": true,
    "streakReminders": false
  },
  "learning": {
    "dailyGoal": 30, // minutes
    "difficulty": "medium"
  }
}
```

---

## 13. Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu không hợp lệ",
    "details": {
      "email": "Email không đúng định dạng"
    }
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR`: Dữ liệu đầu vào không hợp lệ
- `UNAUTHORIZED`: Token không hợp lệ hoặc hết hạn
- `FORBIDDEN`: Không có quyền truy cập
- `NOT_FOUND`: Tài nguyên không tồn tại
- `RATE_LIMITED`: Vượt quá giới hạn request
- `SERVER_ERROR`: Lỗi server

---

## 14. Rate Limiting

- **Authentication endpoints**: 5 requests/minute
- **General API**: 100 requests/hour
- **File upload**: 10 requests/hour
- **AI assessment**: 5 requests/hour

---

## 15. WebSocket Events

### Real-time Notifications
```javascript
// Connect to WebSocket
const ws = new WebSocket('wss://api.golearn.vn/ws');

// Listen for events
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  switch(data.type) {
    case 'lesson_completed':
      // Handle lesson completion
      break;
    case 'achievement_unlocked':
      // Handle new achievement
      break;
    case 'streak_reminder':
      // Handle streak reminder
      break;
  }
};
```

---

## 16. File Upload Specifications

### Supported Formats
- **Images**: JPEG, PNG, WebP (max 5MB)
- **Videos**: MP4, WebM (max 100MB)
- **Audio**: MP3, WAV (max 10MB)

### Upload Endpoints
```http
POST /upload/image
POST /upload/video
POST /upload/audio
```

---

## 17. Pagination

All list endpoints support pagination:
```json
{
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## 18. Caching Strategy

- **User profile**: 5 minutes
- **Lessons list**: 1 hour
- **Dictionary entries**: 24 hours
- **Static content**: 7 days

---

## 19. Security Considerations

1. **JWT tokens** expire after 24 hours
2. **Refresh tokens** expire after 30 days
3. **Password** must be at least 8 characters
4. **Rate limiting** on all endpoints
5. **CORS** configured for frontend domains
6. **HTTPS** required in production
7. **Input validation** on all endpoints
8. **SQL injection** prevention
9. **XSS** protection
10. **CSRF** protection

---

## 20. Monitoring & Analytics

### Health Check
```http
GET /health
```

### Metrics
```http
GET /metrics
```

### API Usage Stats
```http
GET /admin/usage-stats
Authorization: Bearer <admin_token>
```

---

## Kết luận

Tài liệu này cung cấp đầy đủ các RESTful API endpoints cần thiết cho ứng dụng GoLearn. Các API được thiết kế để hỗ trợ:

1. **Authentication & User Management**: Đăng ký, đăng nhập, quản lý profile
2. **Learning Content**: Bài học, thực hành, câu chuyện
3. **Progress Tracking**: Theo dõi tiến độ, thành tích
4. **Social Features**: Cộng đồng, chia sẻ
5. **AI Integration**: Đánh giá thực hành, feedback
6. **Content Management**: Video, hình ảnh, từ điển

Mỗi endpoint đều có response format rõ ràng và error handling đầy đủ để đảm bảo trải nghiệm người dùng tốt nhất.
