const Crypto = require("crypto");
const { mysqldb } = require("./../connections");

const hashpassword = (password) => {
  var katakunci = process.env.HASH_KEY;
  return Crypto.createHmac("sha256", katakunci).update(password).digest("hex");
};

module.exports = {
  register: (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({ message: "bad request" });
    }
    console.log(req.body);
    const data = {
      username,
      password: hashpassword(password),
    };
    console.log(data);
    let sql = `insert users set ?`;
    mysqldb.query(sql, data, (err, result) => {
      console.log(result);
      if (err) {
        res.status(500).send({ message: err });
      }
      const iduser = result.insertId;
      sql = `select id,username,role,isverified from users where id = ?`;
      mysqldb.query(sql, [iduser], (err, datauser) => {
        if (err) res.status(500).send({ message: err });
        return res.status(200).send(datauser[0]);
      });
    });
  },
  login: (req, res) => {
    const { username, password } = req.body;
    const hashpass = hashpassword(password);
    if (!username || !password) {
      return res.status(400).send({ message: "bad request" });
    }
    let sql = `select id,username,role,isverified
    from users where username = ? and password = ?`;
    mysqldb.query(sql, [username, hashpass], (err, datauser) => {
      if (err) return res.status(500).send({ message: err });
      return res.status(200).send({ ...datauser[0], cart: [] });
    });
  },
};
