const { mysqldb } = require("./../connections");

module.exports = {
  getCars: (req, res) => {
    let sql = `select * from cars`;
    mysqldb.query(sql, (err, result) => {
      if (err) return res.status(500).send(err);
      return res.send(result);
    });
  },
  postCars: (req, res) => {
    let data = req.body;
    mysqldb.query(`insert into cars set ?`, data, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      mysqldb.query(`select * from cars`, (err, result1) => {
        if (err) {
          return res.status(500).send(err);
        }
        console.log(result1);
        return res.send(result1);
      });
    });
  },
  putCars: (req, res) => {
    const { idproduct } = req.params;
    const data = req.body;
    mysqldb.query(
      `update cars set ? where idproduct =?`,
      [data, idproduct],
      (err, result) => {
        if (err) return res.status(500).send(err);
        mysqldb.query(`select * from cars`, (err, result1) => {
          if (err) return res.status(500).send(err);
          return res.send(result1);
        });
      }
    );
  },
  deleteCars: (req, res) => {
    const { idproduct } = req.params;
    mysqldb.query(
      `delete from cars where idproduct = ?`,
      [idproduct],
      (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        mysqldb.query(`select * from cars`, (err, result1) => {
          if (err) {
            return res.status(500).send(err);
          }
          return res.send(result1);
        });
      }
    );
  },
};
