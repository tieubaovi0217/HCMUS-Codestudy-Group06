const router = require("express").Router();
const bcrypt = require("bcryptjs");
let User = require("../models/user.model");
const passport = require("passport");
require('./passportConfig')(passport);


router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/login").post((req, res) => {
  // not yet handle
 
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.status(409).send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.status(200).send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res);
});

router.route("/register").post((req, res) => {
  //console.log("here");
  User.findOne({ username: req.body.username }, async (err, doc) => {
    try {
      if (err) throw err;
      if (doc) res.status(409).send("User Already Exists");
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
        });
        await newUser.save();
        res.status(200).send("User Created");
      }
    } catch (err) {
      console.log(err);
    }
  });
});

router.route("/profile").get((req, res) => {
  User.find({ username: "doanphuduc" })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
