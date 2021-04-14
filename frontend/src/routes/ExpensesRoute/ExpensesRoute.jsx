import React, { useState } from 'react';
import './ExpensesRoute.scss';
import { Header } from '../../components';
import { ExpensePopup } from './components';
import { useSelector, useDispatch } from 'react-redux';
import { useFetch } from '/src/hooks';
import { Spinner } from '@chakra-ui/spinner';
import useSWR from 'swr';
import Card from '../../uiComponents/Card/Card';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { Avatar } from '@chakra-ui/avatar';
import { Link } from 'react-router-dom';
import { Clock as HistoryIcon } from 'react-feather';
import { useBreakpointValue } from '@chakra-ui/media-query';

const ExpensesRoute = () => {
  const popupVisible = useSelector((state) => state.app.popupVisible);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isHidden = useBreakpointValue({ base: false, md: true });

  const { data, mutate } = useSWR(`/api/expenses?userId=${user.id}`);

  if (!data) return <Spinner color="pink" />;

  console.log(data.expenses);

  return (
    <div className="expenses">
      <Header title="Expenses" expenseButton />
      {popupVisible && (
        <ExpensePopup user={user} users={data.users} mutate={mutate} />
      )}
      <Card>
        <Table size="lg">
          <Thead>
            <Tr>
              <Th w={100}></Th>
              {isHidden && <Th>User</Th>}
              <Th isNumeric>Expense</Th>
              <Th isNumeric>History</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.expenses &&
              data.expenses.map((el) => (
                <Tr key={el.user.id}>
                  {isHidden ? (
                    <Td w={100}>
                      <Avatar src={el.user.photo} />
                    </Td>
                  ) : (
                    <Td p={5} w={100}>
                      <Avatar src={el.user.photo} />
                    </Td>
                  )}
                  {isHidden && <Td>{el.user.name}</Td>}
                  <Td isNumeric>{el.value}</Td>
                  <Td isNumeric>
                    <Link
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginRight: 23,
                      }}
                      to={`/history/${el.user.id}`}
                    >
                      <HistoryIcon style={{ color: '#fff' }} />
                    </Link>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Card>
    </div>
  );
};

export default ExpensesRoute;
