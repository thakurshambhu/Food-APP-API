const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

const getUserController = async (req, res) => {
  try {
    //fins user
    const user = await userModel.findById(req.user.id);
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "User get data successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in user API",
      error, // send decoded user info
    });
  }
};
const updateUserController = async (req, res) => {
  try {
    //fins user
    const user = await userModel.findById(req.user.id);
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // get values from body
    const { userName, phone, address } = req.body;

    // update fields
    if (userName) user.userName = userName;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    // save user
    await user.save();

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      user, // optional: send updated user
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in user update API",
      error, // send decoded user info
    });
  }
};
//reset password
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;

    // Validate fields
    if (!email || !newPassword || !answer) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    // Find user
    const user = await userModel.findOne({ email, answer });
    console.log(user, "============");
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not found or invalid answer",
      });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in reset password API",
      error,
    });
  }
};

//update password

const updatePasswordController = async (req, res) => {
  try {
    // find user by id from token
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // get old & new password from body
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Please provide old and new password",
      });
    }

    // compare old password with stored password
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid old password",
      });
    }

    // hash new password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // save password
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update password API",
      error,
    });
  }
};
// Delete profile account
const deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "your account has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete profile API",
      error,
    });
  }
};
module.exports = {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteProfileController,
};
