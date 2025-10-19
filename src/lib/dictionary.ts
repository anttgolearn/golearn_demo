import { api } from './api';

export async function searchDictionary(params: { q: string; category?: string; difficulty?: string; page?: number; limit?: number; }) {
  const query = new URLSearchParams();
  query.set('q', params.q);
  if (params.category) query.set('category', params.category);
  if (params.difficulty) query.set('difficulty', params.difficulty);
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  return api(`/dictionary/search?${query.toString()}`);
}

export async function getDictionaryCategories() {
  return api(`/dictionary/categories`);
}

export async function addFavorite(wordId: string) {
  return api(`/dictionary/favorites`, { method: 'POST', body: JSON.stringify({ wordId }) });
}

export async function removeFavorite(wordId: string) {
  return api(`/dictionary/favorites/${wordId}`, { method: 'DELETE' });
}

export async function getFavorites() {
  return api(`/dictionary/favorites`);
}
