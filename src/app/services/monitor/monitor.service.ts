import { Injectable } from '@angular/core';
import { MessagesService } from '../message/messages.service';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  constructor(private messagesService: MessagesService) { }

  connect(): boolean {
    this.messagesService.add('MonitorService: connected');
    return true;
  }
}
