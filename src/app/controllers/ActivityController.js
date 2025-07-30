const responder = require("../../utils/responder");
const ActivityService = require('../../services/ActivityService');
const AddActivityResponse = require("../../resources/ActivityResponses/AddActivityResponse");

exports.addActivity = async (req, res, next) => {
    try {
        // what is user sent both like and comment in the same request?
        
        const activity = await ActivityService.createActivity(req.body);
        if (!activity) {
            return responder(res, 400, 'FAILED TO CREATE ACTIVITY');
        }
        return responder(res, 201, 'ACTIVITY SAVED SUCCESSFULLY',await new AddActivityResponse(activity));
    } catch (error) {
        console.error("Error creating activity:", error);
        return responder(res, 500, 'INTERNAL SERVER ERROR');
    }
}

// exports.getActivityByUserId = async (req, res, next) => {
//     try {
//         const userId = req.query.userId;
//         if (!userId) {
//             return responder(res, 400, 'USRE ID IS REQUIRED');
//         }

//         const activities = await ActivityService.getActivitiesByUserId(userId);
//         if (!activities || activities.length === 0) {
//             return responder(res, 404, 'NO ACTIVITIES FOUND FOR THIS USER');
//         }
//         return responder(res, 200, 'ACTIVTIES FETCHED SUCCESSFULLY', activities);
//     } catch (error) {
//         console.error("Error retrieving activities:", error);
//         return responder(res, 500, 'INTERNAL SERVER ERROR');
//     }
// }

exports.getActivityByPostId = async (req, res, next) => {
    try {
        const postId = req.params.postId; // Assuming post ID is passed as a URL parameter

        const activities = await ActivityService.getActivitiesByPostId(postId);
        if (!activities || activities.length === 0) {
            return responder(res, 404, 'NO ACTIVITIES FOUND FOR THIS POST');
        }
        return responder(res, 200, 'ACTIVITIES FETCHED SUCCESSFULLY', AddActivityResponse.collection(activities));
    } catch (error) {
        console.error("Error retrieving activities by post ID:", error);
        return responder(res, 500, 'INTERNAL SERVER ERROR');
    }
}

exports.updateActivity = async (req, res, next) => {
    try {
        const activityId = req.params.activityId;
        const updatedData = req.body;
        
        if(updatedData.activityType === 'LIKE') {
         const deletedActivity = await ActivityService.deleteActivity(activityId);
             if (!deletedActivity) {
                 return responder(res, 404, 'ACTIVITY NOT FOUND');
             }
             // If the activity is a like, we delete it instead of updating
             // This is because we don't want to update the like activity, we just want to toggle it
             // If the user likes again, we create a new like activity
             // If the user unlikes, we delete the like activity
             // This way we can keep track of the likes and unlikes
             return responder(res, 200, 'LIKE ACTIVITY DELETED SUCCESSFULLY');
        }
        const updatedActivity = await ActivityService.updateActivity(activityId, updatedData);
        if (!updatedActivity) {
            return responder(res, 404, 'ACTIVITY NOT FOUND');
        }
        return responder(res, 200, 'ACTIVITY UPDATED SUCCESSFULLY', await new AddActivityResponse(updatedActivity));
    } catch (error) {
        console.error("Error updating activity:", error);
        return responder(res, 500, 'INTERNAL SERVER ERROR');
    }
}

exports.deleteActivity = async (req, res, next) => {
    try {
        const activityId = req.params.activityId;

        if (!activityId) {
            return responder(res, 400, 'ACTIVITY ID IS REQUIRED');
        }
        const deletedActivity = await ActivityService.deleteActivity(activityId);
        if (!deletedActivity) {
            return responder(res, 404, 'ACTIVITY NOT FOUND');
        }
        return responder(res, 200, 'ACTIVITY DELETED SUCCESSFULLY');
    } catch (error) {
        console.error("Error deleting activity:", error);
        return responder(res, 500, 'INTERNAL SERVER ERROR');
    }
}