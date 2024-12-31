import express from 'express';
import { signup, login, logout, checkAuth, updateProfile } from '../controllers/controllers.auth.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Use POST for signup, login, and logout
router.post('/signup', signup);  // Handle POST request for signup
router.post('/login', login);     // Handle POST request for login
router.post('/logout', logout);   // Handle POST request for logout

router.put("/update-profile", protectRoute, updateProfile); // Update profile route
router.get("/check",protectRoute ,checkAuth)
export default router;
