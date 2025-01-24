const express = require("express");

const addFormCont = require("../controllers/addFormController");

const router = express.Router();

router.post("/", addFormCont);
// router.post('/', (req,res)=>{res.send("no")})

module.exports = router;
