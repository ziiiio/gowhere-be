export interface IPlusCode {
  compound_code: string;
  global_code: string;
}

export interface IAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface IAddressWrapper {
  address_components: IAddressComponent[];
  formatted_address: string;
  geometry: {
    location: ICoordinates;
    location_type: string;
    viewport: {
      northeast: ICoordinates;
      southwest: ICoordinates;
    };
  };
  place_id: string;
  plus_code: IPlusCode;
  types: string[];
}

export interface GeocodeResponse {
  plus_code: IPlusCode;
  status: string;
  results: IAddressWrapper[];
}
