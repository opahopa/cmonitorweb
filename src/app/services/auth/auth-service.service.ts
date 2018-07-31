import { Injectable } from '@angular/core';
import {UserServiceProvider} from '../user-service.provider';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: any;

  constructor(private userProvider: UserServiceProvider) { }

  login(username: string, password: string) {
    return this.userProvider.login(username, password);
  }

  register(username: string, password: string) {
    return this.userProvider.register(username, password);
  }

  isAuthenticated(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      return true;
    } else {
      return false;
    }
  }

  /* return obj {email, token} */
  getUser(): string {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  refreshToken() {
    return;
  }

  cleanup_localstorage(): void {
    localStorage.removeItem('currentUser');
  }

  logout(): void {
    this.cleanup_localstorage();
  }
}
