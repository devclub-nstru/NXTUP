const express = require("express");
const postSubmit = require('../controllers/submitcontroller')
const router = express.Router();

router.post('/', postSubmit);
module.exports = router;