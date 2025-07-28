const Resources = require("resources.js")

class GetPostResponse extends Resources {
     toArray() {
        return {
            id: this.id || "",
            title: this.title || "",
            content: this.content || "",
            topicId: this.topic_id || "",
            userId: this.user_id || "",
            images:ImageResponse.collection(this.images) || [], 
            createdAt: this.created_at || "",
            updatedAt: this.updated_at || ""
        };
    }
}

class ImageResponse extends Resources {
    toArray() {
        return {
            id: this.id || "",
            url: this.url || "",
            name: this.name || ""
        };
    }
}


module.exports = GetPostResponse;