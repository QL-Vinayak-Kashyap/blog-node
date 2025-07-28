const responder = require("../../utils/responder");
const UserService = require("../../services/UserService");

exports.users = async (request, response, next) => {
    try {
        const {userId} = request.body;
        const users = await UserService.getUserByEmail(userId);
        return responder(response, true, 'SUCCESS', { users }, 200);
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
        return responder(response, true, 'SUCCESS', { user }, 200);
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
        return responder(response, true, 'SUCCESS', { user }, 200);
    } catch (error) {
        console.error('Error fetching user details by token:', error);
        return responder(response, false, 'ERROR', null, 500);
    }
}

// exports.uploadImage = async (request, response, next) => {
//     try {
//         const userId = request.user.id; // Assuming user ID is stored in request.user
//         const image = request.file; // Assuming the image is uploaded as a file

//         if (!image) {
//             return responder(response, false, 'IMAGE_NOT_UPLOADED', null);
//         }

//         // Save the image to the database or file system as needed
//         const savedImage = await UserService.saveUserImage(userId, image);

//         if (!savedImage) {
//             return responder(response, false, 'ERROR_SAVING_IMAGE', null);
//         }

//         return responder(response, true, 'IMAGE_UPLOADED_SUCCESSFULLY', { image: savedImage }, 200);
//     } catch (error) {
//         console.error('Error uploading image:', error);
//         return responder(response, false, 'ERROR_UPLOADING_IMAGE', null);
//     }
// }