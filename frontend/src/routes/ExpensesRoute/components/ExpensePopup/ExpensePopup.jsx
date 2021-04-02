import React, { useState, useRef } from 'react';
import { PropTypes } from 'prop-types';
import './ExpensePopup.scss';

// Redux
import db, { auth } from '/src/firebase';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { togglePopup } from '/src/state/actions/appAction';
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
import { useForm, Control } from 'react-hook-form';

const ExpensePopup = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [prevIndex, setPrevIndex] = useState(null);
  const [numberInput, setNumberInput] = useState(0);
  const [aboutInput, setAboutInput] = useState('');
  const userSelector = useRef(0);
  const popupDispatch = useDispatch();
  const { register, control, handleSubmit } = useForm();

  const handleExpenseAdd = () => {
    if (selectedUser) {
      db.collection('users')
        .doc(auth.currentUser.uid)
        .collection('expensesFrom')
        .doc(selectedUser)
        .collection(selectedUser)
        .add({
          value: numberInput,
          aboutTransaction: aboutInput,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

      db.collection('users')
        .doc(selectedUser)
        .collection('expensesFrom')
        .doc(auth.currentUser.uid)
        .collection(auth.currentUser.uid)
        .add({
          value: -numberInput,
          aboutTransaction: aboutInput,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

      setNumberInput(0);
      setSelectedUser('');
      userSelector.current.childNodes[prevIndex].style.opacity = 0.3;
      popupDispatch(togglePopup);
    }
  };

  return (
    <Box className="expensePopup" d="flex" alignItems="center">
      <form>
        <Stack
          w={400}
          textColor="white"
          direction="column"
          placeItems="center"
          spacing={2}
        >
          <Select
            icon={<Avatar src={selectedUser && users[selectedUser].photo} />}
            placeholder="Who owes you money?"
          >
            {users.map((user) => (
              <option value={user.id}>{user.name}</option>
            ))}
          </Select>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="$"
            />
            <Input
              type="number"
              value={numberInput}
              onChange={(e) => setNumberInput(e.target.value)}
              placeholder="How big is the expese?"
              textColor="white"
            />
            <InputRightElement
              children={
                numberInput > 0 ? (
                  <CheckIcon color="green" />
                ) : numberInput === 0 || numberInput === '' ? null : (
                  <XIcon color="red" />
                )
              }
            />
          </InputGroup>
          <Input
            type="text"
            value={aboutInput}
            onChange={(e) => setAboutInput(e.target.value)}
            placeholder="Describe your expense"
            mb={2}
          />
          <Button
            w={100}
            variant="solid"
            colorScheme="blue"
            textColor="white"
            onClick={handleExpenseAdd}
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
