const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwtController = require('./jwtController');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const isAdmin = async (userId) => {
  const user = await User.findOne({ _id: userId });
  // console.log(user);
  if (user.admin && user.admin === true) return true;

  return false;
};

exports.createUser = catchAsync(async (req, res, next) => {
  // 1. GET DATA & check if the body includes ADMIN field, if yes REMOVE it.
  if (req.body.admin) delete req.body.admin;
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
  // 1. check whether it'd an ADMIN
  if (!(await isAdmin(req.userId))) {
    return next(
      new AppError(
        "You dont't have access to these kind of information. Please stay back 👮💻",
        401
      )
    );
  }

  // 2. GET USER'S DATA
  const data = await User.find().clone();

  if (data)
    res.status(200).json({
      status: 'success',
      data,
      total: data.length,
    });
});

exports.getUser = catchAsync(async (req, res, next) => {
  // TODO: make this route for only admins

  // 1. GET USER ID
  const userId = req.body.id;

  if (!userId) return next(new AppError('please provide a valid user ID', 400));

  // 2. GET USER'S DATA
  const data = await User.findById(userId).clone();

  // 3. check whether the user exist's
  if (!data) return next(new AppError('No such user exist', 404));

  // 4. check whether the user is an administrator, if yes throw an error
  if (data.admin)
    return next(
      new AppError('you are not authorized to access this details', 404)
    );

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

  // 2. check whether the user exist's
  const user = await User.findById(id).clone();
  if (!user) return next(new AppError('No such user exist', 404));

  // 3. MODIFY USER
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
  const { id } = req.body;
  if (!id) return next(new AppError('no user id provided!!!! 🙄', 400));

  // 2. check whether the user exist's
  const user = await User.findById(id).clone();
  if (!user) return next(new AppError('No such user exist', 404));

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
  const userPassword = req.body.password;

  // 2. GET CORRESPONDING USER DATA
  const existingUserData = await User.findOne({ email: userEmail });
  if (!existingUserData)
    return next(
      new AppError(
        "'Oops, can't find you. Please check your email or password'",
        400
      )
    );

  // 3. VALIDATE USER DATA

  const valid = await bcrypt.compare(userPassword, existingUserData.password);

  if (!valid) return next(new AppError('passwords does not match 🤨', 401));

  // 4. CREATE JWT TOKEN
  const accessToken = await jwtController.createToken({
    user: existingUserData.name,
    id: existingUserData._id,
    password: userPassword,
  });

  // 5. SEND RESPONSE

  const cookieOptions = { sameSite: 'none', secure: true };
  console.log('cookie sending ⛈️');

  res.cookie('accessToken', accessToken, cookieOptions).status(200).json({
    message: 'Logged in',
    accessToken,
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  const cookieOptions = {
    httpOnly: true,
    maxAge: 2000,
  };
  // check if any cookie even exist's

  if (!req.cookie) {
    return next(new AppError('you are not logged in', 401));
  }
  res.cookie('accessToken', '', cookieOptions).status(204).json({
    message: 'Logged out',
  });
});
