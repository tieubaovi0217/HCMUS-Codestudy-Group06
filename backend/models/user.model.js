var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
const { number } = require("prop-types");

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  joined: { type: Date, default: Date.now },
  email: {type: String, default: 'abc@xyz.com'},
  rating: {type: Number, default: 0}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);