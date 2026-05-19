const express = require("express");
const router = express.Router();
const {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteProfileController,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

//routes
//GET USER || GET
router.get("/getUser", authMiddleware, getUserController);
//UPDATE USER
router.put("/updateUser", authMiddleware, updateUserController);
//rest password
router.post("/resetPassword", authMiddleware, resetPasswordController);
//Password update
router.post("/updatePassword", authMiddleware, updatePasswordController);
// delete user
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController);
module.exports = router;
