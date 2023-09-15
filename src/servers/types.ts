// NOTE: simple server interface to abstract away the implementation
export interface Server {
  start: () => Promise<void>;
}
