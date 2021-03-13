import { PropTypes} from 'prop-types';
import "./Channel.scss";

// Redux
import { useDispatch } from "react-redux";
import { setAppInfo } from "../../features/appSlice";
import { setActiveSection } from "../../features/sectionSlice";

const Channel = ({ id, channelName, setMobileNavOpen }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="channel"
      onClick={() => {
        dispatch(
          setAppInfo({
            channelId: id,
            channelName: channelName,
          })
        )
        dispatch(
          setActiveSection({
            activeSection: 'chat'
          })
        );
        setMobileNavOpen(false)
      }}
    >
      <h3 className="channel__roomName">
        # <span>{channelName}</span>
      </h3>
    </div>
  );
};

Channel.propTypes = {
  id: PropTypes.string.isRequired,
  channelName: PropTypes.string.isRequired,
  setMobileNavOpen: PropTypes.func
};

Channel.defaultProps = {
  channelId: null,
  channelName: null,
};

export default Channel;
