import React, { useEffect, useState } from 'react';
import './HistoryRoute.scss';
import { PropTypes } from 'prop-types';

// Components
import { useParams } from 'react-router';
import { Header } from '../../components';

import { Trash2 as TrashIcon } from 'react-feather';
import useSWR from 'swr';
import {
  Spinner,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Avatar,
  TableCaption,
  Tab,
} from '@chakra-ui/react';
import axios from 'axios';
import Card from '../../uiComponents/Card/Card';

const HistoryRoute = ({ user }) => {
  const [history, setHistory] = useState([]);

  const { id } = useParams();
  const { data, mutate } = useSWR(
    `/api/expenses/history/${id}?userId=${user.id}`,
  );

  useEffect(() => {
    if (data) {
      const { inHistory, outHistory } = data;
      const sortedHistory = inHistory
        .concat(outHistory)
        .sort((a, b) => b.id - a.id);

      setHistory(sortedHistory);
    }
  }, [data]);

  const handleExpenseDelete = async (expenseId) => {
    console.log(expenseId);
    console.log(user.id);
    try {
      await axios.post('/api/expenses/history/delete-request', {
        expenseId,
        user: user.id,
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!data) return <Spinner color="pink" />;

  return (
    <div className="history">
      <Header title="History" goBackButton />
      <Card>
        <Table size="lg" colorScheme="blue">
          <Thead>
            <Tr>
              <Th w={50}>User</Th>
              <Th w={150} isNumeric>Expense</Th>
              <Th>Time</Th>
              <Th>About</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {history.map((el) => (
              <Tr key={el.id}>
                <Td w={50}>
                  <Avatar src={el.photo} />
                </Td>
                <Td w={150} isNumeric>{el.value}</Td>
                <Td>{el.timestamp}</Td>
                <Td>{el.details}</Td>
                <Td>
                  <TrashIcon
                    size={20}
                    color="#e84545"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleExpenseDelete(el.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {/* <div className="historyList">
          {history.map((el) => (
            <div className="tableRow" key={el.id}>
              <div className="tableRow__user">
                <Avatar src={el.photo} />
              </div>
              <p className="tableRow__expense">{el.value}</p>
              <p className="tableRow__timestamp">{el.timestamp}</p>
              <p className="tableRow__about">{el.details}</p>
              <div className="tableRow__blank">
                <TrashIcon
                  size={20}
                  color="#e84545"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleExpenseDelete(el.id)}
                />
              </div>
            </div>
          ))} */}
        {/* </div> */}
      </Card>
    </div>
  );
};

HistoryRoute.propTypes = {
  historyEl: PropTypes.object,
  historyOf: PropTypes.object,
};

export default HistoryRoute;
