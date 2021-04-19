import React, { useState } from "react";
import { connect } from "react-redux";
import { RegisterAction } from "../redux/actions";

const Register = (props) => {
  const [registerdata, setregisterdata] = useState({
    username: "",
    email:"",
    password: ""
  });

  const onInputChange = (e) => {
    setregisterdata({
      ...registerdata,
      [e.target.name]: e.target.value,
    });
  };

  const onLoginsubmit = (e) => {
    e.preventDefault();
    console.log(registerdata);
    props.RegisterAction(registerdata);
  };

  return (
    <div
      style={{
        height: "90vh",
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <div>
        <h1 className="text-center">Register</h1>
        <form onSubmit={onLoginsubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="form-control my-2"
            value={registerdata.username}
            onChange={onInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control my-2"
            value={registerdata.email}
            onChange={onInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control my-2"
            value={registerdata.password}
            onChange={onInputChange}
          />
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { RegisterAction })(Register);
