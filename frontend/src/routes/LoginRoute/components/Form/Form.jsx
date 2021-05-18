import React from 'react';
import { Box, Input, Button, ButtonGroup } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '/src/state/actions/userAction';

const Form = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    const { data: postData } = await axios.post(`/api/users/login`, values);
    const { user, token } = postData;

    user && dispatch(loginUser(user));
    token && localStorage.setItem('secret', token);
  };

  return (
    <Box maxWidth={600}>
      <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='email'
          ref={register}
          placeholder='Email'
          type='email'
          size='lg'
          variant='outline'
          mb={5}
        />
        <Input
          name='password'
          ref={register}
          placeholder='Password'
          type='password'
          size='lg'
          variant='outline'
          mb={5}
        />
        <ButtonGroup spacing='6'>
          <Button type='submit' colorScheme='blue' variant='solid'>
            Login
          </Button>
          <Link to='/register'>
            <Button variant='outline' colorScheme='pink'>
              Register
            </Button>
          </Link>
        </ButtonGroup>
      </form>
    </Box>
  );
};

export default Form;
