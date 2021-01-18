import React, { useEffect, useState } from "react";
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

const Header = ({ activeSection, setMobileNavOpen, mobileNavOpen }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const popupVisible = useSelector(selectPopupVisible);

  useEffect(() => {
    if (activeSection === "chat") setTitle("Chat");
    else if (activeSection === "expenses") setTitle("My Doe");
    else if (activeSection === "history") setTitle("History");
  }, [activeSection]);

  return (
    <div className="header">
      {activeSection === "chat" ? (
        <MenuIcon
          fontSize="large"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        />
      ) : (
        <></>
      )}
      {activeSection === "history" ? (
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
      ) : (
        <></>
      )}
      <h1>{title}</h1>
      <div
        className={`header__buttons ${
          activeSection === "expenses" ? "" : "btn-single"
        }`}
      >
        {activeSection === "expenses" ? (
          <Button
            text={popupVisible ? "CANCEL" : "New expense"}
            onClick={() => {
              dispatch(setPopupVisible());
              dispatch(
                setActiveSection({
                  activeSection: "expenses",
                })
              );
            }}
            style={{ marginRight: "20px" }}
          />
        ) : (
          <></>
        )}
        <Button
          text={activeSection === "expenses" ? "Open chat" : "Expenses"}
          onClick={() => {
            if (activeSection === "chat" || activeSection === "history") {
              dispatch(
                setActiveSection({
                  activeSection: "expenses",
                })
              );
              popupVisible && dispatch(setPopupVisible());
            } else if (activeSection === "expenses") {
              dispatch(
                setActiveSection({
                  activeSection: "chat",
                })
              );
            }
          }}
        />
      </div>
    </div>
  );
};

Header.propTypes = {
  activeSection: PropTypes.string.isRequired,
  setMobileNavOpen: PropTypes.bool,
  mobileNavOpen: PropTypes.func
};

Header.defaultProps = {
  activeSection: "expenses",
  setMobileNavOpen: false,
};

export default Header;
