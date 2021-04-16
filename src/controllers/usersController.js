const { mysqldb } = require("./../connections");
const util = require("util");
const dba = util.promisify(mysqldb.query).bind(mysqldb);
module.exports = {
  getUsers: (req, res) => {
    const { username, password } = req.query;
    let sql;
    let escape = [];
    if (username && password) {
      sql = `select * from users where username= ? and  password = ?`;
      escape = [username, password];
    } else {
      sql = `select * from users`;
    }

    mysqldb.query(sql, escape, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      console.log(result);

      return res.send(result);
    });
  },
  postUsers: (req, res) => {
    console.log(req.body);
    let data = req.body;
    console.log(data);
    mysqldb.query(`insert into users set ?`, data, (err, result) => {
      if (err) return res.status(500).send(err);
      mysqldb.query(`select * from users`, (err, result1) => {
        if (err) return res.status(500).send(err);
        return res.send(result1);
      });
    });
  },
  editUsers: (req, res) => {
    const { id } = req.params;
    const data = req.body;
    mysqldb.query(
      `update users set ? where id =?`,
      [data, id],
      (err, result) => {
        if (err) return res.status(500).send(err);
        mysqldb.query(`select * from users`, (err, result1) => {
          if (err) return res.status(500).send(err);
          return res.send(result1);
        });
      }
    );
  },
  deleteUser: (req, res) => {
    const { id } = req.params;

    mysqldb.query(`delete from users where id =?`, [id], (err, result) => {
      if (err) return res.status(500).send(err);
      mysqldb.query(`select * from users`, (err, result1) => {
        if (err) return res.status(500).send(err);
        return res.send(result1);
      });
    });
  },
};
