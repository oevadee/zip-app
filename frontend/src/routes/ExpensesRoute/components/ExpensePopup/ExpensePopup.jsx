import React from 'react';
import { PropTypes } from 'prop-types';
import './ExpensePopup.scss';

// Redux
import {
  Input,
  Box,
  Avatar,
  Stack,
  Button,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
} from '@chakra-ui/react';
import {
  DollarSign as DollarSignIcon,
  Check as CheckIcon,
  X as XIcon,
} from 'react-feather';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { getCurrentTimestamp } from '../../../../utils';

const ExpensePopup = ({ user, users, mutate }) => {
  const { register, handleSubmit, control, watch, reset } = useForm({
    defaultValues: {
      value: 0,
      details: '',
    },
  });

  const selectedUser = watch('user');
  const value = watch('value');

  const onSubmit = async (values) => {
    const data = await axios.post(
      `http://localhost:8080/api/expenses/${user.id}`,
      {
        values,
        timestamp: new Date().toLocaleDateString(),
      },
    );

    reset();
    mutate();

    console.log(data);
  };

  const onError = (err) => {
    console.log(err);
  };

  return (
    <Box className="expensePopup" d="flex" alignItems="center">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Stack
          w={400}
          textColor="white"
          direction="column"
          placeItems="center"
          spacing={2}
        >
          <Controller
            name="user"
            control={control}
            as={
              <Select
                icon={
                  <Avatar src={selectedUser && users[selectedUser]?.photo} />
                }
                placeholder="Who owes you money?"
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Select>
            }
          />
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="$"
            />
            <Input
              name="value"
              type="number"
              ref={register}
              placeholder="How big is the expese?"
              textColor="white"
            />
            <InputRightElement
              children={
                value > 0 ? (
                  <CheckIcon color="green" />
                ) : value === 0 || value === '' ? null : (
                  <XIcon color="red" />
                )
              }
            />
          </InputGroup>
          <Input
            name="details"
            type="text"
            ref={register}
            placeholder="Describe your expense"
            mb={2}
          />
          <Button
            type="submit"
            w={100}
            variant="solid"
            colorScheme="blue"
            textColor="white"
          >
            Add
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

ExpensePopup.propTypes = {
  users: PropTypes.array,
};

export default ExpensePopup;
