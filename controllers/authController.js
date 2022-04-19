const clone = require("nodemon/lib/utils/clone");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.home = (req, res, next) => {
  res.send(`YOU HAVE REACHER AUTHORIZATION API 😁`);
};

exports.createUser = catchAsync(async (req, res, next) => {
  // // 1. CREATE USER
  const data = await User.create({ name: "akhil" });
  if (data) {
    console.log(data);
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

exports.updateUser = catchAsync(async (req, res, next) => {
  // 1. GET USER ID

  // 2. MODIFY USER
  const data = await User.updateOne({ name: "a" }, { name: "thomson" });

  if (data)
    res.status(200).json({
      status: "success",
      data,
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  // 1. GET USER ID

  // 2. DELETE USER
  const data = await User.deleteOne({ name: "akhil" });
  if (data)
    res.status(200).json({
      status: "success",
      data,
    });
});
