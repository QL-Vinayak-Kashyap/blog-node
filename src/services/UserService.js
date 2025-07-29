const User = require("../models/User");

exports.getUserByEmail = async (email) => {
    return await User.findOne({where: {email: email}});
}

exports.getUserById = async (userId) => {
    return await User.findOne({where: {id: userId}});
}
