const mongoose = require("mongoose");

const macUserIdSchema = new mongoose.Schema({
  macId: {
    type: String,
  },
  count:{
    type: Number
  }
});

module.exports = mongoose.model("macUserId", macUserIdSchema);