const mongoose = require("mongoose");

const tryTextAddSchema = new mongoose.Schema({
  textId: {
    type: Number,
  },
  time_interval: {
    type: Number,
  },
  time_to_stay: {
    type: Number,
  },
  status: {
    type: Boolean,
  },
  title: {
    type: String,
  },
  discription: {
    type: String,
  },
  target_url: {
    type: String,
  },
});

module.exports = mongoose.model("tryTextAdd", tryTextAddSchema);
