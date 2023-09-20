const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const authRouter = express.Router();

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

authRouter.route("/signup").post((req, res) => {
  const { username, password } = req.body;
  const user = { username, password };

  async function pushUser() {
    await mongoose.connect(process.env.MONGO_KEY);
    console.log("connected to mongo");

    User.collection.insertOne(user);
  }
  pushUser();

  res.end("user added");
  // TODO: passport
});

authRouter
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {
    const { username, password } = req.body;

    // async function findUser() {
    //   await mongoose.connect(process.env.MONGO_KEY);
    //   console.log("connected to mongo");

    //   const checkUser = await User.find({
    //     username: req.body.username,
    //     password: req.body.password,
    //   });
    //   if (checkUser) {
    //     console.log("User found!");
    //   } else {
    //     console.log("Error: No user");
    //   }
    // }
    // findUser();
    // TODO: passport
  });

module.exports = authRouter;
