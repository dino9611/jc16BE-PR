const jwt = require("jsonwebtoken");

module.exports.VerifyAccessToken = (req, res, next) => {
  const token = req.token;
  const key = "tanjiro";
  jwt.verify(token, key, (err, decoded) => {
    if (err) return res.status(401).send({ message: "User Unauthorized" });
    req.user = decoded;
    next();
  });
};

module.exports.VerifyEmailToken = (req, res, next) => {
  const token = req.token;
  const key = "sukuna";
  jwt.verify(token, key, (err, decoded) => {
    if (err) return res.status(401).send({ message: "User Unauthorized" });
    req.user = decoded;
    next();
  });
};
