const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5500;
const routes = require("./routes");
const path = require("node:path");

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api", routes);

// Serve React static files
app.use(express.static(path.join(__dirname, "../client/dist", "/index.html"))); // adjust to your client build path

// Catch-all route for React SPA
app.get("/*w", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "/index.html"));
});

// listener
app.listen(PORT, "0.0.0.0", () => {
  console.log("server is on port: ", PORT);
});
