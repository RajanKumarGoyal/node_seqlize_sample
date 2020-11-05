var express = require('express');
var router = express.Router();

const User = require('../controller/users');
const Home = require('../controller/home');

// Handle all the home page routes
router.get('/', Home.index);

// Handle all the users related routes
router.get('/users/', User.index);
router.get('/users/:id/view', User.view);

router.get ('/users/register', User.register).post('/users/register', User.register);
router.get('/users/login', User.login).post('/users/login', User.login);

module.exports = router;