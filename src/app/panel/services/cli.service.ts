import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {APP_CONFIG, IAppConfig} from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class CliService {

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: IAppConfig) { }

  download() {
    return this.http.get(this.config.apiEndpoint + 'monitor/client/', {responseType: 'blob'});
  }

  genCli() {
    return this.http.get(this.config.apiEndpoint + 'monitor/client/generate/');
  }

  getCliVersion() {
    return this.http.get<any>(this.config.apiEndpoint + 'monitor/client/info/version/');
  }
}
