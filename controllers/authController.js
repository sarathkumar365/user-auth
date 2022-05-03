const bcrypt = require('bcrypt');

// const clone = require('nodemon/lib/utils/clone');
// const Logger = require('nodemon/lib/utils/log');
// const { log } = require('npmlog');
const User = require('../models/userModel');
const jwtController = require('./jwtController');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const saltRounds = 10;

exports.home = (req, res, next) => {
  res.send(`YOU HAVE REACHER AUTHORIZATION API 😁`);
};

exports.createUser = catchAsync(async (req, res, next) => {
  // 1. GET DATA
  // console.log(req.body);
  const userData = req.body;

  // join first & last name's and delete individual names , if they exist.

  if (userData.firstName) {
    userData.name = `${req.body.firstName} ${req.body.lastName}`;
    delete userData.firstName;
    delete userData.lastName;
  }
  // 2. confirm passsword
  if (userData.password !== userData.confirmPassword)
    return next(new AppError("password's does not match 😶", 401));

  // 3. encrypt password
  const password = userData.password.toString();
  const encryptedPass = await bcrypt.hash(password, saltRounds);
  userData.password = encryptedPass;
  delete userData.confirmPassword;
  // console.log(userData);

  // 4. CREATE USER
  const data = await User.create(userData);
  if (data) {
    res.status(200).json({
      status: 'success',
      data,
    });
  }
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  // console.log('api call');
  // 1. GET USER'S DATA
  const data = await User.find().clone();

  if (data)
    res.status(200).json({
      status: 'success',
      data,
      total: data.length,
    });
});

exports.getUser = catchAsync(async (req, res, next) => {
  // 1. GET USER ID
  const userId = req.body.id;

  if (!userId) return next(new AppError('please provide a user ID', 400));

  // 2. GET USER'S DATA
  const data = await User.findById(userId).clone();

  if (data)
    res.status(200).json({
      status: 'success',
      data,
      total: data.length,
    });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  // 1. GET USER ID
  const userData = req.body;
  const { id } = userData;
  if (!userData.id)
    return next(new AppError('please provide a valid user ID', 400));
  delete userData.id;

  // 2. MODIFY USER
  const data = await User.updateOne({ _id: id }, userData);
  const updatedUser = await User.findById(id);
  // console.log(updatedUser);

  if (data)
    res.status(200).json({
      status: 'success',
      data: updatedUser,
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  // 1. GET USER ID
  const userData = req.body;
  const { id } = userData;

  if (!id) return next(new AppError('no user id provided!!!! 🙄', 400));

  // 2. DELETE USER
  const data = await User.deleteOne({ _id: id });
  if (data)
    res.status(200).json({
      status: 'success',
      data,
    });
});

exports.login = catchAsync(async (req, res, next) => {
  // 1. GET USER DATA
  const userEmail = req.body.email;
  const userPassword = req.body.password.toString();

  // 2. GET CORRESPONDING USER DATA
  const existingUserData = await User.find({ userEmail });

  // 3. VALIDATE USER DATA

  const valid = await bcrypt.compare(
    userPassword,
    existingUserData[0].password
  );

  if (!valid) return next(new AppError('passwords does not match 🤨', 401));

  // 4. CREATE JWT TOKEN
  const accessToken = await jwtController.createToken({
    user: existingUserData[0].name,
    id: existingUserData[0]._id,
    password: userPassword,
  });

  // 5. SEND RESPONSE
  res.cookie('accessToken', accessToken).status(200).json({
    message: 'Logged in',
    accessToken,
  });
});
