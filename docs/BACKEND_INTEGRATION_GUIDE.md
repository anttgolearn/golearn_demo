# GoLearn Backend Integration Guide

## Overview
This guide explains how to connect the current frontend (Vite + React + TypeScript + Tailwind) to a backend API, configure environments, and implement the key data flows used in components like `LessonDetail.tsx`, dictionary, practice modules, and auth.

## Prerequisites
- Node.js 18+
- Backend base URL(s)
- JWT auth with access/refresh tokens

## Environment Configuration
Create `.env.local` for local development:
```bash
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_WS_URL=ws://localhost:3000/ws
```
These are read via `import.meta.env.VITE_API_BASE_URL` in Vite.

## HTTP Client Setup
Create `src/lib/api.ts`:
```ts
import { getAuthToken } from './auth';

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  const token = getAuthToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${baseUrl}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await safeJson(res);
    throw new Error(err?.error?.message || `HTTP ${res.status}`);
  }
  return (await safeJson(res)) as T;
}

async function safeJson(res: Response) {
  try { return await res.json(); } catch { return null; }
}
```

Minimal `src/lib/auth.ts`:
```ts
export function getAuthToken(): string | null {
  return localStorage.getItem('golearn_token');
}
export function setAuthToken(token: string) {
  localStorage.setItem('golearn_token', token);
}
export function clearAuthToken() {
  localStorage.removeItem('golearn_token');
}
```

## Auth Flows
- Register: POST `/auth/register`
- Login: POST `/auth/login` → save access token with `setAuthToken`
- Refresh: POST `/auth/refresh` (handle 401 globally if needed)
- Logout: POST `/auth/logout` + `clearAuthToken()`

Example login:
```ts
import { api } from './api';
import { setAuthToken } from './auth';

export async function login(email: string, password: string) {
  const res = await api<{ data: { token: string } }>(`/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  setAuthToken(res.data.token);
}
```

## Lessons
- List: GET `/lessons`
- Detail: GET `/lessons/{lessonId}`
- Start: POST `/lessons/{lessonId}/start`
- Complete: POST `/lessons/{lessonId}/complete`
- Progress: GET `/lessons/{lessonId}/progress`
- Vocabulary sequence: GET `/lessons/{lessonId}/vocabulary-sequence`
- Vocabulary timings: GET `/lessons/{lessonId}/vocabulary-timings`

### Integrate with `LessonDetail.tsx`
For emotion lessons (multi-video):
```ts
const { data } = await api<{ data: { sequence: Array<{id:string, videoUrl:string}> } }>(`/lessons/${lessonId}/vocabulary-sequence`);
setVideoSequence(data.sequence.map(s => s.videoUrl));
```
For single master video:
```ts
const { data } = await api<{ data: { videoUrl:string, segments:Array<{id:string,start:number,end:number}> } }>(`/lessons/${lessonId}/vocabulary-timings`);
// Store data and seek with `video.currentTime = start` on click
```
Send telemetry (optional):
```ts
api(`/lessons/${lessonId}/events/jump`, { method:'POST', body: JSON.stringify({ vocabId, fromIndex, toIndex, context:{ source:'vocabulary_list' } }) });
```

## Practice Modules
- Modules: GET `/practice/modules`
- Start: POST `/practice/{moduleId}/start`
- Complete: POST `/practice/{moduleId}/complete`

## Dictionary
- Search: GET `/dictionary/search?q=…`
- Categories: GET `/dictionary/categories`
- Favorites: POST/DELETE/GET `/dictionary/favorites`

## Progress
- Overview: GET `/progress`
- History: GET `/progress/history`
- Leaderboard: GET `/leaderboard`

## Content
- Video: GET `/content/videos/{videoId}` or direct CDN URL
- Stream: GET `/content/videos/{videoId}/stream`
- Thumbnails: GET `/content/thumbnails/{thumbnailId}`

## WebSocket
Basic connection for notifications:
```ts
const ws = new WebSocket(import.meta.env.VITE_WS_URL);
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  // handle message types
};
```

## Error Handling
- Standard error format per spec.
- Show friendly messages; log details in dev.

## Caching & Performance
- Cache lessons list (stale-while-revalidate) via SW or localStorage.
- Use `Accept-Ranges`/Range requests for long videos.
- Debounce dictionary search.

## Security
- Always use HTTPS in production.
- Store tokens in memory or secure storage; rotate via refresh.

## Folder Suggestions
```bash
src/
  lib/
    api.ts
    auth.ts
    lessons.ts
    dictionary.ts
    practice.ts
    progress.ts
```

## Testing Backend Integration
- Use Postman collections mirroring this spec.
- Add `scripts` in backend to seed lessons and vocab timings.

## Deployment
- Configure `VITE_API_BASE_URL` per env on Vercel.
- Enable CORS for the frontend origins.

---

Need help wiring a specific screen? See `docs/ENDPOINTS_TO_COMPONENTS.md`.
