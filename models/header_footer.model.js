const mongoose = require("mongoose");

const headerFooterStatusSchema = new mongoose.Schema({
  status_Id: {
    type: Number,
    required: true,
  },
  header: {
    type: String,
  },
  header_status: {
    type: Boolean,
  },
  header_time_interval: {
    type: Number,
  },
  footer: {
    type: String,
  },
  footer_status: {
    type: Boolean,
  },
  footer_time_interval: {
    type: Number,
  },
});

module.exports = mongoose.model("headerFooterStatus", headerFooterStatusSchema);
