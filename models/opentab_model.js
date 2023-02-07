const mongoose = require("mongoose");

const openTabSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  time: {
    type: Number,
  },
  open_tab_status: {
    type: Boolean,
  },
});

module.exports = mongoose.model("openTab", openTabSchema);
