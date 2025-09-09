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

// @route    GET /users:id
// @desc     Get one user
// @access   Private - Public For Now
router.get("/:id", async (req, res) => {
  try {
    const connection = await db; // Wait for connection to resolve
    const { id } = req.params;
    const query = "SELECT * FROM PassUsers WHERE UserID = ?";
    const [results] = await connection.query(query, [id]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error on Users");
  }
});

// @route    PUT /users:id
// @desc     Update one user by id
// @access   Private - Public For Now
router.put("/:id", async (req, res) => {
  try {
    const connection = await db; // Wait for connection to resolve
    const { id } = req.params;
    const { UserName, UserEmail, UserLogin, UserRole, UserActive } = req.body;
    const query =
      "UPDATE PassUsers SET UserName = ?, UserEmail = ?, UserLogin = ?, UserRole = ?, UserActive = ? WHERE PassID = ?";
    const [results] = await connection.query(query, [
      UserName,
      UserEmail,
      UserLogin,
      UserRole,
      UserActive,
      id,
    ]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error on Users");
  }
});

// @route    POST /users
// @desc     Create a user
// @access   Private - Public For Now
router.post("/", async (req, res) => {
  try {
    const connection = await db; // Wait for connection to resolve
    const { id } = req.params;
    const { UserID, UserName, UserEmail, UserLogin, UserRole, UserActive } =
      req.body;
    const query =
      "INSERT INTO PassUsers (UserID, UserName, UserEmail, UserLogin, UserRole, UserActive) VALUES (?,?,?,?,?,?)";
    const [results] = await connection.query(query, [
      UserID == id,
      UserName,
      UserEmail,
      UserLogin,
      UserRole,
      UserActive,
    ]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error on Users");
  }
});

// @route    DELETE /users:id
// @desc     Create a user
// @access   Private - Public For Now
router.delete("/:id", async (req, res) => {
  try {
    const connection = await db;
    const { id } = req.params;
    const query = "DELETE FROM PassUsers WHERE UserID = ?";
    connection.query(query, [id]);
    res.send("User Deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error on Users");
  }
});

module.exports = router;
