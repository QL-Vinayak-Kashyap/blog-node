const responder = require('../../utils/responder');
const UserService = require('../../services/UserService');
const TopicService = require('../../services/TopicService');
const TopicsResponse = require('../../resources/TopicResponses/TopicsResponse');

exports.getTopicsByUserId = async (request, response, next) => {
    try {
        const userId = request.user.id;

        // first check if the user exists
        const user = await UserService.getUserById(userId);
        if (!user) {
            return responder(response, false, 'USER_NOT_FOUND', null);
        }
        // then fetch topics associated with the user
        const topics = await TopicService.getTopicsByUserId(userId);
        if (!topics) {
            return responder(response, false, 'TOPICS_NOT_FOUND', null);
        }
        return responder(response, true, 'TOPIC_FETCHED_SUCCESSFULLY', TopicsResponse.collection(topics));
    } catch (error) {
        console.error('Error fetching topics:', error);
        return responder(response, false, 'ERROR', null);
    }
 };

exports.createTopic = async (request, response, next) => {
    try {
        const { name } = request.body;
        const userId = request.user.id; // Assuming user ID is stored in request.user

        // Create topic
        const topic = await TopicService.createTopic({name, user_id: userId});
        if (!topic) {
            return responder(response, false, 'ERROR_CREATING_TOPIC', null);
        }
        return responder(response, true, 'TOPIC_CREATED_SUCCESSFULLY');
        
    } catch (error) {
        console.error('Error creating topic:', error);
        return responder(response, false, 'ERROR_CREATING_TOPIC', null);
    }
 };

exports.updateTopic = async (request, response, next) => {
    try {
        const topicId = request.params.id; // Assuming topic ID is passed as a URL parameter
        //check if the topic exists
        const topic = await TopicService.getTopicById(topicId);
        if (!topic) {
            return responder(response, false, 'TOPIC_NOT_FOUND', null);
        }
        const { name } = request.body;

        // Update topic
        const updatedTopic = await TopicService.updateTopic(topicId, {name} );
        if (!updatedTopic) {
            return responder(response, false, 'ERROR_UPDATING_TOPIC', null);
        }
        return responder(response, true, 'TOPIC_UPDATED_SUCCESSFULLY'); 

    } catch (error) {
        console.error('Error updating topic:', error);
        return responder(response, false, 'ERROR_UPDATING_TOPIC', null);
    }
 };

exports.deleteTopic = async (request, response, next) => { 
    try {
        const topicId = request.params.id; // Assuming topic ID is passed as a URL parameter
        // Check if the topic exists
        const topic = await TopicService.getTopicById(topicId);
        if (!topic) {
            return responder(response, false, 'TOPIC_NOT_FOUND', null);
        }
        // Delete topic
        const deleted = await TopicService.deleteTopic(topicId);
        if (!deleted) {
            return responder(response, false, 'ERROR_DELETING_TOPIC', null);
        }
        return responder(response, true, 'TOPIC_DELETED_SUCCESSFULLY', null);
    } catch (error) {
        return responder(response, false, 'ERROR_DELETING_TOPIC', null);
    }
 };