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
      <div className="loginPage__loginContainer">
        <h1>
          Ultimate crew expense tracker <br />
          <span style={{ color: '#fff' }}>Winter edition</span>
        </h1>
        <Button text="Login" onClick={loginUser} />
      </div>
      <div className="loginPage__imageContainer">
        <img src="/images/christmas.jpg" alt="christmas tree" />
      </div>
    </div>
  );
};

export default LoginPage;
