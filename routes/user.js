const express = require('express');
const router = express.Router();
const {
    getUsers,
    postUser,
    deleteUsers,
    getUser,
    updateUser,
    deleteUser,
    login
} = require('../controllers/userController');

const reqRecievedLogger = require('../middlewares/reqRecievedLogger');
const {
    userValidator,
    adminValidator} = require('../middlewares/utils/validators');
const protectedRoute = require('../middlewares/auth');

router.route('/')
    .get(reqRecievedLogger, adminValidator, getUsers)
    .post(reqRecievedLogger,  userValidator, postUser)
    .delete(reqRecievedLogger, protectedRoute, adminValidator, deleteUsers)

router.route('/login')
    .post(reqRecievedLogger, login)

router.route('/:userId')
    .get(reqRecievedLogger, getUser)
    .put(reqRecievedLogger, protectedRoute, updateUser)
    .delete(reqRecievedLogger, protectedRoute, deleteUser)

module.exports = router;