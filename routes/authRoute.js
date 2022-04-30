const authController = require("../controllers/authController");

const express = require("express");
const router = express.Router();

// BASIC REST FUNCTIONALITY

router
  .route("/")
  .get(authController.getAllUsers)
  .post(authController.createUser)
  .patch(authController.updateUser)
  .delete(authController.deleteUser);

// LOGIN & LOGOUT
router.route("/login").post(authController.login);

// FOR USER
router.get("/user", authController.getUser);

module.exports = router;
