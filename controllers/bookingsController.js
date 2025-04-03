import Booking from '../models/bookingModel.js';

export async function createUserBooking(req, res) {
  const {
    name,
    phone,
    vehicleTypeRequested,
    startDate,
    endDate,
    pickupLocation,
    dropLocation,
    additionalRequirement
  } = req.body;
  const user = req.user._id;

  if (!name || !phone || !vehicleTypeRequested || !startDate || !endDate || !pickupLocation || !dropLocation) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const booking = new Booking({
      user,
      name,
      phone,
      vehicleTypeRequested,
      startDate,
      endDate,
      pickupLocation,
      dropLocation,
      additionalRequirement,
      status: 'Pending'
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// User: Get booking history
export async function getUserBookings(req, res) {
  const user = req.user._id;
  try {
    const bookings = await Booking.find({ user }).populate('assignedVehicle', 'vehicleType capacity');
    const summary = bookings.map(booking => ({
      _id: booking._id,
      assignedVehicle: booking.assignedVehicle,
      startDate: booking.startDate,
      endDate: booking.endDate,
      pickupLocation: booking.pickupLocation,
      dropLocation: booking.dropLocation,
      invoice: booking.invoice,
      status: booking.status
    }));
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// ===========

// Admin: Get all bookings
export async function getBookings(req, res) {
  try {
    const bookings = await Booking.find().populate('user', 'name').populate('assignedVehicle', 'vehicleType');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Admin: Get a specific booking
export async function getBookingById(req, res) {
  try {
    const booking = await Booking.findById(req.params.id).populate('user', 'name').populate('assignedVehicle');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Admin: Create a new booking
export async function createAdminBooking(req, res) {
  const {
    user,
    name,
    phone,
    vehicleTypeRequested,
    startDate,
    endDate,
    pickupLocation,
    dropLocation,
    additionalRequirement,
    status,
    driverDutySlip,
    invoice,
    assignedVehicle
  } = req.body;

  if (!user || !name || !phone || !vehicleTypeRequested || !startDate || !endDate || !pickupLocation || !dropLocation) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const booking = new Booking({
      user,
      name,
      phone,
      vehicleTypeRequested,
      startDate,
      endDate,
      pickupLocation,
      dropLocation,
      additionalRequirement,
      status: status || 'Pending',
      driverDutySlip,
      invoice: invoice || { totalPayment: 0, advancePayment: 0, remainingPayment: 0 },
      assignedVehicle
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Admin: Update a booking
export async function updateBooking(req, res) {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const {
      name,
      phone,
      vehicleTypeRequested,
      startDate,
      endDate,
      pickupLocation,
      dropLocation,
      additionalRequirement,
      status,
      driverDutySlip,
      invoice,
      assignedVehicle
    } = req.body;

    if (name) booking.name = name;
    if (phone) booking.phone = phone;
    if (vehicleTypeRequested) booking.vehicleTypeRequested = vehicleTypeRequested;
    if (startDate) booking.startDate = startDate;
    if (endDate) booking.endDate = endDate;
    if (pickupLocation) booking.pickupLocation = pickupLocation;
    if (dropLocation) booking.dropLocation = dropLocation;
    if (additionalRequirement) booking.additionalRequirement = additionalRequirement;
    if (status) booking.status = status;
    if (driverDutySlip) booking.driverDutySlip = driverDutySlip;
    if (invoice) {
      if (invoice.totalPayment) booking.invoice.totalPayment = invoice.totalPayment;
      if (invoice.advancePayment) booking.invoice.advancePayment = invoice.advancePayment;
      if (invoice.remainingPayment) booking.invoice.remainingPayment = invoice.remainingPayment;
    }
    if (assignedVehicle) booking.assignedVehicle = assignedVehicle;

    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Admin: Delete a booking
export async function deleteBooking(req, res) {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}