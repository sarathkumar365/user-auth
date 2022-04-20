const authController = require("../controllers/authController");

const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(authController.getAllUsers)
  .post(authController.createUser)
  .patch(authController.updateUser)
  .delete(authController.deleteUser);

// router.get("/", authController.home);
// router.post("/", authController.createUser);
// router.get("/", authController.getAllUsers);
// router.patch("/", authController.updateUser);
// router.delete("/:id", authController.deleteUser);

router.get("/user", authController.getUser);

module.exports = router;
