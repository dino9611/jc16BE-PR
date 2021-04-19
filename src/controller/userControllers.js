const { mysqldb } = require("./../connection");

module.exports = {
  getUsers: (req, res) => {
    const { username, email, role } = req.query;
    let sql;
    if (username && email && role) {
      sql = `select id, username, email, role from users where username = ? and email = ? and role = ?`;
    } else if (username || email || role) {
      sql = `select id, username, email, role from users where username = ? or email = ? or role = ?`;
    } else return sql = `select id, username, email, role from users`;
    mysqldb.query(sql, [username, email, role], (err, datauser) => {
      if (err) return res.status(500).send({ message: err });
      datauser.length ? res.status(200).send(datauser) : res.status(500).send({ message: "user not found" })
    });
  },
  getUserById: (req, res) => {
    const { id } = req.params;
    let sql = `select id, username, email, role from users where id = ?`;
    mysqldb.query(sql, id, (err, datauser) => {
      if (err) return res.status(500).send({ message: err });
      datauser.length ? res.status(200).send(datauser) : res.status(500).send({ message: "user not found" })
    });
  }

}