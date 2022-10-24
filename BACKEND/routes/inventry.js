const {
  createInventry,
  getAll,
  deleteInventry,
} = require("../controllers/inventry");
const router = require("express").Router();
const { notifyUser } = require("../utils/notifyUser");

router.post("/", createInventry);
router.get("/", getAll);
router.delete("/:id", deleteInventry);
module.exports = router;
