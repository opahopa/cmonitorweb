import { Injectable } from '@angular/core';
import {LogModalComponent} from '../components/log-modal/log-modal.component';
import {AlertComponent} from '../components/alert/alert.component';
import {MatDialog} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class InfoModalsService {

  constructor(public dialog: MatDialog) { }

  openLogModal(title: string, content: any) {
    this.dialog.open(LogModalComponent, {
      data: { title: title, log: content },
      width: '95vw',
      maxWidth: '95vw',
    });
  }

  openAlert(text: string) {
    this.dialog.open(AlertComponent, {
      data: { message: text }
    });
  }
}
