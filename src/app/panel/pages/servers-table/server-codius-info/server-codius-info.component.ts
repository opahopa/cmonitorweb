import {Component, Input, OnInit} from '@angular/core';
import {Server, ServerCodius} from '../../../models/server';
import {MatDialog} from '@angular/material';
import {ChangeFeeModalComponent} from '../change-fee-modal/change-fee-modal.component';

@Component({
  selector: 'app-server-codius-info',
  templateUrl: './server-codius-info.component.html',
  styleUrls: ['./server-codius-info.component.scss']
})
export class ServerCodiusInfoComponent implements OnInit {
  @Input() server: Server;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  changeFee() {
    const dialogRef = this.dialog.open(ChangeFeeModalComponent, {
      data: { hostname: this.server.hostname },
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  updateCodius() {

  }

}
