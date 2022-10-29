const Rules = require("../models/rules");

exports.createRules = async (req, res) => {
  const { date, rule } = req.body;

  await Rules.create({
    date,
    rule,
  })
    .then(() => res.status(200).json({ success: true, message: "SUCCESS" }))
    .catch((err) => res.status(500).json({ success: false, message: err }));
};

exports.getAll = async (req, res) => {
  await Order.find()
    .then((rules) => res.status(200).json(rules))
    .catch((err) => res.status(500).json({ success: false, message: err }));
};

exports.deleteRule = async (req, res) => {
  const { id } = req.params;
  await Rules.findByIdAndDelete(id)
    .then((order) => res.status(200).json({ message: "Deleted Successfully" }))
    .catch((err) => res.status(500).json({ success: false, message: err }));
};
