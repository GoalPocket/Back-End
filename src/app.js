import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import targetRoutes from "./routes/target.routes.js";
import trackingRoutes from "./routes/tracking.routes.js";
import mlRoutes from "./routes/ml.routes.js"; // ✅ ubah ke import

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to GoalPocket API" });
});

// Routes with /api prefix
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/targets", targetRoutes);
app.use("/api/trackings", trackingRoutes);

// ML route
app.use("/ml", mlRoutes); // now using import

// Error handler (optional)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

export default app;
