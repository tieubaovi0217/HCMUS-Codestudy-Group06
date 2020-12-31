const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/login').post((req, res) => {
  // not yet handle
  
  // const username = req.body.username;
  // const password = req.body.password

  // console.log(username, password)

  // res.json('User added!')
  // newUser.save()
  //   .then(() => res.json('User added!'))
  //   .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password

  console.log(username, password)
  res.json('User added!')

  const newUser = new User({username, password});
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/profile/:username").get((req, res) => {
  User.find({"username": req.params.username})
  .then((user) => res.json(user))
  .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/profile/update/:username").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  User.find({"username": req.params.username})
  .then((user) => {
    if (password != null)
      user[0].password = password;
    if (email != null)
      user[0].email = email;
    user[0].save()
    .then(() => res.json(user[0]))
    .catch(err => res.status(400).json("Unable to change!"));
  })
  .catch(err => res.status(400).json("Invalid username"));
});

module.exports = router;