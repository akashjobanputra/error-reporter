const { Errors, errorHandler } = require('../lib');

checkIfTypeArray = (param) => {
    if (!(param instanceof Array)) {
        throw new Errors.InvalidInputError({
            details: {  // for additional details.
                message: "the param type for needs to be Array.",
                param,
                error: {        // sample error from SQL
                    "code": "ER_NO_REFERENCED_ROW_2",
                    "errno": 1452,
                    "sqlMessage": "Cannot add or update a child row: a foreign key constraint fails (`devdb`.`userNotificationToken`, CONSTRAINT `UserNotificationFK` FOREIGN KEY (`userId`) REFERENCES `mstUser` (`id`) ON DELETE CASCADE ON UPDATE CASCADE)",
                    "sqlState": "23000",
                    "index": 0,
                    "sql": "INSERT INTO userNotificationToken (userId, token, deviceName, secondsOffset) VALUES (1, 'sampleToken', 'iPhone X', 19800)"
                  }
            }
        });
    }
    // continue
    console.log(`${param} is an instance of Array.`);
}

try {
    checkIfTypeArray(5);
} catch (error) {
    errorHandler(error);
}