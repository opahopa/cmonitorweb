import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Message, MessageCommands, MessageStatus, MessageTypes} from '../../../models/message';
import {WSEvent} from '../../../models/enums/wsevent.enum';
import {MonitorService} from '../../../services/monitor/monitor.service';
import {WebsocketService} from '../../../services/websocket/websocket.service';
import {ReplaySubject, Subscription} from 'rxjs';

@Component({
  selector: 'app-services-stats',
  templateUrl: './services-stats.component.html',
  styleUrls: ['./services-stats.component.scss']
})
export class ServiceStatsComponent implements OnInit, OnDestroy {
  private _wsSubscription: Subscription;

  loading = true;

  @Input() hostname: string;
  stats = {
    services_activity: new ReplaySubject<any>(1)
  };
  dataLoaded = false;

  data = {
    hyperd: {
      period: '',
      labels: [],
      series: []
    },
    moneyd: {
      period: '',
      labels: [],
      series: []
    },
    codiusd: {
      period: '',
      labels: [],
      series: []
    },
    nginx: {
      period: '',
      labels: [],
      series: []
    }
  };

  constructor(private wsService: WebsocketService, private monitorService: MonitorService) {

  }

  ngOnInit() {
    this.stats.services_activity.subscribe(data => {
      // console.log(data);
      let timeArr = [];
      switch (data.duration) {
        case 1:
          timeArr = this.get24hrTimeFrame(data.data[data.data.length - 1].time);
          this.prepareSystemHourlyData(timeArr, data.data);
          break;
        case 7:
          timeArr = this.getDialyTimeFrame(7, data.data[data.data.length - 1].time);
          this.prepareSystemDialyData(timeArr, data.data, 7);
          break;
        case 30:
          timeArr = this.getDialyTimeFrame(30, data.data[data.data.length - 1].time);
          this.prepareSystemDialyData(timeArr, data.data, 30);
          break;
      }
    });
    this.requestStats();
  }

  requestStats() {
    if (this.monitorService.websocketState() !== 1) {
      this.monitorService.wsStateSubj.subscribe(v => {
        if (v === 'connected') {
          this.sendStatsCommandAndSubscr(1);
        }
      });
    } else {
      this.sendStatsCommandAndSubscr(1);
    }
  }

  sendStatsCommandAndSubscr(duration) {
    this.wsService.sendMessage(
      new Message({type: MessageTypes.CONTROL, command: MessageCommands.STATS_SYSTEM, body: {days: duration}, hostname: this.hostname}));
    if  (!this._wsSubscription) {
      this._wsSubscription = this.wsService.watchEvent(WSEvent.MESSAGE).subscribe((data) => {
        const msg: Message = <Message>JSON.parse(data.data);
        if (msg.command === MessageCommands.STATS_SYSTEM && msg.status === MessageStatus.OK) {
          this.parseSystemStats(msg);
          this.loading = false;
        }
      });
    }
  }

  parseSystemStats(msg: Message) {
    this.stats.services_activity.next(msg.body);
  }

  onTimeFrameChange(val) {
    switch (val) {
      case 'day':
        this.sendStatsCommandAndSubscr(1);
        this.loading = true;
        break;
      case 'week':
      this.sendStatsCommandAndSubscr(7);
        this.loading = true;
        break;
      case 'month':
      this.sendStatsCommandAndSubscr(30);
        this.loading = true;
        break;
    }
  }

  prepareSystemDialyData(dialyFrame, data, duration) {
    if (duration === 7) {
      // console.log(data)
      for (const [key, value] of Object.entries(this.data)) {
          this.data[key].period = 'week';
          this.data[key].labels = dialyFrame;
          this.data[key].series = this.fillDialy(dialyFrame, data.map(o => ({x: o.time, y: o[key]})));
          // console.log(this.data[key].series)

      }
    }
    if (duration === 30) {
      for (const [key, value] of Object.entries(this.data)) {
        this.data[key].period = 'month';
        this.data[key].labels = dialyFrame;
        this.data[key].series = this.fillDialy(dialyFrame, data.map(o => ({x: o.time, y: o[key]})));
        // console.log(this.data[key].series)

      }
    }
  }

