const express = require('express');

const router = express.Router();
const AuthController = require('../controllers/AuthController');

//Authentication and user management routes

router.post('/login', AuthController.login);
router.get('/users',AuthController.users);

module.exports = {router};