import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function Signup() {
    if (image && name && email && password) {
      console.log(image, name, email, password);
    } else {
      alert("please fill all fields");
    }
  }
  function ConvertImage(event) {
    if (event.target.files.length > 0) {
      const filereader = new FileReader();
      filereader.readAsDataURL(event.target.files[0]);
      filereader.onload = () => {
        setImage(filereader.result);
      };
    }
  }
  return (
    <div className="LoginMain">
      <div className="loginForm">
        <h1>Register</h1>
        <input type="file" onChange={(e) => ConvertImage(e)} />
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={Signup}>Register</button>
        <span>
          Already have an account?<Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
