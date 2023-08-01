import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const Root = () => {
  const [userToken] = useState(JSON.parse(localStorage.getItem("userToken")));

  return (
    <>
      {userToken ? (
        <>
          <Navbar />
          <Outlet />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Root;
