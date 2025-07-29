const User = require("../models/User");

exports.registerUser = async (userData) => {
    return await User.create(userData);
}

exports.deleteUser = async (userId) => {
    // WE WILL UPDATE THE USER TO SOFT DELETE INSTEAD OF HARD DELETE

    return await User.update({ is_deleted: 1 }, {
        where: { id: userId }
    });

    // return await User.destroy({ where: { id: userId } });
}