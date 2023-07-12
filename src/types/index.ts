import { GeoPosition } from "react-native-geolocation-service";

export type AppContextType = {
  userLocation: GeoPosition;
  savedLocations: GeoPosition[] | [];
  handleUpdateUserLocation: (position: GeoPosition) => void;
};

export type Weather = {
  description: string;
  icon: string;
  id: number;
  main: string;
};

export type Temperature = {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
};

export type WindData = {
  deg: number;
  gust: number;
  speed: number;
};

export type LocationInfoMeta = {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
};

export type CurrentWeather = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Weather[];
  base: string;
  main: Temperature;
  visibility: number;
  wind: { speed: number; deg: number; gust: number };
  clouds: { all: number };
  dt: number;
  sys: LocationInfoMeta;
  id: number;
  name: string;
  cod: number;
};
