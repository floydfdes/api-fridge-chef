import { getAllRecipes, getRecipesByIngredients, getSpecificRecipe } from '../controllers/recipesController';

import { authenticateToken } from '../middleware/auth';
// src/routes/recipes.ts
import express from 'express';

const router = express.Router();

router.get('/', authenticateToken, getAllRecipes);
router.post('/by-ingredients', authenticateToken, getRecipesByIngredients);
router.get('/:id', authenticateToken, getSpecificRecipe);

export default router;
