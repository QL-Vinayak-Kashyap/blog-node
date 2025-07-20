const Resource = require("resources.js");

class RegistrationResponse extends Resource {
  async toArray() {
    return {
      id: this.user.id || '',
      name: this.user.full_name || '',
      role: this.user.role || '',
      email: this.user.email || '',
      createdAt: this.user.createdAt || '',
      updatedAt: this.user.updatedAt || '',
    };
  }
}

module.exports = RegistrationResponse;