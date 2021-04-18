const jwt = require("jsonwebtoken");

module.exports = {
  createAccessToken: (data) => {
    const key = "primarykey";
    const token = jwt.sign(data, key, {expiresIn: "1h"});
    return token
  }
}