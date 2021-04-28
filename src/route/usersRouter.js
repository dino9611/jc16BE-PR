const express = require('express')
const router = express.Router()
const { usersController } = require('../controller')
const { getUsers, postUsers, patchUsers, deleteUsers, changePassword } = usersController

router.get('/', getUsers);

router.post('/', postUsers);

router.patch('/:id', patchUsers)

router.patch('/editpass/:id', changePassword)

router.delete('/:id', deleteUsers);


module.exports = router