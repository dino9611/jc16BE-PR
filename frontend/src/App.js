import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Verified from "./pages/verified";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <ProtectedRoutes path="/login" exact component={Login} />
      <ProtectedRoutes path="/register" exact component={Register} />
      <Route path="/verified/:token" component={Verified} />
    </Switch>
  );
}

export default App;
