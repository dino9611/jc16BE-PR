const jwt = require("jsonwebtoken");

module.exports = {
  createAccessToken: (data) => {
    const key = "tanjiro";
    const token = jwt.sign(data, key, { expiresIn: "2h" });
    return token;
  },
  createEmailToken: (data) => {
    const key = "sukuna";
    const token = jwt.sign(data, key, { expiresIn: "1m" });
    return token;
  },
};
