const passport = require("passport");
const { Strategy } = require("passport-local");
const mongoose = require("mongoose");
const User = require("./../../models/User.js");

module.exports = function localStrategy() {
  passport.use(
    new Strategy(
      {
        username: "mypass",
        password: "mypass",
      },
      (username, password, done) => {
        const url = process.env.MONGO_KEY;
        async function validateUser() {
          try {
            await mongoose.connect(process.env.MONGO_KEY, {
              dbName: "orbital",
            });
            console.log("connected to mongo");

            const user = await User.findOne({ username });

            if (user && user.password === password) {
              done(null, user);
            } else {
              console.log("login incorret");
              done(null, false);
            }
          } catch (err) {
            console.log("error connecting");
            done(err, false);
          }
        }
        validateUser();
      }
    )
  );
};
