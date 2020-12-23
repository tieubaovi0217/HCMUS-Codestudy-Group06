const router = require('express').Router();
let Submission = require('../models/submission.model');

router.route('/').get((req, res) => {
    Submission.find()
      .then(submission => res.json(submission))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  
router.route('/add').post((req, res) => {

    const submission_id =  req.body.submission_id;
    const user_id = req.body.user_id;
    const problem_id = req.body.problem_id;
    //const time_submitted =  Date.parse(req.body.time_submitted);
    const language = req.body.language;
    const verdict = req.body.verdict;
    const time = Number(req.body.time);
    const memory  = Number(req.body.memory);

    const newSubmission =  new Submission({
        submission_id,user_id,problem_id,language,verdict,time,memory
    });

    newSubmission.save()
    .then(() => res.json('Submission added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });

  module.exports = router;