  prepareSystemHourlyData(hourlyFrame, data) {
    for (const [key, value] of Object.entries(this.data)) {
        this.data[key].period = '24hr';
        this.data[key].labels = hourlyFrame;
        this.data[key].series = this.fill24Hr(hourlyFrame, data.map(o => ({x: o.time[0] + ':' + o.time[1], y: o[key] })));
    }
    // for (let i = 0; i < this.data.hyperd.series.length; i++) {
    //   if (i > 30 && i < 130) {
    //     this.data.hyperd.series[i] = 1;
    //   }
    //   if (i > 150 && i < 155) {
    //     this.data.hyperd.series[i] = 1;
    //   }
    //   if (i > 600 && i < 1010) {
    //     this.data.hyperd.series[i] = 1;
    //   }
    //   if (i === 901) {
    //     this.data.hyperd.series[i] = 1;
    //   }
    // }
    this.dataLoaded = true;
  }

  fillDialy(timeArr, objArr) {
    return timeArr.map(time => {
      // console.log(`timestamp ${time.getMonth()+1}:${time.getDay()}:${time.getHours()}`);
      // console.log(objArr);
      const found = objArr.find(e => {
        // console.log(`obj time ${e.x[0]}:${e.x[1]}:${e.x[2]}`);
        return e.x[0] === time.getMonth()+1&&
            e.x[1] === time.getDate() &&
            e.x[2] === time.getHours();
      });
      if (found) {
        return found.y;
      } else {
        return 0;
      }
    });
  }

  fill24Hr(timeArr, objArr) {
    return timeArr.map(time => {
      const found = objArr.find(e => e.x === time);
      if (found) {
        return found.y;
      } else {
        return 0;
      }
    });
  }

  getDialyTimeFrame(nDays, lastTime) {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(lastTime[0]-1);
    endDate.setDate(lastTime[1]);
    endDate.setHours(lastTime[2]);
    startDate.setDate(endDate.getDate() - nDays);
    console.log(startDate);
    console.log(endDate);


    for(var arr=[],dt=startDate; dt<=endDate; dt.setHours(dt.getHours()+1)){
      arr.push(new Date(dt));
    }

    return arr
  }

  get24hrTimeFrame(lastTime) {
    const endHr: number = lastTime[0];
    const endMin: number = lastTime[1];
    const currentMinuteIndex = endHr * 60 + endMin + 1; // number of the current minute

    const minutesNumber = 1440; //60*24
    const arr = Array(minutesNumber);
    for (let i = 0; i < minutesNumber; i++) {
      const timeItem = i + currentMinuteIndex;
      const hours = (~~(timeItem / 60) % 24).toFixed(0); // clamp hours to 0-23 interval
      const minutes = (timeItem % 60).toFixed(0); // clamp minutes to 0-59 interval
      arr[i] = `${hours}:${minutes}`;
    }
    return arr;
  }

  get24hrTimeFrameOld(lastTime) {
    const arr = [];
    const hours = [];

    const endHr: number = lastTime[0];
    const endMin: number = lastTime[1];
    let hr = endHr;
    for (let i = 0; i < 23; i++) {
      if (hr > 23) {
        hr = 0;
      }
      hours.push(hr);
      hr = hr + 1;
    }
    hours.push(endHr);


    for (let i = 0; i < hours.length; i++) {
      let start = 0;
      let stop = 60;
      if (hours[i] === endHr && i === 0) {
        start = endMin;
      } else if (hours[i] === endHr && i !== 0) {
        stop = endMin + 1;
      }
      for (let j = start; j < stop; j++) {
         arr.push(`${hours[i]}:${j}`);
      }
    }

    return arr;
  }

  objectKeys(obj) {
    return Object.keys(obj);
  }


  ngOnDestroy() {
    this._wsSubscription.unsubscribe();
  }
}
