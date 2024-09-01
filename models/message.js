const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  title: { type: String },
  message: { type: String },
});

const messagemodel = mongoose.model("message_info", messageSchema);
module.exports = messagemodel;
