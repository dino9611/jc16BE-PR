// panngil mysqldb
const { mysqldb } = require("./../connections");
const util = require("util");
const dba = util.promisify(mysqldb.query).bind(mysqldb);
module.exports = {
  getUsers: (req, res) => {
    // console.log(req.user, "hasil dari token");
    // cek username, pass
    const { username, password } = req.query;
    let sql;

    if (username && password) {
      // pakai connection.escape spy urlnya secure,
      // connection diganti mysqldb, krn suda dirapihkan difolder lain
      // biar tdk kena sql injection
      sql = `select * from users where username=${mysqldb.escape(
        username
      )} and password=${mysqldb.escape(password)}`;
    } else {
      // get semua user
      sql = `select * from users`;
    }
    mysqldb.query(sql, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      // console.log(result);
      return res.send(result);
    });
  },
  postUsers: (req, res) => {
    console.log(req.body);
    let data = req.body;
    // klo misalkan ga sama,bikin data spy sama kyk dngn kolom db
    // let data = {
    //   username: req.body.username,
    //   password: req.body.password,
    //   kota: req.body.kota,
    // };
    mysqldb.query(`insert into users set?`, data, (err, result) => {
      if (err) return res.status(500).send(err);
      console.log("kebaca line 104", result); //disini ada insert id
      mysqldb.query(`select * from users`, (err, result1) => {
        if (err) return res.status(500).send(err);
        console.log(result1);
        return res.send(result1);
      });
    });
  },
  putUsers: (req, res) => {
    const { id } = req.params;
    const data = req.body;
    // setelah set harus obj []
    mysqldb.query(
      `update users set ? where id =?`,
      [data, id],
      (err, result) => {
        if (err) return res.status(500).send(err);
        // console.log("kebaca line 124", result);
        mysqldb.query(`select * from users`, (err, result1) => {
          if (err) return res.status(500).send(err);
          console.log(result1);
          return res.send(result1);
        });
      }
    );
  },
  deleteUser: (req, res) => {
    const { id } = req.params;
    // setelah set harus obj []
    mysqldb.query(`delete from users where id =?`, [id], (err, result) => {
      if (err) return res.status(500).send(err);
      // console.log("kebaca line 144", result);
      mysqldb.query(`select * from users`, (err, result1) => {
        if (err) return res.status(500).send(err);
        console.log(result1);
        return res.send(result1);
      });
    });
  },

  gantipassword: async (req, res) => {
    try {
      const { passlama, passbaru } = req.body;
      const { id } = req.params;
      const datausers = await dba("select * from users where id = ?", [id]); //hasilnya array
      if (datausers.length) {
        if (datausers[0].password === passlama) {
          const data = {
            password: passbaru,
          };
          await dba(`update users set ? where id = ?`, [data, id]);
          const allUsers = await dba("select * from users where id");
          return res.status(200).send(allUsers);
        } else {
          return res.status(500).send({ message: "password lama salah" });
        }
      } else {
        return res.status(500).send({ message: "id not found" });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
