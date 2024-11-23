import { Request, Response } from 'express';
import { processImage, validateImage } from '../utils/imageUtils';

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

export const followUser = async (req: any, res: Response) => {
    try {
        const userIdToFollow = req.params.id;
        const requestingUserId = req.user?.userId;

        if (requestingUserId === userIdToFollow) {
            return res.status(400).json({ message: 'You cannot follow yourself' });
        }

        const userToFollow = await User.findById(userIdToFollow);
        if (!userToFollow) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndUpdate(userIdToFollow, { $inc: { followersCount: 1 } });
        await User.findByIdAndUpdate(requestingUserId, { $inc: { followingCount: 1 } });

        // Retrieve updated user info
        const updatedUserToFollow = await User.findById(userIdToFollow);
        const updatedRequestingUser = await User.findById(requestingUserId);

        res.status(200).json({
            message: 'Successfully followed the user',
            updatedUser: updatedUserToFollow,
            requestingUser: updatedRequestingUser
        });
    } catch (error) {
        res.status(500).json({ message: 'Error following user', error });
    }
};


export const unfollowUser = async (req: any, res: Response) => {
    try {
        const userIdToUnfollow = req.params.id;
        const requestingUserId = req.user?.userId;

        if (requestingUserId === userIdToUnfollow) {
            return res.status(400).json({ message: 'You cannot unfollow yourself' });
        }

        const userToUnfollow = await User.findById(userIdToUnfollow);
        if (!userToUnfollow) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndUpdate(userIdToUnfollow, { $inc: { followersCount: -1 } });
        await User.findByIdAndUpdate(requestingUserId, { $inc: { followingCount: -1 } });

        // Retrieve updated user info
        const updatedUserToUnfollow = await User.findById(userIdToUnfollow);
        const updatedRequestingUser = await User.findById(requestingUserId);

        res.status(200).json({
            message: 'Successfully unfollowed the user',
            updatedUser: updatedUserToUnfollow,
            requestingUser: updatedRequestingUser
        });
    } catch (error) {
        res.status(500).json({ message: 'Error unfollowing user', error });
    }
};


export const getUsers = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        if (page < 1 || limit < 1) {
            return res.status(400).json({ message: 'Page and limit must be positive numbers' });
        }

        const users = await User.find()
            .select('-password')
            .skip((page - 1) * limit)
            .limit(limit);

        const totalUsers = await User.countDocuments();

        res.status(200).json({
            totalUsers,
            users,
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};