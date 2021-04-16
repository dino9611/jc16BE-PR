const express = require('express');
const router = express.Router();
const { carControllers } = require('../controllers');
const { getCars, postCars, editCars, deleteCars } = carControllers;

router.get('/', getCars);

router.post('/', postCars);

router.patch('/:id', editCars);

router.delete('/:id', deleteCars);

module.exports = router;
