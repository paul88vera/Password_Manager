const express = require("express");
const router = express.Router();
const userApi = require("./users");
const clientApi = require("./clients");

router.use("/user", userApi);
router.use("/client", clientApi);

module.exports = router;
