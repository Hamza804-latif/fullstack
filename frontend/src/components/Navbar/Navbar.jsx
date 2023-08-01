import React from "react";
import "./navbar.css";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  function Logout() {
    localStorage.removeItem("userToken");
    navigate("/login");
  }
  return (
    <div className="navbar-main">
      <div className="navbar-content">
        <h2>Admin</h2>
        <div className="menus">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/addproduct">Add Product</NavLink>
          <button onClick={Logout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
