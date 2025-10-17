const express = require("express");
const router = express.Router();

const db = require("../db/connection");

// @route    GET /org
// @desc     Get all organizations
// @access   Private
router.get("/", async (req, res) => {
  try {
    const connection = await db; // Wait for connection to resolve
    const [results] = await connection.query("SELECT * FROM Org");
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error on org");
  }
});

module.exports = router;
