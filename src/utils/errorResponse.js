exports.makeErrorResponse = (request, response, error) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    return { status: false, code: statusCode, message, data: {} };
}

exports.invalidEndPoint = (request, response, next) => {
    return response.status(404).json({
        status: false,
        code: 404,
        message: 'Invalid endpoint',
    });
}