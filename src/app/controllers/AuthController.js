const responder = require('../../utils/responder');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthService = require('../services/AuthService');
const LoginResponse = require('../resources/LoginResponce');

exports.login = async (request, response, next) => {
    try {
        // login logic
        const { email, password } = request.body;
        const user = await AuthService.getUserByEmail(email);
        if (!user) {
            return responder(response, false, 'USER_NOT_FOUND', null);
        }
        console.log('Login request received:', password, user.dataValues.password);
        const normalizedHash = user.dataValues.password.replace(/^\$2y\$/, '$2a$');
        const isPasswordValid = await bcrypt.compare(password, normalizedHash);

        console.log('Password validation result:', isPasswordValid);
        if (!isPasswordValid) {
            return responder(response, false, 'INVALID_CREDS', null);
        }
        const token = await jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET);

        return responder(response, true, 'SUCCESS',await new LoginResponse({ user, token }).exec());
    } catch (error) {
        console.error('Login error:', error);
        return responder(response, false, 'ERROR', null);
    }
}

exports.users = async (request, response, next) => {
    try {
        const users = await AuthService.getUserByEmail("vinayak@gmail.com");
        return responder(response, true, 'SUCCESS', { users }, 200);
    } catch (error) {
        return responder(response, false, 'ERROR', null, 500);
    }
}

exports.getUserDetailsById = async (request, response, next) => {
    try {
        const { userId } = request.body;
        const user = await AuthService.getUserById(userId);
        if (!user) {
            return responder(response, false, 'USER_NOT_FOUND', null);
        }
        return responder(response, true, 'SUCCESS', { user }, 200);
    } catch (error) {
        console.error('Error fetching user details:', error);
        return responder(response, false, 'ERROR', null, 500);
    }
}

exports.getUserDetailsByToken = async (request, response, next) => {
    try {
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) {
            return responder(response, false, 'ERROR', null, 401);
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await AuthService.getUserById(decoded.id);
        if (!user) {
            return responder(response, false, 'USER_NOT_FOUND', null);
        }
        return responder(response, true, 'SUCCESS', { user }, 200);
    } catch (error) {
        console.error('Error fetching user details by token:', error);
        return responder(response, false, 'ERROR', null, 500);
    }
}