const mongoose = require("mongoose");

const TimelineSchema = new mongoose.Schema({
  status: String,
  remark: String,
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const EnquirySchema = new mongoose.Schema({
  trackingId: {
    type: String,
    unique: true
  },
  name: String,
  mobile: String,
  email: String,
  caseType: String,
  description: String,

  currentStatus: {
    type: String,
    default: "Enquiry Submitted"
  },

  timeline: [TimelineSchema],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Enquiry", EnquirySchema);
