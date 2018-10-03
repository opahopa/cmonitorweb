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
  STATUS_CLI_UPDATE = 'STATUS_CLI_UPDATE',
  SET_CODIUS_FEE = 'SET_CODIUS_FEE',
  SET_CODIUSD_VARIABLES = 'SET_CODIUSD_VARIABLES',
  SERVICE_RESTART = 'SERVICE_RESTART',
  SERVICE_STOP = 'SERVICE_STOP',
  SERVICE_START = 'SERVICE_START',
  SERVICE_SPECAIL_DATA = 'SERVICE_SPECAIL_DATA',
  STATS_ALL = 'STATS_ALL',
  STATS_SYSTEM = 'STATS_SYSTEM',
  POD_UPLOAD_SELFTEST = 'POD_UPLOAD_SELFTEST',
  INSTALL_SERVICE = 'INSTALL_SERVICE',
  UNINSTALL_SERVICE = 'UNINSTALL_SERVICE',
  CLI_UPGRADE_REQUIRED = 'CLI_UPGRADE_REQUIRED',
  CLI_UPGRADE = 'CLI_UPGRADE',
  EXTRA_NETSTAT = 'EXTRA_NETSTAT',
  CLEANUP_HYPERD = 'CLEANUP_HYPERD',
  HYPERD_RM_POD = 'HYPERD_RM_POD'
}


export class Message {
  type: MessageTypes;
  hostname?: string;
  status?: MessageStatus;
  command?: MessageCommands;
  body?: any;
  cli_version?: string;

  constructor(settings: { type: MessageTypes, hostname?: string,
    command?: MessageCommands, status?: MessageStatus, body?: any, cli_version?: string}) {
    this.type = settings.type;
    this.status = settings.status;
    this.command = settings.command;
    this.body = settings.body;
    this.hostname = settings.hostname;
    this.cli_version = settings.cli_version;
  }
}
