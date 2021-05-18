import React, { useEffect, useState } from 'react';
import './LoginRoute.scss';
import { Heading, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../state/actions/userAction';
import useSWR from 'swr';
import Form from './components/Form/Form';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const LoginRoute = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { data } = useSWR(
    `/api/users/profile${user ? `userId=${user.id}` : ''}`
  );

  const getTokenUser = async (userId) =>
    axios.get(`/api/users/profile${userId ? `?userId=${userId}` : ''}`);

  useEffect(() => {
    const token = localStorage.getItem('secret');

    if (token) {
      const userId = jwt_decode(token).id;
      getTokenUser(userId).then(({ data }) => dispatch(loginUser(data)));
    }
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(loginUser(data));
    }
  }, [data]);

  return (
    <div className='login'>
      <Heading
        as='h1'
        fontSize={['2xl', '3xl', '4xl', '5xl']}
        isTruncated
        mb={1}
        colorScheme='pink'
      >
        Ultimate crew expense tracker <br />
      </Heading>
      <span className='login__loginContainer__textSplit'>
        <Text
          fontSize={['xl', '2xl', '2xl', '4xl']}
          mb={10}
          color='rgb(31, 117, 196)'
        >
          OG edition
        </Text>
      </span>
      <Form />
    </div>
  );
};

export default LoginRoute;
