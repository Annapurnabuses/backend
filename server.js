import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize the Express app
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Allow all origins
app.use(cors());

// Mount routes
app.use("/api/auth", authRoutes); // Auth routes
app.use("/api/admin", adminAuthRoutes); //Admin Auth routes
app.use("/api/admin", adminRoutes); //Admin routes
app.use("/api/", userRoutes);

// Test API route
app.get("/", (req, res) => {
  res.send("Consumer API is running...");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the app for Vercel
export default app;
