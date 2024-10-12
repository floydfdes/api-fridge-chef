import { Request, Response } from 'express';

import User from '../models/User';

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
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, bio, profilePicture },
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