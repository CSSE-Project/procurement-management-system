const {
  createOrder,
  acceptOrReject,
  getAll,
  deleteOrder,
  allocatebudget,
} = require("../controllers/order");
const router = require("express").Router();
const { notifyUser } = require("../utils/notifyUser");

router.post("/", createOrder);
router.put("/:id", acceptOrReject);
router.get("/", getAll);
router.put("/mbudget/:id", allocatebudget);
router.post("/notifySupplier", notifyUser);
router.delete("/:id", deleteOrder);

module.exports = router;
