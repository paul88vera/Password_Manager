const express = require("express");
const app = express();
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const PORT = 5400;
const routes = require("./routes");
const { clerkMiddleware, getAuth } = require("@clerk/express");
require("@dotenvx/dotenvx").config();
const path = require("path");

function requireAuth(req, res, next, e) {
  const { userId, orgId } = getAuth(req);

  if ((!userId || !orgId, e)) {
    // e.preventDefault(); // Added to prevent token fallout
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
}

// middleware
app.use(express.json());
app.use(cors());
app.use(
  clerkMiddleware({
    publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.VITE_CLERK_SECRET,
  })
);

// routes
app.use("/api", requireAuth, routes);

// Serve React static files
app.use(express.static(path.join(__dirname, "../client/dist")));

// React SPA catch-all (must come last)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

// Load your local certs
const options = {
  key: fs.readFileSync(
    path.join(__dirname, "../client/certs/app.verafied.tech-key.pem")
  ),
  cert: fs.readFileSync(
    path.join(__dirname, "../client/certs/app.verafied.tech.pem")
  ),
};

// listener
// app.listen(PORT, "0.0.0.0", () => {
//   console.log("server is on port: ", PORT);
// });
https.createServer(options, app).listen(PORT, () => {
  console.log(`✅ HTTPS Server running on https://localhost:${PORT}`);
});
