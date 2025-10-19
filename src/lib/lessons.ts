import { api } from './api';

export async function getLessons(params?: { page?: number; limit?: number; category?: string; difficulty?: string; level?: number; }) {
  const query = new URLSearchParams();
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));
  if (params?.category) query.set('category', params.category);
  if (params?.difficulty) query.set('difficulty', params.difficulty);
  if (params?.level) query.set('level', String(params.level));
  const qs = query.toString();
  return api(`/lessons${qs ? `?${qs}` : ''}`);
}

export async function getLessonDetail(lessonId: string) {
  return api(`/lessons/${lessonId}`);
}

export async function startLesson(lessonId: string) {
  return api(`/lessons/${lessonId}/start`, { method: 'POST' });
}

export async function completeLesson(lessonId: string, body: { score: number; timeSpent: number; answers: Array<{ questionId: string; answer: string; isCorrect: boolean; }>; }) {
  return api(`/lessons/${lessonId}/complete`, { method: 'POST', body: JSON.stringify(body) });
}

export async function getLessonProgress(lessonId: string) {
  return api(`/lessons/${lessonId}/progress`);
}

export async function getLessonVocabSequence(lessonId: string) {
  return api(`/lessons/${lessonId}/vocabulary-sequence`);
}

export async function getLessonVocabTimings(lessonId: string) {
  return api(`/lessons/${lessonId}/vocabulary-timings`);
}

export async function sendJumpEvent(lessonId: string, body: { vocabId: string; fromIndex?: number; toIndex?: number; context?: Record<string, unknown>; }) {
  return api(`/lessons/${lessonId}/events/jump`, { method: 'POST', body: JSON.stringify(body) });
}
