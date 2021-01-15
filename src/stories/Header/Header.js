import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Header.scss";

import Button from "../Button/Button";

const Header = ({ activeSection }) => {
  const [title, setTitle] = useState("");
  // const dispatch = useDispatch();

  useEffect(() => {
    if (activeSection === "chat") setTitle("Chat");
    else if (activeSection === "expenses") setTitle("My Doe");
    else if (activeSection === "history") setTitle("History");
  }, [activeSection]);

  return (
    <div className="header">
      <h1 className={activeSection === 'expenses' ? 'header--expenses' : 'header--classic'}>{title}</h1>
      <div className={`header__buttons ${activeSection === 'expenses' ? '' : 'btn-single'}`}>
        {activeSection === "expenses" ? (
          <Button
            text="New expense"
            onClick={() => {
              // dispatch(setPopupVisible({
              //   popupVisible: true
              // }));
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
              // dispatch(
              //   setActiveSection({
              //     activeSection: "expenses",
              //   })
              // );
            } else if (activeSection === "expenses") {
              // dispatch(
              //   setActiveSection({
              //     activeSection: "chat",
              //   })
              // );
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
