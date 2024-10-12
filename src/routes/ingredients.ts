import { addIngredient, getIngredientsList } from '../controllers/ingredientsController';

import { authenticateToken } from '../middleware/auth';
import express from 'express';

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

/**
 * @swagger
 * /ingredients:
 *   post:
 *     summary: Add new ingredient
 *     tags: [Ingredients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               nutritionalValue:
 *                 type: object
 *     responses:
 *       201:
 *         description: Ingredient added successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticateToken, addIngredient);

export default router;
