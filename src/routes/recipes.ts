import { addRecipe, deleteRecipe, getAllRecipes, getRecipesByCategory, getRecipesByIngredients, getSpecificRecipe, rateRecipe, searchRecipes, updateRecipe } from '../controllers/recipesController';

import express from 'express';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

/**
 * @swagger
 * /recipes/search:
 *   get:
 *     summary: Search recipes by text
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         required: true
 *         schema:
 *           type: string
 *         description: Text to search in recipe names, cuisines, and ingredients
 *     responses:
 *       200:
 *         description: List of matching recipes
 *       400:
 *         description: Search term is required
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/search', authenticateToken, searchRecipes);

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
 *                 description: Allowed categories are appetizersAndStarters, mainDishes, dessertsAndSweets, saladsAndFreshDishes, soupsAndStews, breakfastAndMorningMeals, riceGrainsAndPasta, breadsAndBakedGoods, beverages, streetFoodAndSnacks
 *               imageUrl:
 *                 type: string
 *                 description: Can be a URL or base64 encoded image string
 *               difficulty:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     amount:
 *                       type: string
 *               instructions:
 *                 type: string
 *     responses:
 *       201:
 *         description: Recipe added successfully
 *       400:
 *         description: Invalid category or image
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', authenticateToken, addRecipe);

/**
 * @swagger
 * /recipes/category/{category}:
 *   get:
 *     summary: Get recipes by category
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipe category
 *     responses:
 *       200:
 *         description: List of recipes in the specified category
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No recipes found for this category
 */
router.get('/category/:category', authenticateToken, getRecipesByCategory);

/**
 * @swagger
 * /recipes/{id}:
 *   put:
 *     summary: Update a recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Recipe ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Recipe name
 *                 example: "Chocolate Chip Cookies"
 *               cuisine:
 *                 type: string
 *                 description: Type of cuisine
 *                 example: "American"
 *               category:
 *                 type: string
 *                 description: Recipe category
 *                 enum: [appetizersAndStarters, mainDishes, dessertsAndSweets, saladsAndFreshDishes, soupsAndStews, breakfastAndMorningMeals, riceGrainsAndPasta, breadsAndBakedGoods, beverages, streetFoodAndSnacks]
 *                 example: "dessertsAndSweets"
 *               imageUrl:
 *                 type: string
 *                 description: URL or base64 string of the recipe image
 *                 example: "https://example.com/cookies.jpg"
 *               difficulty:
 *                 type: string
 *                 enum: [Easy, Medium, Hard]
 *                 example: "Medium"
 *               ingredients:
 *                 type: array
 *                 description: List of ingredients with amounts
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "All-purpose flour"
 *                     amount:
 *                       type: string
 *                       example: "2 cups"
 *               instructions:
 *                 type: string
 *                 description: Step-by-step cooking instructions
 *                 example: "1. Preheat oven to 350°F\n2. Mix dry ingredients..."
 *     responses:
 *       200:
 *         description: Recipe updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 cuisine:
 *                   type: string
 *                 category:
 *                   type: string
 *                 rating:
 *                   type: number
 *                 imageUrl:
 *                   type: string
 *                 difficulty:
 *                   type: string
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       amount:
 *                         type: string
 *                 instructions:
 *                   type: string
 *                 createdBy:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     profilePicture:
 *                       type: string
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       403:
 *         description: Not authorized to edit this recipe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Recipe not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 */
router.put('/:id', authenticateToken, updateRecipe);

/*recipes/{id}/rate:
 *   post:
 *     summary: Rate a recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Recipe ID to rate
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Rating value between 1 and 5
 *                 example: 4
 *     responses:
 *       200:
 *         description: Recipe rated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 rating:
 *                   type: number
 *                   description: Updated average rating
 *                 createdBy:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     profilePicture:
 *                       type: string
 *       400:
 *         description: Invalid rating or cannot rate own recipe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 */
router.post('/:id/rate', authenticateToken, rateRecipe);

/**
 * @swagger
 * /recipes/{id}:
 *   delete:
 *     summary: Delete a specific recipe
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
 *       204:
 *         description: Recipe deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Recipe not found
 *       403:
 *         description: Not authorized to delete this recipe
 */
router.delete('/:id', authenticateToken, deleteRecipe);

export default router;
