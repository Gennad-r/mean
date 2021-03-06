import { Injectable } from '@angular/core';
import {User} from '../interfaces/user';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private token: string;

  constructor(private http: HttpClient) { }

  register(user: User): Observable<{message: string}> {
    return this.http.post<{message: string}>('/api/auth/register', user);
  }

  login(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>('/api/auth/login', user)
      .pipe(
        tap(({token}) => {
          localStorage.setItem('auth-token', token);
          this.setToken(token);
        })
      );
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }
}
