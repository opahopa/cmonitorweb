import { Injectable } from '@angular/core';
import {UserServiceProvider} from '../../providers/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: any;

  constructor(private userProvider: UserServiceProvider) { }

  login(username: string, password: string) {
    return this.userProvider.login(username, password);
  }

  isAuthenticated(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      return true;
    } else {
      return false;
    }
  }


  refreshToken() {
    return;
  }

  cleanup_localstorage(): void {
    localStorage.removeItem('currentUser');
  }

  logout() {
    this.cleanup_jwt();
    return null;
  }
}
