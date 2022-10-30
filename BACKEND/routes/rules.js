const { createRules, getAll, deleteRule } = require("../controllers/rules");
const router = require("express").Router();
const { notifyUser } = require("../utils/notifyUser");

router.post("/", createRules);
router.get("/get", getAll);
router.delete("/:id", deleteRule);

module.exports = router;
