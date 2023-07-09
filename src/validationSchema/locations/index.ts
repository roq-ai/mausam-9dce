import * as yup from 'yup';

export const locationValidationSchema = yup.object().shape({
  city: yup.string().required(),
  country: yup.string().required(),
  organization_id: yup.string().nullable(),
});
