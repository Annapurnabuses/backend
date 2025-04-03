import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  vehicleTypeRequested: {
    type: String,
    enum: ['Mini Bus', 'Luxury Bus', 'SUV', 'Sedan'],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  pickupLocation: {
    type: String,
    required: true
  },
  dropLocation: {
    type: String,
    required: true
  },
  additionalRequirement: {
    type: String
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  driverDutySlip: {
    type: String // base64 string
  },
  invoice: {
    totalPayment: {
      type: Number,
      default: 0
    },
    advancePayment: {
      type: Number,
      default: 0
    },
    remainingPayment: {
      type: Number,
      default: 0
    }
  },
  assignedVehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  }
}, { timestamps: true });


const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;