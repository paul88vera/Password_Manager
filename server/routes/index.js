const express = require("express");
const router = express.Router();
const clientApi = require("./client");

router.use('/client', clientApi);

module.exports = router;
