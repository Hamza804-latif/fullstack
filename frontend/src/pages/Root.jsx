import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Root = () => {
  const [userToken] = useState(JSON.parse(localStorage.getItem("userToken")));

  return <>{userToken ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default Root;
