import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Header.scss";

// Components
import Button from "../Button/Button";

// Icons
import MenuIcon from '@material-ui/icons/Menu';

// Redux
import { useDispatch } from "react-redux";
import { setActiveSection } from "../../features/sectionSlice";
import { setPopupVisible } from "../../features/popupSlice";

const Header = ({ activeSection, setMobileNavOpen, mobileNavOpen }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeSection === "chat") setTitle("Chat");
    else if (activeSection === "expenses") setTitle("My Doe");
    else if (activeSection === "history") setTitle("History");
  }, [activeSection]);

  return (
    <div className="header">
      {activeSection === 'chat' ? (
        <MenuIcon fontSize="large" onClick={() => setMobileNavOpen(!mobileNavOpen)} />
      ) : <></>}
      <h1>{title}</h1>
      <div className={`header__buttons ${activeSection === 'expenses' ? '' : 'btn-single'}`}>
        {activeSection === "expenses" ? (
          <Button
            text="New expense"
            onClick={() => {
              dispatch(setPopupVisible({
                popupVisible: true
              }));
            }}
            style={{ marginRight: "20px" }}
          />
        ) : (
          <></>
        )}
        <Button
          text={activeSection === "expenses" ? "Open chat" : "New expense"}
          onClick={() => {
            if (activeSection === "chat") {
              dispatch(
                setActiveSection({
                  activeSection: "expenses",
                })
              );
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
  onClick: PropTypes.func,
};

Header.defaultProps = {
  activeSection: "expenses",
  onClick: undefined,
};

export default Header;
