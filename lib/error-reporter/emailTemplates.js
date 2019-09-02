
const fs = require('fs');
// const config = require('../config');
const config = require('../../config');
const path = require('path');

const adminTemplatePath = path.resolve(path.dirname(__filename), '../emailTemplates/adminError.html');
const devTemplatePath = path.resolve(path.dirname(__filename), '../emailTemplates/devError.html');

exports.adminErrorTemplate = (err, severity) => {
    let template = fs.readFileSync(adminTemplatePath, 'utf8').toString();
    // let severity = err.severity ? severityTitle[err.severity] : "CRITICAL";
    template = template
        .replace("$ENV", config.NODE_ENV.toUpperCase())
        .replace("$SEVERITY", severity)
        .replace("$errorName", err.name)
        .replace("$errorMessage", err.message)
        .replace("$details", err.details ? JSON.stringify(err.details) : 'Not an application error!');
    return template;
};

exports.devErrorTemplate = (err, severity) => {
    let template = fs.readFileSync(devTemplatePath, 'utf8').toString();
    template = template
        .replace("$ENV", config.NODE_ENV.toUpperCase())
        .replace("$SEVERITY", severity)
        .replace("$errorName", err.name)
        .replace("$errorMessage", err.message)
        .replace("$details", err.details ? JSON.stringify(err.details) : 'Not an application error!')
        .replace("$stackTrace", err.stack);
    return template;
}
