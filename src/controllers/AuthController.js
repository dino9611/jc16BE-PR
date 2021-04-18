const { mysqldb } = require("./../connections");
const { createTransport } = require("nodemailer");
const jwt = require("jsonwebtoken");
const hashpassword = require("./../helpers/hashingpass");
const {
  createAccessToken,
  createEmailVerifiedToken,
} = require("./../helpers/createToken");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

// settingan nodemailer
let transporter = createTransport({
  service: "gmail",
  auth: {
    user: "darabalqis58@gmail.com",
    pass: "nxsngtnrijyjyhlj", //passnya didptin dri generate pass gmail, liat di sticky notes
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  sendEmail: (req, res) => {
    let filepath = path.resolve(__dirname, "../content/email_template.html");
    // let filepath1 = __dirname + "../content/conthemail.html";
    const htmlrender = fs.readFileSync(filepath, "utf-8");
    const template = handlebars.compile(htmlrender);
    const htmltoemail = template({
      username: "balqis",
      link: "www.google.com",
    });
    transporter
      .sendMail({
        from: "kingdom <darabalqis58@gmail.com>",
        to: "amirahbalqis408@gmail.com",
        subject: "legendary war",
        html: htmltoemail,
        // <img src='https://images.unsplash.com/photo-1597466599360-3b9775841aec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'/>
      })
      .then((res1) => {
        console.log(res1);
        return res.send("berhasil");
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  },
  verifiedEmailwithoutToken: (req, res) => {
    const { id } = req.params;
    let dataUpdate = {
      isverified: 1,
    };
    let sql = `update users set ? where id = ?`;
    mysqldb.query(sql, [dataUpdate, id], (err, result) => {
      if (err) return res.status(500).send(err);
      sql = `select id,username,email,isverified,role from users where id = ? `;
      mysqldb.query(sql, [id], (err, datauser) => {
        if (err) return res.status(500).send({ message: err });
        return res.send(datauser[0]);
      });
    });
  },
  verifiedEmailwithToken: (req, res) => {
    const { id } = req.user;
    let dataUpdate = {
      isverified: 1,
    };
    let sql = `update users set ? where id = ?`;
    mysqldb.query(sql, [dataUpdate, id], (err, result) => {
      if (err) return res.status(500).send(err);
      sql = `select id,username,email,isverified,role from users where id = ? `;
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
    const tokenverified = createEmailVerifiedToken(datatoken);
    transporter
      .sendMail({
        from: "kingdom <darabalqis58@gmail.com>",
        to: email,
        subject: "legendary war",
        html: `<h1>hai ${username}</h1> <a href='http://localhost:3000/verified/${tokenverified}'>link verifikasi<a/> `,
      })
      .then((res1) => {
        console.log(res1);
        return res.status(200).send({ message: "email berhasil dikirim" });
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  },
  Register: (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      res.status(400).send({ message: "bad request" });
    }
    const data = {
      username,
      password: hashpassword(password),
      email,
    };
    // NOTE!!
    // klo tanda tanya > 1 harus pakai array, klo engga, yauda gausa

    // cek apakah uname,email suda dipakai atau blm didb
    // tanda tanya 1, nanti diganti array username,tanya tanya 2 diganti email
    // ini yg dibwh yg bener, yg dicode di apus emailnya krn buat testing
    // let sql = `select * from users where username=? or email=?`;
    // mysqldb.query(sql, [username,email], (err, result0) => {

    let sql = `select * from users where username=?`;
    mysqldb.query(sql, [username], (err, result0) => {
      if (err) return res.status(500).send({ message: err });
      if (result0.length) {
        return res
          .status(500)
          .send({ message: "username /email has been registered" });
      }
      //   insert data user to table user
      sql = `insert users set ?`;
      // setelah set harus dikasi obj, makanya kita bikin obj data
      mysqldb.query(sql, data, (err, result) => {
        if (err) return res.status(500).send({ message: err });
        //   dptin id
        const iduser = result.insertId;
        // get datauser
        sql = `select id,username,email,isverified,role from users where id=?`;
        mysqldb.query(sql, [iduser], (err, datauser) => {
          if (err) return res.status(500).send({ message: err });
          //   jwt
          const datatoken = {
            id: datauser[0].id,
            username: datauser[0].username,
          };
          const token = createAccessToken(datatoken);
          const tokenverified = createEmailVerifiedToken(datatoken);
          transporter
            .sendMail({
              from: "kingdom <darabalqis58@gmail.com>",
              to: datauser[0].email,
              subject: "legendary war, confirm please",
              html: `<h1>hai ${datauser[0].username}</h1> <a href='http://localhost:3000/verified/${tokenverified}'>link verifikasi<a/> `,
              // <img src='https://images.unsplash.com/photo-1597466599360-3b9775841aec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'/>
            })
            .then((res1) => {
              console.log(res1);

              //   cart kosong, krn pada saat register cart uda pasti kosong
              // { ...datauser[0], cart: [] } maksudnya adlh, dibuka object datauser, ditambahkan cart
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
      res.status(400).send({ message: "bad request" });
    }
    let sql = `select id,username,email,isverified,role from users where (username=? or email=?) and password=?`;
    mysqldb.query(
      sql,
      [usernameOremail, usernameOremail, hashpass],
      (err, datauser) => {
        if (err) return res.status(500).send({ message: err });
        if (datauser.length) {
          // jwt: token untk encrypt password, yg pnya expired
          const datatoken = {
            id: datauser[0].id,
            username: datauser[0].username,
          };
          const token = createAccessToken(datatoken);
          // anggap cart masi kosong
          return res
            .status(200)
            .send({ ...datauser[0], cart: [], token: token });
        } else {
          return res.status(500).send({ message: "login gagal" });
        }
      }
    );
  },
  verifiedToken: (req, res) => {
    // const { token } = req.body;
    // token selalu ditaro diheader
    const authHeader = req.headers["authorization"];
    console.log(req.headers);
    // maksud ini,klo kiri false, yg dpt yg kanan
    // klo true pun, yg dipilih yg kanan jga
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);
    const key = "saitama";
    jwt.verify(token, key, (err, decoded) => {
      // bakal error klo expired
      if (err) return res.status(401).send({ message: "user unauthorized" });
      console.log(decoded);
      res.send(decoded);
    });
  },
};
