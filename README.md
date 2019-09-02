# error-reporter

This module provides different errors types extended from native Error class to provide more context and to easily manage severity of the error.
All the errors are declared in the [errors.js](https://github.com/akashjobanputra/error-reporter/blob/dev/lib/error-reporter/errors.js) file. As the errors are extended from `Error` class, the inherited classes can be thrown or passed through reject() as well.

Every error accepts 4 parameters `(message, details, httpStatus, severity)` out of which 3 of them `(message, httpStatus, severity)` has default values based on the error's context.

Example of how to use the array:
```javascript
// if you're doing a database opertaion and to log and report the error
db.query(query, params, (error, results) => {
  if (error) {
    let err = new Errors.QueryExecutionError({
      details: {
        message: "Failed to fetch the user records", // context
        params,  // query parameters that were passed, for issue investigation
        error    // Adding the actual error that was passed by the db.query callback.
      }
    });
    return reject(err);
  }
  // some more code here
 }
```
I know this seems like an increase in effort of typing, but I generally prepare snippets for such redundant things. So the cursor jumps only to those parts where your input is needed, like the `details` object. All the other things like err declaration and passing it as parameter can be accommodated via code snippets.

This module is used in other personal / professional projects where on an occurance of error an email is sent to the configured email addresse(s).

![Sample Error Email](https://i.imgur.com/XImOjoH.png)
