import React from "react";
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  return (
    <div className="LoginMain">
      <div className="loginForm">
        <h1>Login</h1>
        <input type="text" placeholder="Enter your mail" />
        <input type="password" placeholder="Enter Password" />
        <button>Login</button>
        <span>
          Don't have an account?<Link to="/register">Register</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
