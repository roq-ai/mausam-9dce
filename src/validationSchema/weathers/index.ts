import * as yup from 'yup';

export const weatherValidationSchema = yup.object().shape({
  temperature: yup.number().integer().required(),
  humidity: yup.number().integer().required(),
  wind_speed: yup.number().integer().required(),
  precipitation_chance: yup.number().integer().required(),
  location_id: yup.string().nullable(),
});
