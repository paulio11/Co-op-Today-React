import React from "react";
// Assets
import logo from "../assets/coop-logo.png";
// Bootstrap
import Button from "react-bootstrap/Button";
// Firebase
import { auth, provider } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const handleLogin = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("user", result.user.displayName);
    });
  };

  return (
    <div className="login">
      <img src={logo} alt="logo" />
      <h1>Today</h1>
      <Button onClick={handleLogin} variant="dark">
        <i className="fa-brands fa-google"></i> Login with Google
      </Button>
    </div>
  );
};

export default Login;
