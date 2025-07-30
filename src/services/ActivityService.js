const Activity = require("../models/Activity")

exports.createActivity = (ActivityData)=>{
    return Activity.create(ActivityData);
}

// exports.getActivitiesByUserId = (userId) => {
//     return Activity.findAll({
//         where: { user_id: userId },
//         order: [['createdAt', 'DESC']]
//     });
// }

exports.getActivitiesByPostId = (postId) => {
    return Activity.findAll({
        where: { post_id: postId },
        // order: [['createdAt', 'DESC']]
    });
}

exports.updateActivity = (activityId, updatedData) => {
    return Activity.update(updatedData, {
        where: { id: activityId }
    });
}

exports.deleteActivity = (activityId) => {
    return Activity.destroy({
        where: { id: activityId }
    });
}