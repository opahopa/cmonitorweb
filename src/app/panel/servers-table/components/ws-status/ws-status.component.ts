import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ws-status',
  templateUrl: './ws-status.component.html',
  styleUrls: ['./ws-status.component.css']
})
export class WsStatusComponent implements OnInit {
  @Input() message: string;

  constructor() { }

  ngOnInit() {
  }

}
