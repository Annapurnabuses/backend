import express from 'express';
import { getBookings,
  getBookingById,
  createAdminBooking,
  updateBooking,
  deleteBooking } from '../controllers/bookingsController';
import { getVehicles, getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle } from '../controllers/vehiclesController';

const router = express.Router();


router.get('/bookings', getBookings)

router.post('/bookings', createAdminBooking)


router.get('/bookings/:id', getBookingById)

router.put('/bookings/:id', updateBooking)

router.delete('/bookings/:id', deleteBooking)



router.get('/vehicles', getVehicles)

router.post('/vehicles', createVehicle)



router.get('/vehicles/:id', getVehicleById)

router.put('/vehicles/:id', updateVehicle)

router.delete('/vehicles/:id', deleteVehicle)


export default router;