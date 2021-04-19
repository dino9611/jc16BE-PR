import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../helpers/ApiUrl";

const SendEmailVerified = (props) => {
  const [Loading, setLoading] = useState(true);
  const [Berhasil, setBerhasil] = useState(true);

  return (
    <div>
      <center>
        <h1>Email Sent</h1>
        <button>Send Email Verification</button>
      </center>
    </div>
  );
};

export default SendEmailVerified;
