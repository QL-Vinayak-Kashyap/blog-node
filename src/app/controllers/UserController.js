const responder = require("../../utils/responder");
const UserService = require("../../services/UserService");
const GetUserResponse = require("../../resources/AuthResponses/GetUserResponse");

exports.userByEmail = async (request, response, next) => {
    try {
        const { email} = request.body;
        const user = await UserService.getUserByEmail(email);
        return responder(response, true, 'SUCCESS', await new GetUserResponse(user).exec(), 200);
    } catch (error) {
        return responder(response, false, 'ERROR', null, 500);
    }
}

exports.getUserDetailsById = async (request, response, next) => {
    try {
        const { userId } = request.body;
        const user = await UserService.getUserById(userId);
        if (!user) {
            return responder(response, false, 'USER_NOT_FOUND', null);
        }
        return responder(response, true, 'SUCCESS',await new GetUserResponse(user).exec() , 200);
    } catch (error) {
        console.error('Error fetching user details:', error);
        return responder(response, false, 'ERROR', null, 500);
    }
}

exports.getUserDetailsByToken = async (request, response, next) => {
    try {
        const user = await UserService.getUserById(request.user.id);
        if (!user) {
            return responder(response, false, 'USER_NOT_FOUND', null);
        }
        return responder(response, true, 'SUCCESS', await new GetUserResponse(user).exec(), 200);
    } catch (error) {
        console.error('Error fetching user details by token:', error);
        return responder(response, false, 'ERROR', null, 500);
    }
}