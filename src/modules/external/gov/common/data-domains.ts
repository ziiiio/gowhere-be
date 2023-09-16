export interface IApiInfo {
  status: string;
}

export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface ILocation {
  name: string;
  // TODO: convert this to camel case, and add a transformer
  label_location: ICoordinates;
}
