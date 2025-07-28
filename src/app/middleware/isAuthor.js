const responder = require('../../utils/responder');

exports.isAuthor = (req, res, next) => {
    const { user } = req;
    if (user) {
        if (user.role === 'AUTHOR') {
            next();
        } else {
            return responder(res, 403, 'FORBIDDEN: ONLY AUTHORS OR ADMINS CAN ACCESS THIS RESOURCE');
        }
    } else {
        return responder(res, 401, 'UNAUTHORIZED: PLEASE LOGIN FIRST');
    }
}