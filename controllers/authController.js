const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
// REGISTER
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;
    // validation
    if (!userName || !email || !password || !phone || !address || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fileds ",
      });
    }
    // check user
    const exisiting = await userModel.findOne({ email });
    if (exisiting) {
      return res.status(500).send({
        success: false,
        message: "Email already registered please login",
      });
    }
    //hashing pwd
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);
    //create new user
    const user = await userModel.create({
      userName,
      email,
      password: hashPassword,
      address,
      phone,
      answer,
    });
    res.status(201).send({
      success: true,
      message: "Successfully registered",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register API",
      error,
    });
  }
};
const loginContoller = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide email or password",
      });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Email not Found",
      });
    }
    // check user password | compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(404).send({
        success: false,
        message: "Password Missmatch",
      });
    }
    //token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register API",
      error,
    });
  }
};
module.exports = { registerController, loginContoller };
