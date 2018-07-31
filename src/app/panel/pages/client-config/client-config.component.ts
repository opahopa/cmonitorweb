import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {CliService} from '../../../services/cli.service';
import {APP_CONFIG, IAppConfig} from '../../../app.config';

@Component({
  selector: 'app-client-config',
  templateUrl: './client-config.component.html',
  styleUrls: ['./client-config.component.scss']
})
export class ClientConfigComponent implements OnInit {
  @ViewChild('downloadLink') private downloadLink: ElementRef;

  loading: boolean;
  cli_link: string;

  constructor(private cliService: CliService, @Inject(APP_CONFIG) private config: IAppConfig) { }

  ngOnInit() {
  }

  getLink() {
    this.loading = true;
    this.cliService.genCli().subscribe(data => {
          if (data['link']) {
            this.cli_link = `wget -O cmoncli ${this.config.apiEndpoint}${data['link']}`;
            this.loading = false;
          }
      },
      error => {
        this.cli_link = error;
        this.loading = false;
      });
  }

  download() {
    this.loading = true;
    this.cliService.download().subscribe(
      data => {
        this.receiveFile(data);
        this.loading = false;
      },
      error => {
        console.log(error);
        this.loading = false;
      });
  }

  receiveFile(data) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = this.createObjectURL(blob);

    const link = this.downloadLink.nativeElement;
    link.href = url;
    link.download = 'cmoncli';
    link.click();
  }

  createObjectURL ( file ) {
    if ( (window as any).webkitURL ) {
      return (window as any).webkitURL.createObjectURL( file );
    } else if ( (window as any).URL && (window as any).URL.createObjectURL ) {
      return (window as any).URL.createObjectURL( file );
    } else {
      return null;
    }
  }

}
