import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Heading,
  Input,
  Box,
  Text,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../state/actions/userAction';
import { Link } from 'react-router-dom';
import config from '../../config';

const RegisterRoute = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    const { data } = await axios.post(`/api/users/register`, values);

    const { user, token } = data;

    user && dispatch(loginUser(user));
    token && localStorage.setItem('secret', token);
  };

  const onError = (err) => console.log(err);

  return (
    <div className='login'>
      <Heading as='h1' fontSize='6xl' isTruncated mb={1}>
        Ultimate crew expense tracker <br />
      </Heading>
      <Text fontSize='4xl' mb={10} colorScheme='blue' color='rgb(31, 117, 196)'>
        OG edition
      </Text>
      <Box maxWidth={600}>
        <form autoComplete='off' onSubmit={handleSubmit(onSubmit, onError)}>
          <Input
            name='name'
            ref={register}
            placeholder='Fullname'
            type='text'
            size='lg'
            variant='outline'
            mb={5}
          />
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
          <Input
            name='confirmPassword'
            ref={register}
            placeholder='Confirm password'
            type='password'
            size='lg'
            variant='outline'
            mb={5}
          />
          <ButtonGroup spacing='6'>
            <Button type='submit' colorScheme='blue' variant='solid'>
              Register
            </Button>
            <Link to='/login'>
              <Button variant='outline' colorScheme='pink'>
                Login
              </Button>
            </Link>
          </ButtonGroup>
        </form>
      </Box>
    </div>
  );
};

export default RegisterRoute;
