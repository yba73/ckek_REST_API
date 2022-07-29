const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number,

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", UserSchema);
