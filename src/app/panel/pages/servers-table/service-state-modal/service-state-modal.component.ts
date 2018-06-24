import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ServiceState} from '../../../models/service-state';

@Component({
  selector: 'app-service-state-modal',
  templateUrl: './service-state-modal.component.html',
  styleUrls: ['./service-state-modal.component.scss']
})
export class ServiceStateModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ServiceState) { }

  ngOnInit() {
    console.log(this.data);
  }

}
