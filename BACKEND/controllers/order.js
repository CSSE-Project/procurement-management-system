const Order = require("../models/order");

exports.createOrder = async (req, res) => {
  const {
    name,
    unit,
    nameOfSupplier,
    contactPerson,
    phoneNumber,
    supEmail,
    supAddress,
    quantity = Number(quantity),
    unitPrice = Number(unitPrice),
    sBudget = 0,
    mBudget = 0,
    status = null,
  } = req.body;

  await Order.create({
    name,
    unit,
    nameOfSupplier,
    contactPerson,
    phoneNumber,
    supEmail,
    supAddress,
    quantity,
    unitPrice,
    sBudget,
    mBudget,
    status,
  })
    .then(() => res.status(200).json({ success: true, message: "SUCCESS" }))
    .catch((err) => res.status(500).json({ success: false, message: err }));
};

exports.acceptOrReject = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  await Order.findByIdAndUpdate(id, { status })
    .then(() => res.status(200).json({ success: true, message: "SUCCESS" }))
    .catch((err) => res.status(500).json({ success: false, message: err }));
};

exports.allocatebudget = async (req, res) => {
  const { mBudget = Number(mBudget) } = req.body;
  const { id } = req.params;

  await Order.findByIdAndUpdate(id, { mBudget })
    .then(() => res.status(200).json({ success: true, message: "SUCCESS" }))
    .catch((err) => res.status(500).json({ success: false, message: err }));
};

exports.getAll = async (req, res) => {
  await Order.find()
    .then((orders) => res.status(200).json(orders))
    .catch((err) => res.status(500).json({ success: false, message: err }));
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  await Order.findByIdAndDelete(id)
    .then((order) => res.status(200).json({ message: "Deleted Successfully" }))
    .catch((err) => res.status(500).json({ success: false, message: err }));
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const date = req.body.date;
  await Order.findByIdAndUpdate(id, { date })
    .then((order) => res.status(200).json({ message: "Updated Successfully" }))
    .catch((err) => res.status(500).json({ success: false, message: err }));
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const dStatus = req.body.dStatus;
  await Order.findByIdAndUpdate(id, { dStatus })
    .then((order) => res.status(200).json({ message: "Updated Successfully" }))
    .catch((err) => res.status(500).json({ success: false, message: err }));
};
