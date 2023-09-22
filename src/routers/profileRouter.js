const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const User = require("./../models/User.js");

const profileRouter = express.Router();

profileRouter.route("/").get((req, res) => {
  if (req.user) {
    async function getRecentPhotos() {
      await mongoose.connect(process.env.MONGO_KEY, { dbName: "orbital" });
      console.log("connected to mongo");

      const currUser = await User.findOne({
        username: req.user.username,
      });

      res.render("profile", {
        username: currUser.username,
        recent_images: currUser.recent.slice(5),
      });
    }
    getRecentPhotos();
  } else {
    res.redirect("/auth/login");
  }
});

module.exports = profileRouter;
