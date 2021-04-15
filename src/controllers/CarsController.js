const { mysqldb } = require("./../connections");
const util = require("util");
const dba = util.promisify(mysqldb.query).bind(mysqldb);

module.exports = {
  getCars: (req, res) => {
    let sql = `select * from cars`;
    mysqldb.query(sql, (err, result) => {
      if (err) return res.status(500).send(err);
      return res.send(result);
    });
  },
};
