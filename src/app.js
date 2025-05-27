import express from "express";
const app = express();
import cors from "cors";

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to GoalPocket API" });
});

// Import routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import targetRoutes from "./routes/target.routes.js";
import trackingRoutes from "./routes/tracking.routes.js";

// Routes with /api prefix
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/targets", targetRoutes);
app.use("/api/trackings", trackingRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

export default app;
