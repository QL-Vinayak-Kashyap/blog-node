const Resources = require("resources.js");

class GetUserResponse extends Resources {
    async toArray() {
        return {
            id: this.id || '',
            name: this.full_name || '',
            email: this.email || '',
            role: this.role || '',
        };
    }
}

module.exports = GetUserResponse;