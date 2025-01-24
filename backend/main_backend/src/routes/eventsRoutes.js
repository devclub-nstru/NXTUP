const express = require("express");
const fetchEvents = require('../controllers/eventsController')
const router = express.Router();

router.get('/', fetchEvents);
module.exports = router;