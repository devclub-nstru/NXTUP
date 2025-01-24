const express = require("express");
const fetchClubs = require("../controllers/clubController");
const router = express.Router();


router.get("/", fetchClubs);

module.exports = router;
