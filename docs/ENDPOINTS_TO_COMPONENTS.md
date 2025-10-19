# Endpoints to Components Mapping

This document maps UI components/screens in the repo to backend endpoints from `API_ENDPOINTS_SPECIFICATION.md`.

## Pages
- `src/app/pages/Dashboard.tsx`
  - GET `/lessons`
  - GET `/practice/modules`
  - GET `/progress`
  - GET `/leaderboard`
- `src/app/pages/LessonDetail.tsx`
  - GET `/lessons/{lessonId}`
  - GET `/lessons/{lessonId}/vocabulary-sequence` (emotion lessons: multi-video)
  - GET `/lessons/{lessonId}/vocabulary-timings` (single master video)
  - POST `/lessons/{lessonId}/start`
  - POST `/lessons/{lessonId}/complete`
  - GET `/lessons/{lessonId}/progress`
  - POST `/lessons/{lessonId}/events/jump` (optional telemetry)
- `src/app/pages/Settings.tsx`
  - GET `/settings`
  - PUT `/settings`

## Features - Learning
- `src/features/learning/learning-flow.tsx`
  - GET `/lessons/{lessonId}`
  - POST `/lessons/{lessonId}/start`
  - POST `/lessons/{lessonId}/complete`
- `src/features/learning/fill-gap-exercise.tsx`
  - GET `/dictionary/search`
- `src/features/learning/lesson-results.tsx`
  - GET `/progress`

## Features - Onboarding
- `src/features/onboarding/sign-up-form.tsx`
  - POST `/auth/register`
- `src/features/onboarding/onboarding-flow.tsx`
  - POST `/auth/login`
  - POST `/auth/refresh`
  - GET `/users/profile`

## Practice
- `src/features/practice` components
  - GET `/practice/modules`
  - POST `/practice/{moduleId}/start`
  - POST `/practice/{moduleId}/complete`

## Dictionary
- `src/shared/components/dictionary.tsx`
  - GET `/dictionary/search`
  - GET `/dictionary/categories`
  - POST `/dictionary/favorites`
  - DELETE `/dictionary/favorites/{wordId}`
  - GET `/dictionary/favorites`

## Content
- `src/utils/video-loader.ts`, `src/utils/video-mapping.ts`
  - GET `/content/videos/{videoId}`
  - GET `/content/videos/{videoId}/stream`
  - GET `/content/thumbnails/{thumbnailId}`

## Notifications
- `src/shared/components/Header.tsx`
  - GET `/notifications`
  - PUT `/notifications/{notificationId}/read`
  - PUT `/notifications/read-all`

## Profile & Progress
- `src/app/pages/Profile.tsx`
  - GET `/users/profile`
  - PUT `/users/profile`
  - POST `/users/avatar`
  - DELETE `/users/profile`
- `src/shared/components/progress-analytics.tsx`
  - GET `/progress`
  - GET `/progress/history`
  - GET `/leaderboard`

## AI
- `src/features/onboarding/mirror-practice.tsx`
  - POST `/ai/assess-practice`
  - GET `/ai/feedback/{sessionId}`

---

For any component not listed, follow similar patterns: list views use GET with pagination; actions use POST/PUT/DELETE; and always attach the `Authorization: Bearer <token>` header when authenticated.
