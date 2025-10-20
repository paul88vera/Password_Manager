const express = require("express");
const router = express.Router();

const db = require("../db/connection");

/**
 * @route    GET /org/:OrgId/passwords
 * @desc     Get all client passwords
 * @access   Private -- @Developer ONLY
 * */
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

/**
 * @route    GET /org/:OrgId/passwords/:PassId
 * @desc     Get one client password by id
 * @access   Private
 * */
router.get("/:PassId", async (req, res) => {
  try {
    const connection = await db; // Wait for connection to resolve
    const { PassId } = req.params;
    const query = "SELECT * FROM Passwords WHERE PassID = ?";
    const [results] = await connection.query(query, [PassId]);

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error on Passwords");
  }
});

/**
 * @route    PUT /org/:OrgId/passwords/:PassId
 * @desc     Update client password by Id
 * @access   Private
 * */
router.put("/:PassId", async (req, res) => {
  try {
    const connection = await db; // Wait for connection to resolve
    const { PassId } = req.params;
    const { PassSite, PassUsername, PassHTML, PassPW, Client, OrgId } =
      req.body;
    const query =
      "UPDATE Passwords SET PassSite = ?, PassUsername = ?, PassHTML = ?, PassPW = ?, Client = ?, OrgId = ? WHERE PassId = ?";
    const [results] = await connection.query(query, [
      PassSite,
      PassUsername,
      PassHTML,
      PassPW,
      Client,
      OrgId,
      PassId,
    ]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error on Passwords");
  }
});

/**
 * @route    POST /org/:OrgId/passwords
 * @desc     Get all client passwords
 * @access   Private
 * */
router.post("/", async (req, res) => {
  try {
    const connection = await db; // Wait for connection to resolve
    const { PassSite, PassUsername, PassHTML, PassPW, Client, OrgId } =
      req.body;
    const query =
      "INSERT INTO Passwords (PassSite, PassUsername, PassHTML, PassPW, Client, OrgId) VALUES (?,?,?,?,?,?)";
    const [results] = await connection.query(query, [
      PassSite,
      PassUsername,
      PassHTML,
      PassPW,
      Client,
      OrgId,
    ]);
    res.json(results);
  } catch (err) {
    console.error(err, sqlMessage);
    res.status(500).send("Server error on Passwords");
  }
});

/**
 * @route    DELETE /org/:OrgId/passwords/:PassId
 * @desc     delete a client password
 * @access   Private
 * */
router.delete("/:PassId", async (req, res) => {
  try {
    const connection = await db;
    const { PassId } = req.params;
    const query = "DELETE FROM Passwords WHERE PassId = ?";
    connection.query(query, [PassId]);
    res.send("Password Deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error on Passwords");
  }
});

module.exports = router;
