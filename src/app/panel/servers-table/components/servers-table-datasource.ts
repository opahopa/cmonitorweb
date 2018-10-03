import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import {Observable, merge, of as observableOf, BehaviorSubject} from 'rxjs';
import {Server} from '../../models/server';
import {ServersService} from '../../services/servers.service';
import {DataSource} from '@angular/cdk/table';

export class ServersTableDataSource extends DataSource<Server> {
  data: Server[] = [];
  is_empty = new BehaviorSubject<boolean>(true);

  constructor(private paginator: MatPaginator, private sort: MatSort, private serversService: ServersService) {
    super();
  }


  connect(): Observable<Server[]> {
    return new Observable<Server[]>(observer => {
      this.serversService.getServersSubj().subscribe((servers) => {
        if (servers) {
          return this.applyMutations(servers).subscribe(data => {

            //need to show the empty dat msg
            if (this.is_empty.getValue() && data.length > 0) { this.is_empty.next(false); }
            if (!this.is_empty.getValue() && data.length === 0) { this.is_empty.next(true); }
            observer.next(data);
          });
        }
      });
    });
  }

  disconnect() {

  }

  applyMutations(tmpData: Server[]): Observable<Server[]> {
    const dataMutations = [
      observableOf(tmpData),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...tmpData]));
    }));
  }

  private getPagedData(data: Server[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: Server[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'hostname': return compare(a.hostname, b.hostname, isAsc);
        case 'active': return compare(+a.active, +b.active, isAsc);
        default: return 0;
      }
    });
  }

  get dataLenght() {
    return this.data.length;
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
