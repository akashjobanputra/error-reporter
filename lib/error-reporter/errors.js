"use strict";
const { errorLevels, HttpStatus } = require("./constants");
const errorMsg = require('./errorMessages');

class ExtendableError extends Error {
    constructor({
        message,
        details,
        severity,
        httpStatus = HttpStatus.InternalServerError
    }) {
        if (new.target === ExtendableError)
            throw new TypeError(
                'Abstract class "ExtendableError" cannot be instantiated directly.'
            );
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.details = details || "No details provided";
        this.severity = severity;
        this.httpStatus = httpStatus;
        Error.captureStackTrace(this, this.contructor);
    }
}

class NotImplementedError extends ExtendableError {
    constructor({
        message = errorMsg.notImplemented,
        details,
        httpStatus = HttpStatus.NotFound404,
        severity = errorLevels.logOnly,
    } = {}) {
        super({ message, details, httpStatus, severity });
    }
}

class UserNotFoundError extends ExtendableError {
    // 403
    constructor({
        message = errorMsg.userNotFound,
        details,
        httpStatus = HttpStatus.Forbidden,
        severity = errorLevels.silent,
    } = {}) {
        super({ message, details, httpStatus, severity });
    }
}

class NoDataFound extends ExtendableError {
    constructor({
        message = errorMsg.noDataFound,
        details,
        httpStatus = HttpStatus.noDataFound,
        severity = errorLevels.silent,
    } = {}) {
        super({ message, details, httpStatus, severity });
    }
}

class DataInconsistencyError extends ExtendableError {
    constructor({
        message = errorMsg.inconsistentData,
        details,
        httpStatus = HttpStatus.InternalServerError,
        severity = errorLevels.high,
    } = {}) {
        super({ message, details, httpStatus, severity });
    }
}

class ForbiddenError extends ExtendableError {
    constructor({
        message = errorMsg.accessForbidden,
        details,
        httpStatus = HttpStatus.Forbidden,
        severity = errorLevels.devOnly,
    } = {}) {
        super({ message, details, httpStatus, severity });
    }
}

class QueryExecutionError extends ExtendableError {
    constructor({
        message = errorMsg.queryFailed,
        details,
        httpStatus = HttpStatus.dbError,
        severity = errorLevels.devOnly,
    } = {}) {
        super({ message, details, httpStatus, severity });
    }
}

class InvalidInputError extends ExtendableError {
    constructor({
        message = errorMsg.invalidInput,
        details,
        httpStatus = HttpStatus.BadRequest,
        severity = errorLevels.devOnly,
    } = {}) {
        super({ message, details, httpStatus, severity });
    }
}

class AuthenticationFailed extends ExtendableError {
    constructor({
        message = errorMsg.authFailed,
        details,
        httpStatus = HttpStatus.Forbidden,
        severity = errorLevels.silent,
    } = {}) {
        super({ message, details, httpStatus, severity });
    }
}

class UserNotActivated extends ExtendableError {
    constructor({
        message = errorMsg.accountDeactivated,
        details,
        httpStatus = HttpStatus.Forbidden,
        severity = errorLevels.silent,
    } = {}) {
        super({ message, details, httpStatus, severity });
    }
}

class InvalidToken extends ExtendableError {
    constructor({
        message = errorMsg.invalidToken,
        details,
        httpStatus = HttpStatus.Forbidden,
        severity = errorLevels.silent,
    } = {}) {
        super({ message, details, httpStatus, severity });
    }
}

class FailedToSendEmail extends ExtendableError {
    constructor({
        message = errorMsg.emailFailed,
        details,
        httpStatus = HttpStatus.InternalServerError,
        severity = errorLevels.devOnly,
    } = {}) {
        super({ message, details, httpStatus, severity });
    }
}

class S3Error extends ExtendableError {
    constructor({
        message = errorMsg.serverError,
        details,
        httpStatus = HttpStatus.InternalServerError,
        severity = errorLevels.high,
    } = {}) {
        super({ message, details, httpStatus, severity });
    }
}

class PDFGenerationError extends ExtendableError {
    constructor({
        message = errorMsg.pdfGenerationError,
        details,
        httpStatus = HttpStatus.InternalServerError,
        severity = errorLevels.high,
    } = {}) {
        super({ message, details, httpStatus, severity });
    }
}

class InternalServerError extends ExtendableError {
    constructor({
        message = errorMsg.serverError,
        details,
        httpStatus = HttpStatus.InternalServerError,
        severity = errorLevels.high,
    } = {}) {
        super({ message, details, httpStatus, severity });
    }
}

class FirebaseNotificationError extends ExtendableError {
    constructor({
        message = errorMsg.notificationFailed,
        details,
        httpStatus = HttpStatus.InternalServerError,
        severity = errorLevels.silent,
    } = {}) {
        super({ message, details, httpStatus, severity });
    }
}

module.exports = {
    NotImplementedError,
    UserNotFoundError,
    DataInconsistencyError,
    ForbiddenError,
    UserNotActivated,
    QueryExecutionError,
    InvalidInputError,
    AuthenticationFailed,
    InvalidToken,
    FailedToSendEmail,
    NoDataFound,
    S3Error,
    PDFGenerationError,
    InternalServerError,
    FirebaseNotificationError,
};
