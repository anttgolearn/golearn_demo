import { api } from './api';

export async function getProgress(params?: { period?: 'week' | 'month' | 'year'; }) {
  const query = new URLSearchParams();
  if (params?.period) query.set('period', params.period);
  const qs = query.toString();
  return api(`/progress${qs ? `?${qs}` : ''}`);
}

export async function getProgressHistory(params?: { page?: number; limit?: number; }) {
  const query = new URLSearchParams();
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));
  return api(`/progress/history?${query.toString()}`);
}

export async function getLeaderboard(params?: { period?: 'week' | 'month' | 'all'; limit?: number; }) {
  const query = new URLSearchParams();
  if (params?.period) query.set('period', params.period);
  if (params?.limit) query.set('limit', String(params.limit));
  const qs = query.toString();
  return api(`/leaderboard${qs ? `?${qs}` : ''}`);
}
