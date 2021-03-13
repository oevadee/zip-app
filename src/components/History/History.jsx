import { PropTypes } from 'prop-types'
import "./History.scss";

// Components
import { Avatar } from "@material-ui/core";

const History = ({ historyEl, historyOf }) => {
  return (
    <div className="history">
      <div className="history__user">
        <Avatar src={historyOf.photo} />
      </div>
      <p className="history__expense">{historyEl.value}</p>
      <p className="history__timestamp">{new Date(historyEl.timestamp?.toDate()).toLocaleDateString()}</p>
      <p className="history__about">{historyEl.aboutTransaction}</p>
    </div>
  );
};

History.propTypes = {
  historyEl: PropTypes.object,
  historyOf: PropTypes.object,
};

export default History;
