exports.makeErrorResponse = (request, response, error) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    return { status: false, code: statusCode, message, data: {} };
}