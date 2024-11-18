import { Request, Response } from 'express';

import Recipe from '../models/Recipe';
import { mainCategories } from '../utils/constants';
import { processImage, validateImage } from '../utils/imageUtils';

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

        if (!Array.isArray(ingredients)) {
            return res.status(400).json({
                message: 'Ingredients should be an array of strings'
            });
        }

        const searchIngredients = ingredients.map(ing => ing.toLowerCase());

        const recipes = await Recipe.find({
            'ingredients.name': {
                $in: searchIngredients.map(ing => new RegExp(ing, 'i'))
            }
        }).populate('createdBy', 'name email profilePicture');

        res.json({ recipes });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching recipes by ingredients',
            error
        });
    }
};

export const getSpecificRecipe = async (req: Request, res: Response) => {
    try {
        const recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        const recipeWithUser = await Recipe.findById(recipeId)
            .populate('createdBy', 'name email profilePicture')
            .select('-__v');

        res.json(recipeWithUser);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipe', error });
    }
};

export const addRecipe = async (req: any, res: Response) => {
    try {
        const { name, cuisine, category, imageUrl, difficulty, ingredients, instructions } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Process the image (either URL or base64)
        let base64Image: string;
        try {
            base64Image = await processImage(imageUrl);
            validateImage(base64Image);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
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
            rating: 0,
            imageUrl: `data:image/jpeg;base64,${base64Image}`,
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

export const searchRecipes = async (req: Request, res: Response) => {
    try {
        const { searchTerm } = req.query;

        if (!searchTerm || typeof searchTerm !== 'string') {
            return res.status(400).json({ message: 'Search term is required' });
        }

        const searchRegex = new RegExp(searchTerm, 'i');

        const recipes = await Recipe.find({
            $or: [
                { name: searchRegex },
                { cuisine: searchRegex },
                { 'ingredients.name': searchRegex }
            ]
        }).populate('createdBy', 'name email profilePicture');

        res.json({ recipes });
    } catch (error) {
        res.status(500).json({ message: 'Error searching recipes', error });
    }
};

