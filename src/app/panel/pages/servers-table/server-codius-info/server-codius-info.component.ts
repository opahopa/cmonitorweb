import {Component, Input, OnInit} from '@angular/core';
import {ServerCodius} from '../../../models/server';

@Component({
  selector: 'app-server-codius-info',
  templateUrl: './server-codius-info.component.html',
  styleUrls: ['./server-codius-info.component.scss']
})
export class ServerCodiusInfoComponent implements OnInit {
  @Input() codius: ServerCodius;

  constructor() { }

  ngOnInit() {
  }

  changeFee() {

  }

  updateCodius() {

  }

}
