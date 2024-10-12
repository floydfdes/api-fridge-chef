import express from 'express';
import { uploadFridgeImage } from '../controllers/uploadController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateToken, uploadFridgeImage);

export default router;

