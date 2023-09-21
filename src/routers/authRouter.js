const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const User = require("./../models/User.js");

const authRouter = express.Router();

authRouter.route("/signup").post((req, res) => {
  const { username, password } = req.body;
  const user = { username, password };

  async function pushUser() {
    await mongoose.connect(process.env.MONGO_KEY, { dbName: "orbital" });
    console.log("connected to mongo");

    const currUser = await User.findOne({
      username: username,
      password: password,
    });
    if (currUser) {
      console.log("user already exists");
      res.redirect("/auth/login");
    } else {
      results = await User.collection.insertOne(user);
      req.login(
        {
          _id: results.insertedId.toString(),
          username: username,
          password: password,
        },
        () => {
          res.redirect("/profile");
        }
      );
    }
  }
  pushUser();

  // TODO: passport
});

authRouter
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post(
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/auth/login",
    })
  );

module.exports = authRouter;
