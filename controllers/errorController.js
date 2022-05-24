const res = require('express/lib/response');
const { log } = require('npmlog');
const AppError = require('../utils/AppError');

// ERROR PRODUCTION
const sendErrorProd = (err, res) => {
  console.log('inside prod function');

  res.status(err.statusCode).json({
    status: 'failed',
    message: err.message,
  });
};

const operationalErrors = (err, res) => {
  const message = err.message;

  res.status(err.statusCode).json({
    status: 'failed',
    message: err.message,
  });
};

const dupKeyError = (err, res) => {
  // const message = `This name already exist. Please try again with another name 😥`;
  let msg;
  Object.keys(err.keyPattern).includes('email')
    ? (msg = `This email already exist. Please try again with another EMAIL 😥`)
    : (msg = `This name already exist. Please try again with another name 😥`);

  // SEND RESPONSE
  const response = new AppError(msg, 400);
  res.status(response.statusCode).json({
    status: 'failed',
    message: response.message,
  });
};

const castError = (err, res) => {
  const msg = `Invalid user id, Please check again 🤕`;
  const response = new AppError(msg, 401);
  res.status(response.statusCode).json({
    status: 'failed',
    message: response.message,
  });
};

const ValidationError = (err, res, next) => {
  console.log('inside validation');
  // console.log(Object.keys(err.errors));

  const msg = `Invalid input for ${Object.keys(err.errors)} `;
  const response = new AppError(msg, 400);

  // return next(new AppError(msg, 400));

  res.status(response.statusCode).json({
    status: 'failed',
    message: response.message,
  });
};

const SyntaxError = (err, res) => {
  console.log('hai');

  // TODO: this occurs when there is an unexpected character in the user input.

  // FIX LATER

  const msg = `Invalid input, Please check the details you provided... 😕 `;
  const response = new AppError(msg, 400);

  res.status(response.statusCode).json({
    status: 'failed',
    message: response.message,
  });
};

const JWTTokenExpiredError = (res) => {
  const msg = `Oops. Time is up. PLEASE LOGIN AGAIN... 🔴🔴🔴 `;
  const response = new AppError(msg, 400);

  res.status(response.statusCode).json({
    status: 'failed',
    message: response.message,
  });
};

const JsonWebTokenError = (res) => {
  const msg = `HAHA. Don't play with me 🦊🦊  `;
  const response = new AppError(msg, 400);

  res.status(response.statusCode).json({
    status: 'failed',
    message: response.message,
  });
};

// error DEVELOPMENT
const sendErrorDev = (err, req, res) => {
  // eslint-disable-next-line no-console
  console.log('DEVELOPMENT ERROR 🚨');
  // eslint-disable-next-line no-console
  console.log(err);
  res.status(err.statusCode).json({
    status: 'error',
    message: err.message,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  // 1. CLASSIFY THE ERRROR AS DEVELOPMENT or PRODUCTION

  if (process.env.ENV === 'dev') {
    err.statusCode = err.statusCode || 500;
    sendErrorDev(err, req, res, next);
  } else {
    console.log('production error 🛳️');
    console.log(err);

    // OPERATIONAL ERROR's
    if (err.isOperational) return operationalErrors(err, res);

    // Duplicate NAME or EMAIL
    if (err.code === 11000) return dupKeyError(err, res);

    // ERROR IN ID's
    if (err.name === 'CastError') return castError(err, res);

    // ERROR WITH INPUT FIELD'S
    if (err.name === 'ValidationError') return ValidationError(err, res, next);

    // SYNTAX ERROR
    if (err.name === 'SyntaxError') return SyntaxError(err, res);

    // JWT Token expire error
    if (err.name === 'TokenExpiredError') return JWTTokenExpiredError(res);

    // JsonWebTokenError
    if (err.name === 'JsonWebTokenError') return JsonWebTokenError(res);

    // UNKNOWN ERROR'S
    sendErrorProd(err, res);
  }
};
