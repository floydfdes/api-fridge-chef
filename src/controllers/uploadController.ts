import { Request, Response } from 'express';


interface MulterRequest extends Request {
    file?: Express.Multer.File;
    user?: { id: string }; // Include user object for type safety
}

export const uploadFridgeImage = async (req: MulterRequest, res: Response) => {
    try {
        const fridgeImage = req.file; // Assuming the image is uploaded as a file
        if (!fridgeImage) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        // Convert the image to base64
        const base64Image = fridgeImage.buffer.toString('base64');

        // Return the base64 image
        return res.status(200).json({
            image: `data:${fridgeImage.mimetype};base64,${base64Image}`,
            message: 'Image uploaded successfully'
        });

        // Commenting out the following code for now
        /*
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
        */
    } catch (error) {
        console.error('Error uploading image and recommending recipes:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
