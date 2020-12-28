var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
const { number } = require("prop-types");

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  joined: { type: Date, default: Date.now },
  email: String,
  rating: Number,
  status: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);