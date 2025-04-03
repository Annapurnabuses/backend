import express from "express";
const router = express.Router();// Register Route


// New Route: Fetch User Details
router.get('/user', getUserDetails);

export default router;