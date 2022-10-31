const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Rules = new Schema({
  Date: Date,
  rule: String,
});

module.exports = mongoose.model("rules", Rules);
