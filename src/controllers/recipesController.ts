import { Request, Response } from 'express';

import Ingredient from '../models/Ingredient';
import Recipe from '../models/Recipe';
import { mainCategories } from '../utils/constants';

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

        // Find ingredients by name
        const ingredientDocs = await Ingredient.find({ name: { $in: ingredients } });
        const ingredientIds = ingredientDocs.map(doc => doc._id);

        // Find recipes that include any of these ingredients
        const recipes = await Recipe.find({ 'ingredients.ingredient': { $in: ingredientIds } })
            .populate('ingredients.ingredient', 'name');

        res.json({ recipes });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipes by ingredients', error });
    }
};

export const getSpecificRecipe = async (req: Request, res: Response) => {
    try {
        const recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId).populate('ingredients.ingredient');
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipe', error });
    }
};

export const addRecipe = async (req: any, res: Response) => {
    try {
        const { name, cuisine, category, rating, imageUrl, difficulty, ingredients, instructions } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Validate category
        const allowedCategories = mainCategories.map(cat => cat.key);
        if (!allowedCategories.includes(category)) {
            return res.status(400).json({
                message: `Invalid category. Allowed categories are: ${allowedCategories.join(', ')}`
            });
        }

        const newRecipe = new Recipe({
            name,
            cuisine,
            category,
            rating,
            imageUrl,
            difficulty,
            ingredients,
            instructions,
            createdBy: userId
        });

        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (error) {
        res.status(500).json({ message: 'Error adding recipe', error });
    }
};

export const getRecipesByCategory = async (req: Request, res: Response) => {
    try {
        const { category } = req.params;

        const recipes = await Recipe.find({ category });

        if (recipes.length === 0) {
            return res.status(404).json({ message: 'No recipes found for this category' });
        }

        res.json({ recipes });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipes by category', error });
    }
};

