const { mysqldb } = require("./../connections");
const { createTransport } = require("nodemailer");
const hashpassword = require("./../helpers/HashingPass");
const { v4: uuidv4 } = require("uuid");
const {
  createAccessToken,
  createEmailToken,
} = require("./../helpers/CreateToken");

let transporter = createTransport({
  service: "gmail",
  auth: {
    user: "algifari843@gmail.com",
    pass: "cczynulfglvfflfz",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  verifiedEmailToken: (req, res) => {
    const { id } = req.user;
    let dataUpdate = {
      isverified: 1,
    };
    let sql = `update users set ? where id = ?`;
    mysqldb.query(sql, [dataUpdate, id], (err, result) => {
      if (err) return res.status(500).send(err);
      sql = `select id,username,email,role,isverified from users where id = ? `;
      mysqldb.query(sql, [id], (err, datauser) => {
        if (err) return res.status(500).send({ message: err });
        return res.send(datauser[0]);
      });
    });
  },

  sendEmailVerification: (req, res) => {
    const { id, email, username } = req.body;
    const datatoken = {
      id: id,
      username: username,
    };
    const tokenEmail = createEmailToken(datatoken);
    transporter
      .sendMail({
        from: "Operational <algifari843@gmail.com>",
        to: email,
        subject: "Email Verification",
        html: `<h1>Hai ${username}</h1> <a href='http://localhost:3000/verified/${tokenEmail}'>Verification Link</a>`,
      })
      .then((res1) => {
        return res.status(200).send({ message: "Email Sent" });
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  },

  register: (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(400).send({ message: "Bad request" });
    }
    const data = {
      id: uuidv4(),
      username,
      password: hashpassword(password),
      email,
    };
    let sql = `select * from users where username = ? `;
    mysqldb.query(sql, [username], (err, result) => {
      if (err) return res.status(500).send({ message: err });
      if (result.length) {
        return res.status(500).send({ message: "Username not available" });
      }
      sql = `insert users set ?`;
      mysqldb.query(sql, data, (err, result1) => {
        if (err) res.status(500).send({ message: err });
        const iduser = data.id;
        sql = `select id,username,email,role,isverified from users where id = ? `;
        mysqldb.query(sql, [iduser], (err, datauser) => {
          if (err) return res.status(500).send({ message: err });
          const datatoken = {
            id: datauser[0].id,
            username: datauser[0].username,
          };
          const token = createAccessToken(datatoken);
          const tokenEmail = createEmailToken(datatoken);
          transporter
            .sendMail({
              from: "Operational <algifari843@gmail.com>",
              to: datauser[0].email,
              subject: "Email Verification",
              html: `<h1>Hai ${datauser[0].username}</h1> <a href='http://localhost:3000/verified/${tokenEmail}'>Verification Link</a>`,
            })
            .then((res1) => {
              return res
                .status(200)
                .send({ ...datauser[0], cart: [], token: token });
            })
            .catch((err) => {
              return res.status(500).send(err);
            });
        });
      });
    });
  },

  login: (req, res) => {
    const { usernameOremail, password } = req.body;
    const hashpass = hashpassword(password);
    if (!usernameOremail || !password) {
      return res.status(400).send({ message: "Bad request" });
    }
    let sql = `select id,username,email,role,isverified
    from users where (username = ? or email = ?) and password = ?`;
    mysqldb.query(
      sql,
      [usernameOremail, usernameOremail, hashpass],
      (err, datauser) => {
        if (err) return res.status(500).send({ message: err });
        if (datauser.length) {
          const datatoken = {
            id: datauser[0].id,
            username: datauser[0].username,
          };
          const token = createAccessToken(datatoken);
          return res
            .status(200)
            .send({ ...datauser[0], cart: [], token: token });
        } else {
          return res.status(500).send({ message: "Login failed" });
        }
      }
    );
  },
};
