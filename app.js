const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoute = require('./routes/authRoute');
const errorController = require('./controllers/errorController');

const app = express();

const corsOptions = {
  origin: true,
  Credentials: true,
};

app.use(cors(corsOptions));

app.use(morgan('dev'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// test middleware

app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(req.path);

  next();
});

app.use('/auth', authRoute);

app.use(errorController);

// app.use((err, req, res, next) => {
//   const errorCode = err.code || 500;
//   const message = err.message || "failed";

//   res.status(errorCode).json({ message });
// });

module.exports = app;
