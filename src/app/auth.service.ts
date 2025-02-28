import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
export interface JwtPayload {
    exp: number;
    sub: string;
    // add any other claims you use
  }
@Injectable({
  providedIn: 'root'    
})
export class AuthService {

  private tokenKey: string = 'access_token';




  constructor(private router: Router) { }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.scheduleAutoLogout(token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/']);
  }
  private scheduleAutoLogout(token: string): void {
    const decoded = jwtDecode<JwtPayload>(token);
    const expTime = decoded.exp * 1000; // convert to milliseconds
    const currentTime = Date.now();
    const timeout = expTime - currentTime;
    if (timeout > 0) {
      setTimeout(() => {
        this.logout();
      }, timeout);
    }
  }
}
