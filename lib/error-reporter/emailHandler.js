var nodemailer = require('nodemailer');
var path = require('path');
var config = require(path.resolve('./', 'config'));
const Errors = require('./errors');

function sendEmail(to, subject, message, callback) {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: config.emailService,
            auth: {
                user: config.emailAccountUserName,
                pass: config.emailAccountPassword
            }
    
        });
    
        var mailOptions = {
            // from: config.fromEmail,
            to: to,
            subject: subject,
            html: message
        };
    
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                let error = new Errors.InternalServerError({
                    severity: Errors.errorLevels.logOnly,
                    details: {
                        message: "Failed sending email",
                        error: err,
                        to, subject, message
                    }
                })
                return reject(error);
            }
            if (callback) {
                return resolve(info);
            }
    
        })
    });
}
exports.sendEmail = sendEmail;
