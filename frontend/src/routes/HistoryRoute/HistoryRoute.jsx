import React, { useEffect, useState } from 'react';
import './HistoryRoute.scss';
import { PropTypes } from 'prop-types';

// Components
import { useParams } from 'react-router';
import { Header } from '../../components';
import db, { auth } from '../../firebase';
import { Trash2 as TrashIcon } from 'react-feather';
import { Avatar } from '@chakra-ui/avatar';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/spinner';
import axios from 'axios';

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
      <div className="historySection">
        <div className="historyHeader">
          <h3 className="historyHeader__user">User</h3>
          <h3 className="historyHeader__expense">Expense</h3>
          <h3 className="historyHeader__timestamp">Time</h3>
          <h3 className="historyHeader__about">About</h3>
          <div className="historyHeader__blank"></div>
        </div>

        <div className="historyList">
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
          ))}
        </div>
      </div>
    </div>
  );
};

HistoryRoute.propTypes = {
  historyEl: PropTypes.object,
  historyOf: PropTypes.object,
};

export default HistoryRoute;
