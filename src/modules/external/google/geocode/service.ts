import { Injectable } from '@nestjs/common';
import { AxiosApiClient } from '../../../../helpers/api-clients';
import { GOOGLE_MAP_API_BASE_URL } from './constants';
import { ExternalGooglePaths } from './enums';
import { appConfig } from '../../../../configs/app-config';
import { IGeocodeResponse } from './data-domains';

@Injectable()
export class GeoService {
  constructor(protected readonly apiClient: AxiosApiClient) {}

  async getLocation(
    latitude: string | number,
    longitude: string | number,
  ): Promise<IGeocodeResponse> {
    return this.apiClient.request(
      {
        method: 'GET',
        url: `${GOOGLE_MAP_API_BASE_URL}${ExternalGooglePaths.GEOCODE}`,
        params: {
          latlng: `${latitude},${longitude}`,
          key: appConfig.keys.google.maps,
          // NOTE: I just want the street address and postal code
          result_type: 'street_address',
        },
      },
      (res) => {
        // NOTE: we might need a wrapper, can be unwieldy if we just do a cast
        return res.data as IGeocodeResponse;
      },
    );
  }
}
