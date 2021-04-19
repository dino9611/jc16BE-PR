'use strict';
const express = require('express');
const app = express();
const PORT = 5000
const bodyParser = require('body-parser');
const { logger, show } = require('./src/lib');
const cors = require('cors')
require('dotenv').config()
console.log(__dirname);
app.use(cors())
app.use(logger);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', async (req, res) => {
    try {
        const html = await show("./src/content/index.html")
        res.status(200).send(html)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

const { usersRoutes, authRoutes } = require('./src/route')

app.use('/users', usersRoutes);
app.use('/auth', authRoutes);


app.all("*", (req, res) => {
    res.status(404).send("resource not found");
});

app.listen(PORT, () => console.log('listen in PORT ' + PORT));