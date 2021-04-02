import React, { useState } from 'react';
import './ExpensesRoute.scss';
import { Header } from '../../components';
import db, { auth } from '../../firebase';
import { ExpensePopup, Expense } from './components';
import { useSelector, useDispatch } from 'react-redux';
import { useFetch } from '/src/hooks';
import { Spinner } from '@chakra-ui/spinner';

const ExpensesRoute = () => {
  const popupVisible = useSelector((state) => state.app.popupVisible);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const data = useFetch(`/api/expenses?userId=${user.id}`);

  if (!data) return <Spinner color="red.500" />;

  return (
    <div className="expenses">
      <Header title="Expenses" expenseButton />
      {popupVisible && <ExpensePopup users={data.users} />}
      <div className="expensesSection">
        <div className="expensesHeader">
          <h3 className="expensesHeader__user">User</h3>
          <h3 className="expensesHeader__total">Expense</h3>
          <h3 className="expensesHeader__history">History</h3>
        </div>
        <div className="expensesList">
          {data &&
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
