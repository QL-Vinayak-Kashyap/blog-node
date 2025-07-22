const Resources = require("resources.js");

class UpdatePostResponse extends Resources {
    async toArray() {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            topicId: this.topic_id,
            userId: this.user_id,
            createdAt: this.created_at,
            updatedAt: this.updated_at
        };
    }
}

module.exports = UpdatePostResponse;