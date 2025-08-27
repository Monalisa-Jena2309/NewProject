import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8899/api';

  constructor(private http: HttpClient) {}

  // AUTH
  register(user: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, user);
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    // backend returns JSON: { token, username, email, role }
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }

  // SECURE TESTS
  getUserHello(): Observable<any> {
    return this.http.get(`${this.baseUrl}/secure/user/hello`, { responseType: 'text' });
  }

  getAdminHello(): Observable<any> {
    return this.http.get(`${this.baseUrl}/secure/admin/hello`, { responseType: 'text' });
  }
}
