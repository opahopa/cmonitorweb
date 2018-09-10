import {Component, Input, OnInit} from '@angular/core';
import {ServiceState} from '../../../models/service-state';
import {MatDialog} from '@angular/material';
import {ServiceStateModalComponent} from '../service-state-modal/service-state-modal.component';

@Component({
  selector: 'app-server-details',
  templateUrl: './server-details.component.html',
  styleUrls: ['./server-details.component.scss']
})
export class ServerDetailsComponent implements OnInit {
  @Input() services: ServiceState[];
  @Input() hostname: string;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(service: ServiceState): void {
    const dialogRef = this.dialog.open(ServiceStateModalComponent, {
      width: '95vw',
      data: {service: service, hostname: this.hostname}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
