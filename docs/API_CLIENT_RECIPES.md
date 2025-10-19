# API Client Recipes (Code Snippets)

Các đoạn mã ngắn giúp bạn dùng API nhanh chóng trong dự án.

## Đăng nhập
```ts
import { login } from '../src/lib/auth.client';
await login('user@example.com', 'password123');
```

## Lấy danh sách bài học
```ts
import { getLessons } from '../src/lib/lessons.client';
const data = await getLessons({ page: 1, limit: 20 });
```

## Lấy chi tiết bài học
```ts
import { getLessonDetail } from '../src/lib/lessons.client';
const lesson = await getLessonDetail('lesson_1');
```

## Lấy vocabulary sequence (multi-video)
```ts
import { getLessonVocabSequence } from '../src/lib/lessons.client';
const seq = await getLessonVocabSequence('lesson_8');
```

## Lấy vocabulary timings (1 video master)
```ts
import { getLessonVocabTimings } from '../src/lib/lessons.client';
const timings = await getLessonVocabTimings('lesson_1');
```

## Tìm kiếm từ điển
```ts
import { searchDictionary } from '../src/lib/dictionary.client';
const results = await searchDictionary({ q: 'xin chào' });
```

## Bắt đầu & hoàn thành practice
```ts
import { startPractice, completePractice } from '../src/lib/practice.client';
await startPractice('quick-review');
await completePractice('quick-review', { score: 90, timeSpent: 280, exercisesCompleted: 15 });
```

## Lấy tiến độ
```ts
import { getProgress } from '../src/lib/progress.client';
const progress = await getProgress();
```
