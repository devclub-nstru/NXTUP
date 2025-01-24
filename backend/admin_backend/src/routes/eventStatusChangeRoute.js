const express = require("express");

const { addEvent } = require("../controllers/eventStatusChangeController");


const router = express.Router();

router.post("/", addEvent);

module.exports = router;
