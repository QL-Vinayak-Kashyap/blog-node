const User = require("../models/User");

exports.getUserByEmail = async (email) => {
    return await User.findOne({where: {email: email}});
}

exports.getUserById = async (userId) => {
    return await User.findOne({where: {id: userId}});
}

// exports.savePostImage = async (userId, image) => {
//     // Assuming you have a method to save the image and return its path or URL
//     // This is a placeholder implementation
//     const user = await User.findByPk(userId);
//     if (!user) {
//         throw new Error('User not found');
//     }
    
//     // Here you would typically save the image to a file system or cloud storage
//     // and update the user's profile with the image URL.
//     user.image = image.path; // Assuming 'image.path' contains the path to the uploaded image
//     await user.save();
    
//     return user.image;
// }