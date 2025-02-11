import express, { Request, Response } from 'express';
import { authentication, random } from '../encryption';
import { getUserById, getUserByName, updateUser } from '../services/user.service';
import { createUser } from '../db/userOperations';
import { DOMAIN, SESSION_TOKEN } from '../constants';

export const register: express.RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, username, email, password } = req.body;

        // Input validation
        if (!id || !username || !email || !password) {
            res.status(400).json({ error: 'All fields (id, username, email, password) are required' });
            return;
        }

        // Check if user already exists
        const existingUser = await getUserByName(username);
        if (existingUser) {
            res.status(409).json({ error: 'Username already taken' });
            return;
        }

        // Salt and password hash
        const salt = random();
        const hashedPassword = authentication(salt, password);

        // Create user
        const userId = await createUser({
            id,
            username,
            email,
            salt,
            password_hash: hashedPassword,
            role: 'user',  // Default role can be user or admin based on your requirements
        });

        res.status(201).json({ message: 'User created successfully', userId });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const login: express.RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        // Input validation
        if (!username || !password) {
            res.status(400).json({ error: 'Username and password are required' });
            return;
        }

        // Get user by username
        const result = await getUserByName(username);
        if (!result) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const user = result[0];
        const expectedHash = authentication(user.salt, password);

        // Check password
        if (user.password_hash !== expectedHash) {
            res.status(401).json({ error: 'Invalid password' });
            return;
        }

        // Generate session token
        user.sessiontoken = authentication(random(), user.password_hash);

        // Update user with session token
        await updateUser(user.id, { sessiontoken: user.sessiontoken });

        // Set session cookie
        res.cookie(SESSION_TOKEN, user.sessiontoken, {
            domain: DOMAIN,
            path: '/',
            expires: new Date(Date.now() + 900000),  // 15 minutes
            httpOnly: true, // important for security
            secure: process.env.NODE_ENV === 'production', // secure cookie in production
        });

        res.status(200).json({ message: 'Login successful' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal server error' });
    }
};