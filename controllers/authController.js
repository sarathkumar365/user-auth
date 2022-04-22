const clone = require("nodemon/lib/utils/clone");
const Logger = require("nodemon/lib/utils/log");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.home = (req, res, next) => {
  res.send(`YOU HAVE REACHER AUTHORIZATION API 😁`);
};

exports.createUser = catchAsync(async (req, res, next) => {
  // 1. GET DATA
  // console.log(req.body.password);

  // 2. confirm passsword
  if (req.body.password !== req.body.confirmPassword)
    return next(new AppError("password's does not match 😶", 401));

  // 3. encrypt password
  const password = req.body.password.toString();
  const encryptedPass = await bcrypt.hash(password, saltRounds);
  req.body.password = encryptedPass;

  // 4. CREATE USER
  const data = await User.create(req.body);
  if (data) {
    res.status(200).json({
      status: "success",
      data,
    });
  }
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  // 1. GET USER'S DATA
  const data = await User.find().clone();

  if (data)
    res.status(200).json({
      status: "success",
      data,
      total: data.length,
    });
});

exports.getUser = catchAsync(async (req, res, next) => {
  // 1. GET USER ID
  const userId = req.body.id;

  if (!userId) return next(new AppError("please provide a user ID", 400));

  // 2. GET USER'S DATA
  const data = await User.findById(userId).clone();

  if (data)
    res.status(200).json({
      status: "success",
      data,
      total: data.length,
    });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  // 1. GET USER ID
  const id = req.body.id;
  if (!req.body.id)
    return next(new AppError("please provide a vslid user ID", 400));
  delete req.body.id;

  // 2. MODIFY USER
  const data = await User.updateOne({ _id: id }, req.body);
  const updatedUser = await User.findById(id);
  console.log(updatedUser);

  if (data)
    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  // 1. GET USER ID
  const id = req.body.id;

  if (!id) return next(new AppError("no user id provided!!!! 🙄", 400));

  // 2. DELETE USER
  const data = await User.deleteOne({ _id: id });
  if (data)
    res.status(200).json({
      status: "success",
      data,
    });
});
