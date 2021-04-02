import React from 'react';
import { PropTypes } from 'prop-types';

// Components
import './Expense.scss';
import { Link } from 'react-router-dom';

// Icons
import { Clock as HistoryIcon } from 'react-feather';
import { Avatar } from '@chakra-ui/avatar';

const Expense = ({ user, value }) => {
  return (
    <div className="expense">
      <div className="expense__user">
        <Avatar src={user.photo} />
        <p>{user.name}</p>
      </div>
      <p className="expense__total">{value}pln</p>
      <div className="expense__history">
        <Link to={`/history/${user.id}`}>
          <HistoryIcon style={{ color: '#fff' }} />
        </Link>
      </div>
    </div>
  );
};

export default Expense;
