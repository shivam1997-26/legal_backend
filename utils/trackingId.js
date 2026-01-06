module.exports = function generateTrackingId() {
  return "LAW" + Date.now().toString().slice(-6) + Math.floor(100 + Math.random() * 900);
};
