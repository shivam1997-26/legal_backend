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

exports.getAllEnquiryData = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({})  // 🔥 saari enquiries

    if (!enquiries || enquiries.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No enquiries found"
      });
    }

    return res.status(200).json({
      success: true,
      total: enquiries.length,
      data: enquiries
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

