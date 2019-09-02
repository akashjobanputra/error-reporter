const errorHandler = require('./error-reporter/errorHandler');

module.exports = {
    Errors : require('./error-reporter/errors'),
    errorHandler : errorHandler.errorHandler,
    errorHandlerMiddleware: errorHandler.errorHandlerMiddleware,
}