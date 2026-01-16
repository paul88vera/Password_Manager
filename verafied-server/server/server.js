// const https = require("https");    //DEV
// const fs = require("fs");    //DEV
// const path = require("path");    // DEV
require("@dotenvx/dotenvx").config();
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const { clerkMiddleware, getAuth } = require("@clerk/express");
const PORT = process.env.VITE_SERVER_PORT;


/**
 * !PRODUCTION SERVER SETUP
 */

// === MIDDLEWARE ===
app.use(express.json());
app.use(
  cors({
    origin: ["https://app.verafied.tech"], // frontend domain
    credentials: true, // if sending cookies
  })
);

// === Clerk Auth ===
app.use(
  clerkMiddleware({
    publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.VITE_CLERK_SECRET,
  })
);

// === AUTH ===
function requireAuth(req, res, next) {
  const { userId, orgId } = getAuth(req);

  if (!userId || !orgId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
}

// === ROUTES ===
app.use("/api", requireAuth, routes);


/**
 * !DEVELOPMENT SERVER SETUP
 */

// // === MIDDLEWARE ===
// app.use(express.json());
// app.use(
//   cors({
//     origin: ["https://localhost:5173"], // frontend domain
//     credentials: true, // if sending cookies
//   })
// );

// // === Clerk Auth ===
// app.use(
//   clerkMiddleware({
//     publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
//     secretKey: process.env.VITE_CLERK_SECRET,
//   })
// );

// // === AUTH ===
// function requireAuth(req, res, next) {
//   const { userId, orgId } = getAuth(req);

//   if (!userId || !orgId) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   next();
// }

// // === ROUTES ===
// app.use("/api", requireAuth, routes);


// !BOTH === START SERVER ===
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

//  ------ This commented out section is for development only === DO NOT USE -----
// // Serve React static files
// app.use(express.static(path.join(__dirname, "../client/dist")));

// // React SPA catch-all (must come last)
// app.get(/^\/(?!api).*/, (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
// });

// Load your local certs
// const options = {
//   key: fs.readFileSync(
//     path.join(__dirname, "/app/certs/app.verafied.tech-key.pem")
//   ),
//   cert: fs.readFileSync(
//     path.join(__dirname, "/app/certs/app.verafied.tech.pem")
//   ),
// };

// https.createServer(app).listen(PORT, "0.0.0.0", () => {
//   console.log(
//     `✅ HTTPS Server running on https://server.app.verafied.tech:${PORT}`
//   );
// });
