import { Request, Response } from 'express';

import Ingredient from '../models/Ingredient';

export const getIngredientsList = async (req: Request, res: Response) => {
    try {
        const ingredients = await Ingredient.find().select('name');
        res.json({ ingredients });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ingredients', error });
    }
};

export const addIngredient = async (req: Request, res: Response) => {
    try {
        const { name, nutritionalValue } = req.body;
        const newIngredient = new Ingredient({ name, nutritionalValue });
        const savedIngredient = await newIngredient.save();
        res.status(201).json(savedIngredient);
    } catch (error) {
        res.status(500).json({ message: 'Error adding ingredient', error });
    }
};

// ... other controller functions as needed ...
