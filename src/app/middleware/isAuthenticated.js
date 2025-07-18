const responder = require('../../utils/responder');

exports.isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return responder(res, false, 'TOKEN_NOT_FOUND', null);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return responder(res, false, 'INVALID_TOKEN', null);
        }
        req.user = decoded; // Attach user info to request object
        next();
    });
}