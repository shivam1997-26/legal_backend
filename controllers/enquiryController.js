const Enquiry = require("../models/Enquiry");
const generateTrackingId = require("../utils/trackingId");

// SUBMIT ENQUIRY
exports.submitEnquiry = async (req, res) => {
  try {
    const trackingId = generateTrackingId();

    const enquiry = new Enquiry({
      ...req.body,
      trackingId,
      timeline: [{
        status: "Enquiry Submitted",
        remark: "Client submitted enquiry"
      }]
    });

    await enquiry.save();

    res.json({
      success: true,
      message: "Enquiry submitted",
      trackingId
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// TRACK ENQUIRY
exports.trackEnquiry = async (req, res) => {
  const enquiry = await Enquiry.findOne({ trackingId: req.params.trackingId });

  if (!enquiry) {
    return res.status(404).json({ message: "Invalid Tracking ID" });
  }

  res.json(enquiry);
};


exports.updateStatus = async (req, res) => {
  const { trackingId, status, remark } = req.body;

  const enquiry = await Enquiry.findOne({ trackingId });
  if (!enquiry) return res.status(404).json({ message: "Not found" });

  enquiry.currentStatus = status;
  enquiry.timeline.push({ status, remark });

  await enquiry.save();

  res.json({ success: true, message: "Status updated" });
};
