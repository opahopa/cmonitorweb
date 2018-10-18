import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-service-activity',
  templateUrl: './service-activity.component.html',
  styleUrls: ['./service-activity.component.scss']
})
export class ServiceActivityComponent implements OnInit {
  @Input() name: string;
  @Input() labels: any[];
  @Input() series: any[];
  @Input() period: string;

  private monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  public lineChartOptions: any = {
    responsive: true,
    // maintainAspectRatio: false
    scales: {
      xAxes: [{
        ticks: {
          max: 7,
          fontSize: 12,
          callback: ((value, index, values) => {
            return this.wrapperXAxesCallback(value, index, values)
          })
        }
      }],
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,   // minimum value will be 0.
          maxTicksLimit: 1,
          callback: ((value, index, values) => {
            return value == 1 ? 'active' : 'inactive'
          })
        }
      }]
    }
  };
  public lineChartType = 'line';
  public lineChartLegend = true;
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      pointBorderWidth: 1,
      pointRadius: 2,
      borderWidth: 1
    }
  ];

  constructor() {
  }

  ngOnInit() {

  }

  wrapperXAxesCallback(value, index, values) {
    let datetime: Date;
    switch (this.period) {
      case '24hr':
        const time = value.split(':');
        if (+time[1] >= 30) {
          return (+time[0] + 1).toString().padStart(2, '0') + ':00';
        } else {
          return time[0].padStart(2, '0') + ':00';
        }
      case 'week':
        datetime = value;
        return `${datetime.getDate()} ${this.monthNames[datetime.getMonth()]}`;
      case 'month':
        datetime = value;
        return `${datetime.getDate()} ${this.monthNames[datetime.getMonth()]}`;
    }
  }

  roundToHr(hr, mm) {
    if (+mm >= 30) {
      return (+hr + 1).toString().padStart(2, '0') + ':00';
    } else {
      return hr.padStart(2, '0') + ':00';
    }
  }

}
