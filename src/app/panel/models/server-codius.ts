export enum CodiusVariablesEnum {
  CODIUS_HYPER_SOCKET = 'CODIUS_HYPER_SOCKET',
  CODIUS_HYPER_NOOP = 'CODIUS_HYPER_NOOP',
  CODIUS_PORT = 'CODIUS_PORT',
  CODIUS_PUBLIC_URI = 'CODIUS_PUBLIC_URI',
  CODIUS_MAX_MEMORY_FRACTION = 'CODIUS_MAX_MEMORY_FRACTION',
  CODIUS_ADDITIONAL_HOST_INFO = 'CODIUS_ADDITIONAL_HOST_INFO',
  CODIUS_BOOTSTRAP_PEERS = 'CODIUS_BOOTSTRAP_PEERS',
  CODIUS_SELF_TEST_INTERVAL= 'CODIUS_SELF_TEST_INTERVAL',
  CODIUS_SELF_TEST_RETRIES = 'CODIUS_SELF_TEST_RETRIES'
}

export interface CodiusVariable {
  name: CodiusVariablesEnum;
  value: string;
  enabled?: boolean;
}

export interface ServerCodius {
  version: string;
  memory: any;
  count_24: number;
  income_24: number;
  fee: number;
  peers: {
    num: number,
    list: any[]
  };
  uptime: {
    server: {
      days: number,
      hours: number,
      minutes: number
    },
    service: {
      days: number,
      hours: number,
      minutes: number
    }
  };
  hyperd: {
    pods: [{
        id: string,
        name: string,
        vm_name: string,
        status: string
      }];
    version: string;
    virtualization: string;
  };
  selftest: boolean;
  contracts_active: number;
  variables: CodiusVariable[];
}
