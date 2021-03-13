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
import { selectPopupVisible, setPopupVisible } from "../../features/popupSlice";
import { Link } from "react-router-dom";

const Header = ({ title, setMobileNavOpen, mobileNavOpen }) => {
  const dispatch = useDispatch();
  const popupVisible = useSelector(selectPopupVisible);

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
        <Button
          text={popupVisible ? "CANCEL" : "New expense"}
          onClick={() => dispatch(setPopupVisible())}
          style={{ marginRight: "20px" }}
        />
        <Link to="/chat">
          <Button text="Open chat" />
        </Link>
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
