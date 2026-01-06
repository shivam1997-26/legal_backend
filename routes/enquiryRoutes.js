const express = require("express");
const router = express.Router();
const controller = require("../controllers/enquiryController");

router.post("/enquiry/submit", controller.submitEnquiry);
router.get("/enquiry/track/:trackingId", controller.trackEnquiry);
router.put("/admin/enquiry/update", controller.updateStatus);

module.exports = router;
