const mongoose = require("mongoose");

User = mongoose.model("User", {
  username: String,
  password: String,
  recent: [String],
});

module.exports = User;
