import { addRecipe, getAllRecipes, getRecipesByIngredients, getSpecificRecipe } from '../controllers/recipesController';

import { authenticateToken } from '../middleware/auth';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Get all recipes
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of recipes
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticateToken, getAllRecipes);

/**
 * @swagger
 * /recipes/by-ingredients:
 *   post:
 *     summary: Get recipes by ingredients
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ingredients
 *             properties:
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: List of recipes matching the ingredients
 *       401:
 *         description: Unauthorized
 */
router.post('/by-ingredients', authenticateToken, getRecipesByIngredients);

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     summary: Get a specific recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Recipe details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Recipe not found
 */
router.get('/:id', authenticateToken, getSpecificRecipe);

/**
 * @swagger
 * /recipes:
 *   post:
 *     summary: Add a new recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - cuisine
 *               - category
 *               - rating
 *               - imageUrl
 *               - difficulty
 *               - ingredients
 *               - instructions
 *             properties:
 *               name:
 *                 type: string
 *               cuisine:
 *                 type: string
 *               category:
 *                 type: string
 *               rating:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *               difficulty:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: string
 *     responses:
 *       201:
 *         description: Recipe added successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', authenticateToken, addRecipe);

export default router;
