const express = require("express");

const {
  getAllEventToCSVController,
} = require("../controllers/getAllEventToCSVController");

const router = express.Router();

router.post("/", getAllEventToCSVController);

module.exports = router;
