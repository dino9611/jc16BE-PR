'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const Port = 5000;
const { Logger } = require('./src/lib');
const cors = require('cors');

app.use(cors());
app.use(Logger);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const { carsRoutes } = require('./src/routers');
app.use('/cars', carsRoutes);

app.all('*', (req, res) => {
    res.status(404).send('result not found');
});
app.listen(5000, () => console.log(`listen in PORT ${Port}`));
