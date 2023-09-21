const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const User = require("./../models/User.js");

const profileRouter = express.Router();

profileRouter.route("/").get((req, res) => {
  res.render("profile");
});

module.exports = profileRouter;