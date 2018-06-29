import {Inject, Injectable, OnDestroy, OnInit} from '@angular/core';
import {Action} from '../../models/enums/action.enum';
import {WSEvent} from '../../models/enums/wsevent.enum';
import {APP_CONFIG, IAppConfig} from '../../../app.config';
import {AuthService} from '../../../services/auth/auth-service.service';
import {Observable} from 'rxjs';
import {Message} from '../../models/message';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService  implements OnDestroy {
  socket: WebSocket;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private authService: AuthService) { }

  initConnection(): void {
    document.cookie = 'X-Authorization=' + this.authService.getUser()['token'] + '; path=/';
    this.socket = new WebSocket(
      this.config.apiEndpoint.replace(/^https?:\/\//i, 'ws://') + `ws/monitor/${this.authService.getUser()['email']}/`);
    this.watchEvent(WSEvent.ERROR).subscribe(data => {
      console.log(data);
    });
  }

  watchEvent(wsevent: WSEvent): Observable<any> {
    return new Observable(observer => {
      this.socket.addEventListener(wsevent, function (event) {
        observer.next(event);
        // observer.complete();
      });
    });
  }

  sendMessage(msg: Message): void {
    this.socket.send(JSON.stringify(msg));
  }

  closeConnection(): void {
    console.log('Called ws close');
    this.socket.close();
  }

  ngOnDestroy() {
    // this.socket.close();
  }
}
