import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ServersTableDataSource } from './servers-table-datasource';
import {MonitorService} from '../../services/monitor/monitor.service';

@Component({
  selector: 'app-servers-table',
  templateUrl: './servers-table.component.html',
  styleUrls: ['./servers-table.component.css']
})
export class ServersTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ServersTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor(private monitorService: MonitorService) { }

  ngOnInit() {
    this.dataSource = new ServersTableDataSource(this.paginator, this.sort);
    this.monitorService.connect();
  }
}
