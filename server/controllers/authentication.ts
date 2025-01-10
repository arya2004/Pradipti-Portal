import express, { Request, Response } from 'express';
import { authentication, random } from '../encryption';
import { getUserByUID } from '../db/userOperations';
import { createUser } from '../db/userOperations';
import { DOMAIN, SESSION_TOKEN } from '../constants';

export const register: express.RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, username, email, password } = req.body;

        if (!id || !username || !email || !password) {
            return;
        }
        
        const result = await getUserByUID(id);

        if (result.length > 0) {
            return;
        }

        const salt = random();
        const user = await createUser({
            id,
            name: username,
            email,
            salt,
            password: authentication(salt, password)
        });

        return;

    } catch (e) {
        console.error(e);
        return;
    }
};

export const login: express.RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return;
        }

        const result = await getUserByName(username);

        if (!result || result.length === 0) {
            return;
        }

        const user = result[0];

        // Check password
        const expectedHash = authentication(user.salt, password);

        if (user.password !== expectedHash) {
            return;
        }

        // Generate session token
        user.sessiontoken = authentication(random(), user.password);

        const updateUser = await updateUserById(user.id, user);

        // Set session cookie
        res.cookie(SESSION_TOKEN, user.sessiontoken, {
            domain: DOMAIN,
            path: '/',
            expires: new Date(Date.now() + 900000),  
        });

        return;

    } catch (e) {
        console.error(e);
        return;
    }
};