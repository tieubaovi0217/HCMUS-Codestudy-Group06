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

module.exports = router;