import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createWeather } from 'apiSdk/weathers';
import { Error } from 'components/error';
import { weatherValidationSchema } from 'validationSchema/weathers';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { LocationInterface } from 'interfaces/location';
import { getLocations } from 'apiSdk/locations';
import { WeatherInterface } from 'interfaces/weather';

function WeatherCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: WeatherInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createWeather(values);
      resetForm();
      router.push('/weathers');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<WeatherInterface>({
    initialValues: {
      temperature: 0,
      humidity: 0,
      wind_speed: 0,
      precipitation_chance: 0,
      location_id: (router.query.location_id as string) ?? null,
    },
    validationSchema: weatherValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Weather
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="temperature" mb="4" isInvalid={!!formik.errors?.temperature}>
            <FormLabel>Temperature</FormLabel>
            <NumberInput
              name="temperature"
              value={formik.values?.temperature}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('temperature', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.temperature && <FormErrorMessage>{formik.errors?.temperature}</FormErrorMessage>}
          </FormControl>
          <FormControl id="humidity" mb="4" isInvalid={!!formik.errors?.humidity}>
            <FormLabel>Humidity</FormLabel>
            <NumberInput
              name="humidity"
              value={formik.values?.humidity}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('humidity', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.humidity && <FormErrorMessage>{formik.errors?.humidity}</FormErrorMessage>}
          </FormControl>
          <FormControl id="wind_speed" mb="4" isInvalid={!!formik.errors?.wind_speed}>
            <FormLabel>Wind Speed</FormLabel>
            <NumberInput
              name="wind_speed"
              value={formik.values?.wind_speed}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('wind_speed', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.wind_speed && <FormErrorMessage>{formik.errors?.wind_speed}</FormErrorMessage>}
          </FormControl>
          <FormControl id="precipitation_chance" mb="4" isInvalid={!!formik.errors?.precipitation_chance}>
            <FormLabel>Precipitation Chance</FormLabel>
            <NumberInput
              name="precipitation_chance"
              value={formik.values?.precipitation_chance}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('precipitation_chance', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.precipitation_chance && (
              <FormErrorMessage>{formik.errors?.precipitation_chance}</FormErrorMessage>
            )}
          </FormControl>
          <AsyncSelect<LocationInterface>
            formik={formik}
            name={'location_id'}
            label={'Select Location'}
            placeholder={'Select Location'}
            fetcher={getLocations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.city}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'weather',
    operation: AccessOperationEnum.CREATE,
  }),
)(WeatherCreatePage);
