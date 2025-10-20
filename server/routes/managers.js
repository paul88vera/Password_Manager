const express = require("express");
const router = express.Router();

const db = require("../db/connection");

// @route    GET /users
// @desc     Get all users
// @access   Private
router.get("/", async (req, res) => {
  try {
    const connection = await db; // Wait for connection to resolve
    const [results] = await connection.query("SELECT * FROM Manager");
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error on Users");
  }
});

// @route    GET /users:id
// @desc     Get one user
// @access   Private
router.get("/:managerId", async (req, res) => {
  try {
    const connection = await db; // Wait for connection to resolve
    const { UserId } = req.params;
    const query = "SELECT * FROM Manager WHERE UserId = ?";
    const [results] = await connection.query(query, [UserId]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error on Users");
  }
});

// @route    PUT /users:id
// @desc     Update one user by id
// @access   Private
router.put("/:ManagerId", async (req, res) => {
  try {
    const connection = await db; // Wait for connection to resolve
    const { UserId } = req.params;
    const { UserName, UserEmail, UserRole, UserActive } = req.body;
    const query =
      "UPDATE Manager SET UserName = ?, UserEmail = ?, UserRole = ?, UserActive = ?  WHERE UserId = ?";
    const [results] = await connection.query(query, [
      UserName,
      UserEmail,
      UserRole,
      UserActive,
      UserId,
    ]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error on Users");
  }
});

// @route    POST /users
// @desc     Create a user
// @access   Private
router.post("/", async (req, res) => {
  try {
    const connection = await db; // Wait for connection to resolve
    const { id } = req.params;
    const { UserName, UserEmail, UserRole, UserActive, OrgId } = req.body;
    const query =
      "INSERT INTO Manager (UserName, UserEmail, UserRole, UserActive, OrgId) VALUES (?,?,?,?,?)";
    const [results] = await connection.query(query, [
      UserName,
      UserEmail,
      UserRole,
      UserActive,
      OrgId,
      id,
    ]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error on Users");
  }
});

// @route    DELETE /users:id
// @desc     Create a user
// @access   Private
router.delete("/:UserId", async (req, res) => {
  try {
    const connection = await db;
    const { UserId } = req.params;
    const query = "DELETE FROM Manager WHERE UserId = ?";
    connection.query(query, [UserId]);
    res.send("User Deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error on Users");
  }
});

module.exports = router;
