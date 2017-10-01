import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  cacheRequests: Array<HttpRequest<any>> = [];

  constructor() { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return tokenNotExpired(null, token);
  }

  collectFailedRequest(request) {
    this.cacheRequests.push(request);
  }
}
