import { Component, OnInit } from '@angular/core';
import {WebsocketService} from '../../services/websocket/websocket.service';
import {Message, MessageCommands, MessageTypes} from '../../models/message';
import {WSEvent} from '../../models/enums/wsevent.enum';
import {AuthService} from '../../../services/auth/auth-service.service';
import {Router} from '@angular/router';
import * as shape from 'd3-shape';


interface Stats {
  date: Date;
  count: Number;
  income: Number;
}

interface StatsParsed {
  hostname: string;
  monthly: {
    count: [{'name': string, 'series': any[] }],
    income: [{'name': string, 'series': any[] }]
  };
}


@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss']
})

export class StatsPageComponent implements OnInit {
  ws_status: string;
  stats = {
    monthly: {
      count: [{'name': 'count', 'series': []}],
      income: [{'name': 'income', 'series': []}]
    }
  };
  stats_parsed: StatsParsed[] = [];
  stats_week: any;
  // shape: shape.Series;

  // chart
  view: any[] = [680, 400];
  colorScheme = {
    count: { domain: ['#512DA8']},
    income: { domain: ['#FFC107']}
  };

  data =
    [
      {
        'name': 'Austria',
        'series': [
          {
            'value': 3342,
            'name': '2016-09-20T20:23:48.426Z'
          },
          {
            'value': 6586,
            'name': '2016-09-21T08:58:04.100Z'
          },
          {
            'value': 4619,
            'name': '2016-09-21T05:21:08.317Z'
          },
          {
            'value': 6985,
            'name': '2016-09-19T11:26:36.302Z'
          },
          {
            'value': 5481,
            'name': '2016-09-16T11:26:19.165Z'
          }
        ]
      },
      {
        'name': 'Barbados',
        'series': [
          {
            'value': 3494,
            'name': '2016-09-20T20:23:48.426Z'
          },
          {
            'value': 5098,
            'name': '2016-09-21T08:58:04.100Z'
          },
          {
            'value': 6700,
            'name': '2016-09-21T05:21:08.317Z'
          },
          {
            'value': 5218,
            'name': '2016-09-19T11:26:36.302Z'
          },
          {
            'value': 5589,
            'name': '2016-09-16T11:26:19.165Z'
          }
        ]
      },
      {
        'name': 'Iraq',
        'series': [
          {
            'value': 4605,
            'name': '2016-09-20T20:23:48.426Z'
          },
          {
            'value': 2828,
            'name': '2016-09-21T08:58:04.100Z'
          },
          {
            'value': 5454,
            'name': '2016-09-21T05:21:08.317Z'
          },
          {
            'value': 2290,
            'name': '2016-09-19T11:26:36.302Z'
          },
          {
            'value': 3454,
            'name': '2016-09-16T11:26:19.165Z'
          }
        ]
      },
      {
        'name': 'Ghana',
        'series': [
          {
            'value': 3515,
            'name': '2016-09-20T20:23:48.426Z'
          },
          {
            'value': 5464,
            'name': '2016-09-21T08:58:04.100Z'
          },
          {
            'value': 6701,
            'name': '2016-09-21T05:21:08.317Z'
          },
          {
            'value': 3989,
            'name': '2016-09-19T11:26:36.302Z'
          },
          {
            'value': 2645,
            'name': '2016-09-16T11:26:19.165Z'
          }
        ]
      },
      {
        'name': 'Switzerland',
        'series': [
          {
            'value': 6468,
            'name': '2016-09-20T20:23:48.426Z'
          },
          {
            'value': 6143,
            'name': '2016-09-21T08:58:04.100Z'
          },
          {
            'value': 6431,
            'name': '2016-09-21T05:21:08.317Z'
          },
          {
            'value': 5218,
            'name': '2016-09-19T11:26:36.302Z'
          },
          {
            'value': 3846,
            'name': '2016-09-16T11:26:19.165Z'
          }
        ]
      }
    ];

  constructor(private wsService: WebsocketService, private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.wsService.initConnection();
    if (this.wsService.state() && this.wsService.state() === 1) {
      this.wsService.sendMessage(new Message({type: MessageTypes.CONTROL, command: MessageCommands.STATS_ALL, body: 30}));
    }

    this.initWatchers();

    this.ws_status = 'connected';

  }

