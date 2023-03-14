const mongoose = require("mongoose");

const installExeSchema = new mongoose.Schema({
  exe_Id: {
    type: Number,
    required: true,
  },
  exe_path: {
    type: String,
  },
  status: {
    type: Boolean,
  },
  time: {
    type: Number,
  },
});

module.exports = mongoose.model("installExe", installExeSchema);
