const express = require("express");
const router = express.Router();

const db = require("../db/connection");

// @route    GET /users
// @desc     Get all users
// @access   Private - Public For Now
router.get("/", async (req, res) => {
  try {
    const connection = await db; // Wait for connection to resolve
    const [results] = await connection.query("SELECT * FROM PassUsers");
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error on Users");
  }
});

module.exports = router;
