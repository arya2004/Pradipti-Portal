import express from 'express';
import { authentication, random } from '../encryption';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { id, username, email, password } = req.body;

        if(!id || !username || !email || !password){
            return res.sendStatus(400);
        }
        
        const result = await getUserByUID(id);

        if(!result || result.length > 0){
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            id,
            username,
            email,
            salt,
            password: authentication(salt, password)
        });
        return res.status(200).json(user).end();

    }catch(e){
        console.log(e);
        return res.sendStatus(400);
    }
};