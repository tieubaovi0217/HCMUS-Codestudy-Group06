const router = require("express").Router();
const bcrypt = require("bcryptjs");
let User = require("../models/user.model");
const passport = require("passport");
require("./passportConfig")(passport);

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/login").post((req, res) => {
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
  User.findOne({$or: [
        {email: req.body.email},
        {username: req.body.username}
    ]}, async (err, doc) => {
    try {
      if (err) throw err;
      if (doc) res.status(409).send("User Already Exists");
      if (!doc) {
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email,
        });
        await newUser.save();
        res.status(200).send("User Created");
      }
    } catch (err) {
      console.log(err);
    }
  });
});

router.route("/profile/:username").get((req, res) => {
  User.find({ username: req.params.username })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/profile/update/:username").post((req, res) => {
  if (req.body.newPassword === "") {
    req.body.newPassword = req.body.oldPassword;
    req.body.CnewPassword = req.body.oldPassword;
  }
  User.findOne({ username: req.body.username }, async (err, user) => {
    try {
      if (err) throw err;
      if (user) {
        const newPassword = await bcrypt.hash(req.body.newPassword, 10);
        const email = req.body.email;

        bcrypt.compare(req.body.oldPassword, user.password, (err, result) => {
          if (result) {
            if (req.body.newPassword.length < 6)
              res.json("New password should contain at least 5 character");
            else if (req.body.newPassword != req.body.CnewPassword)
              res.json("Confirmation mismatched");
            else {
              user.email = email;
              user.password = newPassword;
              user.save();
              res.json("OK");
            }
          } else res.json("Invalid current password");
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
});

module.exports = router;
