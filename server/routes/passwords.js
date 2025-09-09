const express = require("express");
const router = express.Router();

const db = require("../db/connection");

// @route    GET /passwords
// @desc     Get all client passwords
// @access   Private - Public For Now
router.get("/", async (req, res) => {
  try {
    const connection = await db; // Wait for connection to resolve
    const query = "SELECT * FROM Passwords";
    const [results] = await connection.query(query);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error on Passwords");
  }
});

// @route    GET /passwords/:id
// @desc     Get client passwords by id
// @access   Private - Public For Now
router.get("/:id", async (req, res) => {
  try {
    const connection = await db; // Wait for connection to resolve
    const { id } = req.params;
    const query = "SELECT * FROM Passwords WHERE PassID = ?";
    const [results] = await connection.query(query, [id]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error on Passwords");
  }
});

// @route    PUT /passwords/:id
// @desc     Update passwords by password id
// @access   Private - Public For Now
router.put("/:id", async (req, res) => {
  try {
    const connection = await db; // Wait for connection to resolve
    const { id } = req.params;
    const { PassSite, PassUsername, PassHTML, PassPW, Client } = req.body;
    const query =
      "UPDATE Passwords SET PassSite = ?, PassUsername = ?, PassHTML = ?, PassPW = ?, Client = ? WHERE PassID = ?";
    const [results] = await connection.query(query, [
      PassSite,
      PassUsername,
      PassHTML,
      PassPW,
      Client,
      id,
    ]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error on Passwords");
  }
});

// @route    POST /passwords
// @desc     Create password
// @access   Private - Public For Now
router.post("/", async (req, res) => {
  try {
    const connection = await db; // Wait for connection to resolve
    const { id } = req.params;
    const { PassSite, PassUsername, PassHTML, PassPW, Client } = req.body;
    const query =
      "INSERT INTO Passwords (PassSite, PassUsername, PassHTML, PassPW, Client) VALUES (?,?,?,?,?)";
    const [results] = await connection.query(query, [
      PassSite,
      PassUsername,
      PassHTML,
      PassPW,
      Client,
      id,
    ]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error on Passwords");
  }
});

// @route    DELETE /passwords:id
// @desc     Create a Password
// @access   Private - Public For Now
router.delete("/:id", async (req, res) => {
  try {
    const connection = await db;
    const { id } = req.params;
    const query = "DELETE FROM Passwords WHERE PassID = ?";
    connection.query(query, [id]);
    res.send("Password Deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error on Passwords");
  }
});

module.exports = router;
