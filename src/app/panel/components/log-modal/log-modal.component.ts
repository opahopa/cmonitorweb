import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-log-modal',
  templateUrl: './log-modal.component.html',
  styleUrls: ['./log-modal.component.scss']
})
export class LogModalComponent implements OnInit {
  title: string;

  constructor(public dialogRef: MatDialogRef<LogModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  get log() {
    return this.data.log;
  }

  ngOnInit() {
    console.log('ngOnInit LogModal');
    this.title = this.data.title;
  }
}
