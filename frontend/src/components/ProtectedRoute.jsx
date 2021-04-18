import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
// rest disini sisa"
const ProtectedRoutes = ({ isLogin, ...rest }) => {
  // Auth disini dari index reducers
  const Auth = useSelector((state) => state.Auth);
  //   console.log(res);
  if (Auth.isLogin) {
    return <Redirect to="/" />;
  } else {
    return <Route {...rest} />;
  }
};

export default ProtectedRoutes;
