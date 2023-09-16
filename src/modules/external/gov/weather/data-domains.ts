import { IApiInfo, ICoordinates } from '../common/data-domains';

export interface IAreaMetaData {
  name: string;
  label_location: ICoordinates;
}

export interface IValidPeriod {
  start: string;
  end: string;
}

export interface IForecast {
  area: string;
  forecast: string;
}

export interface IForecastsWrapper {
  update_timestamp: string;
  timestamp: string;
  valid_period: IValidPeriod;
  forecasts: IForecast[];
}

export interface IWeatherResponse {
  area_metadata: IAreaMetaData[];
  items: IForecastsWrapper[];
  api_info: IApiInfo;
}
