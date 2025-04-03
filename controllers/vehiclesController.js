import Vehicle from '../models/vehicleModel.js';

// Get all vehicles
export async function getVehicles(req, res) {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get a specific vehicle
export async function getVehicleById(req, res) {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Create a new vehicle
export async function createVehicle(req, res) {
  const {
    vehicleType,
    capacity,
    features,
    images,
    availability,
    insurance,
    pocCheck,
    allIndiaPermit
  } = req.body;

  if (!vehicleType || !capacity) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const vehicle = new Vehicle({
      vehicleType,
      capacity,
      features: features || [],
      images,
      availability: availability || Date.now(),
      insurance: insurance || Date.now(),
      pocCheck: pocCheck || Date.now(),
      allIndiaPermit: allIndiaPermit || Date.now()
    });
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update a vehicle
export async function updateVehicle(req, res) {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    const {
      vehicleType,
      capacity,
      features,
      images,
      availability,
      insurance,
      pocCheck,
      allIndiaPermit
    } = req.body;

    if (vehicleType) vehicle.vehicleType = vehicleType;
    if (capacity) vehicle.capacity = capacity;
    if (features) vehicle.features = features;
    if (images) vehicle.images = images;
    if (availability !== undefined) vehicle.availability = availability;
    if (insurance !== undefined) vehicle.insurance = insurance;
    if (pocCheck !== undefined) vehicle.pocCheck = pocCheck;
    if (allIndiaPermit !== undefined) vehicle.allIndiaPermit = allIndiaPermit;

    await vehicle.save();
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete a vehicle
export async function deleteVehicle(req, res) {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json({ message: 'Vehicle deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
