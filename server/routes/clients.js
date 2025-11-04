const express = require("express");
const router = express.Router();
const { getAuth } = require("@clerk/express");
const db = require("../db/connection");

// @route    GET /client
// @desc     Get all Client
// @access   Private
router.get("/", async (req, res) => {
  try {
    const connection = await db; // Wait for connection to resolve

    const query = "SELECT * FROM Client";
    const [results] = await connection.query(query);
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
    const query = "SELECT * FROM Client WHERE ClientId = ?";
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
    const {
      ClientUsername,
      ClientCompany,
      ClientEmail,
      ClientNotes,
      ManagerId,
    } = req.body;
    const query =
      "UPDATE Client SET ClientUsername = ?, ClientCompany = ?, ClientEmail = ?, ClientNotes = ?, ManagerId = ? WHERE ClientId = ?";
    const [results] = await connection.query(query, [
      ClientUsername,
      ClientCompany,
      ClientEmail,
      ClientNotes,
      ManagerId,
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
    const {
      ClientUsername,
      ClientCompany,
      ClientEmail,
      ClientNotes,
      ManagerId,
    } = req.body;

    const { orgId } = getAuth(req);

    if (!orgId) {
      return res.status(400).json({ error: "OrgId is required" });
    }

    const query =
      "INSERT INTO Client (ClientUsername, ClientCompany, ClientEmail, ClientNotes, ManagerId, OrgId) VALUES (?,?,?,?,?,?)";
    const [results] = await connection.query(query, [
      ClientUsername,
      ClientCompany,
      ClientEmail,
      ClientNotes,
      ManagerId,
      orgId,
      id,
    ]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error on Client");
  }
});

/**
 * @route     DELETE /Clients/:id
 * @desc      Delete Client by id
 * @access    Private
 */
router.delete("/:id", async (req, res) => {
  const connection = await db; // Wait for connection to resolve
  const { id } = req.params;
  const query = "DELETE FROM Client WHERE ClientId = ?";
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
