import React, { useEffect } from 'react';
import './LoginRoute.scss';
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
import jwt_decode from 'jwt-decode';
import config from "../../config";

const LoginRoute = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    const { data } = await axios.post(`http://${config.API_HOST}/api/users/login`, values);
    const { user, token } = data;

    user && dispatch(loginUser(user));
    token && localStorage.setItem('secret', token);
  };

  useEffect(() => {
    const token = localStorage.getItem('secret');

    if (token) {
      const decoded = jwt_decode(token);
      dispatch(loginUser(decoded.userInfo));
    }
  }, []);

  const onError = (err) => console.log(err);

  return (
    <div className="login">
      <Heading
        as="h1"
        fontSize={['2xl', '3xl', '4xl', '5xl']}
        isTruncated
        mb={1}
        colorScheme="pink"
      >
        Ultimate crew expense tracker <br />
      </Heading>
      <span className="login__loginContainer__textSplit">
        <Text fontSize={['xl', '2xl', '2xl', '4xl']} mb={10} color="rgb(31, 117, 196)">
          OG edition
        </Text>
      </span>
      <Box maxWidth={600}>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit, onError)}>
          <Input
            name="email"
            ref={register}
            placeholder="Email"
            type="email"
            size="lg"
            variant="outline"
            mb={5}
          />
          <Input
            name="password"
            ref={register}
            placeholder="Password"
            type="password"
            size="lg"
            variant="outline"
            mb={5}
          />
          <ButtonGroup spacing="6">
            <Button type="submit" colorScheme="blue" variant="solid">
              Login
            </Button>
            <Link to="/register">
              <Button disabled variant="outline" colorScheme="pink">
                Register
              </Button>
            </Link>
          </ButtonGroup>
        </form>
      </Box>
    </div>
  );
};

export default LoginRoute;
