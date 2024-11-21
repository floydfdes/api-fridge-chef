import { Request, Response } from 'express';

import User from '../models/User';
import { processImage, validateImage } from '../utils/imageUtils';

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error });
    }
};

export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const { name, bio, profilePicture } = req.body;

        let base64ProfilePicture: string | undefined;
        if (profilePicture) {
            try {
                base64ProfilePicture = await processImage(profilePicture);
                validateImage(base64ProfilePicture);
            } catch (error: any) {
                return res.status(400).json({ message: error.message });
            }
        }

        const updateData = {
            name,
            bio,
            ...(base64ProfilePicture && { profilePicture: `data:image/jpeg;base64,${base64ProfilePicture}` })
        };

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user profile', error });
    }
};

export const deleteUser = async (req: any, res: Response) => {
    try {
        const userId = req.params.id;
        const requestingUserId = req.user?.userId;

        if (requestingUserId !== userId) {
            return res.status(403).json({ message: 'Not authorized to delete this user' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndDelete(userId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};