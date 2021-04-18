const { mysqldb } = require("./../connections");

module.exports = {
  getCars: (req, res) => {
    let sql = `select * from cars`;
    mysqldb.query(sql, (err, result) => {
      if (err) return res.status(500).send(err);
      return res.send(result);
    });
  },
};
