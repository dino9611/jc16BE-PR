import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../helpers/ApiUrl";

const Verified = (props) => {
  const [Loading, setLoading] = useState(true);
  const [Berhasil, setBerhasil] = useState(true);

  useEffect(() => {
    let token = props.match.params.token;
    axios
      .get(`${API_URL}/auth/verifiedemail`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setBerhasil(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const sendEmail = () => {
    let data = localStorage.getItem("data");
    data = JSON.parse(data);
    console.log(data);
    let datapost = {
      id: data.id,
      email: data.email,
      username: data.username,
    };
    axios
      .post(`${API_URL}/auth/sendverified`, datapost)
      .then((res) => {
        alert("Berhasil");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (Loading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  } else {
    if (Berhasil) {
      return (
        <div>
          <h1>Verification Success</h1>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Verification Timed Out</h1>
          <button onClick={sendEmail}>Send Verification Again</button>
        </div>
      );
    }
  }
};

export default Verified;
