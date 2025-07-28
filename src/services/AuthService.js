const User = require("../models/User");

exports.registerUser = async (userData) => {
    return await User.create(userData);
}

exports.deleteUser = async (userId) => {
    return await User.destroy({ where: { id: userId } });
}