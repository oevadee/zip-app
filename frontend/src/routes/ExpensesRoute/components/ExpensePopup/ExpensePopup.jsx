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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
  FormControl,
} from '@chakra-ui/react';
import {
  DollarSign as DollarSignIcon,
  Check as CheckIcon,
  X as XIcon,
} from 'react-feather';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { getCurrentTimestamp } from '../../../../utils';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './schema';

const ExpensePopup = ({ user, users, mutate }) => {
  const { register, handleSubmit, control, watch, reset, errors } = useForm({
    defaultValues: {
      user: '',
      value: '',
      details: '',
    },
    resolver: yupResolver(schema),
  });

  const selectedUser = watch('user');
  const value = watch('value');

  const onSubmit = async (values) => {
    console.log(values);
    const data = await axios.post(
      `http://localhost:8080/api/expenses/${user.id}`,
      {
        values,
        timestamp: new Date().toLocaleDateString(),
      },
    );

    reset();
    mutate();
  };

  return (
    <Box className="expensePopup" d="flex" alignItems="center">
      <Box w={{ base: '100%', md: '80%' }} maxW={600}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            textColor="white"
            direction="column"
            placeItems="center"
            spacing={2}
          >
            <Controller
              name="user"
              control={control}
              as={
                <FormControl isInvalid={errors.user}>
                  <Select
                    icon={
                      <Avatar
                        src={selectedUser && users[selectedUser]?.photo}
                      />
                    }
                    placeholder="Who owes you money?"
                  >
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              }
            />
            <Controller
              name="value"
              control={control}
              as={
                <FormControl isInvalid={errors.value}>
                  <NumberInput max={10000} w="100%">
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children="$"
                    />
                    <NumberInputField pl={8} />
                    <InputRightElement
                      mr={6}
                      children={
                        value > 0 ? (
                          <CheckIcon color="green" />
                        ) : value === 0 || value === '' ? null : (
                          <XIcon color="red" />
                        )
                      }
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              }
            />
            <Input
              name="details"
              type="text"
              ref={register}
              placeholder="Describe your expense"
            />
            <Button
              mt={2}
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
    </Box>
  );
};

ExpensePopup.propTypes = {
  users: PropTypes.array,
};

export default ExpensePopup;
