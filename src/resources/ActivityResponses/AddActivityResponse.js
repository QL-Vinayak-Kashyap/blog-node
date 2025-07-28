const Resources = require('resources.js');

class AddActivityResponse extends Resources {
    toArray() {
        return {
            id: this.id,
            like: this.like,
            comment: this.comment,
            userId: this.user_id,
            postId: this.post_id,
            activityType: this.activityType,
            createdAt: this.created_at,
            updatedAt: this.updated_at,
        };
    }
}

module.exports = AddActivityResponse;