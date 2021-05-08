import {
  Button,
  Box,
  Divider,
  Heading,
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  Alert,
  AlertIcon,
  Spinner,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Header } from '../../components';
import Card from '../../uiComponents/Card/Card';
import CardContent from '../../uiComponents/CardContent/CardContent';
import './SettingsRoute.scss';
import config from '../../config';
import useSWR from 'swr';

const SettingsRoute = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [defaults, setDefaults] = useState({ name: '' });
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: defaults.name,
      password: '',
      confirmPassword: '',
    },
  });
  const { data, error } = useSWR(`/api/users/profile?userId=${user.id}`);

  useEffect(() => {
    if (data) {
      setDefaults({
        name: data,
      });
    }
  }, [data]);

  console.log(defaults);

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const data = await axios.put(
        `/api/users/profile?userId=${user.id}`,
        values
      );
      setIsLoading(false);
      setAlert(data);
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    } catch (err) {
      setIsLoading(false);
      setAlert(err.response);
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  };

  if (!data | error) return <Spinner color='pink' />;

  return (
    <div className='settings'>
      <Header title='Settings' />
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Heading size='md'>Add your name and surname.</Heading>
          </CardContent>
          <Divider />
          <CardContent>
            <FormControl>
              <FormLabel></FormLabel>
              <Input
                autoComplete='off'
                ref={register}
                type='text'
                name='name'
              />
            </FormControl>
          </CardContent>
          <CardContent>
            <Heading size='md'>Change your password</Heading>
          </CardContent>
          <Divider />
          <CardContent>
            <FormControl mb={4}>
              <FormLabel>Password</FormLabel>
              <Input ref={register} type='password' name='password' />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input ref={register} type='password' name='confirmPassword' />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <Button
              isLoading={isLoading}
              loadingText='Submitting'
              colorScheme='teal'
              variant='solid'
              type='submit'
              colorScheme='blue'
            >
              Submit
            </Button>
          </CardContent>
        </form>
      </Card>
      {alert && (
        <Alert
          mt={4}
          status={alert.status === 200 ? 'success' : 'warning'}
          variant='subtle'
        >
          <AlertIcon />
          {alert.data.message || alert.statusText}
        </Alert>
      )}
    </div>
  );
};

export default SettingsRoute;
