import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function Signup() {
    if (image && name && email && password) {
      try {
        let data = {
          image,
          name,
          email,
          password,
        };

        let result = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        let jsonData = await result.json();
        if (jsonData?.status === 200) {
          toast.success(jsonData.msg);
          navigate("/login");
        } else {
          toast.error(jsonData.msg);
        }
        console.log(jsonData);
      } catch (error) {
        console.log("error in register", error);
      }
    } else {
      toast.error("please fill all fields");
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
