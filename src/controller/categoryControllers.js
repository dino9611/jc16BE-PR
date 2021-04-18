const { mysqldb } = require("./../connection");

module.exports = {
  getCategory: (req, res) => {
    const { category_name, id_category } = req.query;
    let sql;
    if (category_name || id_category) {
      sql = `select * from category where category_name = ? or id_category = ?`
    } else {
      sql = `select * from category`;
    }

    mysqldb.query(sql, [category_name, id_category], (err, datacategory) => {
      if (err) return res.status(500).send({ message: err });
      return res.send(datacategory)
    })
  }
}