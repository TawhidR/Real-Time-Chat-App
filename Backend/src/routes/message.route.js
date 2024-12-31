import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.get('/users', protectRoute, getUsersForSideBar)
router.get('/:id', protectRoute, getMessages)
router.post('/:id', protectRoute, sendMessage)
export default router;