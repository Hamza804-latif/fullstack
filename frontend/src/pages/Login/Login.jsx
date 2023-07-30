import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function LoginUser() {
    if (email && password) {
      let result = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      let jsonData = await result.json();
      if (jsonData?.status === 200) {
        localStorage.setItem("userToken", JSON.stringify(jsonData?.token));
        toast.success(jsonData?.msg);
        navigate("/");
      } else {
        toast.error(jsonData?.msg);
      }
    } else {
      toast.error("Please fill all fields");
    }
  }
  return (
    <div className="LoginMain">
      <div className="loginForm">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Enter your mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={LoginUser}>Login</button>
        <span>
          Don't have an account?<Link to="/register">Register</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
