const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  mobile: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
