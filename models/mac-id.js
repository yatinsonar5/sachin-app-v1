const mongoose = require("mongoose");

const macUserSchema = new mongoose.Schema({
  macId: {
    type: String,
    required: true,
    unique: true,
  },
  hitCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("macUser", macUserSchema);
