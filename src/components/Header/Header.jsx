import PropTypes from "prop-types";
import "./Header.scss";

// Components
import { Button } from "/src/components";

// Icons
import {
  Menu as MenuIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleNav, togglePopup } from "../../state/actions/appAction";

const Header = ({ title, expenseButton = false, goBackButton = false }) => {
  const appDispatch = useDispatch();
  const popupVisible = useSelector((state) => state.app.popupVisible);

  const handlePopupToggle = () => {
    appDispatch(togglePopup());
  };

  const handleNavToggle = () => {
    appDispatch(toggleNav());
  };

  return (
    <div className="header">
      <div className="header__menu">
        <MenuIcon fontSize="large" onClick={handleNavToggle} />
      </div>
      <h1>{title}</h1>
      <div className="header__buttons">
        {expenseButton && (
          <Link to="/expenses">
            <Button
              text={popupVisible ? "x" : "New expense"}
              onClick={handlePopupToggle}
            />
          </Link>
        )}
        {goBackButton && (
          <Link to="/expenses">
            <ArrowBackIcon fontSize="large" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
