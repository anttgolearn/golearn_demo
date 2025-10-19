import { getAuthToken } from './auth';

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const env = (import.meta as any)?.env || {};
  const baseUrl: string = env.VITE_API_BASE_URL || (process as any)?.env?.VITE_API_BASE_URL || '';
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {})
  };
  const token = getAuthToken?.();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${baseUrl}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await safeJson(res);
    throw new Error((err as any)?.error?.message || `HTTP ${res.status}`);
  }
  return (await safeJson(res)) as T;
}

async function safeJson(res: Response) {
  try { return await res.json(); } catch { return null; }
}
