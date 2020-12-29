const router = require('express').Router();
let Submission = require('../models/submission.model');

router.route('/').get((req, res) => {
    Submission.find({}).sort({submission_id: -1})
      .then(submission => res.json(submission))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  
router.route('/add').post((req, res) => {

  const submission_id =  req.body.submission_id;
  const user_id = req.body.user_id;
  const problem_id = req.body.problem_id;
  //const time_submitted =  Date.parse(req.body.time_submitted); No tu lay gio hien tai roi khoi chinh
  const code = req.body.code;
  const language = req.body.language;
  const verdict = req.body.verdict;
  const time = Number(req.body.time);
  const memory  = Number(req.body.memory);

  const newSubmission =  new Submission({
      submission_id,user_id,problem_id,language,verdict,time,memory,code
  });

  newSubmission.save()
  .then(() => res.json('Submission added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


  
router.route('/modify').post((req, res) => {

  const submission_id =  req.body.submission_id;
  const user_id = req.body.user_id;
  const problem_id = req.body.problem_id;
  const code = req.body.code;
  const language = req.body.language;
  const verdict = req.body.verdict;
  const time = Number(req.body.time);
  const memory  = Number(req.body.memory);

  const filter = {
      submission_id
  };
  const update = {verdict: verdict, time: time, memory: memory};
  const opts = {new: true};

  Submission.findOneAndUpdate(filter, update, opts)
  .then(() => res.json('Submission modified!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

  
router.route('/last-submission-id').post((req, res) => {
  Submission.find({}).sort({submission_id: -1}).limit(1)
    .then(submission => res.json(submission))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;