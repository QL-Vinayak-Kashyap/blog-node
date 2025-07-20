const Resource = require('resources.js')

class LoginResponse extends Resource {
  async toArray () {
    return {
      id: this.user.id || '',
      name: this.user.full_name || '',
      role: this.user.role || '',
      tokens: {access: this.token},
    }
  }
}

module.exports = LoginResponse