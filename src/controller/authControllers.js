const { mysqldb } = require("./../connection");
const { createAccessToken } = require("./../helpers/ganarateToken");
const { hashpassword } = require("./../helpers/hassingPassword");

module.exports = {
  Register: (req, res) => {
    const { username, password, email } = req.body;
    const data = {
      username,
      password: hashpassword(password),
      email,
    };
    if (!username || !password || !email) return res.status(400).send({ message: "bad request" });
    let sql = `select * from users where username = ? and email = ?`;
    mysqldb.query(sql, [username, email], (err, result) => {
      if (err) return res.status(500).send({ message: err });
      if (result.length) return res.status(500).send({ message: "username has been registed" });
      sql = `insert users set ?`;
      mysqldb.query(sql, data, (err, result2) => {
        if (err) return res.status(500).send({ message: err });
        const iduser = result2.insertId;
        sql = `select id, username, email, role from users where id = ?`;
        mysqldb.query(sql, [iduser], (err, datauser) => {
          if (err) return res.status(500).send({ message: err });
          const datatoken = {
            id: datauser[0].id,
            username: datauser[0].username,
            email: datauser[0].email
          };
          const token = createAccessToken(datatoken);
          return res.status(200).send({ ...datauser[0], cart: [], token: token });
        })
      })
    })
  },
  Login: (req, res) => {
    const { usernameoremail, password } = req.body;
    if (!usernameoremail || !password) return res.status(400).send({ message: "bad request" });
    let sql = `select id, username, email, role from users where (username = ? or email = ?) and password = ?`;
    mysqldb.query(sql, [usernameoremail, usernameoremail, hashpassword(password)], (err, datauser) => {
      if (err) return res.status(500).send({ message: err });
      if (datauser.length) {
        const datatoken = {
          id: datauser[0].id,
          username: datauser[0].username,
        };
        const token = createAccessToken(datatoken)
        return res.status(200).send({ ...datauser[0], cart: [], token: token });
      } else return res.status(500).send({ message: "login failed" });
    }
    )
  },
}

