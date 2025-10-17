const express = require("express");
const router = express.Router();
const userApi = require("./managers");
const clientApi = require("./clients");
const passApi = require("./passwords");
const orgApi = require("./org");

router.use("/manager", userApi);
router.use("/client", clientApi);
router.use("/passwords", passApi);
router.use("/org", orgApi);

module.exports = router;
