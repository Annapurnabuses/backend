import express from "express";
import { registerUser, loginUser, getUserDetails} from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();// Register Route


// Register Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser);

// New Route: Fetch User Details
router.get('/user', auth, getUserDetails);

// New Route: Fetch User Details
// router.get('/user', (req, res)=>{res.json({message:"hi"})});

export default router;