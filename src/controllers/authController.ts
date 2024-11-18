import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const signup = async (req: Request, res: Response) => {
    try {
        const { fullName, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name: fullName, email, password: hashedPassword });
        await user.save();

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' });

        res.status(201).json({ id: user._id, name: user.name, email: user.email, token });
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({
            message: 'Error creating user',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' });

        res.json({ id: user._id, name: user.name, email: user.email, token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

export const logout = (req: Request, res: Response) => {
    // In a stateless JWT setup, logout is typically handled client-side
    res.json({ message: 'Logged out successfully' });
};
