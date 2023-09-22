const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const User = require("./../models/User.js");

const profileRouter = express.Router();

profileRouter.route("/").get((req, res) => {
  if (req.user) {
    res.render("profile", {
      username: req.user.username,
      recent_images: "test",
    });
  } else {
    res.redirect("/auth/login");
  }
});

module.exports = profileRouter;
