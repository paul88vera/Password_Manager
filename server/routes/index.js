const express = require("express");
const router = express.Router();
const userApi = require("./users");
const clientApi = require("./clients");
const passApi = require("./passwords");

router.use("/user", userApi);
router.use("/client", clientApi);
router.use("/passwords", passApi);

module.exports = router;
