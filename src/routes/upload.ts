import { authenticateToken } from '../middleware/auth';
import express from 'express';
import { uploadFridgeImage } from '../controllers/uploadController';

const router = express.Router();

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload fridge image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *       400:
 *         description: Invalid file or no file uploaded
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticateToken, uploadFridgeImage);

export default router;
