const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  createResturantController,
  getAllResturentController,
  getResturentByIDController,
  deleteResturantController,
} = require("../controllers/resturantController");

//routes
//Create Resturant || POST
router.post("/create", authMiddleware, createResturantController);
//GET ALL RESTURENT
router.get("/getAll", getAllResturentController);
//GET RESTURANT BY ID
router.get("/get/:id", getResturentByIDController);
//DELETE RESTURANT || DELETE
router.delete("/delete/:id", authMiddleware, deleteResturantController);
module.exports = router;
