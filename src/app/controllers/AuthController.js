const responder = require('../../utils/responder');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthService = require('../services/AuthService');
const LoginResponse = require('../resources/LoginResponce');

exports.login = async (request, response, next)=>{
    try {
        // login logic
        const {email, password} =request.body;
        const user = await AuthService.getUserByEmail(email);
        if(!user) {
            return responder(response, false, 'USER_NOT_FOUND', null, 404);
        }
        console.log('Login request received:', password, user.dataValues.password);
        const isPasswordValid = await bcrypt.compare(password, user.dataValues.password);
        console.log('Password validation result:', isPasswordValid);
        if(!isPasswordValid) {
            return responder(response, false, 'INVALID_CREDS', null, 401);
        }
        const token = await jwt.sign({ id: user.id, email: user.email, role: user.role },process.env.JWT_SECRET);

        return responder(response, true, 'SUCCESS', new LoginResponse({user, token}).exec(), 200);
    } catch (error) {
        console.error('Login error:', error);
        return responder(response, false, 'ERROR', null, 500);
    }
}

exports.users = async (request, response, next)=>{
    try {
        const users = await AuthService.getUserByEmail("vinayak@gmail.com");
        return responder(response, true, 'SUCCESS', {users}, 200);
    } catch (error) {
        return responder(response, false, 'ERROR', null, 500);
    }
}