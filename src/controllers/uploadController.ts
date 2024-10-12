import { Request, Response } from 'express';

import FridgeImage from '../models/FridgeImage';

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

        const maxSize = 2 * 1024 * 1024; // 2MB
        if (req.file.size > maxSize) {
            return res.status(400).json({ message: 'File too large. Max size is 2MB.' });
        }

        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const storageUrl = process.env.STORAGE_URL || 'https://your-storage-url.com';
        const imageUrl = `${storageUrl}/${req.file.filename}`;

        const fridgeImage = new FridgeImage({
            userId,
            imageUrl
        });

        await fridgeImage.save();

        res.status(201).json({
            imageUrl: fridgeImage.imageUrl,
            message: 'Image uploaded successfully'
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
