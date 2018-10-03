import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-service-stats',
  templateUrl: './service-stats.component.html',
  styleUrls: ['./service-stats.component.scss']
})
export class ServiceStatsComponent implements OnInit {
  @Input() statsAll: any[];
  @Input() labels: any[];

  data = {
    hyperd: [],
    moneyd: [],
    codiusd: [],
    nginx: []
  };


  public lineChartLabels: Array<any> = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
  public lineChartOptions: any = {
    responsive: true,
    steppedLine: true,
    options: {
      scales: {
        xAxes: [{
          type: 'time'
        }]
      }
    }
  };
  public lineChartType: string = 'line';
  public lineChartLegend: boolean = true;
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  constructor() {

  }

  ngOnInit() {
    console.log('ServiceStatsComponent onInit')
    this.data.hyperd = this.statsAll.map(o => o.hyperd);
    console.log(this.data.hyperd);
  }

}
