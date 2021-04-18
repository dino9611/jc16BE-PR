const jwt = require("jsonwebtoken");

module.exports.verifyTokenAccess = (req, res, next) => {
  const token = req.token;
  const key = "primarykey";
  jwt.verify(token, key, (err, decoded) => {
    if (err) return res.status(401).send({ message: "user unauthorized" });
    req.users = decoded;
    next();
  });
};