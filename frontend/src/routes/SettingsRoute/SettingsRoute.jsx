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
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Header } from '../../components';
import Card from '../../uiComponents/Card/Card';
import CardContent from '../../uiComponents/CardContent/CardContent';
import './SettingsRoute.scss';
import config from "../../config";

const SettingsRoute = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const data = await axios.put(
        `/api/users/profile?userId=${user.id}`,
        values,
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

  console.log(alert);

  return (
    <div className="settings">
      <Header title="Settings" />
      <Card>
        <CardContent>
          <Heading size="md">Change your password</Heading>
        </CardContent>
        <Divider />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb={4}>
              <FormLabel>Password</FormLabel>
              <Input ref={register} type="password" name="password" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input ref={register} type="password" name="confirmPassword" />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <Button
              isLoading={isLoading}
              loadingText="Submitting"
              colorScheme="teal"
              variant="solid"
              type="submit"
              colorScheme="blue"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
      {alert && (
        <Alert
          mt={4}
          status={alert.status === 200 ? 'success' : 'warning'}
          variant="subtle"
        >
          <AlertIcon />
          {alert.data.message || alert.statusText}
        </Alert>
      )}
    </div>
  );
};

export default SettingsRoute;
