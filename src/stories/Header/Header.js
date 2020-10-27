import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Header.scss";

import Button from "../Button/Button";

const Header = ({ activeSection, ...props }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (activeSection === "chat") setTitle("Chat");
    else if (activeSection === "expenses") setTitle("My Doe");
    else if (activeSection === "history") setTitle("History");
  }, [activeSection]);

  return (
    <div className="header">
      <h1>{title}</h1>
      <Button
        primary={true}
        text={activeSection === "expenses" ? "Open chat" : "New expense"}
        onClick={() => {}}
        {...props}
      />
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
