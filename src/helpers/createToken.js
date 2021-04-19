const jwt = require("jsonwebtoken");

module.exports = {
  createAccessToken: (data) => {
    const key = "saitama";
    const token = jwt.sign(data, key, { expiresIn: "2h" });
    return token;
  },
  createEmailVerifiedToken: (data) => {
    const key = "king"; //key nya harusnya beda
    const token = jwt.sign(data, key, { expiresIn: "2m" });
    return token;
  },
};
