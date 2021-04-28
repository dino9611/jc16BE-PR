const crypto = require('crypto');
const { mysqldb } = require('./../connection');

const hashpassword = (password) => {
    let kataKunci = process.env.HASH_KEY
    return crypto.createHmac('sha256', kataKunci).update(password).digest('hex')
};

module.exports = {
    register: (req, res) => {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(400).send({ message: "bad request" })
        }
        const data = {
            username,
            password: hashpassword(password),
            email
        };
        mysqldb.query(`select * from users where username = ? or email = ?`, [username, email], (error, result0) => { // ? kalau tanda tanya ada dua harus bikin array
            if (error) return res.status(500).send({ message: error })
            if (result0.length) {
                return res.status(400).send({ message: "username / email has been registered" })
            }
            mysqldb.query(`insert users set ?`, data, (error, result) => {
                if (error) res.status(500).send({ message: error })
                const iduser = result.insertId;
                mysqldb.query(`select id,username,email,is_verified from users where id = ? `, [iduser], (error, datauser) => {
                    if (error) res.status(500).send({ message: error })
                    return res.status(200).send({ ...datauser[0], cart: [] });
                })
            })
        })
    },
    login: (req, res) => {
        const { usernameOrEmail, password } = req.body;
        const hashpass = hashpassword(password);
        if (!usernameOrEmail || !password) {
            return res.status(400).send({ message: 'bad request' });
        }
        let sql = `select id,username,email,is_verified,role from users where (username = ? or email = ?) and password = ?`;
        mysqldb.query(sql, [usernameOrEmail, usernameOrEmail, hashpass], (error, datauser) => {
            if (error) return res.status(500).send({ message: error });
            if (datauser.length) {
                return res.status(200).send({ ...datauser[0], cart: [] });
            } else {
                return res.status(500).send({ message: "login gagal" })
            }
        })
    }
};