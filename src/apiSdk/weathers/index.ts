import axios from 'axios';
import queryString from 'query-string';
import { WeatherInterface, WeatherGetQueryInterface } from 'interfaces/weather';
import { GetQueryInterface } from '../../interfaces';

export const getWeathers = async (query?: WeatherGetQueryInterface) => {
  const response = await axios.get(`/api/weathers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createWeather = async (weather: WeatherInterface) => {
  const response = await axios.post('/api/weathers', weather);
  return response.data;
};

export const updateWeatherById = async (id: string, weather: WeatherInterface) => {
  const response = await axios.put(`/api/weathers/${id}`, weather);
  return response.data;
};

export const getWeatherById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/weathers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteWeatherById = async (id: string) => {
  const response = await axios.delete(`/api/weathers/${id}`);
  return response.data;
};
