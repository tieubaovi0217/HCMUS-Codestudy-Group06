
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


const usersRouter = require('./routes/users');
const MainPage = require('./routes/mainpage');

const submissionRouter = require('./routes/submission')
//const problemRouter = require('./routes/problem')


//app.use('/', MainPage);
app.use('/users', usersRouter);
app.use('/viewsubmission',submissionRouter);
//app.use('/problemsets',problemRouter);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: err
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});