const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema({
  name: String,
  unit: String,
  quantity: Number,
  unitPrice: Number,
  nameOfSupplier: String,
  contactPerson: String,
  phoneNumber: String,
  supEmail: String,
  supAddress: String,
  sBudget: Number,
  mBudget: Number,
  status: String,
});

module.exports = mongoose.model("order", Order);
