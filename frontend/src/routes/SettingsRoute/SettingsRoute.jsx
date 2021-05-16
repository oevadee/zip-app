import { Alert, AlertIcon, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Header } from '../../components';
import Card from '../../uiComponents/Card/Card';
import './SettingsRoute.scss';
import useSWR from 'swr';
import Form from './components/Form/Form';
import { useDispatch } from 'react-redux';
import { changeUserName } from '/src/state/actions/userAction';

const SettingsRoute = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [defaults, setDefaults] = useState({ name: '' });
  const { data, error, mutate } = useSWR(
    `/api/users/profile?userId=${user.id}`
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    if (data) {
      setDefaults({
        name: data,
      });
    }
    setIsLoading(false);
  }, [data]);

  const onSubmit = async (values) => {
    if (
      values.name.split(' ').length > 2 ||
      values.name.split(' ')[0].length < 3 ||
      values.name.split(' ')[1].length < 3
    ) {
      setAlert({
        data: {
          message: `That's not a name + surname format. Enter your fullname`,
        },
        status: 400,
      });
      return;
    }

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
      dispatch(changeUserName(values.name));
      mutate();
    } catch (err) {
      setIsLoading(false);
      setAlert(err.response);
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  };

  if (!data || error || isLoading) return <Spinner color='pink' />;

  return (
    <div className='settings'>
      <Header title='Settings' />
      <Card>
        <Form onSubmit={onSubmit} isLoading={isLoading} defaults={defaults} />
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
