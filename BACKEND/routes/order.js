const {
  createOrder,
  acceptOrReject,
  getAll,
  deleteOrder,
} = require("../controllers/order");
const router = require("express").Router();
const { notifyUser } = require("../utils/notifyUser");

router.post("/", createOrder);
router.put("/:id", acceptOrReject);
router.get("/", getAll);
router.post("/notifySupplier", notifyUser);
router.delete("/:id", deleteOrder);

module.exports = router;
