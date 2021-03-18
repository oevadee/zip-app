import "./LoginRoute.scss";

import Button from "../../components/Button/Button";

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
          <span style={{ color: 'rgb(185, 136, 246)' }}>OG edition</span>
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
