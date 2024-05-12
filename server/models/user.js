const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  reputation: {
    type: Number,
    default: 0,
  },
  timeStamp: {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model("User", UserSchema);
