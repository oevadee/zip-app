import {
  Button,
  Box,
  Divider,
  Heading,
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Header } from '../../components';
import Card from '../../uiComponents/Card/Card';
import CardContent from '../../uiComponents/CardContent/CardContent';
import './SettingsRoute.scss';

const SettingsRoute = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: null,
  });
  const onSubmit = (values) => {
    console.log(values);
  };
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
              <Input type="password" name="password" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" name="confirmPassword" />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <Button variant="solid" colorScheme="blue">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsRoute;
