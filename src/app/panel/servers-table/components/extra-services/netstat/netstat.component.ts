import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {ServiceStateModalComponent} from '../../service-state-modal/service-state-modal.component';

@Component({
  selector: 'app-netstat',
  templateUrl: './netstat.component.html',
  styleUrls: ['./netstat.component.scss']
})
export class NetstatComponent implements OnInit {
  args: string;
  placeholder = ' -tulnp';
  error: string;

  constructor(public dialogRef: MatDialogRef<ServiceStateModalComponent>) { }

  ngOnInit() {
  }

  checkErrors() {
    if (this.args && this.args.length > 100) {
      this.error = 'Max length is 100';
    }
    return true;
  }

  setArgs() {
    if (this.checkErrors()) {
      if (!this.args) {
        this.args = this.placeholder;
      }
      this.dialogRef.close(this.args);
    }
  }
}
