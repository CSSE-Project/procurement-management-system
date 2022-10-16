const { createOrder, acceptOrReject, getAll } = require("../controllers/order");
const router = require("express").Router();
const { notifyUser } = require("../utils/notifyUser");

router.post("/", createOrder);
router.put("/:id", acceptOrReject);
router.get("/", getAll);
router.post("/notifySupplier", notifyUser);

module.exports = router;
