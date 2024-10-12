import { getUserProfile, updateUserProfile } from '../controllers/usersController';

import { authenticateToken } from '../middleware/auth';
import express from 'express';

const router = express.Router();

router.get('/:id', authenticateToken, getUserProfile);
router.put('/:id', authenticateToken, updateUserProfile);

export default router;

