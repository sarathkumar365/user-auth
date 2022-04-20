// error PRODUCTION

// error DEVELOPMENT
const sendErrorDev = (err, req, res, next) => {
  console.log("DEVELOPMENT ERROR 🚨");
  console.log(err);
  res.status(err.statusCode).json({
    message: err.message,
  });
};

module.exports = (err, req, res, next) => {
  // log error for development purpose
  // console.log(err);
  // 1. CLASSIFY THE ERRROR AS DEVELOPMENT or PRODUCTION

  const env = "dev";

  if (env === "dev") {
    err.statusCode = err.statusCode || 500;
    sendErrorDev(err, req, res, next);
  } else {
    sendErrorProd();
  }

  //   console.log(err);
  //   res.end();
};
