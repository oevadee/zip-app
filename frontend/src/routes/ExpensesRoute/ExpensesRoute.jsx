import React, { useState } from 'react';
import './ExpensesRoute.scss';
import { Header } from '../../components';
import { ExpensePopup, Expense } from './components';
import { useSelector, useDispatch } from 'react-redux';
import { useFetch } from '/src/hooks';
import { Spinner } from '@chakra-ui/spinner';
import useSWR from 'swr';

const ExpensesRoute = () => {
  const popupVisible = useSelector((state) => state.app.popupVisible);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const { data, mutate } = useSWR(`/api/expenses?userId=${user.id}`);

  if (!data) return <Spinner color="pink" />;

  return (
    <div className="expenses">
      <Header title="Expenses" expenseButton />
      {popupVisible && (
        <ExpensePopup user={user} users={data.users} mutate={mutate} />
      )}
      <div className="expensesSection">
        <div className="expensesHeader">
          <h3 className="expensesHeader__user">User</h3>
          <h3 className="expensesHeader__total">Expense</h3>
          <h3 className="expensesHeader__history">History</h3>
        </div>
        <div className="expensesList">
          {data.expenses &&
            data.expenses.map((expense) => (
              <Expense
                key={expense.user.id}
                user={expense.user}
                value={expense.value}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ExpensesRoute;
