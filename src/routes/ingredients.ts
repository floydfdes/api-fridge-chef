import { authenticateToken } from '../middleware/auth';
import express from 'express';
import { getIngredientsList } from '../controllers/ingredientsController';

const router = express.Router();

/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Get list of ingredients
 *     tags: [Ingredients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of ingredients
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticateToken, getIngredientsList);

export default router;
