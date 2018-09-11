export class ServiceState {
  active: boolean;
  installed: boolean;
  name: string;
  last_log?: string;
  runtime?: string;
  warning?: string;
  error?: string;
}
