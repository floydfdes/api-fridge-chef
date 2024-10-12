import { authenticateToken } from '../middleware/auth';
import express from 'express';
import { getIngredientsList } from '../controllers/ingredientsController';

const router = express.Router();

router.get('/', authenticateToken, getIngredientsList);

export default router;

