import { Request, Response } from 'express';

import Ingredient from '../models/Ingredient';

export const getIngredientsList = async (req: Request, res: Response) => {
    try {
        const ingredients = await Ingredient.find().select('name');
        res.json({ ingredients: ingredients.map(ing => ing.name) });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ingredients', error });
    }
};