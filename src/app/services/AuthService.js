const User = require("../Models/User");

exports.getUserByEmail = async (email) => {
    return await User.findOne({where: {email: email}});
}
