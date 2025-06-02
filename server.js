/** @format */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

import userRoutes from "./routes/user.routes.js";
import recipeRoutes from "./routes/recipe.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 502; // Changed port here

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
try {
  connectDB();
  console.log("✅ MongoDB connected successfully.");
} catch (error) {
  console.error("❌ MongoDB connection failed:", error.message);
  process.exit(1);
}

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "🌟 Welcome to the Collaborative Recipe Builder API!",
  });
});

// Catch-all unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "❌ Route not found" });
});

// Start the Server
try {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
} catch (error) {
  console.error("❌ Server failed to start:", error.message);
}
