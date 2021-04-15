import React, { useEffect, useState } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <ProtectedRoutes path="/login" exact component={Login} />
      <ProtectedRoutes path="/register" exact component={Register} />
    </Switch>
  );
}

export default App;
