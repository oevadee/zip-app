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

const HistoryRoute = ({ user }) => {
  const { id } = useParams();

  const { data, mutate } = useSWR(
    `/api/expenses/history/${id}?userId=${user.id}`,
  );

  console.log(data);

  const handleExpenseDelete = (expenseId) => {};

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
          {/* {historyArr.map((historyEl) => {
            console.log(historyEl.id)
            return (
              <div className="tableRow" key={historyEl.timestamp}>
                <div className="tableRow__user">
                  <Avatar src={user && user.photo} />
                </div>
                <p className="tableRow__expense">{historyEl.value}</p>
                <p className="tableRow__timestamp">
                  {new Date(historyEl.timestamp?.toDate()).toLocaleDateString()}
                </p>
                <p className="tableRow__about">{historyEl.aboutTransaction}</p>
                <div className="tableRow__blank">
                  <TrashIcon
                    size={20}
                    color="#e84545"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleExpenseDelete(historyEl.id)}
                  />
                </div>
              </div>
            );
          })} */}
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
