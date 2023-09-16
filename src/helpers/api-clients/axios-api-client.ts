import { AxiosRequestConfig, AxiosResponse, AxiosStatic } from 'axios';
import { IApiClient } from './types';

export class AxiosApiClient implements IApiClient {
  constructor(private readonly apiClient: AxiosStatic) {}

  async request<Data, RawResponseData, ExpectedResponseData>(
    config: AxiosRequestConfig<Data>,
    transformFunc: (
      response: AxiosResponse<RawResponseData, Data>,
    ) => ExpectedResponseData,
  ): Promise<ExpectedResponseData> {
    const response = await this.apiClient.request(config);

    return transformFunc(response);
  }
}
