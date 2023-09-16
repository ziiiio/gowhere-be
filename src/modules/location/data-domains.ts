import { ICamera } from '../external/gov/traffic/data-domains';
import { IForecast, IAreaMetaData } from '../external/gov/weather/data-domains';

export type TLocationResponse = ICamera & IForecast & IAreaMetaData;
