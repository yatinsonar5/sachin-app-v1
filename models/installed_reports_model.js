const mongoose = require("mongoose");

const hitCountSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("HitCount", hitCountSchema);
