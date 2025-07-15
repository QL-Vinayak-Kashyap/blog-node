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