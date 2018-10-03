import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ServersTableDataSource } from './servers-table-datasource';
import {MonitorService} from '../../services/monitor/monitor.service';
import {ServersService} from '../../services/servers.service';
import {ServicesStatusPipe} from '../../../pipes/services-status.pipe';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Server} from '../../models/server';
import {Router} from '@angular/router';

@Component({
  selector: 'app-servers-table',
  templateUrl: './servers-table.component.html',
  styleUrls: ['./servers-table.component.scss'],
  providers: [
    ServicesStatusPipe
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*', width: '100%'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ServersTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ServersTableDataSource;
  expandedElement: Server;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['hostname', 'status', 'services-all-status', 'server-load', 'contracts-running', 'dropdown-ico'];
  breakpoint: number;
  breakpoint_resol = 745;
  show_cli_install = false;

  constructor(public monitorService: MonitorService, private serversService: ServersService, private route: Router) { }

  ngOnInit() {
    console.log('ngOnInit Servers Table');
    this.breakpoint = (window.innerWidth <= this.breakpoint_resol) ? 1 : 6;
    if (this.monitorService.ws_status !== 'connected'
      || this.monitorService.websocketState() === 0
      || this.monitorService.websocketState() === 1) {
      this.monitorService.connect();
      this.dataSource = new ServersTableDataSource(this.paginator, this.sort, this.serversService);
    } else {
      this.dataSource = new ServersTableDataSource(this.paginator, this.sort, this.serversService);
    }
    setTimeout(() => {
      if (this.dataSource.is_empty.getValue()) {
        this.show_cli_install = true;
      }
    }, 6000);
  }

  trackByIndex(index, item) {
    return index;
  }

  isExpanded(row: Server): string {
    if (this.expandedElement) {
      if (row.hostname === this.expandedElement.hostname) {
        return 'expanded';
      } else {
        return 'collapsed';
      }
    } else {
      return 'collapsed';
    }
  }

  expandRow(element) {
    if (!this.expandedElement) {
      this.expandedElement = element;
    } else {
      this.expandedElement = null;
    }
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= this.breakpoint_resol) ? 1 : 6;
  }
}
