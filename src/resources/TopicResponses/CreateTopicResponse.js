const Resource =require('resources.js');

class CreateTopicResponse extends Resource {
  async toArray() {
    return {
      id: this.id || '',
      name: this.name || '',
      userId: this.user_id || ''
    };
  }
}

module.exports = CreateTopicResponse;