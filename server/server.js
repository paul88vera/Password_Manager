require("@dotenvx/dotenvx").config();
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
// const { clerkMiddleware, getAuth } = require("@clerk/express");
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


// LIVE === Clerk Auth ===
// app.use(
  //   clerkMiddleware({
    //     publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
    //     secretKey: process.env.VITE_CLERK_SECRET,
    //   })
    // );
    
    // LIVE === AUTH ===
    // function requireAuth(req, res, next) {
      //   const { userId, orgId } = getAuth(req);
      
      //   if (!userId || !orgId) {
        //     return res.status(401).json({ message: "Unauthorized" });
        //   }
        
        //   next();
        // }
        
        // LIVE === ROUTES ===
        // app.use("/api", requireAuth, routes);
        
// # ## DEV ======
app.use(cors());
// # ## DEV: Allow public routes for testing
app.use("/api", routes);

// === START SERVER ===
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
