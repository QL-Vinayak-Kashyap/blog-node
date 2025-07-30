const Resource = require("resources.js");

class TopicsResponse extends Resource {
   toArray() {
    return {
        id: this.id || '',
        name: this.name || '',
        userId: this.user_id || ''
    };
  }
}

module.exports = TopicsResponse;

