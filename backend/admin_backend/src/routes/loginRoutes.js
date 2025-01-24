const express = require("express");

const loginPost = require("../controllers/loginController")

const router = express.Router()

router.post('/', loginPost)
// router.post('/', (req,res)=>{res.send("no")})

module.exports = router