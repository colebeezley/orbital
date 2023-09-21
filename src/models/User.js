const mongoose = require("mongoose");

User = mongoose.model("User", {
  username: String,
  password: String,
});

module.exports = User;
