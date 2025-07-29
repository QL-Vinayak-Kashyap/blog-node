const Topic = require('../models/Topic'); // Assuming you have a Topic model defined

exports.getTopicsByUserId =async (userId) =>{
    return Topic.findAll({
        where: { user_id: userId }
    });
}

exports.createTopic = async (topicData) => {
    return Topic.create(topicData);
}

exports.getTopicById = async (topicId) => {
    return Topic.findByPk(topicId);
}
    
exports.updateTopic = async (topicId, updateData) => {
    return Topic.update(updateData, {
        where: { id: topicId }
    });
}

exports.deleteTopic = async (topicId) => {
    return Topic.destroy({
        where: { id: topicId }
    });
}