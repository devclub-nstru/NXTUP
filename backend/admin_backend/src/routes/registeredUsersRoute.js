const express = require("express");

const registeredUsersController = require("../controllers/registeredUsersController");

const router = express.Router();

router.get("/", registeredUsersController);

module.exports = router;
