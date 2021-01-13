var express = require('express');
var router = express.Router();
const cors = require('cors');

const { apiAuthHandler } = require('../middleware/auth');

const Place = require('../controller/api/places');
const User = require('../controller/api/users');

// Handle all the user routes
router.post('/login', cors(), User.login);
router.post('/create-intent', cors(), User.createStripeIntent);

// Handle all the places api routes
router.get('/fetch/places', cors(), apiAuthHandler, Place.index);
router.get('/place/:id/view', cors(), apiAuthHandler, Place.view);
router.post('/place/create', cors(), apiAuthHandler, Place.create);

module.exports = router;