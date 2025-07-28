const PostService = require('../../services/PostService');
const responder = require('../../utils/responder');
const CreatePostResponse = require('../../resources/PostResponses/CreatePostResponse');
const GetPostResponse = require('../../resources/PostResponses/GetPostResponse');
const UpdatePostResponse = require('../../resources/PostResponses/UpdatePostResponse');

exports.createPost = async (request, response, next) => {
    try {
        const { title, content, topic_id } = request.body;
        const userId = request.user.id; // Assuming user ID is stored in request.user

        // Create post
        const post = await PostService.createPost({ title, content, topic_id, user_id: userId });
        if (!post) {
            return responder(response, false, 'ERROR_CREATING_POST', null);
        }

        // now save the image if it exists
        if (request.file) {
           const image = await PostService.savePostImage(post.id, request.file);
           if(!image) {
                return responder(response, false, 'ERROR_SAVING_POST_IMAGE', null);
            }
        }

        return responder(response, true, 'POST_CREATED_SUCCESSFULLY', await new CreatePostResponse(post).exec());

    } catch (error) {
        console.error('Error creating post:', error);
        return responder(response, false, 'ERROR_CREATING_POST', null);
    }
}

exports.getPostById = async (request, response, next) => {
    try {
        const postId = request.params.id; // Assuming post ID is passed as a URL parameter
        // Check if the post exists
        const post = await PostService.getPostById(postId);
        if (!post) {
            return responder(response, false, 'POST_NOT_FOUND', null);
        }
        return responder(response, true, 'POST_FOUND', await new GetPostResponse(post).exec());
    } catch (error) {
        console.error('Error fetching post:', error);
        return responder(response, false, 'ERROR_FETCHING_POST', null);
    }
}

exports.getPostsByTopicId = async (request, response, next) => {
    try {
        const topicId = request.params.topicId; // Assuming topic ID is passed as a URL parameter
        // Fetch posts associated with the topic
        const posts = await PostService.getPostsByTopicId(topicId);
        if (!posts || posts.length === 0) {
            return responder(response, false, 'POSTS_NOT_FOUND', null);
        }

        return responder(response, true, 'POSTS_BY_TOPIC_FETCHED_SUCCESSFULLY', GetPostResponse.collection(posts));
    } catch (error) {
        console.error('Error fetching posts by topic:', error);
        return responder(response, false, 'ERROR_FETCHING_POSTS_BY_TOPIC', null);
    }
}

exports.getPostsByUserId = async (request, response, next) => {
    try {
        const userId = request.params.userId; // Assuming user ID is passed as a URL parameter
        // Fetch posts associated with the user
        const posts = await PostService.getPostsByUserId(userId);

        if (!posts || !posts.length) return responder(response, false, 'POSTS_NOT_FOUND', []);


        return responder(response, true, 'POSTS_BY_USER_FETCHED_SUCCESSFULLY', GetPostResponse.collection(posts));
    } catch (error) {
        console.error('Error fetching posts by user:', error);
        return responder(response, false, 'ERROR_FETCHING_POSTS_BY_USER', null);
    }
}

exports.updatePost = async (request, response, next) => {
    try {
        const postId = request.params.id; // Assuming post ID is passed as a URL parameter
        // Check if the post exists
        const post = await PostService.getPostById(postId);
        const userId = request.user.id;
        if (!post) {
            return responder(response, false, 'POST_NOT_FOUND', null);
        }
        const { title, content } = request.body;

        // Update post
        const updatedPost = await PostService.updatePost(postId, { title, content, user_id: userId, topic_id: post.topic_id });

        if (!updatedPost) {
            return responder(response, false, 'ERROR_UPDATING_POST', null);
        }
        return responder(response, true, 'POST_UPDATED_SUCCESSFULLY',await new UpdatePostResponse(updatedPost).exec());

    } catch (error) {
        console.error('Error updating post:', error);
        return responder(response, false, 'ERROR_UPDATING_POST', null);
    }
}

exports.deletePost = async (request, response, next) => {
    try {
        const postId = request.params.id; // Assuming post ID is passed as a URL parameter
        // Check if the post exists
        const post = await PostService.getPostById(postId);
        if (!post) {
            return responder(response, false, 'POST_NOT_FOUND', null);
        }
        // Delete post
        const deleted = await PostService.deletePost(postId);
        if (!deleted) {
            return responder(response, false, 'ERROR_DELETING_POST', null);
        }
        return responder(response, true, 'POST_DELETED_SUCCESSFULLY', null);
    } catch (error) {
        console.error('Error deleting post:', error);
        return responder(response, false, 'ERROR_DELETING_POST', null);
    }
}
