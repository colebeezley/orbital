const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const authRouter = express.Router();

const User = mongoose.model("User", {
  username: String,
  password: String,
});

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
      User.collection.insertOne(user);
      res.end("user added");
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
  .post((req, res) => {
    const { username, password } = req.body;
    let user;

    async function findUser() {
      await mongoose.connect(process.env.MONGO_KEY, { dbName: "orbital" });
      console.log("connected to mongo");

      const currUser = await User.findOne({
        username: username,
        password: password,
      });
      if (currUser) {
        res.end("user exists");
      } else {
        res.end("no user");
      }
    }
    findUser();
    // TODO: passport
  });

module.exports = authRouter;
