import { Request, Response } from 'express';

import FridgeImage from '../models/FridgeImage';
import axios from 'axios';

interface MulterRequest extends Request {
    file?: Express.Multer.File;
    user?: { id: string }; // Include user object for type safety
}

export const uploadFridgeImage = async (req: MulterRequest, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Validate file type and size
        const allowedMimeTypes = ['image/jpeg', 'image/png'];
        if (!allowedMimeTypes.includes(req.file.mimetype)) {
            return res.status(400).json({ message: 'Invalid file type. Only JPEG and PNG are allowed.' });
        }

        const maxSize = 5 * 1024 * 1024; // 5MB
        if (req.file.size > maxSize) {
            return res.status(400).json({ message: 'File too large. Max size is 5MB.' });
        }

        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Convert file to base64
        const base64Image = req.file.buffer.toString('base64');

        // Save the fridge image
        const fridgeImage = new FridgeImage({
            userId,
            imageData: base64Image
        });
        await fridgeImage.save();

        // Analyze the image using external Python API
        const pythonApiUrl = process.env.PYTHON_API_URL || 'http://localhost:5000/analyze-image';
        const analysisResponse = await axios.post(pythonApiUrl, { imageData: base64Image });
        const detectedIngredients = analysisResponse.data.ingredients;

        // Find recipes based on detected ingredients using existing endpoint
        const recipesApiUrl = `${process.env.API_BASE_URL}/recipes/by-ingredients`;
        const recipesResponse = await axios.post(recipesApiUrl, { ingredients: detectedIngredients });
        const recipes = recipesResponse.data;

        res.status(201).json({
            imageId: fridgeImage._id,
            detectedIngredients,
            recommendedRecipes: recipes,
            message: 'Image uploaded successfully and recipes recommended'
        });
    } catch (error) {
        console.error('Error uploading image and recommending recipes:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
