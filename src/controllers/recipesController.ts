import { Request, Response } from 'express';

import Recipe from '../models/Recipe';

export const getAllRecipes = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const recipes = await Recipe.find().skip(skip).limit(limit);
        const totalCount = await Recipe.countDocuments();

        res.json({
            recipes,
            totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit)
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipes', error });
    }
};

export const getRecipesByIngredients = async (req: Request, res: Response) => {
    try {
        const { ingredients } = req.body;
        const recipes = await Recipe.find({ ingredients: { $all: ingredients } });
        res.json({ recipes });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipes by ingredients', error });
    }
};

export const getSpecificRecipe = async (req: Request, res: Response) => {
    try {
        const recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipe', error });
    }
};