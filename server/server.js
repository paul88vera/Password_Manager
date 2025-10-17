const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5500;
const routes = require("./routes");
const { clerkMiddleware, getAuth } = require("@clerk/express");
require("@dotenvx/dotenvx").config();

function requireAuth(req, res, next) {
  const { userId } = getAuth(req);

  if (!userId) {
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

// listener
app.listen(PORT, () => {
  console.log("server is on port: ", PORT);
});
