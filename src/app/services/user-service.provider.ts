import {Inject, Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {APP_CONFIG, IAppConfig} from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class UserServiceProvider {

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: IAppConfig) { }

  login(email: string, password: string) {
    return this.http.post<any>(this.config.apiEndpoint + 'api-token-auth/', { email: email, password: password })
      .pipe(map((res: any) => {
        if (res && res.token) {
          localStorage.setItem('currentUser', JSON.stringify({ email, token: res.token }));
        }
      }));
  }

  logout(): void {

  }
}
