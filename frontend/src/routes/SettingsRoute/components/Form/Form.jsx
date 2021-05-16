import {
  Button,
  Divider,
  Heading,
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { changeUserName } from '/src/state/actions/userAction';
import { CardContent } from '/src/uiComponents';

const Form = ({ onSubmit, isLoading, defaults }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: defaults.name,
      password: '',
      confirmPassword: '',
    },
  });
  const handleRequest = (values) => {
    console.log(values.name);
    onSubmit(values);
    dispatch(changeUserName(values.name));
  };

  return (
    <form onSubmit={handleSubmit(handleRequest)}>
      <CardContent>
        <Heading size='md'>
          {defaults.name
            ? `Hello ${defaults.name}.`
            : 'Add your name and surname.'}
        </Heading>
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
            placeholder={defaults.name ? `Change your name` : 'enter your name'}
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
  );
};

export default Form;
