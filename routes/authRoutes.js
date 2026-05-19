const express = require("express");
const {
  registerController,
  loginContoller,
} = require("../controllers/authController");
const router = express.Router();
//routes
//REGISTER || POST
router.post("/register", registerController);
router.post("/login", loginContoller);
module.exports = router;
