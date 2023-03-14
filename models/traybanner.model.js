const mongoose = require("mongoose");

const trayBannerSchema = new mongoose.Schema({
  tray_Id: {
    type: Number,
    required: true,
  },
  header_banner: {
    type: String,
  },
  header_banner_status: {
    type: Boolean,
  },
  time: {
    type: Number,
  },
});

module.exports = mongoose.model("trayBanner", trayBannerSchema);
