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
router.get('/userByEmail',isAuthenticated, validations.getUserByEmail(), validations.validate, UserController.userByEmail);
router.get("/getUserDetailsById",isAuthenticated, validations.getUserDetailByIdRules(), validations.validate, UserController.getUserDetailsById);
router.get('/getUserDetailsByToken',isAuthenticated, UserController.getUserDetailsByToken);

// Topic related routes

router.get('/topics',isAuthenticated,  TopicController.getTopicsByUserId);
router.post('/create-topic',isAuthenticated, validations.createTopicRules(), validations.validate, isAuthor, TopicController.createTopic);
router.put('/update-topic/:id',isAuthenticated, validations.updateTopicRules(), validations.validate, isAuthor, TopicController.updateTopic);
router.delete('/delete-topic/:id',  isAuthenticated, isAuthor, TopicController.deleteTopic);

// Post related routes

router.post('/create-post',isAuthenticated, validations.createPostRules(), validations.validate , isAuthor, upload.single('post_image') , PostController.createPost);
router.get('/post/:id', isAuthenticated,validations.getPostByIdRules(), validations.validate, PostController.getPostById);
router.get('/postsByTopic/:topicId', isAuthenticated,validations.getPostByTopicRules(), validations.validate, PostController.getPostsByTopicId);
router.get('/postsByUser/:userId', isAuthenticated, isAuthor, validations.getPostByUserRules(), validations.validate, PostController.getPostsByUserId);
router.put('/update-post/:id',isAuthenticated, isAuthor, validations.updatePostRules(), validations.validate, PostController.updatePost);
router.delete('/delete-post/:id', isAuthenticated, isAuthor, validations.deletePostRules(), validations.validate, PostController.deletePost);

// Activity related routes
router.post('/add-activity',isAuthenticated, validations.createActivityRules(), validations.validate, ActivityController.addActivity);

// get activities -> need to discuss
// router.get("/get-activity", isAuthenticated, ActivityController.getActivityByUserId);
router.get('/get-activity-by-post/:postId', isAuthenticated,validations.getActivityRules(), validations.validate, ActivityController.getActivityByPostId);
router.put('/update-activity/:activityId',isAuthenticated, validations.updateActivityRules(), validations.validate, ActivityController.updateActivity);
router.delete('/delete-activity/:activityId', isAuthenticated, ActivityController.deleteActivity); 

module.exports = router;