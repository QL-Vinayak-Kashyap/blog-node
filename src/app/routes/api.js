const express = require('express');

const router = express.Router();
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const TopicController = require('../controllers/TopicController');
const PostController = require('../controllers/PostController');
const ActivityController = require('../controllers/ActivityController');
const validations = require('../middleware/validations');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const multer  = require('multer');
const { isAuthor } = require('../middleware/isAuthor');
const upload = multer({ dest: 'uploads/' });

//Authentication and user management routes

router.post('/register', validations.registrationRules(),validations.validate, AuthController.register); // Assuming there's a register method in AuthController
router.post('/login',validations.loginRules(), validations.validate, AuthController.login);
router.delete("/deleteUser",isAuthenticated, AuthController.deleteUser); // Assuming there's a deleteUser method in AuthController
router.get('/users',isAuthenticated , UserController.users);
router.get("/getUserDetailsById",isAuthenticated ,  UserController.getUserDetailsById);
router.get('/getUserDetailsByToken',isAuthenticated, UserController.getUserDetailsByToken);

// Topic related routes

router.get('/topics/:userId', isAuthenticated, TopicController.getTopicsByUserId);
router.post('/create-topic', isAuthenticated, isAuthor, TopicController.createTopic);
router.put('/update-topic/:id', isAuthenticated, isAuthor, TopicController.updateTopic);
router.delete('/delete-topic/:id', isAuthenticated, isAuthor, TopicController.deleteTopic);

// Post related routes

router.post('/create-post', isAuthenticated, isAuthor, upload.single('postImage') , PostController.createPost);
router.get('/post/:id', isAuthenticated, PostController.getPostById);
router.get('/postsByTopic/:topicId', isAuthenticated, PostController.getPostsByTopicId);
router.get('/postsByUser/:userId', isAuthenticated, isAuthor, PostController.getPostsByUserId);
router.put('/update-post/:id', isAuthenticated, isAuthor, PostController.updatePost);
router.delete('/delete-post/:id', isAuthenticated, isAuthor,  PostController.deletePost);

//image upload routes
// router.post('/upload-image', isAuthenticated, upload.single('avatar'), UserController.uploadImage);

// Activity related routes
router.post('/add-activity', isAuthenticated, ActivityController.addActivity);

// get activities -> need to discuss 
// router.get("/get-activity", isAuthenticated, ActivityController.getActivityByUserId); 
router.get('/get-activity-by-post/:postId', isAuthenticated, ActivityController.getActivityByPostId);
router.put('/update-activity/:activity_id', isAuthenticated, ActivityController.updateActivity);
router.delete('/delete-activity/:activity_id', isAuthenticated, ActivityController.deleteActivity); 

module.exports = {router};