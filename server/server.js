const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const { clerkMiddleware, getAuth } = require("@clerk/express");
require("@dotenvx/dotenvx").config();
const PORT = process.env.VITE_SERVER_PORT;

// === MIDDLEWARE ===
app.use(express.json());

// LIVE ======
// app.use(
//   cors({
//     origin: "http://localhost:5400", // frontend domain
//     credentials: true, // if sending cookies
//   })
// );

// DEV ======
app.use(cors());

// === Clerk Auth ===
// app.use(
//   clerkMiddleware({
//     publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
//     secretKey: process.env.VITE_CLERK_SECRET,
//   })
// );

// === AUTH ===
function requireAuth(req, res, next) {
  const { userId, orgId } = getAuth(req);

  if (!userId || !orgId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
}

// === ROUTES ===
// app.use("/api", requireAuth, routes);

// TEMP: Allow public routes for testing
app.use("/api", routes);

// === START SERVER ===
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
