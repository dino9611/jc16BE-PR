const { mysqldb } = require('./../connection');

module.exports = {
    getCars: (req, res) => {
        let sql;
        sql = `SELECT * FROM cars`;

        mysqldb.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.send(result);
        });
    },
    postCars: (req, res) => {
        let data = req.body;
        mysqldb.query('INSERT INTO cars SET ?', data, (err) => {
            if (err) return res.status(500).send(err);
            mysqldb.query('SELECT * FROM cars', (err, result) => {
                if (err) res.status(500).send(err);

                return res.send(result);
            });
        });
    },
    editCars: (req, res) => {
        const { id } = req.params;
        const data = req.body;

        mysqldb.query('UPDATE cars SET ? WHERE id = ?', [data, id], (err) => {
            if (err) return res.status(500).send(err);
            mysqldb.query('SELECT * FROM cars', (err, result) => {
                if (err) res.status(500).send(err);

                return res.send(result);
            });
        });
    },
    deleteCars: (req, res) => {
        const { id } = req.params;

        mysqldb.query('DELETE FROM cars WHERE id = ?', [id], (err) => {
            if (err) return res.status(500).send(err);
            mysqldb.query('SELECT * FROM cars', (err, result) => {
                if (err) res.status(500).send(err);

                return res.send(result);
            });
        });
    },
};
