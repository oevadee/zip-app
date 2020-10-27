import React from "react";
import PropTypes from "prop-types";
import "./styles/Header.scss";

import Button from "./Button";
import { useSelector } from "react-redux";
import { selectActiveSection } from "../features/appSlice";

const Header = ({ title, ...props }) => {
  const activeSection = useSelector(selectActiveSection);

  return (
    <div className="header">
      <h1>{title}</h1>
      <Button
        primary={true}
        text={activeSection === "expenses" ? "Open chat" : "New expense"}
      />
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  activeSection: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Header.defaultProps = {
  activeSection: "expenses",
  onClick: undefined,
};

export default Header;