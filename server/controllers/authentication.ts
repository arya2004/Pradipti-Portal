import express, { Request, Response } from 'express';
import { authentication, random } from '../encryption';
import { getUserByUID, getUserByName, updateUserById } from '../db/userOperations';
import { createUser } from '../db/userOperations';
import { DOMAIN, SESSION_TOKEN } from '../constants';

export const register: express.RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, username, email, password } = req.body;

        if (!id || !username || !email || !password) {
            res.sendStatus(400);
            return;
        }
        
        const result = await getUserByUID(id);

        if (result.length > 0) {
            res.sendStatus(409);
            return;
        }

        const salt = random();
        const user = await createUser({
            id,
            name: username,
            email,
            salt,
            password: authentication(salt, password),
            sessiontoken: '',
        });
        res.sendStatus(201);
        return;

    } catch (e) {
        console.error(e);
        res.sendStatus(500);
        return;
    }
};

export const login: express.RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ error: 'Username and password are required' });
            return;
        }

        const result = await getUserByName(username);

        if (!result || result.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const user = result[0];
        const expectedHash = authentication(user.salt, password);

        if (user.password !== expectedHash) {
            res.status(401).json({ error: 'Invalid password' });
            return;
        }

        // Generate session token
        user.sessiontoken = authentication(random(), user.password);

        const updateUser = await updateUserById(user.id, user);

        // Set session cookie
        res.cookie(SESSION_TOKEN, user.sessiontoken, {
            domain: DOMAIN,
            path: '/',
            expires: new Date(Date.now() + 900000),  // 15 minutes
            httpOnly: true, // important for security
            secure: process.env.NODE_ENV === 'production', // secure cookie in production
        });
        res.status(200).json({ message: 'Login successful' });

        return;

    } catch (e) {
        console.error(e);
        res.sendStatus(500);
        return;
    }
};