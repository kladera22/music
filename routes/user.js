const express = require('express');
const router = express.Router();
const {
    getUsers,
    postUser,
    deleteUsers,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const reqRecievedLogger = require('../middlewares/reqRecievedLogger');
const {userValidator} = require('../middlewares/utils/validators');

router.route('/')
    .get(reqRecievedLogger, getUsers)
   //.get(()=>console.log('work'))
    .post(reqRecievedLogger, userValidator, postUser)
    .delete(reqRecievedLogger, deleteUsers)

router.route('/:userId')
    .get(reqRecievedLogger, getUser)
    .put(reqRecievedLogger, updateUser)
    .delete(reqRecievedLogger, deleteUser)

module.exports = router;