const mongoose = require("mongoose");

const defaultSettingSchema = new mongoose.Schema({
  urlId: {
    type: Number,
  },
  url: {
    type: String,
  },
  status: {
    type: Boolean,
  },
});

module.exports = mongoose.model("defaultSetting", defaultSettingSchema);
