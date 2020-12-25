const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    res.send('I AM THE MAIN PAGE');
});

module.exports = router;