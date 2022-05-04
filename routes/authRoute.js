const express = require('express');
const authController = require('../controllers/authController');
const jwtController = require('../controllers/jwtController');

const router = express.Router();

// BASIC REST FUNCTIONALITY

router
  .route('/')
  .get(jwtController.authenticate, authController.getAllUsers)
  .post(authController.createUser)
  .patch(jwtController.authenticate, authController.updateUser)
  .delete(jwtController.authenticate, authController.deleteUser);

// LOGIN & LOGOUT
router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);

// router.route('/authenticate').get(jwtController.authenticate);

// FOR USER
router.get('/user', authController.getUser);

module.exports = router;
