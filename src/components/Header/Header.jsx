import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Header.scss";

// Components
import Button from "../Button/Button";

// Icons
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setActiveSection } from "../../features/sectionSlice";
import { Link } from "react-router-dom";
import { togglePopup } from "../../state/actions/appAction";

const Header = ({
  title,
  setMobileNavOpen,
  mobileNavOpen,
  expenseButton = false,
}) => {
  const popupDispatch = useDispatch();
  const popupVisible = useSelector(state => state.app.popupVisible);

  const handlePopupToggle = () => {
    popupDispatch(togglePopup())
  };

  return (
    <div className="header">
      <MenuIcon
        fontSize="large"
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      />
      <ArrowBackIcon
        fontSize="large"
        onClick={() =>
          dispatch(
            setActiveSection({
              activeSection: "expenses",
            })
          )
        }
      />
      <h1>{title}</h1>
      <div className="header__buttons">
        {expenseButton && (
          <Link to="/expenses">
            <Button text={popupVisible ? 'x' : 'New expense'} onClick={handlePopupToggle} />
          </Link>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  setMobileNavOpen: PropTypes.bool,
  mobileNavOpen: PropTypes.func,
};

Header.defaultProps = {
  setMobileNavOpen: false,
};

export default Header;
