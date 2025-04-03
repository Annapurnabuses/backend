import express from 'express';
import { createUserBooking, getUserBookings } from '../controllers/bookingsController';
import { getVehicles } from '../controllers/vehiclesController';

import { getUserProfile, forgotPassword, resetPassword } from '../controllers/userController.js';
import auth from '../middleware/auth.js'; // Middleware for token verification

const router = express.Router();

/**
 * @route POST /api/trip-summary
 * @desc trip-summary
 * @access Public
 */
router.get('/trip-summary', getUserBookings);

/**
 * @route POST /api/bookings
 * @desc bookings
 * @access Public
 */
router.post('/bookings', createUserBooking);


/**
 * @route POST /api/vehicles
 * @desc vehicles
 * @access Public
 */
router.get('/vehicles', getVehicles);



router.get('/profile', auth, getUserProfile);

router.post("/reset-password/:token", resetPassword);

router.post("/forgot-password", forgotPassword);


export default router;