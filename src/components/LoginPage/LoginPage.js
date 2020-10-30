import React from "react";
import "./LoginPage.scss";

import Button from "../Button/Button";

import { auth, provider } from "../../firebase";

const LoginPage = () => {
  const loginUser = () => {
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <div className="loginPage">
      <h1>Ultimate crew expense tracker</h1>
      <Button text="Login" onClick={loginUser} />
    </div>
  );
};

export default LoginPage;
