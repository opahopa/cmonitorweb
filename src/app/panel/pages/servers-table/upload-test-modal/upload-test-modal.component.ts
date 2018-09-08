import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {WebsocketService} from '../../../services/websocket/websocket.service';
import {Message, MessageCommands, MessageTypes} from '../../../models/message';
import {WSEvent} from '../../../models/enums/wsevent.enum';

@Component({
  selector: 'app-upload-test-modal',
  templateUrl: './upload-test-modal.component.html',
  styleUrls: ['./upload-test-modal.component.scss']
})
export class UploadTestModalComponent implements OnInit {
  loading = false;

  constructor(public dialogRef: MatDialogRef<UploadTestModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any, private wsService: WebsocketService) { }

  ngOnInit() {
    this.wsService.watchEvent(WSEvent.MESSAGE).subscribe((data) => {
      const msg: Message = <Message>JSON.parse(data.data);
      if (msg.type === MessageTypes.REPORT && msg.command === MessageCommands.POD_UPLOAD_SELFTEST) {
          console.log("tadam");
          this.loading = false;
      }
    });
  }

  runTest() {
    this.wsService.sendMessage(new Message({type: MessageTypes.CONTROL, command: MessageCommands.POD_UPLOAD_SELFTEST,
      hostname: this.data.hostname}));
    this.loading = true;
  }

}
