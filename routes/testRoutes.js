const express = require("express");
const { testControllers } = require("../controllers/testControllers");
// router object
const router = express.Router();
// routes GET | POST | DELETE |
router.get("/test-user", testControllers);
module.exports = router;
