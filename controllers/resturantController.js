const resturantModel = require("../models/resturantModel");

// CREATE RESTURANT
const createResturantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    // validation
    if (!title || !coords) {
      return res.status(400).send({
        success: false,
        message: "Please provide title and address",
      });
    }

    const newResturant = new resturantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newResturant.save();

    res.status(201).send({
      success: true,
      message: "Restaurant created successfully",
      resturant: newResturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create restaurant API",
      error,
    });
  }
};
//GET ALL RESTURANT
const getAllResturentController = async (req, res) => {
  try {
    const restaurants = await resturantModel.find({});
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "NO resturant availible",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get restaurant API",
      error,
    });
  }
};
//GET RESTURANT BY ID
const getResturentByIDController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide Resturent Id",
      });
    }
    const resturant = await resturantModel.findById(resturantId);
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "Resturent not found",
      });
    }
    res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get restaurant By ID  API",
      error,
    });
  }
};

//DELETE RESTURANT

const deleteResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide resturent id",
      });
    }
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "your resturant has not  found",
      });
    }

    await resturantModel.findByIdAndDelete(resturantId);
    return res.status(200).send({
      success: true,
      message: "your resturant has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete resturant API",
      error,
    });
  }
};

module.exports = {
  createResturantController,
  getAllResturentController,
  getResturentByIDController,
  deleteResturantController,
};
