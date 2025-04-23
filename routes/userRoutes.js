import express from "express";
import {
  createUserBooking,
  getUserBookings,
} from "../controllers/bookingsController.js";
import { getVehicles } from "../controllers/vehiclesController.js";

import {
  getUserProfile,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js"; // Middleware for token verification

const router = express.Router();

router.get("/trip-summary", getUserBookings);

router.post("/bookings", createUserBooking);

router.get("/vehicles", getVehicles);

router.get("/profile", auth, getUserProfile);

router.post("/reset-password/:token", resetPassword);

router.post("/forgot-password", forgotPassword);

export default router;
