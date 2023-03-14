const mongoose = require("mongoose");

const versionControlSchema = new mongoose.Schema({
  vcId: {
    type: Number,
  },
  download_url: {
    type: String,
  },
  current_version: {
    type: String,
  },
  status: {
    type: Boolean,
  },
});

module.exports = mongoose.model("versionControl", versionControlSchema);
