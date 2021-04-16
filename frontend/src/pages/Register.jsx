import React, { useState } from "react";
import { connect } from "react-redux";
import { RegisterAction } from "../redux/actions";

const Register = (props) => {
  const [registerdata, setregisterdata] = useState({
    username: "",
    password: "",
  });

  const onInputChange = (e) => {
    setregisterdata({
      ...registerdata,
      [e.target.name]: e.target.value,
    });
  };

  const onLogisubmit = (e) => {
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
        <form onSubmit={onLogisubmit}>
          <input
            type="text"
            name="username"
            placeholder="username"
            className="form-control my-2"
            value={registerdata.username}
            onChange={onInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
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
