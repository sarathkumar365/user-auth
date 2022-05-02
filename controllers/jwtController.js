const jwt = require('jsonwebtoken');

exports.createToken = async (data) => {
  const jwtToken = await jwt.sign(data, process.env.JWT_SECRET_KEY);
  console.log(jwtToken);
  return jwtToken;
};
