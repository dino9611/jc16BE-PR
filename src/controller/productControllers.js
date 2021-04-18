const { mysqldb } = require("./../connection");

module.exports = {
  getProduct: (req, res) => {
    const { product_name, brand, maximum_price, minimum_price } = req.query;
    let sql;
    if (product_name && brand) {
      sql = `select * from product where product_name = ? and brand = ?`;
    } else if (product_name || brand) {
      sql = `select * from product where product_name = ? or brand = ?`;
    } else if (maximum_price && minimum_price) {
      sql = `select * from product where price <= ? and price >= ?`;
    } else if (maximum_price || minimum_price) {
      sql = `select * from product where price <= ? or price >= ?`;
    } else sql = `select * from product`;

    let escape = product_name || brand ? [product_name, brand] : [maximum_price, minimum_price]
    // console.log(escape)
    mysqldb.query(sql, escape, (err, dataproduct) => {
      if (err) return res.status(500).send({ message: err });
      dataproduct.length ? res.status(200).send(dataproduct) : res.status(500).send({ message: "product not found" })
    })
  }, 
  getProductById: (req, res) => {
    const { id } = req.params;
    let sql = `select * from product where id = ?`;
    mysqldb.query(sql, id, (err, dataproduct) => {
      if (err) return res.status(500).send({ message: err });
      dataproduct.length ? res.status(200).send({ ...dataproduct[0] }) : res.status(500).send({ message: "product not found" })
    })
  }
}