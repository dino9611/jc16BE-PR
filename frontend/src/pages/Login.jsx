import React, { useState } from "react";
import { connect } from "react-redux";
import { LoginAction } from "../redux/actions";

const Login = (props) => {
  const [logindata, setlogindata] = useState({
    usernameOremail: "",
    password: "",
  });

  const OnInputChange = (e) => {
    setlogindata({
      ...logindata,
      [e.target.name]: e.target.value,
    });
  };

  const onLoginsubmit = (e) => {
    e.preventDefault();
    console.log(logindata);
    props.LoginAction(logindata);
  };

  return (
    <div
      style={{ height: "90vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div>
        <h1 className="text-center">Login</h1>
        <form onSubmit={onLoginsubmit}>
          <input
            type="text"
            name="usernameOremail"
            placeholder="username/email"
            className="form-control my-2"
            value={logindata.usernameOremail}
            onChange={OnInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="form-control my-2"
            value={logindata.password}
            onChange={OnInputChange}
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { LoginAction })(Login);
