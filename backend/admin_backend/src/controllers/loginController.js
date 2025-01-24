const express = require("express");
const router = express.Router();
const userSchema = require("../models/loginModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const verifyToken = require("../middleware/authMiddleware");

const loginPost = async (req, res) => {
  try {
    // const Email = "lele"
    // const Password = "lele"
    var { Email, Password } = req.body;
    const user = await userSchema.findOne({
      Email: Email,
    });

    // Password = await bcrypt.hash(Password, await bcrypt.genSalt(14))
    // console.log(Password, user.Password)

    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SALT);

    // res.status(201).json({ status: true, message: "SignedIn successfully" })
    res
      .status(201)
      .json({ status: true, message: "SignedIn successfully", token });
  } catch (err) {
    res.status(err).json({
      status: false,
      message: err,
    });
  }
};

module.exports = loginPost;
