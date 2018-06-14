import {Inject, Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {APP_CONFIG, IAppConfig} from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class UserServiceProvider {

  constructor(private http: HttpClient, private, @Inject(APP_CONFIG) private config: IAppConfig) { }

  login(username: string, password: string) {
    return this.http.post<any>(this.config.apiEndpoint + '/api/authenticate', { username: username, password: password })
      .pipe(map((res: any) => {
        console.log(res);
        if (res && res.token) {
          localStorage.setItem('currentUser', JSON.stringify({ username, token: res.token }));
        }
      }));
  }

  logout(): void {

  }
}
