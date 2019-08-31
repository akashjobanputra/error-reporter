const { Errors } = require('../lib');

checkIfTypeArray = (param) => {
    if (!(param instanceof Array)) {
        throw new Errors.InvalidInputError({
            details: {  // for additional details.
                message: "the param type for needs to be Array.",
                param
            }
        });
    } else {
        // continue
        console.log(`${param} is an instance of Array.`);
    }
}

try {
    checkIfTypeArray(5);
} catch (error) {
    console.error(error);   // call error handler instead.
}