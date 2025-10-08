import { api } from './api';

export async function getPracticeModules() {
  return api(`/practice/modules`);
}

export async function startPractice(moduleId: string) {
  return api(`/practice/${moduleId}/start`, { method: 'POST' });
}

export async function completePractice(moduleId: string, body: { score: number; timeSpent: number; exercisesCompleted: number; }) {
  return api(`/practice/${moduleId}/complete`, { method: 'POST', body: JSON.stringify(body) });
}
