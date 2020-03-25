const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceCenterSchema = new Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserDetails",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    serviceLocation: {
      type: String,
      required: true
    },
    // maxBookingDays: {
    //   type: Number,
    //   required: true
    // },
    bookingLimit: {
      type: Number,
      required: true
    },
    bookingCount: {
      type: Number,
      default: 0
    },
    contact: Number
  },
  {
    timestamps: true
  }
);

module.exports = ServiceCenter = mongoose.model(
  "ServiceCenter",
  serviceCenterSchema
);
