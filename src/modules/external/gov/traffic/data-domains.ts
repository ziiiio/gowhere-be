import { IApiInfo, ICoordinates } from '../common/data-domains';

export interface IImageMetaData {
  height: number;
  width: number;
  md5: string;
}

export interface ICamera {
  timestamp: string;
  image: string;
  location: ICoordinates;
  // TODO: convert these to camel case, and add a transformer
  camera_id: string;
  image_metadata: IImageMetaData;
}

export interface ICamerasWrapper {
  timestamp: string;
  cameras: ICamera[];
}

export interface ITrafficResponse {
  items: ICamerasWrapper[];
  api_info: IApiInfo;
}
