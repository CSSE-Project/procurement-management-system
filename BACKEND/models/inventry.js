const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventry = new Schema({
  storeId: Number,
  storeName: String,
  storeAddress: String,
});

module.exports = mongoose.model("inventry", inventry);
