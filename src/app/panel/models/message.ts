// Status/control message
export enum MessageTypes {
  STATUS = 'STATUS',
  CONTROL = 'CONTROL',
  REPORT = 'REPORT'
}
export enum MessageStatus {
  OK = 'OK',
  ERROR = 'ERROR'
}
export enum MessageCommands {
  STATUS_ALL = 'STATUS_ALL',
  STATUS_CLI_DISCONNECT = 'STATUS_CLI_DISCONNECT',
  STATUS_CLI_UPDATE = 'STATUS_CLI_UPDATE'

}


export class Message {
  type: MessageTypes;
  hostname?: string;
  status?: MessageStatus;
  command?: MessageCommands;
  body?: any;

  constructor(settings: { type: MessageTypes, hostname?: string, command?: MessageCommands, status?: MessageStatus, body?: any}) {
    this.type = settings.type;
    this.status = settings.status;
    this.command = settings.command;
    this.body = settings.body;
    this.hostname = settings.hostname;
  }
}
