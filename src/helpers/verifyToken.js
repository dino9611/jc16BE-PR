const jwt = require("jsonwebtoken");

// middleware token
// jdi sblm akses get,post,put,delete users harus pnya token
module.exports.verifyTokenAccess = (req, res, next) => {
  // tanpa bearer

  //   const authHeader = req.headers["authorization"];
  //   console.log(req.headers);
  // maksud ini,klo kiri false, yg dpt yg kanan
  // klo true pun, yg dipilih yg kanan jga
  //   const token = authHeader.split(" ")[1]
  //     ? authHeader.split(" ")[1]
  //     : authHeader;
  //   console.log(token);

  // dngn bearer
  //   klo pake bearer, nanti dipostman headernya sblm token dikasih Bearer,spy bsa jln
  console.log("token", req.token);
  const token = req.token;
  const key = "saitama"; //kata kunci terserah
  jwt.verify(token, key, (err, decoded) => {
    // bakal error klo expired
    if (err) return res.status(401).send({ message: "user unauthorized" });
    console.log(decoded);
    req.user = decoded;
    next(); //klo next,akan msk ke getuser
  });
};

module.exports.verifyEmailToken = (req, res, next) => {
  console.log("token", req.token);
  const token = req.token;
  const key = "king"; //kata kunci disamakan dngn createtoken yg dibuat
  jwt.verify(token, key, (err, decoded) => {
    // bakal error klo expired
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "user unauthorized" });
    }
    console.log(decoded);
    req.user = decoded;
    next();
  });
};
