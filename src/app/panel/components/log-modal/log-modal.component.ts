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
    this.title = data.title;
  }

  ngOnInit() {
  }
}
