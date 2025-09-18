const express = require("express");
const router = express.Router();

const db = require("../db/connection");

// @route    GET /client
// @desc     Get all Client
// @access   Private
router.get("/", async (req, res) => {
  try {
    const connection = await db; // Wait for connection to resolve
    const [results] = await connection.query("SELECT * FROM PassClient");
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error on Client");
  }
});

// @route    GET /client:id
// @desc     Get one Client by id
// @access   Private
router.get("/:id", async (req, res) => {
  try {
    const connection = await db; // Wait for connection to resolve
    const { id } = req.params;
    const query = "SELECT * FROM PassClient WHERE ClientID = ?";
    const [results] = await connection.query(query, [id]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error on Client");
  }
});

// @route    PUT /client/:id
// @desc     Update Client by id
// @access   Private
router.put("/:id", async (req, res) => {
  try {
    const connection = await db; // Wait for connection to resolve
    const { id } = req.params;
    const { ClientUsername, ClientCompany, ClientEmail, ClientNotes, POC } =
      req.body;
    const query =
      "UPDATE PassClient SET ClientUsername = ?, ClientCompany = ?, ClientEmail = ?, ClientNotes = ?, POC = ? WHERE ClientID = ?";
    const [results] = await connection.query(query, [
      ClientUsername,
      ClientCompany,
      ClientEmail,
      ClientNotes,
      POC,
      id,
    ]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error on Client");
  }
});

// @route    POST /client
// @desc     Create new Client
// @access   Private
router.post("/", async (req, res) => {
  try {
    const connection = await db; // Wait for connection to resolve
    const { id } = req.params;
    const { ClientUsername, ClientCompany, ClientEmail, ClientNotes, POC } =
      req.body;
    const query =
      "INSERT INTO PassClient (ClientUsername, ClientCompany, ClientEmail, ClientNotes, POC) VALUES (?,?,?,?,?)";
    const [results] = await connection.query(query, [
      ClientUsername,
      ClientCompany,
      ClientEmail,
      ClientNotes,
      POC,
      id,
    ]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error on Client");
  }
});

// @route    DELETE /Clients/:id
// @desc     Delete Client by id
// @access   Private
router.delete("/:id", async (req, res) => {
  const connection = await db; // Wait for connection to resolve
  const { id } = req.params;
  const query = "DELETE FROM PassClient WHERE ClientID = ?";
  connection.query(query, [id], (err) => {
    if (err) {
      res.status(500).send("Server error");
      console.error(err);
    } else {
      res.send("Client Deleted");
    }
  });
});

module.exports = router;
