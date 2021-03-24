import React from "react";
import "./LoginRoute.scss";

import { Button } from "/src/components";

import { auth, provider } from "../../firebase";

const LoginRoute = () => {
  const loginUser = () => {
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login__loginContainer">
        <h1>
          Ultimate crew expense tracker <br />
          <span className="login__loginContainer__textSplit">OG edition</span>
        </h1>
        <Button text="login" onClick={loginUser} />
      </div>
      {/* <div className="login__imageContainer">
        <img src="/images/christmas.jpg" alt="christmas tree" />
      </div> */}
    </div>
  );
};

export default LoginRoute;
