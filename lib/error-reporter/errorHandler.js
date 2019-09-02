// const logger = require("../logger");
const path = require('path');
const { errorLevels, severityTitles } = require('./constants');
// var { errorLevels, severityTitles } = require(path.resolve(path.dirname(__filename), "./constants"));
const emailHandler = require("./emailHandler");
const config = require(path.resolve(".", "./config"));
const emailTemplate = require("./emailTemplates");
// const pm2 = require("pm2");

const errorHandler = (error, res, next) => {
    console.log(path.resolve(path.dirname(__filename), "./constants"));
    error = addMetaData(error, res);
    if (error.severity == errorLevels.ignore) {
        if (next) {
            return next();
        } else {
            return;
        }
    }

    if (error.severity != errorLevels.silent) {
        console.error(error);
        if (config.NODE_ENV != "DEV") {
            if (error.severity == errorLevels.high) {
                sendErrorMailToAdmin(error);
                sendErrorMailToDev(error);
            } else if (error.severity == errorLevels.critical) {
                sendErrorMailToAdmin(error);
                sendErrorMailToDev(error);
                // restartService();
            } else if (error.severity == errorLevels.devOnly) {
                sendErrorMailToDev(error);
                console.info("DEV ONLY");
            }
        }
    }
    if (res) {
        let message = "Internal Server Error.";
        if (!error.httpStatus) {
            res.status(500).send({ message: message });
        } else {
            res.status(error.httpStatus).send({ message: error.message });
        }
    }
};

const addMetaData = (error, res) => {
    if (res && res.locals.tokenData && error.hasOwnProperty("details")) {
        if (res.locals.tokenData.hasOwnProperty("userId"))
            error.details.attemptedByUserId = res.locals.tokenData.userId;
    }
    if (!error.hasOwnProperty("severity")) {
        error["severity"] = errorLevels.devOnly;
    }
    return error;
};

const errorHandlerMiddleware = (error, req, res, next) => {
    error["apiPath"] = req.path;
    if (typeof error["details"] == "string") {
        error["details"] = { message: error["details"] };
    } else if (!error.hasOwnProperty("details")) {
        error["details"] = {};
    }
    error["details"]["requestBody"] = JSON.parse(JSON.stringify(req.body));
    error["details"]["authToken"] = req.headers.authorization;
    error["details"]["remoteAddress"] = req.connection.remoteAddress;
    error["details"]["reqIp"] = req.ip;
    error["details"]["userAgent"] = req.headers["user-agent"];
    error["details"]["referer"] = req.headers["referer"];
    error["details"]["path"] = req.originalUrl;
    errorHandler(error, res, next);
};

const sendErrorMailToDev = err => {
    let severity = err.severity ? severityTitles[err.severity] : "CRITICAL";
    let template = emailTemplate.devErrorTemplate(err, severity);
    emailHandler
        .sendEmail(
            config.devMailIds,
            `ERROR: ${config.NODE_ENV} ${severity}`,
            template)
        .catch(error => {
            console.error(error);
            errorHandler(error);
        });
};

const sendErrorMailToAdmin = err => {
    let severity = err.severity ? severityTitles[err.severity] : "CRITICAL";
    let template = emailTemplate.adminErrorTemplate(err, severity);
    emailHandler
        .sendEmail(
            config.adminMailIds,
            `ERROR: ${config.NODE_ENV} ${severity}`,
            template
        )
        .catch(error => {
            console.error(error);
            errorHandler(error);
        });
};

/* const restartService = () => {
    pm2.restart("api", err => {
        if (err) {
            console.error(err);
        } else {
            console.info("API RESTARTED!");
        }
    });
}; */

module.exports = {
    errorHandlerMiddleware,
    // restartService,
    errorHandler
};
