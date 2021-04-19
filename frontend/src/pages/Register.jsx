import React, { useState } from "react";
import { connect } from "react-redux";
import { RegisterAction } from "../redux/actions";

const Register = (props) => {
  const [registerdata, setregisterdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const OnInputChange = (e) => {
    setregisterdata({
      ...registerdata,
      [e.target.name]: e.target.value,
    });
  };

  const onRegistersubmit = (e) => {
    e.preventDefault();
    console.log(registerdata);
    props.RegisterAction(registerdata);
  };

  return (
    <div
      style={{ height: "90vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div>
        <h1 className="text-center">Register</h1>
        <form onSubmit={onRegistersubmit}>
          <input
            type="text"
            name="username"
            placeholder="username"
            className="form-control my-2"
            value={registerdata.username}
            onChange={OnInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            className="form-control my-2"
            value={registerdata.email}
            onChange={OnInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="form-control my-2"
            value={registerdata.password}
            onChange={OnInputChange}
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
