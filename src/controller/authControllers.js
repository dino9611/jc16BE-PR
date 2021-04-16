const Crypto = require("crypto");
const { mysqldb } = require("./../connection");
const jwt = require("jsonwebtoken");
const hashpassword = (password) => {
  let katakunci = process.env.HASH_KEY;
  return Crypto.createHmac("sha256", katakunci).update(password).digest("hex");
};

module.exports = {
  Register: (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({ message: "bad request" });
    }
    const data = {
      username,
      password: hashpassword(password),
    };
    let sql = `select * from users where username = ?`;
    mysqldb.query(sql, [username], (err, result) => {
      if (err) {
        return res.status(500).send({ message: err });
      };
      if (result.length) {
        return res.status(500).send({ message: "username has been registed" });
      }
      sql = `insert users set ?`;
      mysqldb.query(sql, data, (err, result2) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
        const iduser = result.insertId;
        sql = `select id, username, isverified, role from users where id = ?`;
        mysqldb.query(sql, [iduser], (err, result) => {
          if (err) {
            return res.status(500).send({ message: err });
          }
          const datatoken = {
            id: datauser[0].id,
            username: datauser[0].username,
          };
          const key = "primarykey";
          const token = jwt.sign(datatoken, key, { expiresIn: "2h" });
          return res.status(200).send({ ...datauser[0], cart: [], token: token });
        })
      })
    })
  },
  Login: (req, res) => {
    const { username, password } = req.body;
    const hashpass = hashpassword(password);
    if (!username || !password) {
      return res.status(400).send({ message: "bad request" });
    }
    let sql = `select id, username, isverified, role from users where username = ? and password = ?`;
    mysqldb.query(
      sql,
      [username, hashpass],
      (err, datauser) => {
        if (err) {
          return res.status(500).send({ message: err });
        };
        if (datauser.length) {
          const datatoken = {
            id: datauser[0].id,
            username: datauser[0].username,
          };
          const key = "primarykey";
          const token = jwt.sign(datatoken, key, { expiresIn: "2h" });
          return res.status(200).send({ ...datauser[0], cart: [], token: token });
        } else {
          return res.status(500).send({ message: "login failed" });
        }
      }
    )
  },
}

