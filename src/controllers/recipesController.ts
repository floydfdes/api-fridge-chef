import { Request, Response } from 'express';

import Ingredient from '../models/Ingredient';
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

export const addRecipe = async (req: Request, res: Response) => {
    try {
        const { name, cuisine, category, rating, imageUrl, difficulty, ingredients, instructions } = req.body;

        // Process ingredients
        const processedIngredients = await Promise.all(ingredients.map(async (ing: { name: string, amount: string }) => {
            let ingredient = await Ingredient.findOne({ name: ing.name });
            if (!ingredient) {
                ingredient = await Ingredient.create({ name: ing.name });
            }
            return { ingredient: ingredient._id, amount: ing.amount };
        }));

        const newRecipe = new Recipe({
            name, cuisine, category, rating, imageUrl, difficulty,
            ingredients: processedIngredients,
            instructions
        });

        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (error) {
        res.status(500).json({ message: 'Error adding recipe', error });
    }
};
