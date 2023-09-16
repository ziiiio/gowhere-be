export interface IApiClient {
  request: <Return>(...args: any[]) => Promise<Return>;
}
