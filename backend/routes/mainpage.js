const router = require("express").Router();

router.route("/").get((req, res) => {
  res.send("I AM THE MAIN PAGE");
});

module.exports = router;
