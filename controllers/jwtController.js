const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.createToken = async (data) => {
  const jwtToken = await jwt.sign(data, process.env.JWT_SECRET_KEY);
  return jwtToken;
};

exports.authenticate = catchAsync(async (req, res, next) => {
  // 1. CHECK IF HEADERS EXIST
  if (!req.headers.authorization)
    return next(new AppError('You are not logged in, please login', 401));

  const token = req.headers.authorization.split(' ')[1];

  const isValid = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.userId = isValid.id;
  next();
});
