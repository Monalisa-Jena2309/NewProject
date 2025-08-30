import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8899/api';

  constructor(private http: HttpClient) {
    // clear expired token on load
    if (this.getToken() && this.isTokenExpired()) {
      this.logout();
    }
  }

  // ---------- SESSION ----------
  setSession(res: { token: string; username?: string; email?: string; role?: string }): void {
    if (res.token) localStorage.setItem('token', res.token);
    if (res.username) localStorage.setItem('username', res.username);
    if (res.email) localStorage.setItem('email', res.email);
    if (res.role) localStorage.setItem('role', res.role);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  // ---------- TOKEN CHECK ----------
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    try {
      const payloadPart = token.split('.')[1];
      const base64 = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const payload = JSON.parse(json);
      if (!payload.exp) return false;
      return Date.now() > payload.exp * 1000;
    } catch {
      return true;
    }
  }

  // ---------- AUTH ----------
  register(user: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, user);
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap((res) => {
        this.setSession(res); // ✅ save token & user info
      })
    );
  }

  // ---------- SECURE TESTS ----------
  getUserHello(): Observable<any> {
    return this.http.get(`${this.baseUrl}/secure/user/hello`, { responseType: 'text' });
  }

  getAdminHello(): Observable<any> {
    return this.http.get(`${this.baseUrl}/secure/admin/hello`, { responseType: 'text' });
  }
}
