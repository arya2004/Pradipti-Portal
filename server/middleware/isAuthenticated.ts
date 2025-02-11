import express from 'express';
import { SESSION_TOKEN } from '../constants';
import { getUserBySessionToken } from '../services/user.service';

export const isAuthenticated = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const sessionToken = req.cookies[SESSION_TOKEN];
        if(!sessionToken){
            res.sendStatus(403);
            return ;
        }
        const result = await getUserBySessionToken(sessionToken);

        if(result == null){
            res.sendStatus(403);
            return;
        }
        return next();
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
        return ;
    }
}