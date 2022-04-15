const clone = require("nodemon/lib/utils/clone");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");

exports.home = (req, res, next) => {
  res.send(`YOU HAVE REACHER AUTHORIZATION API 😁`);
};

exports.createUser = async (req, res, next) => {
  // // 1. CREATE USER
  User.create({ name: "alwin" }, (err, data) => {
    if (err) {
      // const error = new AppError("user creation failed 😑", 409);
      return next(err);
    }

    res.status(200).json({
      status: "success",
      data,
    });
  });

  // User.create({ name: "sarath" }, (err, data) => {
  //   if (err) {
  //     const error = new AppError();
  //     // console.log(err);
  //     // const error = new Error("failed");
  //     // error.message = "f;";
  //     // error.code = 400;

  //     return next(error);
  //     console.log("here");
  //     // return res.send("error").end();
  //   }
  // });
  // console.log("g");
  // console.log(data);
  // res.send(`USER CREATED`);
};

exports.getAllUsers = async (req, res, next) => {
  // 1. GET USER'S DATA
  try {
    const data = await User.find().clone();
    // if (data) console.log(data);
    res.json({ data });
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = (req, res, next) => {
  res.send(`UPDATE USER`);
};

exports.deleteUser = (req, res, next) => {
  res.send(`DELETE USER`);
};
