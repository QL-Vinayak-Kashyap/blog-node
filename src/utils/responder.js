const responses = require('../config/responses');
module.exports = (response, status, messageCode, data, httpCode=200)=>{
    response.status(httpCode).json({
        status,
        statusCode: messageCode,
        message: responses[messageCode] || 'No message found',
        data
    });
}   