const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userDetailsSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 4
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 5
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 7
    },
    avatar: String,
    location: {
      type: String,
      trim: true,
      minlength: 5
    },
    role: {
      type: Number,
      required: true
    },
    assignedServiceCenter: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = users = mongoose.model("UserDetails", userDetailsSchema);
