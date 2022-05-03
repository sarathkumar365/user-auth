// const AppError = require('../utils/AppError');

// error PRODUCTION
// const JsonWebTokenError = (err) => {
//   const error = {
//     status: err.status,
//     message: err.message,
//   };

//   return error;
// };

// error DEVELOPMENT
const sendErrorDev = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('DEVELOPMENT ERROR 🚨');
  // eslint-disable-next-line no-console
  console.log(err);
  res.status(err.statusCode).json({
    message: err.message,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  // log error for development purpose
  // console.log(err);
  // 1. CLASSIFY THE ERRROR AS DEVELOPMENT or PRODUCTION

  const env = 'dev';

  if (env === 'dev') {
    err.statusCode = err.statusCode || 500;

    sendErrorDev(err, req, res, next);
  } else {
    // if (err.name === 'JsonWebTokenError') error = JsonWebTokenError(err);
    // eslint-disable-next-line no-undef
    sendErrorProd(req, res, error, next);
  }

  //   console.log(err);
  //   res.end();
};
