const Resource = require("resources.js");

class UpdateTopicResponse extends Resource {
    async toArray() {
        return {
            id: this.id,
            name: this.name,
            userId: this.user_id,
            updatedAt: this.updated
        };
    }
}

module.exports = UpdateTopicResponse;