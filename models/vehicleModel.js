import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  vehicleType: {
    type: String,
    enum: ['Mini Bus', 'Luxury Bus', 'SUV', 'Sedan'],
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  features: {
    type: [String],
    default: []
  },
  images: {
    type: String // base64 string
  },
  availability: {
    type: Date,
  },
  insurance: {
    type: Date,
  },
  pocCheck: {
    type: Date,
  },
  allIndiaPermit: {
    type: Date,
  }
});


const Vehicle = mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;