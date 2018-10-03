import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {WebsocketService} from '../../../services/websocket/websocket.service';
import {Message, MessageCommands, MessageTypes} from '../../../models/message';

@Component({
  selector: 'app-change-fee-modal',
  templateUrl: './change-fee-modal.component.html',
  styleUrls: ['./change-fee-modal.component.scss']
})
export class ChangeFeeModalComponent implements OnInit {
  @ViewChild('feeInput') input: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<ChangeFeeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private wsService: WebsocketService) {}

  setNewFee(): void {
    this.wsService.sendMessage(new Message({type: MessageTypes.CONTROL, command: MessageCommands.SET_CODIUS_FEE
      , body: this.input.nativeElement.value, hostname: this.data.hostname }));
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
