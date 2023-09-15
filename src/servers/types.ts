export interface Server {
  start: (portNumber: number) => Promise<void>;
}
