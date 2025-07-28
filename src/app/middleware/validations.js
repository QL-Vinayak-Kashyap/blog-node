const { body, validationResult } = require('express-validator');

exports.registrationRules = () => [
    body('full_name').not().isEmpty().isLength({ min: 3 }),
    body('email').not().isEmpty().isEmail(),
    body('password').not().isEmpty().isLength({ min: 6 }),
    body("role").not().isEmpty().isIn(['AUTHOR', 'VIEWER']),
]

exports.loginRules = () => [
    body('email').not().isEmpty().isEmail(),
    body('password').not().isEmpty().isLength({ min: 6 }),
]

exports.deleteUserRules = () => [
    body('userId').not().isEmpty().isNumeric(),
]

exports.getUserByEmail = () => [
    body('email').not().isEmpty().isEmail(),
]

exports.getUserDetailByIdRules = () => [
    body('userId').not().isEmpty().isNumeric(),
]

exports.getTopicsByUserIdRules = () => [
    body('userId').not().isEmpty().isNumeric(),
]

exports.createTopicRules = () => [
    body('name').not().isEmpty().isLength({ min: 3 }),
]

exports.updateTopicRules = () => [
    body('id').not().isEmpty().isNumeric(),
    body('name').not().isEmpty().isLength({ min: 3 }),
]

exports.createPostRules = () => [
    body('title').not().isEmpty().isLength({ min: 3 }),
    body('content').not().isEmpty(),
    body('user_id').not().isEmpty().isNumeric(),
    body('topic_id').not().isEmpty().isNumeric(),
    body('postImage').optional().isString(), // Assuming postImage is a string path or URL
]

exports.updatePostRules = () => [
    body('id').not().isEmpty().isNumeric(),
    body('title').not().isEmpty().isLength({ min: 3 }),
    body('content').not().isEmpty(),
    body('user_id').not().isEmpty().isNumeric(),
    body('topic_id').not().isEmpty().isNumeric(),
    body('postImage').optional().isString(), // Assuming postImage is a string path or URL
]

exports.createActivityRules = () => [
    body('user_id').not().isEmpty().isNumeric(),
    body('post_id').not().isEmpty().isNumeric(),
    body('activityType').not().isEmpty().isIn(['LIKE', 'COMMENT']),
    body('like').optional().isString(), // Assuming content is optional for comments or shares
    body('comment').optional().isString(), // Assuming content is optional for comments
]

exports.updateActivityRules = () => [
    body('activity_id').not().isEmpty().isNumeric(),
    body('user_id').not().isEmpty().isNumeric(),
    body('post_id').not().isEmpty().isNumeric(),
    body('activityType').not().isEmpty().isIn(['LIKE', 'COMMENT']),
    body('like').optional().isString(), // Assuming content is optional for comments or shares
    body('comment').optional().isString(), // Assuming content is optional for comments
]

exports.validate = (req, _res, next) => {
    try {
        const errors = validationResult(req);
        console.log('Validation errors:', errors.array());
    if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
    }
    next();
    } catch (error) {
        
    }
}