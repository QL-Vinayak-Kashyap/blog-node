const Topic = require('../Models/Topic'); // Assuming you have a Topic model defined

exports.getTopicsByUserId =async (userId) =>{
    return Topic.findAll({
        where: { user_id: userId }
    });
}

exports.createTopic = async (topicData) => {
    console.log('Creating topic with data:', topicData);
    return Topic.create(topicData);
}

exports.getTopicById = async (topicId) => {
    const topic = await Topic.findByPk(3);
    if (!topic) {
        console.log('Topic not found for ID:', topicId);
        return null;
    }
    return topic;   
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