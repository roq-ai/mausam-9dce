import { LocationInterface } from 'interfaces/location';
import { GetQueryInterface } from 'interfaces';

export interface WeatherInterface {
  id?: string;
  temperature: number;
  humidity: number;
  wind_speed: number;
  precipitation_chance: number;
  location_id?: string;
  created_at?: any;
  updated_at?: any;

  location?: LocationInterface;
  _count?: {};
}

export interface WeatherGetQueryInterface extends GetQueryInterface {
  id?: string;
  location_id?: string;
}
