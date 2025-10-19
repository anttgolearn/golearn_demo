# Backend Auth Guide

This document details authentication flows and recommended frontend handling.

## Token Model
- Access token (JWT): short-lived, used in `Authorization: Bearer <token>`
- Refresh token: long-lived, used to obtain new access tokens

## Endpoints
- POST `/auth/register`
- POST `/auth/login`
- POST `/auth/refresh`
- POST `/auth/logout`
- POST `/auth/forgot-password`
- POST `/auth/reset-password`

## Frontend Storage Strategy
- Store access token in memory or `localStorage` (simpler). Consider rotating via refresh.
- Do NOT store refresh tokens in insecure storage; prefer httpOnly cookies or secure storage.

## Example: Login + Persist
```ts
import { api } from '../lib/api';
import { setAuthToken, clearAuthToken } from '../lib/auth';

export async function login(email: string, password: string) {
  const res = await api<{ data: { token: string } }>(`/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  setAuthToken(res.data.token);
}

export function logout() {
  clearAuthToken();
}
```

## Example: Refresh on 401
Wrap `api` with a retry on 401 using `/auth/refresh`.
```ts
let refreshing: Promise<string | null> | null = null;

async function refreshToken(): Promise<string | null> {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: localStorage.getItem('golearn_refresh') })
  });
  if (!res.ok) return null;
  const json = await res.json();
  const token = json?.data?.token as string | undefined;
  if (token) localStorage.setItem('golearn_token', token);
  return token ?? null;
}

export async function apiWithRefresh<T>(path: string, options: RequestInit = {}): Promise<T> {
  try {
    return await api<T>(path, options);
  } catch (err: any) {
    if (!String(err.message).includes('HTTP 401')) throw err;
    if (!refreshing) refreshing = refreshToken();
    const newToken = await refreshing; refreshing = null;
    if (!newToken) throw err;
    return await api<T>(path, options);
  }
}
```

## Password Reset
- User requests `/auth/forgot-password` with email
- Receives email with token link
- Submits `/auth/reset-password` with `token` + `newPassword`

## Security Notes
- Enforce HTTPS and CORS allowlist
- Rate-limit auth endpoints
- Use strong password policy and lockouts on brute force
- Rotate tokens and invalidate on logout
