const { mysqldb } = require('../connection')

const util = require("util");
const dba = util.promisify(mysqldb.query).bind(mysqldb);

module.exports = {
    getUsers: (req, res) => {
        const { username, password } = req.query
        let sql = `select * from users;`
        let escape = []
        if (username && password) {
            sql = `select * from users where username= ? and password= ? ;`
            escape = [username, password]
        } else {
            sql
        }
        mysqldb.query(sql, escape, (error, result) => {
            if (error) {
                return res.status(500).send(error)
            }
            console.log(result)
            return res.send(result)
        })

    },
    postUsers: (req, res) => {
        const { id } = req.params
        const data = req.body
        mysqldb.query(`update users set ? where id= ?`, [data, id], (err, result) => {
            if (err) return res.status(500).send(err);
            mysqldb.query(`select * from users;`, (err, result1) => {
                if (err) return res.status(500).send(err);
                console.log(result1)
                return res.send(result1)
            });
        })
    },
    patchUsers: (req, res) => {
        const { id } = req.params;
        const data = req.body;
        mysqldb.query(`update users set ? where id= ?`, [data, id], (error, result) => {
            if (error) return res.status(500).send(error);
            mysqldb.query(`select * from users;`, (error, result1) => {
                if (error) return res.status(500).send(error);
                console.log(result1)
                return res.send(result1)
            })
        })
    },
    deleteUsers: (req, res) => {
        const { id } = req.params
        mysqldb.query(`delete from users where id= ?`, [id], (error, result) => {
            mysqldb.query(`select * from users;`, (error, result1) => {
                if (error) return res.status(500).send(error)
                console.log(result1)
                return res.send(result1)
            })
        })
    },
    changePassword: async (req, res) => {
        try {
            const { oldPass, newPass } = req.body
            const { id } = req.params
            const dataUsers = await dba('select * from users where id = ?', [id])
            if (dataUsers.length) {
                if (dataUsers[0].password === oldPass) {
                    const data = { password: newPass }
                    await dba(`update users set ? where id= ?`, [data, id])
                    const allUsers = await dba('select * from users where id = ?', [id])
                    return res.status(200).send(allUsers)
                } else {
                    return res.status(500).send({ message: 'wrong password' })
                }
            } else {
                return res.status(500).send({ message: 'id not found' })
            }

        } catch (error) {
            return res.status(500).send(error)
        }
    }

}