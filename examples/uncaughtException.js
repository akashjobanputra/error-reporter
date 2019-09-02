const { Errors, errorHandler } = require('../lib');

const print = (data) => {
  console.log(param);
}

process.on('uncaughtException', function (err) {
  errorHandler(err);
});

print();