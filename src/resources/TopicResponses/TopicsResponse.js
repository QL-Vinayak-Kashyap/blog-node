const Resource = require("resources.js");

class TopicsResponse extends Resource {
  async toArray() {
    return {
        id: this.id || '',
        name: this.name || '',
        userId: this.user_id || ''
    };
  }

  // static async collection(dataArray) {
  //   return Promise.all(dataArray.map(async (item) => {
  //     const topicInstance = new TopicsResponse(item);
  //     return await topicInstance.toArray();
  //   }));
  // }
}

module.exports = TopicsResponse;

