const responder = require('../../utils/responder');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthService = require('../../services/AuthService');
const UserService = require('../../services/UserService');
const LoginResponse = require('../../resources/AuthResponses/LoginResponce');
const RegistrationResponse = require('../../resources/AuthResponses/RegistrationResponse');

exports.login = async (request, response, next) => {
    try {
        // login logic
        const { email, password } = request.body;
        const user = await UserService.getUserByEmail(email);
        if (!user) {
            return responder(response, false, 'USER_NOT_FOUND', null);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

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

exports.register = async (request, response, next) => {
    try {
        const {full_name, email, password, role} = request.body;
        const isEmailExists = await UserService.getUserByEmail(email);
        if(isEmailExists){
            return responder(response,false, 'EMAIL_EXISTS', null);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await AuthService.registerUser({
            full_name,email, password: hashedPassword, role});
        if (!user) {
            return responder(response, false, 'ERROR_REGISTERING_USER', null);
        }
        return responder(response, true, 'USER_REGISTERED_SUCCESSFULLY',await new RegistrationResponse({user}).exec());
    } catch (error){
        console.error('Registration error:', error);
        return responder(response, false, 'ERROR_REGISTERING_USER', null, 500);
    }
}

exports.deleteUser = async (request, response, next) => {
    try {
        const userId = request.user.id; // Assuming user ID is stored in request.user
        const user = await AuthService.getUserById(userId);
        if (!user) {
            return responder(response, false, 'USER_NOT_FOUND', null);
        }
        await AuthService.deleteUser(userId);
        return responder(response, true, 'USER_DELETED_SUCCESSFULLY', null);
    } catch (error) {
        console.error('Delete user error:', error);
        return responder(response, false, 'ERROR', null, 500);
    }
} 