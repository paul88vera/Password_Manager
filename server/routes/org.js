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

router.post("/", async (req, res) => {
  try {
    const connection = await db;
    const { OrgName } = req.body;

    const query = "INSERT INTO Org (OrgName) VALUES (?)";
    const [results] = await connection.query(query, [OrgName]);

    res.json(results);
  } catch (error) {
    console.error("error on org post:", error);
  }
});

module.exports = router;