  initWatchers(): void {
    this.wsService.watchEvent(WSEvent.OPEN).subscribe(data => {
      this.wsService.sendMessage(new Message({type: MessageTypes.CONTROL, command: MessageCommands.STATS_ALL, body: 30}));
    });
    this.wsService.watchEvent(WSEvent.CLOSE).subscribe((data) => {
      console.log(data);
      this.ws_status = `error: ${data.code}`;
      switch (data.code) {
        case 4003:
          this.authService.logout();
          this.router.navigate(['/login']);
          break;
        case 1011:
          console.log('Internal error (1011). Please try again after 5 minutes. Contact administrator if repeated');
      }
    });
    this.wsService.watchEvent(WSEvent.MESSAGE).subscribe((data) => {
      // console.log(data);
      const msg: Message = <Message>JSON.parse(data.data);
      switch (msg.type) {
        case MessageTypes.CONTROL:
          break;
        case MessageTypes.REPORT:
          if (msg.command === MessageCommands.STATS_ALL) {
            const stats_month = <Stats[]>msg.body;
            console.log(stats_month)
            if (stats_month.length > 0) {

              const
                endDate = new Date(),
                startDate = this.getPrevDate(endDate, 30);

              const month_dates = this.getDateArray(startDate, endDate);

              console.log(stats_month);

              const parsed = this.toChartArray(stats_month, month_dates);
              if (!this.stats_parsed.find(x => x.hostname === msg.hostname)) {
                this.stats_parsed.push({
                  hostname: msg.hostname,
                  monthly: {
                    count: [{'name': 'count', 'series': parsed.count}],
                    income: [{'name': 'income', 'series': parsed.income}]
                  }
                });
              }
              else {
                let stat = this.stats_parsed.find(x => x.hostname === msg.hostname);
                stat.monthly.count[0].series = parsed.count;
                stat.monthly.income[0].series = parsed.income;
              }

              this.combineStats();

              console.log(this.stats_parsed);
              console.log(this.stats);
            }
          }
          break;
      }
    });
  }

  combineStats() {
    for (const stat of this.stats_parsed) {
      if (this.stats.monthly.count[0].series.length === 0 || this.stats.monthly.income[0].series.length === 0) {
        this.stats.monthly.count[0].series = stat.monthly.count[0].series;
        this.stats.monthly.income[0].series = stat.monthly.income[0].series;
      } else {
        let result = [this.stats.monthly.count[0].series, stat.monthly.count[0].series].reduce((sums, series) =>
            series.reduce((sums, item) => sums.set(item.name, (sums.get(item.name) || 0) + item.value), sums)
          , new Map)

        this.stats.monthly.count[0].series = Array.from(result.entries(), ([name, value]) => ({name, value}));



        result = [this.stats.monthly.income[0].series, stat.monthly.income[0].series].reduce((sums, series) =>
            series.reduce((sums, item) => sums.set(item.name, (sums.get(item.name) || 0) + item.value), sums)
          , new Map)

        this.stats.monthly.income[0].series = Array.from(result.entries(), ([name, value]) => ({name, value}));
      }
    }
  }

  getDateArray(start, end) {
    let
      arr: Date[] = [],
      dt = start;

    while (dt <= end) {
      arr.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }

    return arr;
  };

  getPrevDate(date: Date, days: number) {
    const prevDate = new Date();
    prevDate.setDate(date.getDate() - days);
    return prevDate;
  }

  toChartArray(data: Stats[], month_dates: Date[]) {
    let
      count_series = [],
      income_series = [];

    for (const date of month_dates) {
      // console.log(date)
      let match = false;
      for (const val of data) {
        if (this.sameDay(date, new Date(val.date))) {
          count_series.push({name: date, value: val.count});
          income_series.push({name: date, value: val.income});
          match = true;
        }
      }
      if (!match) {
        count_series.push({name: date, value: 0});
        income_series.push({name: date, value: 0});
      }
    }

    return {'count': count_series, 'income': income_series};
  }

  sameDay(date1: Date, date2: Date) {
    return date1.getFullYear() === date2.getFullYear()
      && date1.getDate() === date2.getDate()
      && date1.getMonth() === date2.getMonth();
  }

  sameYear(date1: Date, date2: Date) {
    console.log(date1.getDate(), date2.getDate());
  }
}
