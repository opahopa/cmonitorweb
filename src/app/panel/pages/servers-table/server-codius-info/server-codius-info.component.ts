import {Component, Input, OnInit} from '@angular/core';
import {ServerCodius} from '../../../models/server';
import {MatDialog} from '@angular/material';
import {ChangeFeeModalComponent} from '../change-fee-modal/change-fee-modal.component';

@Component({
  selector: 'app-server-codius-info',
  templateUrl: './server-codius-info.component.html',
  styleUrls: ['./server-codius-info.component.scss']
})
export class ServerCodiusInfoComponent implements OnInit {
  @Input() codius: ServerCodius;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  changeFee() {
    const dialogRef = this.dialog.open(ChangeFeeModalComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  updateCodius() {

  }

}
