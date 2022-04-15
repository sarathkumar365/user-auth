const authController = require("../controllers/authController");

const express = require("express");
const router = express.Router();

// router.get("/", authController.home);
router.post("/", authController.createUser);
router.get("/", authController.getAllUsers);
router.put("/", authController.updateUser);
router.delete("/", authController.deleteUser);

module.exports = router;
