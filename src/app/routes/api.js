const express = require('express');

const router = express.Router();
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const TopicController = require('../controllers/TopicController');
const validations = require('../middleware/validations');
const { isAuthenticated } = require('../middleware/isAuthenticated');

//Authentication and user management routes

router.post('/register', validations.registrationRules,validations.validate, AuthController.register); // Assuming there's a register method in AuthController
router.post('/login',validations.loginRules, validations.validate, AuthController.login);
router.delete("/deleteUser",isAuthenticated, AuthController.deleteUser); // Assuming there's a deleteUser method in AuthController

router.get('/users',isAuthenticated , UserController.users);
router.get("/getUserDetailsById",isAuthenticated ,  UserController.getUserDetailsById);
router.get('/getUserDetailsByToken',isAuthenticated, UserController.getUserDetailsByToken);

// Topic related routes

router.get('/topics/:userId', isAuthenticated, TopicController.getTopicsByUserId);
router.post('/create-topic', isAuthenticated, TopicController.createTopic);
router.put('/update-topic/:id', isAuthenticated, TopicController.updateTopic);
router.delete('/delete-topic/:id', isAuthenticated, TopicController.deleteTopic);

module.exports = {router};