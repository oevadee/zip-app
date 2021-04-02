import React from 'react';
import { PropTypes } from 'prop-types';

// Components
import './Expense.scss';
import { Link } from 'react-router-dom';

// Icons
import { Clock as HistoryIcon } from 'react-feather';
import { Avatar } from '@chakra-ui/avatar';

const Expense = ({ photo, displayName, id, total }) => {
  return (
    <div className="expense">
      <div className="expense__user">
        <Avatar src={photo} />
        <p>{displayName}</p>
      </div>
      <p className="expense__total">{String(total)}pln</p>
      <div className="expense__history">
        <Link to={`/history/${id}`}>
          <HistoryIcon style={{ color: '#fff' }} />
        </Link>
      </div>
    </div>
  );
};

export default Expense;
