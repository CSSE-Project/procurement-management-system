const Inventry = require("../models/inventry");

exports.createInventry = async (req, res) => {
  const { storeId, storeName, storeAddress } = req.body;
  console.log(req.body);
  await Inventry.create({
    storeId,
    storeName,
    storeAddress,
  })
    .then(() => res.status(200).json({ success: true, message: "SUCCESS" }))
    .catch((err) => res.status(500).json({ success: false, message: err }));
};

exports.getAll = async (req, res) => {
  await Inventry.find()
    .then((inventry) => res.status(200).json(inventry))
    .catch((err) => res.status(500).json({ success: false, message: err }));
};

exports.deleteInventry = async (req, res) => {
  const { id } = req.params;
  await Inventry.findByIdAndDelete(id)
    .then((inventry) =>
      res.status(200).json({ message: "Deleted Successfully" })
    )
    .catch((err) => res.status(500).json({ success: false, message: err }));
};
