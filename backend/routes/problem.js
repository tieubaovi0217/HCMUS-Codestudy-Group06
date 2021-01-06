const router = require("express").Router();
let Problem = require("../models/problem.model");

router.route("/").get((req, res) => {
  Problem.find({})
    .sort({ problem_id: 1 })
    .then((problem) => res.json(problem))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/viewproblem/:id").get((req, res) => {
  Problem.find({ problem_id: req.params.id })
    .then((problem) => res.json(problem))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const problem_id = req.body.problem_id;
  const problem_name = req.body.problem_name;
  const problem_difficulty = Number(req.body.problem_difficulty);
  const num_solved = req.body.num_solved;
  const time_limit = Number(req.body.time_limit);
  const mem_limit = Number(req.body.mem_limit);
  const description = req.body.description;
  const input_format = req.body.input_format;
  const output_format = req.body.output_format;
  const inputs = req.body.inputs;
  const outputs = req.body.outputs;

  const newProblem = new Problem({
    problem_id,
    problem_name,
    problem_difficulty,
    num_solved,
    time_limit,
    mem_limit,
    description,
    input_format,
    output_format,
    inputs,
    outputs,
  });

  newProblem
    .save()
    .then(() => res.json("Problem added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
