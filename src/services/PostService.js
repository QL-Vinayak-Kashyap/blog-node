const Image = require("../models/Image");
const Post = require("../models/Post")

exports.createPost = async (postData)=> {
    return Post.create(postData);
}

exports.getPostById = async (postId) => {
    return Post.findOne({
        where: {
            id: postId
        },
        include: [{
            model: Image,
            as: 'images' // Assuming you have an association set up for images
        }]
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

exports.savePostImage = async (postId, image) => {
    return Image.create({
        post_id: postId,
        url: image.path, // Assuming image.path contains the path to the uploaded image
        name: image.originalname // Extracting the file name from the path
    })    
}