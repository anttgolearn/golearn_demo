export function getAuthToken(): string | null {
  return localStorage.getItem('golearn_token');
}

export function setAuthToken(token: string) {
  localStorage.setItem('golearn_token', token);
}

export function clearAuthToken() {
  localStorage.removeItem('golearn_token');
}
