import { WeatherInterface } from 'interfaces/weather';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface LocationInterface {
  id?: string;
  city: string;
  country: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  weather?: WeatherInterface[];
  organization?: OrganizationInterface;
  _count?: {
    weather?: number;
  };
}

export interface LocationGetQueryInterface extends GetQueryInterface {
  id?: string;
  city?: string;
  country?: string;
  organization_id?: string;
}
