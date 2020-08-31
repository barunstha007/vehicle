const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserDetails",
      required: true,
    },
    serviceCenter_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceCenter",
    },
    vote: {
      type: String,
    },
    message: {
      type: String,
    },
    posted: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Feedback = mongoose.model("Feedback", feedbackSchema);
