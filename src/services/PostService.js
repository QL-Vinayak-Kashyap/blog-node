const Post = require("../Models/Post")

exports.createPost = async (postData)=> {
    return Post.create(postData);
}

exports.getPostById = async (postId) => {
    return Post.findOne({
        where: {
            id: postId
        }
    });
}

exports.getPostsByTopicId = async (topicId) => {
    return Post.findAll({
        where: {
            topic_id: topicId
        }
    });
}

exports.getPostsByUserId = async (userId) => {
    return Post.findAll({
        where: {
            user_id: userId
        }
    });
}

exports.updatePost = async (postId, postData) => {
    return Post.update(postData, {
        where: {
            id: postId
        },
        returning: true
    })
}

exports.deletePost = async (postId) => {
    return Post.destroy({
        where: {
            id: postId
        }
    });
}
